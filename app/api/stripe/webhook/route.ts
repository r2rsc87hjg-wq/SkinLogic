// Tool 6 — Stripe Webhook Handler
//
// Every event MUST pass Stripe signature verification before processing.
// Unsigned or tampered events are rejected with 400.
//
// This is the durable, authoritative source of truth for the revenue
// ledger: when a checkout is paid, we write the transaction row here
// (status 'paid'). The submit endpoint later updates that row with
// token usage and final status. Token *issuance* happens on the buyer's
// verified return (see app/api/analysis/create-session) — not here —
// so the raw token never has to be stored or transported via Redis.

import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { recordPaidTransaction } from '@/lib/transactions'
import { renewSubscriptionToken, cancelSubscriptionToken } from '@/lib/subscription-token'

// Stripe needs the raw, unparsed request body to verify the signature,
// so do NOT let a body parser touch it.
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'config_error' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'missing_signature' }, { status: 400 })
  }

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    // Signature verification failed — reject.
    console.error(
      '[webhook] signature verification failed:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Only record genuinely paid checkouts.
      if (session.payment_status === 'paid') {
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id

        if (paymentIntentId) {
          await recordPaidTransaction({
            stripePaymentIntentId: paymentIntentId,
            stripeCheckoutSessionId: session.id,
            amountCents: session.amount_total ?? 0,
            currency: session.currency ?? 'usd',
          })
        }
      }
    } else if (event.type === 'invoice.payment_succeeded') {
      // Monthly renewal — extend the subscription token's expiry.
      const invoice = event.data.object as Stripe.Invoice
      const subId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id
      if (subId && invoice.billing_reason === 'subscription_cycle') {
        await renewSubscriptionToken(subId)
      }
    } else if (event.type === 'customer.subscription.deleted') {
      // Subscription cancelled — revoke the device token.
      const sub = event.data.object as Stripe.Subscription
      await cancelSubscriptionToken(sub.id)
    }
    // Other event types are acknowledged but not acted on.
  } catch (err) {
    console.error(
      '[webhook] handler error:',
      err instanceof Error ? err.message : 'unknown'
    )
    // 500 so Stripe retries delivery; recordPaidTransaction is idempotent.
    return NextResponse.json({ error: 'handler_error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

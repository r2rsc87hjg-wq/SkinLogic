// Tool 6 — Paid Analysis: Session Token Issuance
//
// Called by the buyer's browser when it returns from Stripe Checkout
// (the success_url carries ?session_id=cs_...). We DO NOT trust the
// browser's claim of payment — we retrieve the Checkout Session from
// Stripe server-side and confirm payment_status === 'paid' before
// minting a one-time, 15-minute token.
//
// Why issue here rather than in the webhook: the raw token must reach
// this exact buyer once, and we never store it raw. Generating it on the
// verified return is race-free and keeps only the hash in the DB. The
// webhook remains the durable transaction/refund ledger (see webhook
// route). The unique constraint on the checkout id guarantees one paid
// checkout yields at most one token.

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getTokenExchangeLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import {
  issueSessionToken,
  TokenAlreadyIssuedError,
} from '@/lib/tokens'

export async function POST(request: NextRequest) {
  // 0. Rate limit before touching Stripe — each call costs one retrieve.
  const ip = getIp(request.headers)
  const limiter = getTokenExchangeLimiter()
  const { success, limit, remaining, reset } = await safeLimit(limiter, ip)

  if (!success) {
    const minutesUntilReset = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }

  const sessionId = (body as { sessionId?: unknown })?.sessionId
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return NextResponse.json(
      { error: 'invalid_request', message: 'A valid checkout session id is required.' },
      { status: 400 }
    )
  }

  // 1. Verify payment with Stripe — the only source of truth.
  let checkout
  try {
    checkout = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (err) {
    console.error(
      '[create-session] Stripe retrieve error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      { error: 'stripe_error', message: 'Could not verify your payment. Please try again.' },
      { status: 502 }
    )
  }

  if (checkout.payment_status !== 'paid') {
    return NextResponse.json(
      { error: 'not_paid', message: 'This checkout has not been paid.' },
      { status: 402 }
    )
  }

  const paymentIntentId =
    typeof checkout.payment_intent === 'string'
      ? checkout.payment_intent
      : checkout.payment_intent?.id

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: 'stripe_error', message: 'Payment record is incomplete. Please contact support.' },
      { status: 502 }
    )
  }

  // 2. Mint the one-time token (hash stored; raw returned once).
  try {
    const issued = await issueSessionToken({
      stripePaymentIntentId: paymentIntentId,
      stripeCheckoutSessionId: checkout.id,
    })
    return NextResponse.json({ token: issued.token, expiresAt: issued.expiresAt })
  } catch (err) {
    if (err instanceof TokenAlreadyIssuedError) {
      // The buyer already started their analysis session for this
      // payment. Tokens are single-use for privacy — we can't reissue.
      return NextResponse.json(
        {
          error: 'already_issued',
          message:
            'This analysis session was already started. For your privacy, the access token is single-use and cannot be reissued.',
        },
        { status: 409 }
      )
    }
    console.error(
      '[create-session] token issue error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      { error: 'server_error', message: 'Could not start your analysis. Please try again.' },
      { status: 500 }
    )
  }
}

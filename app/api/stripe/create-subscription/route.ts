import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getPaymentLimiter, getIp , safeLimit } from '@/lib/rate-limit'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// The Stripe Price ID for the $4.99/month subscription.
// Create this in your Stripe dashboard (Products → Add product → Recurring).
const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

export async function POST(request: NextRequest) {
  if (!SUBSCRIPTION_PRICE_ID) {
    console.error('[create-subscription] STRIPE_SUBSCRIPTION_PRICE_ID not set')
    return NextResponse.json({ error: 'config_error' }, { status: 500 })
  }

  const ip = getIp(request.headers)
  const { success } = await safeLimit(getPaymentLimiter(), ip)
  if (!success) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: SUBSCRIPTION_PRICE_ID, quantity: 1 }],
      success_url: `${APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/?sub=cancelled`,
      // Collect email so we can link the subscription to a customer.
      customer_creation: 'always',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[create-subscription] Stripe error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'stripe_error' }, { status: 500 })
  }
}

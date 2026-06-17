// Tool 6 — Paid Analysis: Checkout creation
// Creates a Stripe Checkout Session for a single pay-per-use analysis.
// No account, no email capture (guest checkout). Rate limited per spec
// (max 10 payment-initiation attempts per IP per hour).

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getPaymentLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import { ANALYSIS_PRICE_CENTS, ANALYSIS_CURRENCY } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  // 1. Rate limit before doing anything else.
  const ip = getIp(request.headers)
  const limiter = getPaymentLimiter()
  const { success, limit, remaining, reset } = await safeLimit(limiter, ip)

  if (!success) {
    const minutesUntilReset = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Too many payment attempts. Please try again in ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`,
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (!appUrl) {
    console.error('[checkout] NEXT_PUBLIC_APP_URL is not set')
    return NextResponse.json(
      { error: 'config_error', message: 'Payment is temporarily unavailable.' },
      { status: 500 }
    )
  }

  // 2. Create a hosted Checkout Session. Stripe handles all card data;
  // we never see or touch it. Price is built inline from our single
  // source of truth so the charged amount always matches the UI.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Guest checkout — don't create a Customer or persist anything.
      customer_creation: 'if_required',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: ANALYSIS_CURRENCY,
            unit_amount: ANALYSIS_PRICE_CENTS,
            product_data: {
              name: 'AI Skin Analysis (single use)',
              description:
                'One educational AI-powered skin analysis. Your image and results are never stored.',
            },
          },
        },
      ],
      // The buyer returns here; {CHECKOUT_SESSION_ID} is filled by Stripe.
      success_url: `${appUrl}/analysis/submit?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/analysis?canceled=1`,
    })

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL')
    }

    return NextResponse.json(
      { url: session.url },
      { headers: { 'X-RateLimit-Remaining': String(remaining - 1) } }
    )
  } catch (err) {
    console.error(
      '[checkout] Stripe error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      { error: 'stripe_error', message: 'Could not start checkout. Please try again.' },
      { status: 502 }
    )
  }
}

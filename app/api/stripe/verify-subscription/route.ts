import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getTokenExchangeLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import {
  issueSubscriptionToken,
  TokenAlreadyIssuedError,
} from '@/lib/subscription-token'

export async function GET(request: NextRequest) {
  const ip = getIp(request.headers)
  const { success } = await safeLimit(getTokenExchangeLimiter(), ip)
  if (!success) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const sessionId = request.nextUrl.searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'missing_session_id' }, { status: 400 })
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })
  } catch {
    return NextResponse.json({ error: 'invalid_session' }, { status: 400 })
  }

  if (session.payment_status !== 'paid' || session.mode !== 'subscription') {
    return NextResponse.json({ error: 'not_paid' }, { status: 402 })
  }

  const sub = session.subscription
  const subscriptionId = typeof sub === 'string' ? sub : sub?.id
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id

  if (!subscriptionId || !customerId) {
    return NextResponse.json({ error: 'missing_ids' }, { status: 500 })
  }

  try {
    const { token, expiresAt } = await issueSubscriptionToken({
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
    })
    return NextResponse.json({ token, expiresAt })
  } catch (err) {
    if (err instanceof TokenAlreadyIssuedError) {
      // Refresh: a token was already issued — re-retrieve it by session.
      // Rather than exposing it again, ask the client to use the stored one.
      return NextResponse.json({ error: 'already_issued' }, { status: 409 })
    }
    throw err
  }
}

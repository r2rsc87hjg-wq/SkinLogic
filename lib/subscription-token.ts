import 'server-only'

import { getServiceClient } from './supabase'

// Subscription tokens are issued after Stripe payment is verified.
// Only the SHA-256 hash is stored — the raw token is returned once
// to the client and kept in localStorage.

const TOKEN_EXPIRY_DAYS = 40 // slightly longer than a billing month

export interface SubscriptionTokenRow {
  id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  token_hash: string
  status: 'active' | 'cancelled'
  expires_at: string
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function expiryDate(): Date {
  return new Date(Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
}

// Issue a token for a verified Stripe subscription. Returns the raw
// token exactly once. The unique constraint on stripe_subscription_id
// prevents double-issuance if the success page is refreshed.
export async function issueSubscriptionToken(params: {
  stripeCustomerId: string
  stripeSubscriptionId: string
}): Promise<{ token: string; expiresAt: string }> {
  const token = crypto.randomUUID()
  const tokenHash = await hashToken(token)
  const expiresAt = expiryDate()

  const client = getServiceClient()
  const { error } = await client.from('subscriptions').insert({
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId,
    token_hash: tokenHash,
    status: 'active',
    expires_at: expiresAt.toISOString(),
  })

  if (error) {
    // 23505 = unique_violation → already issued for this subscription.
    if (error.code === '23505') throw new TokenAlreadyIssuedError()
    throw new Error(`Failed to store subscription token: ${error.message}`)
  }

  return { token, expiresAt: expiresAt.toISOString() }
}

// Validate a raw token from an Authorization header. Returns the row
// if it is active and not expired, null otherwise.
export async function validateSubscriptionToken(
  rawToken: string
): Promise<SubscriptionTokenRow | null> {
  const tokenHash = await hashToken(rawToken)
  const client = getServiceClient()

  const { data, error } = await client
    .from('subscriptions')
    .select('id, stripe_customer_id, stripe_subscription_id, token_hash, status, expires_at')
    .eq('token_hash', tokenHash)
    .eq('status', 'active')
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (error) throw new Error(`Failed to validate subscription token: ${error.message}`)
  return data as SubscriptionTokenRow | null
}

// Extend the expiry on renewal (called from the webhook).
export async function renewSubscriptionToken(
  stripeSubscriptionId: string
): Promise<void> {
  const client = getServiceClient()
  const { error } = await client
    .from('subscriptions')
    .update({ expires_at: expiryDate().toISOString(), status: 'active' })
    .eq('stripe_subscription_id', stripeSubscriptionId)

  if (error) throw new Error(`Failed to renew subscription token: ${error.message}`)
}

// Mark a subscription cancelled (called from the webhook on deletion).
export async function cancelSubscriptionToken(
  stripeSubscriptionId: string
): Promise<void> {
  const client = getServiceClient()
  const { error } = await client
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('stripe_subscription_id', stripeSubscriptionId)

  if (error) throw new Error(`Failed to cancel subscription token: ${error.message}`)
}

export class TokenAlreadyIssuedError extends Error {
  constructor() {
    super('A token has already been issued for this subscription')
    this.name = 'TokenAlreadyIssuedError'
  }
}

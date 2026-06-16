import 'server-only'

import { getServiceClient } from './supabase'

// =============================================================
// TOOL 6 — One-time session tokens (zero-retention capability tokens)
//
// A token is minted ONLY after Stripe payment is verified server-side
// (see app/api/analysis/create-session/route.ts). The raw token is
// returned to the buyer's browser exactly once and never stored — only
// its SHA-256 hash lives in the DB.
//
// Lifecycle:
//   issue  → row created, raw token returned once
//   submit → attempts++ ; on success `consumed=true` (single-use);
//            after 2 failed attempts the caller triggers a refund.
// =============================================================

const TOKEN_TTL_MINUTES = 15
export const MAX_TOKEN_ATTEMPTS = 2 // initial attempt + one retry

export interface IssuedToken {
  token: string
  expiresAt: string
}

export interface TokenRow {
  id: string
  stripe_payment_intent_id: string
  stripe_checkout_session_id: string
  token_hash: string
  expires_at: string
  consumed: boolean
  attempts: number
}

// Mint a token for a *verified-paid* checkout session. The unique
// constraint on stripe_checkout_session_id guarantees one paid checkout
// can never yield two tokens (a refresh of the return page can't buy a
// second free analysis). Returns the raw token exactly once.
export async function issueSessionToken(params: {
  stripePaymentIntentId: string
  stripeCheckoutSessionId: string
}): Promise<IssuedToken> {
  const token = crypto.randomUUID()
  const tokenHash = await hashToken(token)
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000)

  const client = getServiceClient()
  const { error } = await client.from('session_tokens').insert({
    token_hash: tokenHash,
    stripe_payment_intent_id: params.stripePaymentIntentId,
    stripe_checkout_session_id: params.stripeCheckoutSessionId,
    expires_at: expiresAt.toISOString(),
    consumed: false,
    attempts: 0,
  })

  if (error) {
    // 23505 = unique_violation → a token was already issued for this
    // checkout. Surface a typed error so the caller can return 409.
    if (error.code === '23505') {
      throw new TokenAlreadyIssuedError()
    }
    throw new Error(`Failed to store session token: ${error.message}`)
  }

  return { token, expiresAt: expiresAt.toISOString() }
}

// Load a token by its raw value for validation in the submit endpoint.
// Returns null if no such token exists.
export async function loadToken(rawToken: string): Promise<TokenRow | null> {
  const tokenHash = await hashToken(rawToken)
  const client = getServiceClient()

  const { data, error } = await client
    .from('session_tokens')
    .select(
      'id, stripe_payment_intent_id, stripe_checkout_session_id, token_hash, expires_at, consumed, attempts'
    )
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load session token: ${error.message}`)
  }
  return data as TokenRow | null
}

// Record one submit attempt. Returns the new attempt count. We guard
// against a concurrent double-submit by requiring the row's current
// attempt count to match what we read (optimistic concurrency).
export async function recordAttempt(
  id: string,
  currentAttempts: number
): Promise<number> {
  const client = getServiceClient()
  const next = currentAttempts + 1

  const { data, error } = await client
    .from('session_tokens')
    .update({ attempts: next })
    .eq('id', id)
    .eq('attempts', currentAttempts) // optimistic lock
    .select('attempts')

  if (error) {
    throw new Error(`Failed to record token attempt: ${error.message}`)
  }
  if (!data || data.length === 0) {
    // Another request incremented first — treat as a conflict.
    throw new TokenConflictError()
  }
  return next
}

// Mark a token consumed after a successful analysis. Single-use.
export async function markConsumed(id: string): Promise<void> {
  const client = getServiceClient()
  const { error } = await client
    .from('session_tokens')
    .update({ consumed: true })
    .eq('id', id)
  if (error) {
    throw new Error(`Failed to mark token consumed: ${error.message}`)
  }
}

export class TokenAlreadyIssuedError extends Error {
  constructor() {
    super('A token has already been issued for this payment')
    this.name = 'TokenAlreadyIssuedError'
  }
}

export class TokenConflictError extends Error {
  constructor() {
    super('Token is already being processed')
    this.name = 'TokenConflictError'
  }
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

import 'server-only'

import { getServiceClient } from './supabase'

// =============================================================
// TOOL 6 — Revenue / cost ledger helpers
//
// These write ONLY transaction metadata: ids, amount, status, token
// counts. Never any user content (image, result, profile, email, IP).
// =============================================================

export type TransactionStatus = 'paid' | 'success' | 'failed' | 'refunded'

// Insert the ledger row when Stripe confirms payment (webhook).
// Idempotent: the webhook can deliver the same event more than once, so
// a duplicate (same checkout/payment intent) is silently ignored.
export async function recordPaidTransaction(params: {
  stripePaymentIntentId: string
  stripeCheckoutSessionId: string
  amountCents: number
  currency: string
}): Promise<void> {
  const client = getServiceClient()
  const { error } = await client.from('analysis_transactions').insert({
    stripe_payment_intent_id: params.stripePaymentIntentId,
    stripe_checkout_session_id: params.stripeCheckoutSessionId,
    amount_cents: params.amountCents,
    currency: params.currency,
    status: 'paid',
  })

  if (error) {
    // 23505 = unique_violation → already recorded (webhook retry). Fine.
    if (error.code === '23505') return
    throw new Error(`Failed to record transaction: ${error.message}`)
  }
}

// Update the ledger row for a payment intent — used by the submit
// endpoint to record success/failure, token usage, and refunds.
export async function updateTransaction(
  stripePaymentIntentId: string,
  fields: {
    status?: TransactionStatus
    token_hash?: string
    claude_input_tokens?: number
    claude_output_tokens?: number
    estimated_cost_usd?: number
  }
): Promise<void> {
  const client = getServiceClient()
  const { error } = await client
    .from('analysis_transactions')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('stripe_payment_intent_id', stripePaymentIntentId)

  if (error) {
    throw new Error(`Failed to update transaction: ${error.message}`)
  }
}

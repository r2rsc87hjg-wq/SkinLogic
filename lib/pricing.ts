import 'server-only'

// =============================================================
// TOOL 6 — Pricing & cost model
//
// Pricing rule (from spec): set the price at a minimum of 3x the
// per-call Claude API cost so it covers Stripe fees (~2.9% + $0.30),
// infrastructure, and margin.
//
// Per-call cost estimate for one vision analysis on claude-sonnet-4-6:
//   input  ~2,200 tokens (image ~1,600 + system ~500 + user note ~100)
//   output ~1,200 tokens (capped by ANALYSIS_MAX_TOKENS below)
//   cost  = 2,200 * $3/1M  +  1,200 * $15/1M  ≈ $0.0066 + $0.018 ≈ $0.025
//
//   3x  ≈ $0.075. Stripe takes $0.30 + 2.9% on a $2 charge ≈ $0.36.
//   At $2.00 we clear API cost + Stripe fee + infra with margin.
// =============================================================

// The single source of truth for the price. Displayed to the user
// BEFORE payment and charged via Stripe — they must match.
export const ANALYSIS_PRICE_CENTS = 200
export const ANALYSIS_CURRENCY = 'usd'

// Hard ceiling on output tokens for the paid analysis. Keeps cost
// bounded and predictable; never raise without re-checking pricing above.
export const ANALYSIS_MAX_TOKENS = 1200

// claude-sonnet-4-6 list prices, USD per 1,000,000 tokens.
const SONNET_INPUT_PER_MTOK = 3
const SONNET_OUTPUT_PER_MTOK = 15

// Human-readable price for UI copy, e.g. "$2.00".
export function formatPrice(cents: number = ANALYSIS_PRICE_CENTS): string {
  return `$${(cents / 100).toFixed(2)}`
}

// Estimate the USD cost of one call from its token usage. Logged to the
// transaction ledger for runaway-cost monitoring — not user-facing.
export function estimateCostUsd(inputTokens: number, outputTokens: number): number {
  const cost =
    (inputTokens / 1_000_000) * SONNET_INPUT_PER_MTOK +
    (outputTokens / 1_000_000) * SONNET_OUTPUT_PER_MTOK
  // Round to 5 dp to match the numeric(10,5) ledger column.
  return Math.round(cost * 1e5) / 1e5
}

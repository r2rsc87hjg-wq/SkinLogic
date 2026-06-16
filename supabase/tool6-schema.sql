-- =============================================================
-- TOOL 6 — Monetized Paid Skin Analysis
-- Zero-retention architecture. Run this in the Supabase SQL editor.
--
-- DESIGN PRINCIPLE: the database holds ONLY what we need to audit
-- revenue, issue refunds, and monitor API cost. It never holds a
-- user's image, their analysis result, their profile answers, their
-- email, or their IP address. The absence of that data IS the
-- compliance strategy (GDPR / CCPA): we cannot leak what we never store.
--
-- Two tables:
--   session_tokens   — one-time, 15-minute capability tokens (hashed)
--   analysis_transactions — the revenue / cost ledger
-- =============================================================

-- -------------------------------------------------------------
-- session_tokens
-- A row is created the moment a buyer returns from a *verified-paid*
-- Stripe Checkout session. The raw token is returned to that buyer's
-- browser exactly once and never stored — only its SHA-256 hash lives
-- here. The token authorizes exactly one successful analysis.
-- -------------------------------------------------------------
create table if not exists public.session_tokens (
  id                          uuid primary key default gen_random_uuid(),
  -- SHA-256 hex of the raw token. The raw token is never stored.
  token_hash                  text not null unique,
  -- Stripe references — needed to issue a refund if analysis fails twice.
  stripe_payment_intent_id    text not null,
  -- Unique so a single paid checkout can mint at most one token
  -- (prevents a returning/refreshing buyer from getting two analyses).
  stripe_checkout_session_id  text not null unique,
  expires_at                  timestamptz not null,
  -- Flipped true only after a SUCCESSFUL analysis. Single-use guarantee.
  consumed                    boolean not null default false,
  -- Incremented on every submit attempt. Spec allows 1 retry, so the
  -- token is dead after 2 attempts (initial + 1 retry) → auto-refund.
  attempts                    integer not null default 0,
  created_at                  timestamptz not null default now()
);

create index if not exists session_tokens_expires_at_idx
  on public.session_tokens (expires_at);

-- -------------------------------------------------------------
-- analysis_transactions
-- The revenue + cost ledger. One row per paid checkout. Written by the
-- Stripe webhook (status 'paid'), then updated by the submit endpoint
-- ('success' | 'failed' | 'refunded') with token usage for cost
-- monitoring. NO user content of any kind is ever written here.
-- -------------------------------------------------------------
create table if not exists public.analysis_transactions (
  -- Anonymous transaction id. Not linkable to any person.
  id                          uuid primary key default gen_random_uuid(),
  stripe_payment_intent_id    text not null unique,
  stripe_checkout_session_id  text not null unique,
  -- Hashed token reference (NOT the raw token), per spec.
  token_hash                  text,
  amount_cents                integer not null,
  currency                    text not null default 'usd',
  -- 'paid' (charged, not yet analyzed)
  -- 'success' (analysis delivered)
  -- 'failed' (analysis failed; awaiting retry or already refunded)
  -- 'refunded' (auto-refunded after two failures)
  status                      text not null default 'paid',
  -- Token count + estimated USD cost, for runaway-cost monitoring only.
  claude_input_tokens         integer,
  claude_output_tokens        integer,
  estimated_cost_usd          numeric(10, 5),
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create index if not exists analysis_transactions_created_at_idx
  on public.analysis_transactions (created_at);

-- -------------------------------------------------------------
-- Row Level Security
-- Both tables are touched ONLY by the server-side service-role client
-- (lib/supabase.ts → getServiceClient), which bypasses RLS. We enable
-- RLS with no policies so the public anon key can never read or write
-- these tables, even if it were somehow used against them.
-- -------------------------------------------------------------
alter table public.session_tokens enable row level security;
alter table public.analysis_transactions enable row level security;

-- -------------------------------------------------------------
-- OPTIONAL: scheduled cleanup of expired tokens.
-- Tokens are useless after expiry; purge them so the table stays small.
-- Requires the pg_cron extension (enable it under Database → Extensions).
-- -------------------------------------------------------------
-- select cron.schedule(
--   'purge-expired-session-tokens',
--   '0 * * * *',
--   $$ delete from public.session_tokens where expires_at < now() - interval '1 day' $$
-- );

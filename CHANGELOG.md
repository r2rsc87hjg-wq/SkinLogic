# SkinClear — Build Changelog

Plain-English log of what was built and why. Paste the latest entry at the
start of each new Claude Code session.

---

## Tool 6 — Monetized Paid Skin Analysis (zero-retention)

**What it is:** the only tool with a transaction. A guest pays $2.00 once via
Stripe, uploads one photo, and gets a single AI-powered, educational reading.
The image and the result are never stored anywhere.

**How the flow works:**

1. `/analysis` — landing page with the privacy notice (shown before payment),
   price, and a "Start analysis — $2.00" button.
2. Button → `POST /api/analysis/checkout` (rate limited 10/IP/hr) → creates a
   Stripe **Checkout Session** → browser is redirected to Stripe's hosted page.
   We never see card data.
3. After paying, Stripe redirects back to `/analysis/submit?session_id=cs_...`.
4. That page calls `POST /api/analysis/create-session` with the checkout id.
   The server **retrieves the checkout from Stripe and confirms it's paid**,
   then mints a one-time, 15-minute token (only its SHA-256 hash is stored).
5. The page shows an upload form. `POST /api/analysis/submit` (multipart) sends
   the token + image. The server validates the token and the file, calls Claude
   vision **in memory only**, returns the result, and marks the token used.
   The image/result are never written to disk, DB, log, or storage.
6. `POST /api/stripe/webhook` (signature-verified) writes the durable revenue
   ledger row when a checkout is paid.

**Key design decision (approved):** the spec said "mint the token in the Stripe
webhook." We mint it instead on the buyer's **verified return**, gated by a
server-side Stripe check that the session is paid. Same security guarantees,
but race-free and the raw token never needs to be stored or shuttled through
Redis. The webhook still verifies signatures and owns the transaction/refund
ledger.

**Retry + refund:** a token allows up to 2 attempts (initial + 1 retry). If the
analysis fails twice, the server auto-refunds via Stripe and tells the user.

**Model:** `claude-sonnet-4-6` (the codebase's `CLAUDE_DEFAULTS` ceiling) — it
supports vision and keeps per-call cost ~ $0.025, so the $2.00 price clears the
spec's 3× rule plus Stripe fees with margin. Output capped at 1200 tokens.

**What the database stores (and nothing else):** anonymous transaction id,
timestamp, amount, Stripe payment-intent id (for refunds), hashed token,
success/failure status, and token counts (for cost monitoring). No images, no
results, no profile data, no IP, no email.

**Files added/changed:**
- `supabase/tool6-schema.sql` — `session_tokens` + `analysis_transactions`
  tables, RLS on (service-role only), optional pg_cron token cleanup. **Run
  this in the Supabase SQL editor before going live.**
- `lib/pricing.ts` — price ($2.00), output-token cap, cost estimator.
- `lib/tokens.ts` — verified-return issuance + attempts/single-use model.
- `lib/transactions.ts` — ledger write/update helpers.
- `app/api/analysis/checkout/route.ts` — create Stripe Checkout Session.
- `app/api/analysis/create-session/route.ts` — verify paid → mint token.
- `app/api/analysis/submit/route.ts` — token + image → Claude → result, refund.
- `app/api/stripe/webhook/route.ts` — signature verify + ledger write.
- `app/analysis/page.tsx` + `components/analysis/PaymentStart.tsx` — paywall.
- `app/analysis/submit/page.tsx` + `components/analysis/AnalysisClient.tsx` —
  token exchange, upload form, result.
- `app/privacy/page.tsx` — plain-English privacy policy (the pre-payment notice
  links here; it was previously missing).
- `app/page.tsx` — added the homepage link.

**Before go-live checklist:**
- Run `supabase/tool6-schema.sql`.
- Set real Stripe keys + `STRIPE_WEBHOOK_SECRET`, `ANTHROPIC_API_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, Upstash keys, and `NEXT_PUBLIC_APP_URL`.
- Register the webhook endpoint (`/api/stripe/webhook`) in the Stripe dashboard
  and subscribe to `checkout.session.completed`.
- Set a hard spend limit + 50%-budget alert in the Anthropic console.

**Known pre-existing issue (NOT Tool 6) — RESOLVED below:** `sanity.config.ts`
imported `@sanity/vision`, which wasn't installed, failing `next build`'s
typecheck. Fixed in the follow-up entry.

---

## Tool 6 — Follow-up fixes (same day)

**1. Rate limiter on the token-exchange endpoint.** `create-session` was the
one Tool 6 endpoint without a rate limit. Each call costs one Stripe retrieve,
so a flood of bogus `cs_` ids could rack up Stripe API calls. Added
`getTokenExchangeLimiter()` (30 attempts/IP/hr) in `lib/rate-limit.ts` and wired
it in as step 0 of `app/api/analysis/create-session/route.ts`, before any Stripe
call — returns 429 with the standard `X-RateLimit-*` headers, matching the other
tools. 30/hr leaves plenty of room for legitimate returns, refreshes, and
retries while stopping floods.

**2. Installed the missing `@sanity/vision`.** Pinned to `^3.99.0` to match the
installed `sanity@3.99.0` (avoids pulling an incompatible v4). This clears the
last typecheck error — `tsc --noEmit` now exits 0 across the whole project and
`next build` is no longer blocked by that import.

**Install gotcha for future sessions:** the project has a pre-existing peer-dep
conflict (`eslint@10` vs `eslint-config-next`'s `eslint >=9` requirement), so a
plain `npm install` of new packages fails with ERESOLVE. Use
`npm i ... --legacy-peer-deps` (how this repo's `node_modules` was originally
built). Unrelated to Tool 6; worth resolving the eslint version mismatch
properly at some point.

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Shared Redis instance for all rate limiters
function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash Redis environment variables are not set')
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

// Tool 6: Payment initiation — 10 attempts per IP per hour (per spec)
export function getPaymentLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    prefix: 'rl:payment',
  })
}

// Tool 6: Token exchange — 30 attempts per IP per hour.
// This endpoint verifies a paid Stripe checkout and mints the one-time
// token. Each call costs one Stripe retrieve, so cap it to stop bogus
// session-id floods while leaving plenty of headroom for legitimate
// returns, refreshes, and retries.
export function getTokenExchangeLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(30, '1 h'),
    prefix: 'rl:token-exchange',
  })
}

// Guided Learning (Learn with Pip) — 5 per IP per hour (free tier).
export function getLearnGuideLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:learn-guide',
  })
}

// Subscribers get 30 Pip sessions per IP per hour.
export function getSubscriberLearnGuideLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(30, '1 h'),
    prefix: 'rl:learn-guide:sub',
  })
}

// Free AI skin analysis — 3 requests per IP per hour (Sonnet vision, so keep low)
export function getAnalysisLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'rl:analysis',
  })
}

// Runs a limiter without ever throwing. If Redis is misconfigured or
// unreachable (e.g. a bad UPSTASH token → WRONGPASS), we fail OPEN — allow the
// request through rather than letting the throw crash the route with an empty
// response body. A broken rate limiter should degrade protection, never take
// down every AI endpoint at once.
type LimitResult = {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function safeLimit(
  limiter: Ratelimit,
  ip: string
): Promise<LimitResult> {
  try {
    return await limiter.limit(ip)
  } catch (err) {
    console.error(
      '[rate-limit] limiter error — failing open:',
      err instanceof Error ? err.message : String(err)
    )
    return { success: true, limit: 0, remaining: 0, reset: Date.now() }
  }
}

// Helper: extract best available IP from Next.js request headers
export function getIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'anonymous'
  )
}

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

// Tool 4: Free AI profiler — 3 requests per IP per hour
export function getProfilerLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'rl:profiler',
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

// Tool 5: Social pipeline — 20 requests per IP per hour
export function getSocialLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(20, '1 h'),
    prefix: 'rl:social',
  })
}

// Navigator AI tools — 5 requests per IP per hour each
export function getNavigatorSpecialistLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:navigator:specialist',
  })
}

export function getNavigatorReferralLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:navigator:referral',
  })
}

// Skin Health Coach chatbot — 15 messages per IP per hour (free tier).
export function getChatLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(15, '1 h'),
    prefix: 'rl:chat',
  })
}

// Subscribers get 120 chat messages per IP per hour.
export function getSubscriberChatLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(120, '1 h'),
    prefix: 'rl:chat:sub',
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

// Clinics lookup — 20 per hour (no AI cost, but does hit Places API)
export function getNavigatorClinicsLimiter() {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(20, '1 h'),
    prefix: 'rl:navigator:clinics',
  })
}

// Helper: extract best available IP from Next.js request headers
export function getIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'anonymous'
  )
}

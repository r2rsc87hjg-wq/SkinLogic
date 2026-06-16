import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/claude'
import { validateSubscriptionToken } from '@/lib/subscription-token'
import { getServiceClient } from '@/lib/supabase'
import { getIp } from '@/lib/rate-limit'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Sonnet is required for reliable vision analysis quality.
const SCAN_MODEL = 'claude-sonnet-4-6'
const SCAN_MAX_TOKENS = 600

// 10 scans per subscriber per hour — generous but bounded.
function getScanLimiter() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
  return new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 h'), prefix: 'rl:scan' })
}

const SYSTEM_PROMPT = `You are a skin health educator reviewing a photo for an educational skin-tracking app. You are NOT a doctor and this is NOT a medical diagnosis or clinical assessment.

Describe only what is visibly present in the image in a warm, supportive, plain-English way. Never name specific medical conditions. Always recommend seeing a dermatologist for any concerning changes.

Respond with ONLY valid JSON in exactly this shape — no prose before or after:
{
  "overview": "2–3 sentence warm description of what the skin looks like right now",
  "concerns": ["brief label", "brief label"],
  "positives": ["brief label"],
  "watchNext": "one thing worth paying attention to on the next scan",
  "disclaimer": "short reminder that this is educational, not a diagnosis"
}

concerns: max 4 items, can be empty []. positives: 1–2 items. All values are short plain-English phrases.`

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const buf = await crypto.subtle.digest('SHA-256', encoder.encode(token))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function extractJson(text: string): unknown | null {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try { return JSON.parse(text.slice(start, end + 1)) } catch { return null }
}

export async function POST(request: NextRequest) {
  // 1. Auth — subscription token required
  const auth = request.headers.get('authorization')
  const rawToken = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!rawToken) {
    return NextResponse.json({ error: 'unauthorized', message: 'Subscription required to use Skin Tracker.' }, { status: 401 })
  }

  const subRow = await validateSubscriptionToken(rawToken).catch(() => null)
  if (!subRow) {
    return NextResponse.json({ error: 'unauthorized', message: 'Your subscription is inactive or the token is invalid.' }, { status: 401 })
  }

  // 2. Rate limit
  const ip = getIp(request.headers)
  const { success } = await getScanLimiter().limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'rate_limited', message: 'Too many scans. Please wait a moment.' }, { status: 429 })
  }

  // 3. Parse photo
  let body: { photo?: string }
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { photo } = body
  if (!photo || typeof photo !== 'string') {
    return NextResponse.json({ error: 'missing_photo' }, { status: 400 })
  }

  // Accept data URLs (data:image/jpeg;base64,...) or raw base64
  const base64Match = photo.match(/^data:(image\/[a-z]+);base64,(.+)$/)
  const mediaType = (base64Match?.[1] ?? 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/webp'
  const imageData = base64Match ? base64Match[2] : photo

  // 4. Claude vision analysis
  let analysisText: string
  try {
    const response = await anthropic.messages.create({
      model: SCAN_MODEL,
      max_tokens: SCAN_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageData } },
          { type: 'text', text: 'Please analyse the skin visible in this photo for my educational tracking log.' },
        ],
      }],
    })
    analysisText = response.content
      .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
      .map((b) => b.text)
      .join('')
  } catch (err) {
    console.error('[skin-scan] Claude error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'analysis_failed', message: 'Could not analyse the photo. Please try again.' }, { status: 502 })
  }

  const parsed = extractJson(analysisText) as {
    overview?: string; concerns?: unknown; positives?: unknown; watchNext?: string; disclaimer?: string
  } | null

  if (!parsed?.overview) {
    return NextResponse.json({ error: 'parse_error', message: 'Analysis returned an unexpected format. Please try again.' }, { status: 502 })
  }

  const concerns = Array.isArray(parsed.concerns)
    ? parsed.concerns.filter((c): c is string => typeof c === 'string').slice(0, 4)
    : []
  const positives = Array.isArray(parsed.positives)
    ? parsed.positives.filter((p): p is string => typeof p === 'string').slice(0, 2)
    : []

  const result = {
    overview: String(parsed.overview),
    concerns,
    positives,
    watchNext: typeof parsed.watchNext === 'string' ? parsed.watchNext : '',
    disclaimer: typeof parsed.disclaimer === 'string' ? parsed.disclaimer : 'Educational only — not a medical diagnosis.',
  }

  // 5. Save to Supabase (text only — photo is never stored)
  const tokenHash = await hashToken(rawToken)
  const client = getServiceClient()
  const { error: insertError } = await client.from('skin_scans').insert({
    token_hash: tokenHash,
    overview: result.overview,
    concerns: result.concerns,
    positives: result.positives,
    watch_next: result.watchNext,
  })
  if (insertError) {
    console.error('[skin-scan] DB insert error:', insertError.message)
    // Still return the result even if saving fails
  }

  // 6. Fetch history (last 12 scans)
  const { data: history } = await client
    .from('skin_scans')
    .select('id, overview, concerns, positives, watch_next, created_at')
    .eq('token_hash', tokenHash)
    .order('created_at', { ascending: false })
    .limit(12)

  return NextResponse.json({ result, history: history ?? [] })
}

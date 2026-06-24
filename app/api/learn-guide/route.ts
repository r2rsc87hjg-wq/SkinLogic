import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getLearnGuideLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import { validateLearnGuideInput } from '@/lib/validators'
import { ARTICLES } from '@/content/learn/articles'

export const maxDuration = 30

// Guided Learning ("Learn with Pip") — Claude answers a skincare question with
// a short, friendly lesson, finds a reputable article on the web, and proposes
// follow-up questions. Internal hub articles are suggested by slug.

// Haiku is used here to keep costs low — the task is simple Q&A, not analysis.
const PIP_MODEL = 'claude-haiku-4-5-20251001'
const LEARN_MAX_TOKENS = 700

// Slug+title only (no summaries) to keep the system-prompt input tokens low.
const INTERNAL_CATALOG = ARTICLES.map(
  (a) => `- ${a.slug}: ${a.title}`
).join('\n')

const SYSTEM_PROMPT = `You are Pip, a warm, upbeat skin-health learning guide (a friendly green parrot mascot) for the SkinLogic Learning Hub. You make learning about skincare and skin health genuinely fun and clear.

Your job each turn:
1. Answer the user's question with a SHORT, friendly mini-lesson — plain English, encouraging, lightly playful, never preachy. 2 short paragraphs max. You are educational, NOT a doctor: never diagnose, and recommend seeing a board-certified dermatologist for anything that needs medical attention.
2. Suggest 3 fun, guided follow-up questions that nudge the user to keep exploring (short, written in the user's voice, e.g. "Why does stress cause breakouts?").
3. From this internal catalogue, pick up to 2 slugs most relevant to the topic (or none if nothing fits):
${INTERNAL_CATALOG}

Respond with ONLY a single JSON object, no prose before or after, in exactly this shape:
{
  "lesson": "string — the friendly mini-lesson",
  "followups": ["string", "string", "string"],
  "internal": ["slug", "slug"]
}
Keep it valid JSON. Do not wrap it in markdown fences.`

// Pulls the JSON object out of Claude's text (defensive against stray prose or
// citation markers around it).
function extractJson(text: string): unknown | null {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    return JSON.parse(text.slice(start, end + 1))
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  // 1. Rate limit by IP.
  const ip = getIp(request.headers)
  const { success, reset } = await safeLimit(getLearnGuideLimiter(), ip)
  if (!success) {
    const minutes = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Pip needs a quick breather — try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
      },
      { status: 429 }
    )
  }

  // 2. Validate
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }
  const validation = validateLearnGuideInput(body)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: validation.message },
      { status: 400 }
    )
  }

  // 3. Build the message list (prior Q/A as plain context + the new question)
  const messages: { role: 'user' | 'assistant'; content: unknown }[] =
    validation.history.map((t) => ({ role: t.role, content: t.content }))
  messages.push({ role: 'user', content: validation.question })

  try {
    const response = await anthropic.messages.create({
      model: PIP_MODEL,
      max_tokens: LEARN_MAX_TOKENS,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }] as never,
      messages: messages as never,
    })

    const text = response.content
      .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
      .map((b) => b.text)
      .join('')

    const parsed = extractJson(text) as
      | {
          lesson?: string
          followups?: unknown
          internal?: unknown
        }
      | null

    if (!parsed || typeof parsed.lesson !== 'string') {
      return NextResponse.json(
        {
          error: 'parse_error',
          message: 'Pip got a bit tangled up. Please try asking again.',
        },
        { status: 502 }
      )
    }

    const followups = Array.isArray(parsed.followups)
      ? parsed.followups.filter((f) => typeof f === 'string').slice(0, 3)
      : []

    const internalSlugs = Array.isArray(parsed.internal)
      ? (parsed.internal.filter((s) => typeof s === 'string') as string[])
      : []
    const internal = internalSlugs
      .map((slug) => ARTICLES.find((a) => a.slug === slug))
      .filter((a): a is (typeof ARTICLES)[number] => Boolean(a))
      .slice(0, 2)
      .map((a) => ({ slug: a.slug, title: a.title, summary: a.summary }))

    return NextResponse.json({
      lesson: parsed.lesson.trim(),
      followups,
      articles: [],
      internal,
    })
  } catch (err) {
    console.error(
      '[learn-guide] Claude API error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      {
        error: 'api_error',
        message: 'Pip could not answer just now. Please try again.',
      },
      { status: 500 }
    )
  }
}

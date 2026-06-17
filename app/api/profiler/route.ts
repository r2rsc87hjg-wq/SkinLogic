import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getProfilerLimiter, getIp } from '@/lib/rate-limit'
import { validateProfilerInput } from '@/lib/validators'

export const maxDuration = 60

// Slightly higher ceiling than the global default — profiler output
// is substantive educational content, not a one-liner.
const PROFILER_MAX_TOKENS = 1500

const SYSTEM_PROMPT = `You are a skincare research educator. Your job is to help people understand what peer-reviewed research says about skin health as it relates to their biological profile.

Rules you must follow without exception:
- You are not a doctor. Never diagnose, treat, or prescribe anything.
- Every factual claim must be grounded in research. If evidence is limited or conflicting, say so clearly — that honesty is a feature, not a weakness.
- Always distinguish between human clinical trial evidence, animal study evidence, and in-vitro evidence. Explain briefly why the distinction matters when it's relevant.
- Calibrate depth and language precisely to the user's stated knowledge level. A beginner needs plain English analogies. An advanced user can handle mechanism-level detail.
- Never recommend specific products or brands. Focus on ingredient categories and biological mechanisms only.
- Explain the WHY behind everything. Do not just state facts — explain what they mean for this person's skin.
- If the research on something is weak, preliminary, or industry-funded, say so.

Format your response using exactly these section headers (markdown H2):

## Your skin profile
What this combination of factors means biologically. 2–3 paragraphs. Cover the relevant physiology — what is actually happening in their skin given these factors.

## What the research says for your profile
The most relevant research findings for this specific combination of factors. 3–4 key points. For each, note the type of evidence supporting it (e.g. "human clinical trial data", "primarily in-vitro", "limited human data").

## Ingredient categories worth understanding
3–5 ingredient categories with evidence-backed relevance for this profile. For each: what it does mechanistically, what the evidence quality looks like, and what the research actually supports vs. what is overstated.

## Interactions and conflicts to be aware of
2–3 practical notes on ingredient interactions relevant to this profile. What works synergistically. What to avoid combining and why.

## Where to go deeper
A brief, specific list pointing to which ingredient categories from the response are worth reading further on. Do not link URLs — just name the actives clearly so they can search the ingredient library.`

export async function POST(request: NextRequest) {
  // 1. Rate limit check — before touching anything else
  const ip = getIp(request.headers)
  const limiter = getProfilerLimiter()
  const { success, limit, remaining, reset } = await limiter.limit(ip)

  if (!success) {
    const resetDate = new Date(reset)
    const minutesUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `You've reached the limit for this tool. Please try again in ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    )
  }

  // 2. Parse and validate input
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }

  const validation = validateProfilerInput(body)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: validation.message },
      { status: 400 }
    )
  }

  const {
    skinType,
    primaryConcern,
    ageRange,
    gender,
    ethnicity,
    knowledgeLevel,
    climate,
  } = body as Record<string, string>

  // 3. Build user message — structured plaintext, not a prompt injection surface
  const userMessage = [
    'Skin profile for educational analysis:',
    `- Skin type: ${skinType}`,
    `- Primary concern: ${primaryConcern}`,
    `- Age range: ${ageRange}`,
    `- Gender: ${gender?.trim() || 'not specified'}`,
    `- Ethnicity/background: ${ethnicity?.trim() || 'not specified'}`,
    `- Knowledge level: ${knowledgeLevel}`,
    `- Climate/environment: ${climate}`,
    '',
    'Please provide educational information about what the research says for this profile.',
  ].join('\n')

  // 4. Stream Claude response directly to the client.
  // Input is passed to Claude and never written to any database,
  // log file, or storage — it exists only in server memory for
  // the duration of this request.
  try {
    const stream = anthropic.messages.stream({
      model: CLAUDE_DEFAULTS.model,
      max_tokens: PROFILER_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-RateLimit-Remaining': String(remaining - 1),
      },
    })
  } catch (err) {
    console.error('[profiler] Claude API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      {
        error: 'api_error',
        message: 'The analysis could not be completed. Please try again.',
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getNavigatorSpecialistLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import { validateNavigatorTextInput } from '@/lib/validators'
import { scrubPII } from '@/lib/pii-scrubber'

export const maxDuration = 60

const MAX_INPUT = 3000
const MAX_TOKENS = 600

const SYSTEM_PROMPT = `You are a healthcare navigation assistant. Your only role is to identify what type of medical specialist a patient should consider consulting based on their described symptoms or condition.

Rules you must follow without exception:
- Return the specialist type only (e.g., "dermatologist", "cardiologist", "orthopedist") — never specific doctor names, ratings, rankings, or recommendations.
- You may briefly explain what that specialist type does in general and what to look for when choosing one.
- Never diagnose the user's condition or suggest a specific diagnosis.
- Never say how serious or urgent symptoms are — that is a clinical determination only a licensed provider can make.
- Never recommend specific treatments, medications, or procedures.
- Never prescribe or suggest dosages.
- If the symptoms clearly suggest a medical emergency, respond only with: "If this is a medical emergency, call 911 or go to your nearest emergency room immediately. Do not delay seeking emergency care."
- If asked to diagnose or give treatment advice, decline clearly and suggest the user speak with a licensed healthcare provider.
- Keep responses concise, plain English, and compassionate.`

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)
  const limiter = getNavigatorSpecialistLimiter()
  const { success, limit, remaining, reset } = await safeLimit(limiter, ip)

  if (!success) {
    const minutesUntilReset = Math.ceil((new Date(reset).getTime() - Date.now()) / 60000)
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

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }

  const validation = validateNavigatorTextInput(body, MAX_INPUT)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: validation.message },
      { status: 400 }
    )
  }

  const { text: scrubbedText } = scrubPII((body as Record<string, string>).text)

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: MAX_TOKENS,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }] as never,
      messages: [
        {
          role: 'user',
          content: `Please help me understand what type of specialist I should see. Here is my situation:\n\n${scrubbedText}`,
        },
      ],
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
    console.error('[navigator:specialist] Claude API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      { error: 'api_error', message: 'Could not complete the request. Please try again.' },
      { status: 500 }
    )
  }
}

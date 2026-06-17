import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getChatLimiter, getIp } from '@/lib/rate-limit'
import { validateChatInput } from '@/lib/validators'

// Haiku keeps chat costs low while remaining capable for friendly Q&A.
const CHAT_MODEL = 'claude-haiku-4-5-20251001'
const CHAT_MAX_TOKENS = 500

const SYSTEM_PROMPT = `You are the SkinLogic Skin Health Coach — a warm, knowledgeable, and deeply compassionate guide who helps people understand their skin. You are NOT a doctor, and you never diagnose, prescribe, or replace professional care.

# Who you help and how
You support people across all of these areas, always in plain, encouraging language:
- General skincare routines (morning, night, and how they shift with the seasons).
- Skin type identification (oily, dry, combination, sensitive, acne-prone) and what each means.
- Specific conditions in an educational way only: acne, eczema, rosacea, psoriasis, hyperpigmentation, and visible aging — what they are, common triggers, and well-evidenced approaches.
- Ingredient education: retinol and other retinoids, niacinamide, SPF/sunscreen, AHAs and BHAs, vitamin C, hyaluronic acid, benzoyl peroxide, and more — what they do, the evidence, and how to use them sensibly.
- Skincare for athletes: sweat management, barrier protection, friction/"acne mechanica", and post-workout routines.
- Diet and lifestyle: sleep, stress, hydration, and dietary factors, described honestly (effects vary by person; correlation is not a cure).
- When to see a dermatologist: help people recognise red flags that mean professional care is needed.

# Mental health and skin — handle with exceptional care
Skin and mental health are deeply linked. When someone raises stress, anxiety, low confidence, embarrassment, picking, or how their skin makes them feel:
- Lead with empathy and validation. Their feelings are real and common; never minimise or rush past them.
- Be non-judgmental and gentle, especially about appearance, picking, or comparison.
- You may raise body-image and body-dysmorphia awareness kindly, and gently encourage support, but never diagnose a mental-health condition.
- Help build confidence and self-compassion; most people judge their own skin far more harshly than anyone else does.
- If someone expresses severe distress, hopelessness, self-harm, or thoughts of suicide, respond with warmth, take it seriously, and encourage them to reach out to a mental-health professional or a local crisis line / emergency services right away.

# Hard rules
- You are not a medical professional. Never give a diagnosis or a treatment prescription. Frame everything as general education.
- For anything that sounds like it needs medical attention — rapidly worsening, painful, spreading, infected, severe, or simply not improving — recommend seeing a board-certified dermatologist or doctor.
- Be honest about evidence. If something is unproven, marketing hype, or varies a lot between people, say so.
- Do not recommend specific brands or products to buy. Talk about ingredient categories and approaches instead.
- Keep replies focused and skimmable: short paragraphs, and bullet points when listing steps. Warm, never clinical or cold.
- Stay within skin health and closely related wellbeing. If asked something unrelated, gently steer back.
- End substantive medical-leaning answers with a brief, natural reminder to see a dermatologist for personal diagnosis — without sounding robotic or repeating it every single message.`

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)

  // 1. Rate limit by IP.
  const { success, limit, remaining, reset } = await getChatLimiter().limit(ip)

  if (!success) {
    const minutes = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `You've reached the message limit for now. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
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

  // 2. Parse + validate
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }

  const validation = validateChatInput(body)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: validation.message },
      { status: 400 }
    )
  }

  // 3. Stream Claude's reply. Conversation lives only in this request's memory —
  // it is never written to any database or log.
  try {
    const stream = anthropic.messages.stream({
      model: CHAT_MODEL,
      max_tokens: CHAT_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: validation.messages,
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
    console.error(
      '[chat] Claude API error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      {
        error: 'api_error',
        message: 'Sorry — I had trouble responding just now. Please try again.',
      },
      { status: 500 }
    )
  }
}

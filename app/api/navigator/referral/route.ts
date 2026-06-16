import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getNavigatorReferralLimiter, getIp } from '@/lib/rate-limit'
import { validateNavigatorTextInput } from '@/lib/validators'
import { scrubPII } from '@/lib/pii-scrubber'

const MAX_INPUT = 5000
const MAX_TOKENS = 800

const SYSTEM_PROMPT = `You are a skin health terminology translator. Your only role is to explain what dermatology and skin health terms, abbreviations, specialist names, and procedural codes in a referral document mean in plain English.

You specialise in: skin conditions (acne, eczema, psoriasis, rosacea, melanoma, basal cell carcinoma, seborrheic dermatitis, vitiligo, and related conditions), dermatological procedures (biopsy, Mohs surgery, cryotherapy, phototherapy, laser treatments, patch testing, dermoscopy), dermatology subspecialties (general dermatologist, dermatopathologist, Mohs surgeon, cosmetic dermatologist, paediatric dermatologist), and skin-related medications (topical retinoids, corticosteroids, biologics for psoriasis, antibiotics for acne, antifungals, immunomodulators).

Rules you must follow without exception:
- Translate and explain skin/dermatology jargon only. Do not interpret, evaluate, or comment on whether a referral is appropriate, urgent, or necessary — that is a clinical judgment only a licensed doctor can make.
- Never say whether the patient should or should not act on a referral.
- Never diagnose the patient's skin condition.
- Never recommend specific treatments, procedures, or tests.
- If a medication name appears, explain only what drug class it belongs to and its general use in dermatology — never provide dosage advice, interaction warnings, or recommendations.
- If procedural or diagnostic codes appear (ICD, CPT, SNOMED), explain what the skin procedure or diagnosis category refers to in plain English.
- If the referral contains non-skin content, explain that this tool is focused on skin health referrals and translate only the skin-related terms.
- If the text describes something that sounds like a medical emergency, respond only with: "If this is a medical emergency, call 911 or go to your nearest emergency room immediately."
- Format your response as a clear plain-English glossary of the skin health terms found — do not reproduce the full referral text verbatim.
- Keep the explanation compassionate, accessible, and jargon-free.`

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)
  const limiter = getNavigatorReferralLimiter()
  const { success, limit, remaining, reset } = await limiter.limit(ip)

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
      model: CLAUDE_DEFAULTS.model,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please explain the medical terms and abbreviations in this referral document in plain English:\n\n${scrubbedText}`,
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
    console.error('[navigator:referral] Claude API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      { error: 'api_error', message: 'Could not complete the request. Please try again.' },
      { status: 500 }
    )
  }
}

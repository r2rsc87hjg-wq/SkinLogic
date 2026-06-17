import { NextRequest, NextResponse } from 'next/server'
import type Anthropic from '@anthropic-ai/sdk'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { getSocialLimiter, getIp , safeLimit } from '@/lib/rate-limit'
import { validateSocialInput } from '@/lib/validators'

import type { SocialContentOutput } from '@/types/social'

export const maxDuration = 60

// Higher ceiling than the profiler — three complete creative formats in one call.
const SOCIAL_MAX_TOKENS = 4000

const SYSTEM_PROMPT = `You are a social media content writer for a skincare science education platform. Your job is to translate evidence-based skincare content into social formats that preserve scientific accuracy, cite sources visibly, and challenge marketing myths — without becoming marketing material yourself.

Voice:
- Honest and slightly punchy. Not clinical, not influencer.
- Never clickbait. The hook must be genuinely interesting, not misleading.
- Plain English always. Explain jargon; never rely on it.
- Short sentences. Active voice. No hedging unless scientifically warranted.

Rules you must follow:
- Every format must include a visible citation. This is non-negotiable brand identity.
- Never recommend specific products or brands.
- If a claim rests only on in-vitro or animal research, say so.
- If evidence is preliminary or conflicting, say so — that honesty is the platform's core value.
- Do not exaggerate the evidence. Accuracy is what makes this platform credible.
- The hook must challenge a common myth or counterintuitive fact from the content — not a manufactured one.`

// Tool definition — forces Claude to return valid structured JSON.
// Schema mirrors types/social.ts exactly.
const SOCIAL_CONTENT_TOOL: Anthropic.Tool = {
  name: 'generate_social_content',
  description:
    'Generate structured social media content in three formats: Instagram carousel, short video script, and infographic layout.',
  input_schema: {
    type: 'object',
    required: ['carousel', 'video', 'infographic'],
    properties: {
      carousel: {
        type: 'object',
        required: ['slides'],
        properties: {
          slides: {
            type: 'array',
            minItems: 5,
            maxItems: 10,
            description:
              'Slide-by-slide carousel script. Final slide must show citations visibly.',
            items: {
              type: 'object',
              required: ['slideNumber', 'headline', 'body'],
              properties: {
                slideNumber: { type: 'integer' },
                headline: {
                  type: 'string',
                  description: 'Punchy slide headline, max ~8 words',
                },
                body: {
                  type: 'string',
                  description: '1–2 sentences of supporting content',
                },
                citationNote: {
                  type: 'string',
                  description:
                    'Required on the final slide. Optional on others where a specific claim is cited.',
                },
              },
            },
          },
        },
      },
      video: {
        type: 'object',
        required: ['totalDuration', 'sections'],
        properties: {
          totalDuration: {
            type: 'string',
            description: 'Total estimated duration, e.g. "~75 seconds"',
          },
          sections: {
            type: 'array',
            description:
              'Script sections in order: Hook → Explanation → Honest Bottom Line → CTA to site',
            items: {
              type: 'object',
              required: ['label', 'script', 'durationNote'],
              properties: {
                label: {
                  type: 'string',
                  description:
                    'Section name, e.g. Hook, Explanation, Bottom Line, CTA',
                },
                script: {
                  type: 'string',
                  description: 'Word-for-word script text for this section',
                },
                durationNote: {
                  type: 'string',
                  description: 'Approximate duration, e.g. "~15 seconds"',
                },
              },
            },
          },
        },
      },
      infographic: {
        type: 'object',
        required: ['headline', 'mainFact', 'supportingPoints', 'source'],
        properties: {
          headline: {
            type: 'string',
            description: 'Short, counterintuitive or surprising headline',
          },
          mainFact: {
            type: 'string',
            description: 'The single key fact to lead with — must be sourced',
          },
          supportingPoints: {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            items: { type: 'string' },
            description: '3–5 supporting points, no hyperbole',
          },
          source: {
            type: 'string',
            description:
              'Citation — must come from peer-reviewed research or an authoritative body (AAD, PubMed, etc.)',
          },
          visualSuggestion: {
            type: 'string',
            description: 'Brief note for a designer on the visual approach',
          },
        },
      },
    },
  },
}

export async function POST(request: NextRequest) {
  // 1. Rate limit
  const ip = getIp(request.headers)
  const limiter = getSocialLimiter()
  const { success, limit, remaining, reset } = await safeLimit(limiter, ip)

  if (!success) {
    const minutesUntilReset = Math.ceil((reset - Date.now()) / 60000)
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

  // 2. Parse and validate
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Request body must be valid JSON.' },
      { status: 400 }
    )
  }

  const validation = validateSocialInput(body)
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: validation.message },
      { status: 400 }
    )
  }

  const { content, contentLabel } = body as { content: string; contentLabel?: string }

  const userMessage = [
    contentLabel ? `Content type: ${contentLabel}` : null,
    '',
    'Source content to translate into social formats:',
    '---',
    content.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n')

  // 3. Claude call with forced tool use — guarantees valid structured JSON output
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_DEFAULTS.model,
      max_tokens: SOCIAL_MAX_TOKENS,
      system: SYSTEM_PROMPT,
      tools: [SOCIAL_CONTENT_TOOL],
      tool_choice: { type: 'tool', name: 'generate_social_content' },
      messages: [{ role: 'user', content: userMessage }],
    })

    const toolUse = response.content.find((block) => block.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') {
      throw new Error('No tool use block in response')
    }

    const result = toolUse.input as SocialContentOutput

    return NextResponse.json(result, {
      headers: { 'X-RateLimit-Remaining': String(remaining - 1) },
    })
  } catch (err) {
    console.error(
      '[social] Claude API error:',
      err instanceof Error ? err.message : 'unknown'
    )
    return NextResponse.json(
      {
        error: 'api_error',
        message: 'Content could not be generated. Please try again.',
      },
      { status: 500 }
    )
  }
}

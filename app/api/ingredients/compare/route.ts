import { NextRequest, NextResponse } from 'next/server'
import type Anthropic from '@anthropic-ai/sdk'
import { anthropic } from '@/lib/claude'
import { getComparisonLimiter, getIp, safeLimit } from '@/lib/rate-limit'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are a skincare science educator. Return a structured JSON comparison of two skincare ingredients based entirely on peer-reviewed research.

Hard rules:
- Never name specific brands or products. Ingredient categories and mechanisms only.
- Every factual claim must be grounded in published research.
- If evidence is weak, in-vitro only, or conflicting, say so in the relevant field.
- This is educational information, not medical advice.

OUTPUT FORMAT:
Return ONLY valid JSON. No markdown fences, no preamble, no trailing text. Your response must begin with { and end with }.

Schema:
{
  "ingredient_a": {
    "mechanism": "plain English explanation of how this ingredient works in the skin (2–3 sentences)",
    "evidence_quality": "one line summary, e.g. 'Strong — multiple independent human RCTs' or 'Moderate — mostly in-vitro with some small human trials'",
    "best_for": ["concern1", "concern2", "concern3"],
    "effective_percentage": "evidence-based concentration range, e.g. '2–10%'",
    "works_well_with": ["ingredient or category 1", "ingredient or category 2"],
    "avoid_combining_with": ["ingredient or scenario to avoid"],
    "time_to_results": "realistic timeline, e.g. '8–12 weeks'",
    "bottom_line": "one plain-English sentence summarising when to reach for this ingredient"
  },
  "ingredient_b": {
    "mechanism": "...",
    "evidence_quality": "...",
    "best_for": [],
    "effective_percentage": "...",
    "works_well_with": [],
    "avoid_combining_with": [],
    "time_to_results": "...",
    "bottom_line": "..."
  },
  "can_use_together": true,
  "together_notes": "2–3 sentences on whether and how to use these together — same routine or alternate, layering order, pH considerations, any synergies or conflicts to be aware of",
  "head_to_head": "2–3 sentences comparing the two directly — which has stronger evidence, where each wins, when you'd pick one over the other"
}

If a concern filter is provided, weight your comparisons and 'best_for' fields toward that concern's relevant mechanisms.`

interface CompareRequestBody {
  ingredientA: string
  ingredientB: string
  concern?: string
}

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)
  const { success, reset } = await safeLimit(getComparisonLimiter(), ip)
  if (!success) {
    const minutes = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Too many comparisons. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
      },
      { status: 429 }
    )
  }

  let body: CompareRequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request', message: 'Expected JSON body.' }, { status: 400 })
  }

  const { ingredientA, ingredientB, concern } = body

  if (!ingredientA?.trim() || !ingredientB?.trim()) {
    return NextResponse.json(
      { error: 'validation_failed', message: 'Both ingredients are required.' },
      { status: 400 }
    )
  }

  if (ingredientA.trim().toLowerCase() === ingredientB.trim().toLowerCase()) {
    return NextResponse.json(
      { error: 'validation_failed', message: 'Please choose two different ingredients.' },
      { status: 400 }
    )
  }

  const userMessage = concern
    ? `Compare these two ingredients for someone whose primary skin concern is ${concern}:\n\nIngredient A: ${ingredientA}\nIngredient B: ${ingredientB}`
    : `Compare these two ingredients:\n\nIngredient A: ${ingredientA}\nIngredient B: ${ingredientB}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1800,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }] as never,
      messages: [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: '{' },
      ],
    })

    const continuation = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()
      .replace(/\n?```$/, '')
      .trim()

    const rawText = '{' + continuation

    let result: Record<string, unknown>
    try {
      result = JSON.parse(rawText)
    } catch {
      console.error('[compare] JSON parse failed. Raw:', rawText.slice(0, 200))
      return NextResponse.json(
        { error: 'parse_error', message: 'The comparison could not be completed. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ result, ingredientA, ingredientB, concern: concern ?? null })
  } catch (err) {
    console.error('[compare] Claude error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      { error: 'api_error', message: 'The comparison could not be completed. Please try again.' },
      { status: 502 }
    )
  }
}

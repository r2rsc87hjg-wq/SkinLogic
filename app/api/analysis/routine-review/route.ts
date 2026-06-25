// Routine Review — ZERO RETENTION
//
// The submitted routine text and result are never written to any database, log,
// or storage. They exist only in server memory for the duration of this request.
// Abuse is controlled by IP-based rate limiting (shared with skin analysis: 3/IP/hour).

import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_DEFAULTS } from '@/lib/claude'
import { validateProfilerInput } from '@/lib/validators'
import { getAnalysisLimiter, getIp, safeLimit } from '@/lib/rate-limit'

export const maxDuration = 60

const MAX_ROUTINE_LENGTH = 2000

const KNOWN_SLUGS = new Set([
  'build-your-first-routine', 'identify-your-skin-type', 'double-cleansing-guide',
  'skin-cycling-explained', 'the-moisture-sandwich', 'patch-testing-guide',
  'morning-vs-night-routine', 'choosing-a-cleanser', 'moisturiser-ingredients-explained',
  'niacinamide-complete-guide', 'ceramides-explained', 'vitamin-c-guide',
  'retinoids-mechanism-and-evidence', 'peptides-for-skin', 'azelaic-acid-guide',
  'tranexamic-acid-guide', 'hyaluronic-acid-explained', 'aha-bha-deep-dive',
  'bakuchiol-retinol-alternative', 'glycerin-squalane-guide', 'zinc-for-skin',
  'spf-the-one-non-negotiable', 'chemical-vs-mineral-sunscreen', 'spf-numbers-explained',
  'sunscreen-reapplication-guide', 'uv-index-explained', 'sunscreen-for-dark-skin',
  'vitamin-d-and-sunscreen', 'stress-and-your-skin', 'stress-cortisol-skin',
  'understanding-acne', 'acne-types-explained', 'eczema-trigger-and-repair',
  'hyperpigmentation-types-guide', 'hormonal-acne-guide', 'rosacea-management',
  'perioral-dermatitis', 'skincare-for-black-brown-skin', 'mature-skin-guide',
  'dermatillomania-compassionate-guide', 'skin-confidence-guide', 'teen-skincare-guide',
])

const JSON_SCHEMA_INSTRUCTIONS = `
OUTPUT FORMAT:
Return ONLY valid JSON — no markdown fences, no preamble, no trailing explanation. Your response must begin with { and end with }.

Return this exact schema:
{
  "skin_summary": "2–3 sentence plain English summary of this person's skin profile and how it frames your review",
  "overall_verdict": "2–3 sentence honest overall assessment of the routine as submitted",
  "whats_working": [
    { "step": "the product or step they listed", "why": "one sentence on why this suits their specific profile" }
  ],
  "what_to_change": [
    { "step": "the product or step they listed", "issue": "what is wrong or suboptimal for their profile", "suggestion": "phrased as a first-person educational recommendation beginning with 'I recommend' — no brand names, ingredient categories only" }
  ],
  "whats_missing": [
    { "category": "e.g. SPF, antioxidant serum, exfoliant", "why": "phrased as a first-person educational recommendation beginning with 'I recommend' — explain why their profile specifically benefits from this" }
  ],
  "ingredient_conflicts": [
    { "ingredients": ["ingredient A", "ingredient B"], "issue": "brief explanation of why combining these is a problem" }
  ],
  "spf_flag": true,
  "learn_more_topics": ["slug-one", "slug-two"]
}

RULES:
- If whats_working, what_to_change, whats_missing, or ingredient_conflicts have nothing to report, return an empty array [].
- Never name specific brands or products. Ingredient categories and mechanisms only in suggestions.
- You are not a doctor. Never diagnose, treat, or prescribe.
- Every factual claim must be grounded in research. If evidence is weak or conflicting, say so briefly.
- Be honest but constructive. Don't soften problems that could harm the user's skin.

KNOWLEDGE LEVEL CALIBRATION:
- beginner: Plain English only, no jargon. Keep issues and suggestions simple and actionable.
- intermediate: Ingredient names are OK, moderate depth.
- advanced: Full clinical language, pH context, layering nuance, mechanism detail welcome.

SPF FLAG — set spf_flag: true if:
- Primary concern is hyperpigmentation, aging, or acne, OR
- Climate is "high uv / sunny", OR
- Their routine is missing SPF entirely.
Otherwise set false.

AVAILABLE learn_more_topics SLUGS (return 2–3 most relevant slugs from this list only):
build-your-first-routine, identify-your-skin-type, double-cleansing-guide, skin-cycling-explained, the-moisture-sandwich, patch-testing-guide, morning-vs-night-routine, choosing-a-cleanser, moisturiser-ingredients-explained, niacinamide-complete-guide, ceramides-explained, vitamin-c-guide, retinoids-mechanism-and-evidence, peptides-for-skin, azelaic-acid-guide, tranexamic-acid-guide, hyaluronic-acid-explained, aha-bha-deep-dive, bakuchiol-retinol-alternative, glycerin-squalane-guide, zinc-for-skin, spf-the-one-non-negotiable, chemical-vs-mineral-sunscreen, spf-numbers-explained, sunscreen-reapplication-guide, uv-index-explained, sunscreen-for-dark-skin, vitamin-d-and-sunscreen, stress-and-your-skin, understanding-acne, acne-types-explained, eczema-trigger-and-repair, hyperpigmentation-types-guide, hormonal-acne-guide, rosacea-management, skincare-for-black-brown-skin, mature-skin-guide`

const SYSTEM_PROMPT = `You are a skincare science educator providing educational information about skincare routines. Your role is to share research-backed knowledge about what ingredients and steps are generally considered beneficial or problematic for different skin profiles — not to give personal medical advice.

Hard rules you must follow without exception:
- You are not a doctor. Never diagnose, treat, or prescribe anything.
- Frame all suggestions as educational recommendations using first-person language: "I recommend...", "I'd suggest...", "Based on the research, I recommend...". Never use imperative commands like "switch to" or "add" or "stop using".
- Never name specific brands or products. Ingredient categories and mechanisms only.
- Every factual claim must be grounded in research.
- If the evidence on something is weak, preliminary, or conflicting, say so briefly.
- Be honest about potential concerns but frame them educationally, not prescriptively.
${JSON_SCHEMA_INSTRUCTIONS}`

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)
  const { success, reset } = await safeLimit(getAnalysisLimiter(), ip)
  if (!success) {
    const minutes = Math.ceil((reset - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `You've reached the analysis limit for now. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
      },
      { status: 429 }
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Expected multipart form data.' },
      { status: 400 }
    )
  }

  const profileBody = {
    skinType: form.get('skinType'),
    primaryConcern: form.get('primaryConcern'),
    ageRange: form.get('ageRange'),
    knowledgeLevel: form.get('knowledgeLevel'),
    climate: form.get('climate'),
  }

  const profileCheck = validateProfilerInput(profileBody)
  if (!profileCheck.ok) {
    return NextResponse.json(
      { error: 'validation_failed', message: profileCheck.message },
      { status: 400 }
    )
  }

  const routineRaw = form.get('currentRoutine')
  if (!routineRaw || typeof routineRaw !== 'string' || !routineRaw.trim()) {
    return NextResponse.json(
      { error: 'validation_failed', message: 'Please describe your current routine.' },
      { status: 400 }
    )
  }
  const currentRoutine = routineRaw.trim().slice(0, MAX_ROUTINE_LENGTH)

  const skinType = form.get('skinType') as string
  const primaryConcern = form.get('primaryConcern') as string
  const ageRange = form.get('ageRange') as string
  const gender = (form.get('gender') as string | null)?.trim() || 'not specified'
  const ethnicity = (form.get('ethnicity') as string | null)?.trim() || 'not specified'
  const knowledgeLevel = form.get('knowledgeLevel') as string
  const climate = form.get('climate') as string

  const userMessage = [
    'Skin profile:',
    `- Skin type: ${skinType}`,
    `- Primary concern: ${primaryConcern}`,
    `- Age range: ${ageRange}`,
    `- Gender: ${gender}`,
    `- Ethnicity/background: ${ethnicity}`,
    `- Knowledge level: ${knowledgeLevel}`,
    `- Climate/environment: ${climate}`,
    '',
    'Current routine as described by the user:',
    currentRoutine,
    '',
    'Please review this routine against their skin profile and return your assessment.',
  ].join('\n')

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2500,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }] as never,
      messages: [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: '{' },
      ],
    })

    const continuation = response.content
      .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()
      .replace(/\n?```$/, '')
      .trim()

    const rawText = '{' + continuation

    if (!rawText) {
      return NextResponse.json(
        { error: 'empty_response', message: 'The review came back empty. Please try again.' },
        { status: 502 }
      )
    }

    let result: Record<string, unknown>
    try {
      result = JSON.parse(rawText)
    } catch {
      console.error('[routine-review] JSON parse failed. Raw:', rawText.slice(0, 300))
      return NextResponse.json(
        { error: 'parse_error', message: 'The review response could not be parsed. Please try again.' },
        { status: 502 }
      )
    }

    if (Array.isArray(result.learn_more_topics)) {
      result.learn_more_topics = (result.learn_more_topics as string[])
        .filter((s) => KNOWN_SLUGS.has(s))
        .slice(0, 3)
    }

    return NextResponse.json({ result })
  } catch (err) {
    console.error('[routine-review] Claude error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      { error: 'api_error', message: 'The review could not be completed. Please try again.' },
      { status: 502 }
    )
  }
}

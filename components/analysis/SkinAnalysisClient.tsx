'use client'

import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

interface RoutineStep {
  step: number
  category: string
  what_to_look_for: string
  why: string
  tip: string
  knowledge_note?: string
}

interface Ingredient {
  name: string
  why: string
}

interface AnalysisResult {
  skin_summary: string
  morning_routine: RoutineStep[]
  evening_routine: RoutineStep[]
  ingredients_to_seek: Ingredient[]
  ingredients_to_avoid: Ingredient[]
  spf_flag: boolean
  learn_more_topics: string[]
}

interface ReviewWorking {
  step: string
  why: string
}

interface ReviewChange {
  step: string
  issue: string
  suggestion: string
}

interface ReviewMissing {
  category: string
  why: string
}

interface ReviewConflict {
  ingredients: string[]
  issue: string
}

interface RoutineReviewResult {
  skin_summary: string
  overall_verdict: string
  whats_working: ReviewWorking[]
  what_to_change: ReviewChange[]
  whats_missing: ReviewMissing[]
  ingredient_conflicts: ReviewConflict[]
  spf_flag: boolean
  learn_more_topics: string[]
}

type Mode = 'build' | 'review'

// ── Constants ──────────────────────────────────────────────────────────────

const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'] as const
const CONCERNS = ['Acne', 'Aging', 'Hyperpigmentation', 'Redness', 'Texture', 'Dehydration'] as const
const AGE_RANGES = ['Teens (13–19)', '20s', '30s', '40s', '50s+'] as const
const KNOWLEDGE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const
const CLIMATES = ['Humid', 'Dry/arid', 'Cold', 'High UV / sunny', 'Polluted urban', 'Temperate / mixed'] as const
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024

interface ProfileState {
  skinType: string
  primaryConcern: string
  ageRange: string
  gender: string
  ethnicity: string
  knowledgeLevel: string
  climate: string
}

const EMPTY_PROFILE: ProfileState = {
  skinType: '',
  primaryConcern: '',
  ageRange: '',
  gender: '',
  ethnicity: '',
  knowledgeLevel: '',
  climate: '',
}

type Phase = 'form' | 'analyzing' | 'done'
type ResultState = { kind: 'build'; data: AnalysisResult } | { kind: 'review'; data: RoutineReviewResult }

// ── Main component ──────────────────────────────────────────────────────────

export function SkinAnalysisClient() {
  const [mode, setMode] = useState<Mode>('build')
  const [profile, setProfile] = useState<ProfileState>(EMPTY_PROFILE)
  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState('')
  const [currentRoutine, setCurrentRoutine] = useState('')
  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ResultState | null>(null)

  function setField(field: keyof ProfileState, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const isProfileValid =
    !!profile.skinType &&
    !!profile.primaryConcern &&
    !!profile.ageRange &&
    !!profile.knowledgeLevel &&
    !!profile.climate

  const isFormValid = isProfileValid && (mode === 'build' || !!currentRoutine.trim())

  function pickFile(f: File | null) {
    setError('')
    if (!f) { setFile(null); return }
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError('Please choose a JPG, PNG, or WEBP image.')
      setFile(null)
      return
    }
    if (f.size > MAX_BYTES) {
      setError('That image is over 5 MB. Please choose a smaller one.')
      setFile(null)
      return
    }
    setFile(f)
  }

  function switchMode(m: Mode) {
    setMode(m)
    setError('')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) return

    setPhase('analyzing')
    setError('')

    const body = new FormData()
    body.append('skinType', profile.skinType.toLowerCase())
    body.append('primaryConcern', profile.primaryConcern.toLowerCase())
    body.append('ageRange', profile.ageRange)
    body.append('gender', profile.gender || '')
    body.append('ethnicity', profile.ethnicity || '')
    body.append('knowledgeLevel', profile.knowledgeLevel.toLowerCase())
    body.append('climate', profile.climate.toLowerCase())

    if (mode === 'build') {
      if (note.trim()) body.append('note', note.trim())
      if (file) body.append('image', file)
    } else {
      body.append('currentRoutine', currentRoutine.trim())
    }

    const endpoint = mode === 'build' ? '/api/analysis/submit' : '/api/analysis/routine-review'

    try {
      const res = await fetch(endpoint, { method: 'POST', body })
      const data = await res.json()

      if (res.ok && data.result) {
        setResult({ kind: mode, data: data.result })
        setPhase('done')
        return
      }

      setError(data.message ?? 'The analysis could not be completed. Please try again.')
      setPhase('form')
    } catch {
      setError('Something went wrong. Please try again.')
      setPhase('form')
    }
  }

  function reset() {
    setProfile(EMPTY_PROFILE)
    setFile(null)
    setNote('')
    setCurrentRoutine('')
    setPhase('form')
    setError('')
    setResult(null)
  }

  if (phase === 'done' && result) {
    if (result.kind === 'review') {
      return <RoutineReviewResultsView result={result.data} profile={profile} onReset={reset} />
    }
    return <ResultsView result={result.data} profile={profile} onReset={reset} />
  }

  const busy = phase === 'analyzing'

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      {/* Mode toggle */}
      <div className="flex rounded-xl border border-gray-200 p-1 gap-1">
        <button
          type="button"
          onClick={() => switchMode('build')}
          disabled={busy}
          className={`flex-1 text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
            mode === 'build'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Build a routine
        </button>
        <button
          type="button"
          onClick={() => switchMode('review')}
          disabled={busy}
          className={`flex-1 text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
            mode === 'review'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Review my routine
        </button>
      </div>
      <RadioGroup
        label="Skin type"
        name="skinType"
        options={SKIN_TYPES}
        value={profile.skinType}
        onChange={(v) => setField('skinType', v)}
        required
        disabled={busy}
      />

      <RadioGroup
        label="Primary concern"
        name="primaryConcern"
        options={CONCERNS}
        value={profile.primaryConcern}
        onChange={(v) => setField('primaryConcern', v)}
        required
        disabled={busy}
      />

      <RadioGroup
        label="Age range"
        name="ageRange"
        options={AGE_RANGES}
        value={profile.ageRange}
        onChange={(v) => setField('ageRange', v)}
        required
        disabled={busy}
      />

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Gender{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={profile.gender}
          onChange={(e) => setField('gender', e.target.value)}
          disabled={busy}
          placeholder="e.g. woman, man, non-binary, prefer not to say"
          maxLength={100}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Ethnicity or skin background{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <p className="text-xs text-gray-500 leading-relaxed mb-2 bg-gray-50 border border-gray-100 rounded p-2.5">
          <strong className="text-gray-700">Why we ask:</strong> Melanin levels,
          post-inflammatory hyperpigmentation (PIH) susceptibility, and skin barrier
          characteristics vary by ethnicity and are scientifically relevant to
          skincare research. Sharing it allows the analysis to reflect those biological
          differences more accurately.
        </p>
        <input
          type="text"
          value={profile.ethnicity}
          onChange={(e) => setField('ethnicity', e.target.value)}
          disabled={busy}
          placeholder="e.g. East Asian, South Asian, Black/African, Latina, White/European"
          maxLength={100}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <RadioGroup
        label="Your skincare knowledge level"
        name="knowledgeLevel"
        options={KNOWLEDGE_LEVELS}
        value={profile.knowledgeLevel}
        onChange={(v) => setField('knowledgeLevel', v)}
        required
        disabled={busy}
        hint="This affects how technical the explanation will be."
      />

      <RadioGroup
        label="Climate / environment"
        name="climate"
        options={CLIMATES}
        value={profile.climate}
        onChange={(v) => setField('climate', v)}
        required
        disabled={busy}
      />

      {/* Current routine input — review mode only */}
      {mode === 'review' && (
        <div className="border-t border-gray-100 pt-6 space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Your current routine <span className="text-gray-400 font-normal">*</span>
          </label>
          <p className="text-xs text-gray-500 leading-relaxed">
            Describe what you currently use, step by step — morning and/or evening. Include product types,
            key ingredients if you know them, and roughly in what order you apply them. You don&apos;t need to name specific brands.
          </p>
          <textarea
            value={currentRoutine}
            disabled={busy}
            onChange={(e) => setCurrentRoutine(e.target.value.slice(0, 2000))}
            rows={6}
            placeholder={`e.g.\nMorning: gentle cleanser, vitamin C serum, moisturiser, SPF 50\nEvening: oil cleanser, foaming cleanser, retinol, heavy moisturiser`}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50 leading-relaxed"
          />
          <p className="text-xs text-gray-400 text-right">{currentRoutine.length}/2000</p>
        </div>
      )}

      {/* Photo section — build mode only */}
      {mode === 'build' && (
        <div className="border-t border-gray-100 pt-6 space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-800 mb-1">
              Photo{' '}
              <span className="text-gray-400 font-normal">(optional · JPG, PNG, or WEBP · max 5 MB)</span>
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Adding a photo lets the AI combine what it sees with your profile above —
              connecting visible characteristics to the research for your specific biology.
              Without a photo, you still get a full research-backed analysis.
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-900 hover:file:border-gray-500 disabled:opacity-50"
            />
            {file && <p className="text-xs text-gray-400 mt-1">Selected: {file.name}</p>}
          </div>

          {file && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Anything specific to focus on in the photo?{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={note}
                disabled={busy}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                rows={2}
                placeholder="e.g. I'm mostly curious about the texture on my cheeks"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || busy}
        className="w-full bg-accent text-paper text-sm font-medium py-3 px-4 rounded-full hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {busy
          ? mode === 'review' ? 'Reviewing…' : 'Analysing…'
          : mode === 'review' ? 'Review my routine' : 'Analyse my skin'
        }
      </button>

      <p className="text-xs text-gray-400 leading-relaxed text-center">
        Your answers and any photo are sent to an AI model and immediately discarded.
        Nothing you enter is stored or logged.
      </p>
    </form>
  )
}

// ── Results view ────────────────────────────────────────────────────────────

interface ResultsViewProps {
  result: AnalysisResult
  profile: ProfileState
  onReset: () => void
}

function buildRoutineText(result: AnalysisResult, profile: ProfileState): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const tags = [profile.skinType, profile.primaryConcern, profile.ageRange, profile.climate]
    .filter(Boolean).join(' · ')
  const formatStep = (s: RoutineStep) =>
    `${s.step}. ${s.category}\n   Look for: ${s.what_to_look_for}\n   ${s.why}\n   Tip: ${s.tip}`

  return [
    `SKINLOGIC ROUTINE · ${date}`,
    `Profile: ${tags}`,
    '',
    result.skin_summary,
    '',
    '─── MORNING ROUTINE ───',
    ...result.morning_routine.map(formatStep),
    '',
    '─── EVENING ROUTINE ───',
    ...result.evening_routine.map(formatStep),
    '',
    `Seek: ${result.ingredients_to_seek.map((i) => i.name).join(', ')}`,
    `Avoid: ${result.ingredients_to_avoid.map((i) => i.name).join(', ')}`,
    '',
    'This routine is educational guidance based on published research, not medical advice.',
    'For persistent concerns, see a board-certified dermatologist.',
  ].join('\n')
}

function slugToTitle(slug: string): string {
  const overrides: Record<string, string> = {
    'aha-bha-deep-dive': 'AHA & BHA Deep Dive',
    'spf-the-one-non-negotiable': 'SPF: The One Non-Negotiable',
    'chemical-vs-mineral-sunscreen': 'Chemical vs. Mineral Sunscreen',
    'uv-index-explained': 'UV Index Explained',
  }
  return overrides[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function ResultsView({ result, profile, onReset }: ResultsViewProps) {
  const isAdvanced = profile.knowledgeLevel === 'Advanced'
  const [copied, setCopied] = useState(false)

  const profileTags = [
    profile.skinType,
    profile.primaryConcern,
    profile.ageRange,
    profile.climate,
    profile.gender || null,
  ].filter(Boolean) as string[]

  async function copyRoutine() {
    try {
      await navigator.clipboard.writeText(buildRoutineText(result, profile))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard access denied — silently fail
    }
  }

  return (
    <div className="space-y-6">
      {/* Privacy note */}
      <p className="text-xs text-center text-muted">
        Nothing is stored — your analysis exists only in this browser session.
      </p>

      {/* 1. Skin summary */}
      <div className="rounded-2xl border border-line bg-sand/40 p-6 space-y-4">
        <p className="eyebrow text-accent">Here&apos;s what&apos;s going on with your skin</p>
        <p className="text-ink leading-relaxed">{result.skin_summary}</p>
        <div className="flex flex-wrap gap-2">
          {profileTags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white border border-line rounded-full px-3 py-1 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. SPF warning */}
      {result.spf_flag && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900 mb-1">
            SPF is non-negotiable for your concern.
          </p>
          <p className="text-sm text-amber-800">
            Skipping it will work against everything else in this routine.
          </p>
        </div>
      )}

      {/* 3. Morning routine */}
      <RoutineCard label="Morning" steps={result.morning_routine} isAdvanced={isAdvanced} />

      {/* 4. Evening routine */}
      <RoutineCard label="Evening" steps={result.evening_routine} isAdvanced={isAdvanced} />

      {/* 5. Ingredients */}
      <div className="grid sm:grid-cols-2 gap-4">
        <IngredientList
          title="Ingredients to seek"
          items={result.ingredients_to_seek}
          variant="seek"
        />
        <IngredientList
          title="Ingredients to avoid"
          items={result.ingredients_to_avoid}
          variant="avoid"
        />
      </div>

      {/* 6. Learn more */}
      {result.learn_more_topics.length > 0 && (
        <LearnMoreSection topics={result.learn_more_topics} />
      )}

      {/* 7. Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line">
        <button
          onClick={copyRoutine}
          className="flex-1 text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-ink transition-colors"
        >
          {copied ? 'Copied to clipboard' : 'Copy my routine'}
        </button>
        <button
          onClick={onReset}
          className="flex-1 text-sm font-medium py-2.5 px-4 rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-colors"
        >
          Start over
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted leading-relaxed text-center pb-2">
        This routine is educational guidance based on published research, not medical advice.
        For persistent concerns, see a board-certified dermatologist.
      </p>
    </div>
  )
}

// ── Routine review results ──────────────────────────────────────────────────

interface RoutineReviewResultsViewProps {
  result: RoutineReviewResult
  profile: ProfileState
  onReset: () => void
}

function RoutineReviewResultsView({ result, profile, onReset }: RoutineReviewResultsViewProps) {
  const profileTags = [
    profile.skinType,
    profile.primaryConcern,
    profile.ageRange,
    profile.climate,
    profile.gender || null,
  ].filter(Boolean) as string[]

  return (
    <div className="space-y-6">
      <p className="text-xs text-center text-muted">
        Nothing is stored — your review exists only in this browser session.
      </p>

      {/* Skin summary + verdict */}
      <div className="rounded-2xl border border-line bg-sand/40 p-6 space-y-4">
        <p className="eyebrow text-accent">Routine review</p>
        <p className="text-ink leading-relaxed">{result.skin_summary}</p>
        <p className="text-sm text-gray-700 leading-relaxed border-t border-line pt-4">{result.overall_verdict}</p>
        <div className="flex flex-wrap gap-2">
          {profileTags.map((tag) => (
            <span key={tag} className="text-xs bg-white border border-line rounded-full px-3 py-1 text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* SPF warning */}
      {result.spf_flag && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900 mb-1">SPF is non-negotiable for your concern.</p>
          <p className="text-sm text-amber-800">Skipping it will work against everything else in this routine.</p>
        </div>
      )}

      {/* What's working */}
      {result.whats_working.length > 0 && (
        <ReviewSection
          title="What's working"
          color="emerald"
          icon="✓"
          items={result.whats_working.map((w) => ({ heading: w.step, body: w.why }))}
        />
      )}

      {/* What to change */}
      {result.what_to_change.length > 0 && (
        <div className="rounded-2xl border border-line overflow-hidden">
          <div className="px-6 py-4 bg-amber-50/60 text-amber-900 flex items-center gap-2">
            <span className="text-sm font-semibold">⚠</span>
            <p className="font-medium text-sm">What to change</p>
          </div>
          <div className="divide-y divide-line">
            {result.what_to_change.map((item, i) => (
              <div key={i} className="px-6 py-5 space-y-1.5">
                <p className="font-medium text-ink text-sm">{item.step}</p>
                <p className="text-sm text-amber-800 leading-relaxed">{item.issue}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's missing */}
      {result.whats_missing.length > 0 && (
        <ReviewSection
          title="What's missing"
          color="blue"
          icon="+"
          items={result.whats_missing.map((m) => ({ heading: m.category, body: m.why }))}
        />
      )}

      {/* Ingredient conflicts */}
      {result.ingredient_conflicts.length > 0 && (
        <div className="rounded-2xl border border-red-100 overflow-hidden">
          <div className="px-6 py-4 bg-red-50/70 text-red-900 flex items-center gap-2">
            <span className="text-sm font-semibold">✕</span>
            <p className="font-medium text-sm">Ingredient conflicts</p>
          </div>
          <div className="divide-y divide-line">
            {result.ingredient_conflicts.map((conflict, i) => (
              <div key={i} className="px-6 py-5 space-y-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {conflict.ingredients.map((ing) => (
                    <span key={ing} className="text-xs bg-red-100 text-red-800 rounded-full px-2.5 py-1 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{conflict.issue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learn more */}
      {result.learn_more_topics.length > 0 && (
        <LearnMoreSection topics={result.learn_more_topics} />
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line">
        <button
          onClick={onReset}
          className="flex-1 text-sm font-medium py-2.5 px-4 rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-colors"
        >
          Start over
        </button>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 text-xs text-blue-800 leading-relaxed space-y-1">
        <p className="font-semibold">This is educational information, not medical advice.</p>
        <p>
          These recommendations are based on published skincare research and are intended to help you
          make informed decisions — not to replace professional guidance. For persistent skin concerns,
          consult a board-certified dermatologist.
        </p>
      </div>
    </div>
  )
}

interface ReviewSectionItem { heading: string; body: string }
interface ReviewSectionProps {
  title: string
  color: 'emerald' | 'blue'
  icon: string
  items: ReviewSectionItem[]
}

function ReviewSection({ title, color, icon, items }: ReviewSectionProps) {
  const headerClass = color === 'emerald'
    ? 'bg-emerald-50/70 text-emerald-900'
    : 'bg-blue-50/60 text-blue-900'

  return (
    <div className="rounded-2xl border border-line overflow-hidden">
      <div className={`px-6 py-4 flex items-center gap-2 ${headerClass}`}>
        <span className="text-sm font-semibold">{icon}</span>
        <p className="font-medium text-sm">{title}</p>
      </div>
      <div className="divide-y divide-line">
        {items.map((item, i) => (
          <div key={i} className="px-6 py-5 space-y-1">
            <p className="font-medium text-ink text-sm">{item.heading}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Routine card ────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

interface RoutineCardProps {
  label: 'Morning' | 'Evening'
  steps: RoutineStep[]
  isAdvanced: boolean
}

function RoutineCard({ label, steps, isAdvanced }: RoutineCardProps) {
  const isMorning = label === 'Morning'

  return (
    <div className="rounded-2xl border border-line overflow-hidden">
      <div
        className={`px-6 py-4 flex items-center gap-2.5 ${
          isMorning ? 'bg-amber-50/70 text-amber-900' : 'bg-slate-50/80 text-slate-700'
        }`}
      >
        {isMorning ? <SunIcon /> : <MoonIcon />}
        <p className="font-medium text-sm">{label} Routine</p>
        <span className="ml-auto text-xs opacity-60">{steps.length} steps</span>
      </div>

      <div className="divide-y divide-line">
        {steps.map((step) => {
          const isRetinoid = /retinol|retinoid/i.test(`${step.category} ${step.what_to_look_for}`)
          return (
            <div key={step.step} className="px-6 py-5">
              <div className="flex gap-4">
                <span className="text-xs font-semibold text-muted tabular-nums shrink-0 pt-0.5 w-5">
                  {String(step.step).padStart(2, '0')}
                </span>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <p className="font-medium text-ink">{step.category}</p>
                  <p className="text-sm text-gray-600">
                    <span className="text-muted">Look for: </span>
                    {step.what_to_look_for}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{step.why}</p>
                  <p className="text-xs text-muted leading-relaxed">{step.tip}</p>

                  {isRetinoid && (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2 leading-relaxed">
                      Start 2–3 nights per week and build up. This is where most people go wrong.
                    </p>
                  )}

                  {isAdvanced && step.knowledge_note && (
                    <details className="mt-2">
                      <summary className="text-xs font-medium text-accent cursor-pointer select-none">
                        Technical detail
                      </summary>
                      <p className="text-xs text-gray-600 mt-1.5 pl-3 border-l-2 border-accent/30 leading-relaxed">
                        {step.knowledge_note}
                      </p>
                    </details>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Ingredient pills ────────────────────────────────────────────────────────

interface IngredientListProps {
  title: string
  items: Ingredient[]
  variant: 'seek' | 'avoid'
}

function IngredientList({ title, items, variant }: IngredientListProps) {
  const [activeItem, setActiveItem] = useState<Ingredient | null>(null)
  const isSeek = variant === 'seek'

  return (
    <div className="rounded-2xl border border-line p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = activeItem?.name === item.name
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(isActive ? null : item)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                isSeek
                  ? isActive
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-emerald-300 text-emerald-800 hover:border-emerald-500'
                  : isActive
                    ? 'bg-red-600 text-white border-red-600'
                    : 'border-red-200 text-red-800 hover:border-red-400'
              }`}
            >
              {item.name}
            </button>
          )
        })}
      </div>
      {activeItem && (
        <p className="text-xs text-muted leading-relaxed border-t border-line pt-3">
          {activeItem.why}
        </p>
      )}
    </div>
  )
}

// ── Learn more ──────────────────────────────────────────────────────────────

function LearnMoreSection({ topics }: { topics: string[] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        Want to understand the science behind your routine?
      </p>
      <div className="grid gap-3">
        {topics.map((slug) => (
          <a
            key={slug}
            href={`/learn/${slug}`}
            className="group rounded-xl border border-line p-4 flex items-center justify-between hover:border-accent/50 transition-colors"
          >
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
              {slugToTitle(slug)}
            </span>
            <span className="text-muted text-sm">→</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Radio group ─────────────────────────────────────────────────────────────

interface RadioGroupProps {
  label: string
  name: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  hint?: string
  disabled?: boolean
}

function RadioGroup({ label, name, options, value, onChange, required, hint, disabled }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-800 mb-1">
        {label}
        {required && <span className="text-gray-400 font-normal"> *</span>}
      </legend>
      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer text-sm px-3 py-1.5 rounded-full border transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              value === option
                ? 'bg-gray-900 text-white border-gray-900'
                : 'border-gray-300 text-gray-700 hover:border-gray-500'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => !disabled && onChange(option)}
              disabled={disabled}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

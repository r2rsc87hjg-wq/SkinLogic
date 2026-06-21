'use client'

import { useState } from 'react'

const CONCERNS = ['Acne', 'Aging', 'Hyperpigmentation', 'Redness', 'Texture', 'Dehydration'] as const

interface ComparisonSide {
  mechanism: string
  evidence_quality: string
  best_for: string[]
  effective_percentage: string
  works_well_with: string[]
  avoid_combining_with: string[]
  time_to_results: string
  bottom_line: string
}

interface ComparisonResult {
  ingredient_a: ComparisonSide
  ingredient_b: ComparisonSide
  can_use_together: boolean
  together_notes: string
  head_to_head: string
}

interface Props {
  ingredients: string[]
}

export function IngredientCompareClient({ ingredients }: Props) {
  const [ingredientA, setIngredientA] = useState('')
  const [ingredientB, setIngredientB] = useState('')
  const [concern, setConcern] = useState('')
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle')
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [labelA, setLabelA] = useState('')
  const [labelB, setLabelB] = useState('')
  const [error, setError] = useState('')

  const canCompare = !!ingredientA && !!ingredientB && ingredientA !== ingredientB

  async function compare() {
    if (!canCompare) return
    setPhase('loading')
    setError('')
    setLabelA(ingredientA)
    setLabelB(ingredientB)

    try {
      const res = await fetch('/api/ingredients/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredientA, ingredientB, concern: concern || undefined }),
      })
      const data = await res.json()

      if (res.ok && data.result) {
        setResult(data.result)
        setPhase('done')
      } else {
        setError(data.message ?? 'The comparison could not be completed. Please try again.')
        setPhase('idle')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setPhase('idle')
    }
  }

  function reset() {
    setPhase('idle')
    setResult(null)
    setError('')
  }

  return (
    <div className="space-y-8">
      {/* Selector */}
      <div className="glass rounded-2xl p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Ingredient A
            </label>
            <select
              value={ingredientA}
              onChange={(e) => { setIngredientA(e.target.value); setPhase('idle') }}
              className="w-full border border-line rounded-xl px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">Select an ingredient…</option>
              {ingredients.map((name) => (
                <option key={name} value={name} disabled={name === ingredientB}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Ingredient B
            </label>
            <select
              value={ingredientB}
              onChange={(e) => { setIngredientB(e.target.value); setPhase('idle') }}
              className="w-full border border-line rounded-xl px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">Select an ingredient…</option>
              {ingredients.map((name) => (
                <option key={name} value={name} disabled={name === ingredientA}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Filter by concern{' '}
            <span className="text-muted font-normal">(optional — weights the comparison)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CONCERNS.map((c) => (
              <button
                key={c}
                onClick={() => setConcern(concern === c ? '' : c)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  concern === c
                    ? 'bg-ink text-paper border-ink'
                    : 'border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={compare}
          disabled={!canCompare || phase === 'loading'}
          className="w-full bg-accent text-paper text-sm font-medium py-3 px-4 rounded-full hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {phase === 'loading' ? 'Comparing…' : 'Compare'}
        </button>
      </div>

      {/* Results */}
      {phase === 'done' && result && (
        <div className="space-y-6">
          {/* Head to head */}
          <div className="rounded-2xl border border-line bg-sand/40 p-6">
            <p className="eyebrow text-accent mb-3">
              {labelA} vs. {labelB}
              {concern ? ` · for ${concern}` : ''}
            </p>
            <p className="text-ink leading-relaxed">{result.head_to_head}</p>
          </div>

          {/* Side-by-side */}
          <div className="grid sm:grid-cols-2 gap-4">
            <IngredientPanel label={labelA} side={result.ingredient_a} />
            <IngredientPanel label={labelB} side={result.ingredient_b} />
          </div>

          {/* Can use together */}
          <div className={`rounded-xl border px-5 py-4 ${
            result.can_use_together
              ? 'border-emerald-200 bg-emerald-50/60'
              : 'border-amber-200 bg-amber-50/60'
          }`}>
            <p className={`text-sm font-semibold mb-1 ${
              result.can_use_together ? 'text-emerald-900' : 'text-amber-900'
            }`}>
              {result.can_use_together
                ? 'These can be used together'
                : 'Use with caution together'}
            </p>
            <p className={`text-sm leading-relaxed ${
              result.can_use_together ? 'text-emerald-800' : 'text-amber-800'
            }`}>
              {result.together_notes}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={reset}
              className="flex-1 text-sm font-medium py-2.5 px-4 rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-colors"
            >
              New comparison
            </button>
            <a
              href="/ingredients"
              className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-colors"
            >
              Browse ingredient library →
            </a>
          </div>

          <p className="text-xs text-muted text-center leading-relaxed">
            Comparison is educational guidance based on published research, not medical advice.
            Individual responses to ingredients vary — always patch test.
          </p>
        </div>
      )}
    </div>
  )
}

function IngredientPanel({ label, side }: { label: string; side: ComparisonSide }) {
  return (
    <div className="rounded-2xl border border-line overflow-hidden">
      <div className="px-5 py-4 bg-sand/50 border-b border-line">
        <p className="font-medium text-ink">{label}</p>
        <p className="text-xs text-muted mt-0.5">{side.evidence_quality}</p>
      </div>

      <div className="divide-y divide-line/60">
        <Row label="How it works" value={side.mechanism} prose />
        <Row label="Effective at" value={side.effective_percentage} />
        <Row label="Best for" value={side.best_for.join(', ')} />
        <Row label="Works well with" value={side.works_well_with.join(', ')} />
        <Row label="Avoid combining with" value={side.avoid_combining_with.join(', ')} />
        <Row label="Time to results" value={side.time_to_results} />
        <div className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1.5">
            Bottom line
          </p>
          <p className="text-sm text-ink font-medium leading-relaxed">{side.bottom_line}</p>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, prose }: { label: string; value: string; prose?: boolean }) {
  return (
    <div className="px-5 py-3.5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">{label}</p>
      <p className={`text-sm text-gray-700 leading-relaxed ${prose ? '' : ''}`}>{value}</p>
    </div>
  )
}

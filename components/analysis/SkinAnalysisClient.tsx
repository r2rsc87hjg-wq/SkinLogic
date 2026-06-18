'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Disclaimer } from '@/components/disclaimer'

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

export function SkinAnalysisClient() {
  const [profile, setProfile] = useState<ProfileState>(EMPTY_PROFILE)
  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState('')
  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  function setField(field: keyof ProfileState, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const isProfileValid =
    !!profile.skinType &&
    !!profile.primaryConcern &&
    !!profile.ageRange &&
    !!profile.knowledgeLevel &&
    !!profile.climate

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

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!isProfileValid) return

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
    if (note.trim()) body.append('note', note.trim())
    if (file) body.append('image', file)

    try {
      const res = await fetch('/api/analysis/submit', { method: 'POST', body })
      const data = await res.json()

      if (res.ok) {
        setResult(data.analysis)
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
    setPhase('form')
    setError('')
    setResult('')
  }

  if (phase === 'done') {
    return (
      <div className="space-y-8">
        <Disclaimer variant="paid-analysis" />
        <div className="prose prose-gray prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mt-8 mb-3 first:mt-0">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => <ul className="space-y-2 my-3">{children}</ul>,
              li: ({ children }) => (
                <li className="flex gap-2 text-gray-700 text-sm leading-relaxed">
                  <span className="text-gray-300 shrink-0 mt-0.5">—</span>
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
          >
            ← Start over with a different profile
          </button>
          <a
            href="/ingredients"
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600 sm:ml-auto"
          >
            Explore the ingredient library →
          </a>
        </div>
      </div>
    )
  }

  const busy = phase === 'analyzing'

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
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

      {/* Photo section */}
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

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isProfileValid || busy}
        className="w-full bg-accent text-paper text-sm font-medium py-3 px-4 rounded-full hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {busy ? 'Analysing…' : 'Analyse my skin'}
      </button>

      <p className="text-xs text-gray-400 leading-relaxed text-center">
        Your answers and any photo are sent to an AI model and immediately discarded.
        Nothing you enter is stored or logged.
      </p>
    </form>
  )
}

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

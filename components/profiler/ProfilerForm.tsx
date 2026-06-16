'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Disclaimer } from '@/components/disclaimer'

// ---- Form field definitions ----

const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'] as const
const CONCERNS = ['Acne', 'Aging', 'Hyperpigmentation', 'Redness', 'Texture', 'Dehydration'] as const
const AGE_RANGES = ['Teens (13–19)', '20s', '30s', '40s', '50s+'] as const
const KNOWLEDGE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const
const CLIMATES = ['Humid', 'Dry/arid', 'Cold', 'High UV / sunny', 'Polluted urban', 'Temperate / mixed'] as const

interface FormState {
  skinType: string
  primaryConcern: string
  ageRange: string
  gender: string
  ethnicity: string
  knowledgeLevel: string
  climate: string
}

const EMPTY_FORM: FormState = {
  skinType: '',
  primaryConcern: '',
  ageRange: '',
  gender: '',
  ethnicity: '',
  knowledgeLevel: '',
  climate: '',
}

type Status = 'idle' | 'loading' | 'streaming' | 'done' | 'error'

// ---- Component ----

export function ProfilerForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [output, setOutput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    form.skinType &&
    form.primaryConcern &&
    form.ageRange &&
    form.knowledgeLevel &&
    form.climate

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) return

    setStatus('loading')
    setOutput('')
    setErrorMessage('')

    try {
      const response = await fetch('/api/profiler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skinType: form.skinType.toLowerCase(),
          primaryConcern: form.primaryConcern.toLowerCase(),
          ageRange: form.ageRange,
          gender: form.gender || undefined,
          ethnicity: form.ethnicity || undefined,
          knowledgeLevel: form.knowledgeLevel.toLowerCase(),
          climate: form.climate.toLowerCase(),
        }),
      })

      // Error responses are JSON, success is a text stream
      if (!response.ok) {
        const data = await response.json()
        setErrorMessage(data.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('streaming')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setOutput((prev) => prev + decoder.decode(value, { stream: true }))
      }

      setStatus('done')
    } catch {
      setErrorMessage('The analysis could not be completed. Please try again.')
      setStatus('error')
    }
  }

  function handleReset() {
    setForm(EMPTY_FORM)
    setStatus('idle')
    setOutput('')
    setErrorMessage('')
  }

  const showOutput = status === 'streaming' || status === 'done'
  const isSubmitting = status === 'loading' || status === 'streaming'

  return (
    <div>
      {/* Form — always visible so user can re-run with different inputs */}
      {!showOutput && (
        <form onSubmit={handleSubmit} noValidate className="space-y-7">

          <RadioGroup
            label="Skin type"
            name="skinType"
            options={SKIN_TYPES}
            value={form.skinType}
            onChange={(v) => set('skinType', v)}
            required
          />

          <RadioGroup
            label="Primary concern"
            name="primaryConcern"
            options={CONCERNS}
            value={form.primaryConcern}
            onChange={(v) => set('primaryConcern', v)}
            required
          />

          <RadioGroup
            label="Age range"
            name="ageRange"
            options={AGE_RANGES}
            value={form.ageRange}
            onChange={(v) => set('ageRange', v)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Gender{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.gender}
              onChange={(e) => set('gender', e.target.value)}
              placeholder="e.g. woman, man, non-binary, prefer not to say"
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Ethnicity or skin background{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <p className="text-xs text-gray-500 leading-relaxed mb-2 bg-gray-50 border border-gray-100 rounded p-2.5">
              <strong className="text-gray-700">Why we ask:</strong> Melanin
              levels, post-inflammatory hyperpigmentation (PIH) susceptibility,
              and skin barrier characteristics vary by ethnicity and are
              scientifically relevant to skincare research. This field is
              optional — sharing it allows the analysis to reflect those
              biological differences more accurately.
            </p>
            <input
              type="text"
              value={form.ethnicity}
              onChange={(e) => set('ethnicity', e.target.value)}
              placeholder="e.g. East Asian, South Asian, Black/African, Latina, White/European"
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <RadioGroup
            label="Your skincare knowledge level"
            name="knowledgeLevel"
            options={KNOWLEDGE_LEVELS}
            value={form.knowledgeLevel}
            onChange={(v) => set('knowledgeLevel', v)}
            required
            hint="This affects how technical the explanation will be."
          />

          <RadioGroup
            label="Climate / environment"
            name="climate"
            options={CLIMATES}
            value={form.climate}
            onChange={(v) => set('climate', v)}
            required
          />

          {status === 'error' && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Analysing…' : 'Get my educational profile'}
          </button>

          <p className="text-xs text-gray-400 leading-relaxed text-center">
            Your answers are sent to an AI model and immediately discarded.
            Nothing you enter here is stored.
          </p>
        </form>
      )}

      {/* Output */}
      {showOutput && (
        <div className="space-y-8">
          {/* Disclaimer — prominent, above the output */}
          <Disclaimer variant="profiler" />

          {/* Streaming / complete output */}
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
                ul: ({ children }) => (
                  <ul className="space-y-2 my-3">{children}</ul>
                ),
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
              {output}
            </ReactMarkdown>

            {/* Cursor while streaming */}
            {status === 'streaming' && (
              <span className="inline-block w-1.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-middle" />
            )}
          </div>

          {status === 'done' && (
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
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
          )}
        </div>
      )}
    </div>
  )
}

// ---- Reusable radio group ----

interface RadioGroupProps {
  label: string
  name: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  hint?: string
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  hint,
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-800 mb-1">
        {label}
        {required && <span className="text-gray-400 font-normal"> *</span>}
      </legend>
      {hint && (
        <p className="text-xs text-gray-500 mb-2">{hint}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer text-sm px-3 py-1.5 rounded-full border transition-colors ${
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
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

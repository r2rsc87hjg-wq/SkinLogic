'use client'

import { useState } from 'react'
import { CarouselOutput } from './CarouselOutput'
import { VideoScriptOutput } from './VideoScriptOutput'
import { InfographicOutput } from './InfographicOutput'
import type { SocialContentOutput } from '@/types/social'

const CONTENT_LABELS = [
  'Ingredient breakdown',
  'Sunscreen / UV filter info',
  'App or scanner review',
  'Research finding',
  'Regulatory explainer',
  'Other',
] as const

const MAX_CHARS = 5000

type Tab = 'carousel' | 'video' | 'infographic'

const TABS: { id: Tab; label: string }[] = [
  { id: 'carousel',   label: 'Instagram Carousel' },
  { id: 'video',      label: 'Video Script' },
  { id: 'infographic', label: 'Infographic' },
]

export function SocialPipelineForm() {
  const [content, setContent] = useState('')
  const [contentLabel, setContentLabel] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [output, setOutput] = useState<SocialContentOutput | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('carousel')

  const remaining = MAX_CHARS - content.length
  const isValid = content.trim().length >= 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setStatus('loading')
    setOutput(null)
    setErrorMessage('')

    try {
      const response = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          contentLabel: contentLabel || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setOutput(data as SocialContentOutput)
      setActiveTab('carousel')
      setStatus('done')
    } catch {
      setErrorMessage('The request could not be completed. Please try again.')
      setStatus('error')
    }
  }

  function handleReset() {
    setContent('')
    setContentLabel('')
    setStatus('idle')
    setOutput(null)
    setErrorMessage('')
  }

  return (
    <div className="space-y-8">

      {/* Input form — always visible so user can regenerate */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Content label (optional) */}
        <div>
          <label
            htmlFor="content-label"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Content type{' '}
            <span className="text-gray-400 font-normal">(optional — helps calibrate the output)</span>
          </label>
          <select
            id="content-label"
            value={contentLabel}
            onChange={(e) => setContentLabel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">Select a type…</option>
            {CONTENT_LABELS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Content textarea */}
        <div>
          <label
            htmlFor="content-input"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Source content{' '}
            <span className="text-gray-400 font-normal">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Paste the content you want to translate — an ingredient breakdown, a
            research finding, a section of the sunscreen guide. Minimum 100
            characters.
          </p>
          <textarea
            id="content-input"
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setContent(e.target.value)
            }}
            rows={10}
            placeholder="Paste your source content here…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
            spellCheck={false}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">
              {content.length < 100
                ? `${100 - content.length} more character${100 - content.length === 1 ? '' : 's'} needed`
                : ''}
            </span>
            <span
              className={`text-xs ${
                remaining < 200 ? 'text-amber-600' : 'text-gray-400'
              }`}
            >
              {remaining.toLocaleString()} characters remaining
            </span>
          </div>
        </div>

        {status === 'error' && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className="w-full bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Generating…' : 'Generate social content'}
        </button>
      </form>

      {/* Output */}
      {status === 'done' && output && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Generated content
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-800"
            >
              Start over
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-0 -mb-px">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab panels */}
          <div className="pt-2">
            {activeTab === 'carousel' && (
              <CarouselOutput slides={output.carousel.slides} />
            )}
            {activeTab === 'video' && (
              <VideoScriptOutput
                totalDuration={output.video.totalDuration}
                sections={output.video.sections}
              />
            )}
            {activeTab === 'infographic' && (
              <InfographicOutput {...output.infographic} />
            )}
          </div>

          {/* Voice reminder */}
          <div className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded p-3 leading-relaxed">
            <strong className="text-gray-600">Before posting:</strong> Verify
            that every citation is accurate and the source is still accessible.
            Edit freely — these are starting points, not finished copy. The
            site's voice is honest and plain English; that carries into social.
          </div>
        </div>
      )}
    </div>
  )
}

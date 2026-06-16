'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { detectEmergency } from '@/lib/emergency-detect'
import { EmergencyBanner } from './EmergencyBanner'

type Status = 'idle' | 'loading' | 'streaming' | 'done' | 'error'

const MAX_CHARS = 5000

export function ReferralExplainer() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [output, setOutput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)

  const isSubmitting = status === 'loading' || status === 'streaming'
  const showOutput = status === 'streaming' || status === 'done'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || isSubmitting) return

    const emergency = detectEmergency(text)
    setIsEmergency(emergency)
    setStatus('loading')
    setOutput('')
    setErrorMessage('')

    try {
      const response = await fetch('/api/navigator/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

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
      setErrorMessage('Could not complete the request. Please try again.')
      setStatus('error')
    }
  }

  function handleReset() {
    setText('')
    setStatus('idle')
    setOutput('')
    setErrorMessage('')
    setIsEmergency(false)
  }

  return (
    <div className="relative glass iris-hover sheen rounded-3xl p-6 flex flex-col gap-5">
      <header className="flex items-start gap-3">
        <span className="shrink-0 grid place-items-center h-10 w-10 rounded-2xl bg-accent/10">
          <IconDocument />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Referral Explainer</h2>
          <p className="text-sm text-muted mt-0.5">Paste a skin health referral to get a plain-English explanation of the dermatology terms.</p>
        </div>
      </header>

      {!showOutput ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your dermatology referral letter, skin clinic notes, or biopsy report here…"
              maxLength={MAX_CHARS}
              rows={6}
              className="w-full bg-white/60 border border-white/50 rounded-xl px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-colors resize-none font-mono text-xs"
              aria-label="Paste your referral text"
            />
            <p className="mt-1 text-xs text-muted text-right">
              {text.length}/{MAX_CHARS}
            </p>
          </div>

          <div className="glass-quiet rounded-xl px-3.5 py-2.5 text-xs text-muted leading-relaxed">
            <strong className="text-ink font-medium">Skin health referrals only.</strong> This tool explains dermatology terms — skin conditions, procedures, biopsy results, and specialist names. Before pasting, remove your name, date of birth, and any ID numbers.
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className="bg-accent text-paper rounded-full px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Explaining…' : 'Explain in Plain English'}
            </button>
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
              {errorMessage}
            </p>
          )}
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <EmergencyBanner visible={isEmergency} />

          <div className="prose-sm">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold text-ink mt-4 mb-1.5 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-ink mt-3 mb-1">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm text-ink/90 leading-relaxed mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-sm text-ink/90 mb-2 space-y-0.5">{children}</ul>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-ink">{children}</strong>
                ),
              }}
            >
              {output}
            </ReactMarkdown>
            {status === 'streaming' && (
              <span className="inline-block w-1.5 h-4 bg-accent/60 rounded-sm animate-pulse ml-0.5 align-middle" />
            )}
          </div>

          <div className="pt-2 border-t border-line">
            <p className="text-xs text-muted italic leading-relaxed">
              This is for informational purposes only and is not medical advice. Always consult your doctor or a licensed healthcare provider before making any medical decisions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start text-sm text-muted hover:text-ink transition-colors underline underline-offset-2"
          >
            Explain another document
          </button>
        </div>
      )}
    </div>
  )
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

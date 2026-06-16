'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Disclaimer } from '@/components/disclaimer'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024

type Phase =
  | 'verifying' // exchanging the paid checkout for an access token
  | 'ready' // have a token, waiting for the user to upload + submit
  | 'analyzing' // call in flight
  | 'done' // result shown
  | 'token_error' // could not get a token (no/!paid/already used)

export function AnalysisClient() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  const [phase, setPhase] = useState<Phase>('verifying')
  const [token, setToken] = useState('')
  const [tokenError, setTokenError] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [note, setNote] = useState('')
  const [formError, setFormError] = useState('')
  const [result, setResult] = useState('')

  // Whether the user has one retry left after a first failure.
  const [canRetry, setCanRetry] = useState(true)

  // Exchange the Stripe checkout session for a one-time token, once.
  const exchanged = useRef(false)
  useEffect(() => {
    if (exchanged.current) return
    exchanged.current = true

    if (!sessionId) {
      setTokenError('No checkout session was found in the link.')
      setPhase('token_error')
      return
    }

    ;(async () => {
      try {
        const res = await fetch('/api/analysis/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const data = await res.json()
        if (!res.ok) {
          setTokenError(data.message ?? 'We could not verify your payment.')
          setPhase('token_error')
          return
        }
        setToken(data.token)
        setPhase('ready')
      } catch {
        setTokenError('We could not verify your payment. Please refresh.')
        setPhase('token_error')
      }
    })()
  }, [sessionId])

  function pickFile(f: File | null) {
    setFormError('')
    if (!f) {
      setFile(null)
      return
    }
    if (!ALLOWED_TYPES.includes(f.type)) {
      setFormError('Please choose a JPG, PNG, or WEBP image.')
      setFile(null)
      return
    }
    if (f.size > MAX_BYTES) {
      setFormError('That image is over 5 MB. Please choose a smaller one.')
      setFile(null)
      return
    }
    setFile(f)
  }

  async function submit() {
    if (!file || !token) return
    setPhase('analyzing')
    setFormError('')

    const body = new FormData()
    body.append('token', token)
    body.append('image', file)
    if (note.trim()) body.append('note', note.trim())

    try {
      const res = await fetch('/api/analysis/submit', { method: 'POST', body })
      const data = await res.json()

      if (res.ok) {
        setResult(data.analysis)
        setPhase('done')
        return
      }

      // Retryable: token is still valid for one more attempt.
      if (data.error === 'analysis_failed_retryable') {
        setCanRetry(true)
        setFormError(data.message ?? 'The analysis failed. You can try once more.')
        setPhase('ready')
        return
      }

      // Final failure (refunded) or token problem — no retry.
      setCanRetry(false)
      setTokenError(data.message ?? 'The analysis could not be completed.')
      setPhase('token_error')
    } catch {
      setCanRetry(true)
      setFormError('Something went wrong sending your image. You can try again.')
      setPhase('ready')
    }
  }

  // ---- Render ----

  if (phase === 'verifying') {
    return (
      <p className="text-sm text-gray-500">Verifying your payment…</p>
    )
  }

  if (phase === 'token_error') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-4 leading-relaxed">
          {tokenError}
        </div>
        <a
          href="/analysis"
          className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
        >
          ← Back to the analysis page
        </a>
      </div>
    )
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

        <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
          <p>
            This result was not saved anywhere. If you want to keep it, copy it
            now — once you leave this page it’s gone.
          </p>
          <a
            href="/ingredients"
            className="inline-block mt-3 font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
          >
            Read deeper on the ingredients mentioned →
          </a>
        </div>
      </div>
    )
  }

  // phase === 'ready' or 'analyzing'
  const busy = phase === 'analyzing'
  return (
    <div className="space-y-6">
      <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-3">
        Payment confirmed. Upload one clear photo to get your educational
        analysis. Nothing you upload here is stored.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Your photo <span className="text-gray-400 font-normal">(JPG, PNG, or WEBP · max 5 MB)</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-900 hover:file:border-gray-500 disabled:opacity-50"
        />
        {file && (
          <p className="text-xs text-gray-400 mt-1">Selected: {file.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Anything you want the analysis to focus on?{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={note}
          disabled={busy}
          onChange={(e) => setNote(e.target.value.slice(0, 500))}
          rows={2}
          placeholder="e.g. I’m mostly curious about texture on my cheeks"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
        />
      </div>

      {formError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {formError}
          {!canRetry && ' This was your last attempt.'}
        </div>
      )}

      <button
        onClick={submit}
        disabled={!file || busy}
        className="w-full bg-accent text-paper text-sm font-medium py-3 px-4 rounded-full hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {busy ? 'Analysing your photo…' : 'Analyse my photo'}
      </button>

      <p className="text-xs text-gray-400 leading-relaxed text-center">
        Your image is sent to the AI model and immediately discarded. It is
        never stored, logged, or saved.
      </p>
    </div>
  )
}

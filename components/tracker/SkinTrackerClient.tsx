'use client'

import { useRef, useState } from 'react'

interface ScanResult {
  overview: string
  concerns: string[]
  positives: string[]
  watchNext: string
  disclaimer: string
}

export function SkinTrackerClient() {
  const [preview, setPreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string)
      setResult(null)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  async function analyse() {
    if (!preview) return
    setAnalyzing(true)
    setError('')
    try {
      const res = await fetch('/api/skin-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: preview }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? 'Analysis failed.')
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setAnalyzing(false)
    }
  }

  function reset() {
    setPreview(null)
    setResult(null)
    setError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-6">
      {/* Upload / Camera */}
      <div className="glass iris iris-on rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink mb-1">New scan</h2>
        <p className="text-sm text-muted mb-5">
          Take a photo or upload one. Your photo is never stored — only the written analysis is returned.
        </p>

        {!preview ? (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-surface/60 px-6 py-10 transition-colors hover:border-accent/40 hover:bg-accent/5">
            <span className="text-4xl">📷</span>
            <span className="text-sm font-medium text-ink">Take a photo or choose from library</span>
            <span className="text-xs text-muted">JPG, PNG, WebP · max 20 MB</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="user"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Skin photo preview" className="mx-auto max-h-72 w-auto object-contain" />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">{error}</div>
            )}

            <div className="flex gap-3">
              <button
                onClick={analyse}
                disabled={analyzing}
                className="flex-1 rounded-full bg-gradient-to-br from-accent to-[#27705f] py-2.5 text-sm font-medium text-paper shadow-soft transition-all hover:shadow-lift disabled:opacity-60 disabled:pointer-events-none"
              >
                {analyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                    Analysing…
                  </span>
                ) : 'Analyse skin'}
              </button>
              <button
                onClick={reset}
                className="glass rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="glass iris iris-on rounded-3xl p-6 sm:p-8 space-y-5 animate-fade-in-up">
          <h3 className="font-display text-lg font-semibold text-ink">Today's analysis</h3>

          <p className="text-sm leading-relaxed text-ink/90">{result.overview}</p>

          {result.concerns.length > 0 && (
            <div>
              <p className="eyebrow text-muted mb-2">Things to watch</p>
              <div className="flex flex-wrap gap-2">
                {result.concerns.map((c) => (
                  <span key={c} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{c}</span>
                ))}
              </div>
            </div>
          )}

          {result.positives.length > 0 && (
            <div>
              <p className="eyebrow text-muted mb-2">Looking good</p>
              <div className="flex flex-wrap gap-2">
                {result.positives.map((p) => (
                  <span key={p} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">{p}</span>
                ))}
              </div>
            </div>
          )}

          {result.watchNext && (
            <div className="rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3">
              <p className="eyebrow text-accent mb-1">Watch next time</p>
              <p className="text-sm text-ink/80">{result.watchNext}</p>
            </div>
          )}

          <p className="text-xs text-muted border-t border-line pt-4">{result.disclaimer}</p>

          <button
            onClick={reset}
            className="text-sm text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            Scan another photo
          </button>
        </div>
      )}
    </div>
  )
}

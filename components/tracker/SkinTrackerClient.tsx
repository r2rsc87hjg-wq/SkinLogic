'use client'

import { useRef, useState, useEffect } from 'react'
import { getSubscriptionToken } from '@/lib/free-tier'
import { PaywallModal } from '@/components/ui/PaywallModal'

interface ScanResult {
  overview: string
  concerns: string[]
  positives: string[]
  watchNext: string
  disclaimer: string
}

interface HistoryEntry {
  id: string
  overview: string
  concerns: string[]
  positives: string[]
  watch_next: string
  created_at: string
}

export function SkinTrackerClient() {
  const [token, setToken] = useState<string | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [error, setError] = useState('')
  const [historyLoading, setHistoryLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = getSubscriptionToken()
    setToken(t)
    if (t) loadHistory(t)
  }, [])

  async function loadHistory(t: string) {
    setHistoryLoading(true)
    try {
      const res = await fetch('/api/skin-scan/history', {
        headers: { Authorization: `Bearer ${t}` },
      })
      if (res.ok) {
        const data = await res.json()
        setHistory(data.history ?? [])
      }
    } catch { /* silent */ } finally {
      setHistoryLoading(false)
    }
  }

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
    if (!token) { setShowPaywall(true); return }

    setAnalyzing(true)
    setError('')
    try {
      const res = await fetch('/api/skin-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photo: preview }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? 'Analysis failed.')
      setResult(data.result)
      setHistory(data.history ?? [])
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

  if (!token) {
    return (
      <>
        {showPaywall && <PaywallModal feature="chat" onClose={() => setShowPaywall(false)} />}
        <div className="glass iris iris-on rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl">📸</div>
          <h2 className="font-display text-xl font-semibold text-ink mb-2">Subscription required</h2>
          <p className="text-sm text-muted mb-6 max-w-xs mx-auto">
            Skin Tracker is included in SkinLogic Pro — unlimited scans and your full history, for $4.99/month.
          </p>
          <button
            onClick={() => setShowPaywall(true)}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-6 py-2.5 text-sm font-medium text-paper shadow-soft hover:shadow-lift transition-all"
          >
            Unlock for $4.99/month
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload / Camera */}
      <div className="glass iris iris-on rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink mb-1">New scan</h2>
        <p className="text-sm text-muted mb-5">
          Take a photo or upload one. Only the written analysis is saved — your photo stays on your device.
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
            {/* Preview */}
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
        </div>
      )}

      {/* History */}
      {(history.length > 0 || historyLoading) && (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Your scan history</h3>
          {historyLoading ? (
            <div className="text-sm text-muted">Loading history…</div>
          ) : (
            <div className="space-y-3">
              {history.map((entry, i) => (
                <details key={entry.id} className="glass rounded-2xl px-5 py-4 group" open={i === 0 && !result}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                        {history.length - i}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">Scan {history.length - i}</p>
                        <p className="text-xs text-muted">{new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 flex-1 justify-end">
                      {entry.concerns.slice(0, 2).map((c) => (
                        <span key={c} className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[0.6rem] font-medium text-amber-700">{c}</span>
                      ))}
                      {entry.positives.slice(0, 1).map((p) => (
                        <span key={p} className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.6rem] font-medium text-emerald-700">{p}</span>
                      ))}
                    </div>
                    <span className="ml-2 shrink-0 text-muted transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <div className="mt-4 space-y-3 border-t border-line pt-4">
                    <p className="text-sm leading-relaxed text-ink/80">{entry.overview}</p>
                    {entry.watch_next && (
                      <p className="text-xs text-muted"><span className="font-medium">Watch next: </span>{entry.watch_next}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

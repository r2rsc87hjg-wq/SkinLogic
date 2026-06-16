'use client'

import { useState } from 'react'

interface Props {
  feature: 'chat' | 'pip'
  onClose: () => void
}

const COPY = {
  chat: {
    title: "You've used your 5 free messages",
    desc: "Unlock unlimited Skin Health Coach conversations plus unlimited Pip learning sessions.",
  },
  pip: {
    title: "You've used your 3 free Pip sessions",
    desc: "Unlock unlimited Pip learning sessions plus unlimited AI chat — all for less than a coffee a month.",
  },
}

const PERKS = [
  'Unlimited AI Skin Health Coach messages',
  'Unlimited Learn with Pip sessions',
  'Priority answers — no cooldown waits',
  'Supports keeping SkinLogic ad-free',
]

export function PaywallModal({ feature, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const copy = COPY[feature]

  async function handleSubscribe() {
    setLoading(true)
    setErr('')
    try {
      const res = await fetch('/api/stripe/create-subscription', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setErr('Could not start checkout. Please try again.')
        setLoading(false)
      }
    } catch {
      setErr('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Unlock unlimited access"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="glass iris iris-on relative w-full max-w-sm rounded-3xl p-7 shadow-lift animate-fade-in-up">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Pip avatar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl">
            🦜
          </div>
          <div>
            <p className="eyebrow text-accent text-xs">SkinLogic Pro</p>
            <p className="text-[0.7rem] text-muted">$4.99 / month · cancel any time</p>
          </div>
        </div>

        <h2 className="font-display text-xl font-semibold text-ink mb-2 leading-snug">
          {copy.title}
        </h2>
        <p className="text-sm text-muted mb-5 leading-relaxed">{copy.desc}</p>

        <ul className="mb-6 space-y-2">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink/80">
              <span className="mt-0.5 shrink-0 text-accent">✓</span>
              {p}
            </li>
          ))}
        </ul>

        {err && (
          <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {err}
          </p>
        )}

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-br from-accent to-[#27705f] py-3 text-sm font-medium text-paper shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? 'Redirecting to checkout…' : 'Unlock for $4.99 / month'}
        </button>

        <p className="mt-3 text-center text-[0.65rem] text-muted">
          Secure payment via Stripe. Cancel any time — no questions asked.
        </p>
      </div>
    </div>
  )
}

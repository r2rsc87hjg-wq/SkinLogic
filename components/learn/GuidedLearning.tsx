'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  isPipAtLimit,
  incrementPipUsed,
  getSubscriptionToken,
  FREE_PIP_LIMIT,
  getPipUsed,
} from '@/lib/free-tier'
import { PaywallModal } from '@/components/ui/PaywallModal'

interface WebArticle {
  title: string
  url: string
  source: string
}
interface InternalArticle {
  slug: string
  title: string
  summary: string
}
interface PipAnswer {
  role: 'pip'
  lesson: string
  followups: string[]
  articles: WebArticle[]
  internal: InternalArticle[]
}
type Turn = { role: 'user'; content: string } | PipAnswer

const STARTERS = [
  'What is a skin barrier?',
  'How do I start a routine?',
  'Why does stress cause breakouts?',
  'What does niacinamide actually do?',
]

export function GuidedLearning() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const [usedCount, setUsedCount] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUsedCount(getPipUsed())
  }, [])

  async function ask(question: string) {
    const q = question.trim()
    if (!q || loading) return

    if (isPipAtLimit()) {
      setShowPaywall(true)
      return
    }

    setError('')

    const nextTurns: Turn[] = [...turns, { role: 'user', content: q }]
    setTurns(nextTurns)
    setInput('')
    setLoading(true)

    incrementPipUsed()
    setUsedCount((c) => c + 1)

    // Compact history for the API: prior user questions + Pip lessons.
    const history = nextTurns
      .slice(0, -1)
      .map((t) =>
        t.role === 'user'
          ? { role: 'user' as const, content: t.content }
          : { role: 'assistant' as const, content: t.lesson }
      )

    try {
      const token = getSubscriptionToken()
      const res = await fetch('/api/learn-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ question: q, history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? 'Something went wrong.')

      setTurns((prev) => [
        ...prev,
        {
          role: 'pip',
          lesson: data.lesson,
          followups: data.followups ?? [],
          articles: data.articles ?? [],
          internal: data.internal ?? [],
        },
      ])
      requestAnimationFrame(() =>
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const isEmpty = turns.length === 0
  const atLimit = isPipAtLimit()

  return (
    <>
    {showPaywall && (
      <PaywallModal feature="pip" onClose={() => setShowPaywall(false)} />
    )}
    <section className="glass iris iris-on relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <PipAvatar />
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Learn with Pip
            </h2>
            <p className="text-sm text-muted">
              Ask anything about skin health — Pip explains it and finds fresh,
              reputable reading.
            </p>
          </div>
        </div>

        {/* Transcript */}
        {!isEmpty && (
          <div className="mb-5 space-y-4">
            {turns.map((t, i) =>
              t.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl bg-accent px-4 py-2.5 text-sm text-paper">
                    {t.content}
                  </p>
                </div>
              ) : (
                <PipBubble key={i} answer={t} onFollowup={ask} disabled={loading} />
              )
            )}
            <div ref={endRef} />
          </div>
        )}

        {/* Empty-state starters */}
        {isEmpty && (
          <div className="mb-5">
            <p className="mb-2 text-sm font-medium text-ink">
              Not sure where to start? Try one of these:
            </p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <PipAvatar small />
            <span className="inline-flex items-center gap-1">
              Pip is reading up
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
            {error}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
          className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            placeholder="Ask Pip about skin health…"
            aria-label="Ask Pip a question"
            className="flex-1 bg-transparent px-1 text-sm text-ink placeholder:text-muted/70 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shimmer inline-flex shrink-0 items-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-4 py-2 text-sm font-medium text-paper transition-shadow hover:shadow-lift disabled:opacity-40"
          >
            Ask
          </button>
        </form>

        {!getSubscriptionToken() && (
          <p className="mt-2 text-center text-[0.65rem] text-muted/70">
            {atLimit
              ? 'Free sessions used — subscribe for unlimited access'
              : `${FREE_PIP_LIMIT - usedCount} free session${FREE_PIP_LIMIT - usedCount === 1 ? '' : 's'} remaining`}
          </p>
        )}
        <p className="mt-1 text-center text-[0.7rem] leading-tight text-muted">
          Educational only — not medical advice. Links open external sites Pip
          found on the web; always check claims against a dermatologist.
        </p>
      </div>
    </section>
    </>
  )
}

function PipBubble({
  answer,
  onFollowup,
  disabled,
}: {
  answer: PipAnswer
  onFollowup: (q: string) => void
  disabled: boolean
}) {
  return (
    <div className="flex gap-3">
      <PipAvatar small />
      <div className="min-w-0 flex-1 space-y-3">
        {/* Lesson */}
        <div className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink">
          {answer.lesson.split('\n').filter(Boolean).map((p, i) => (
            <p key={i} className={i ? 'mt-2' : ''}>
              {p}
            </p>
          ))}
        </div>

        {/* Web articles */}
        {answer.articles.length > 0 && (
          <div className="rounded-2xl border border-line bg-sand/40 px-4 py-3">
            <p className="eyebrow mb-2 text-muted">Reading from around the web</p>
            <ul className="space-y-2">
              {answer.articles.map((a) => (
                <li key={a.url}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-sm"
                  >
                    <span className="mt-0.5 text-accent">↗</span>
                    <span>
                      <span className="font-medium text-ink underline-offset-2 group-hover:underline">
                        {a.title}
                      </span>
                      {a.source && (
                        <span className="ml-1.5 text-xs text-muted">
                          · {a.source}
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Internal hub links */}
        {answer.internal.length > 0 && (
          <div className="rounded-2xl border border-accent/20 bg-accent-soft/60 px-4 py-3">
            <p className="eyebrow mb-2 text-accent">From our Learning Hub</p>
            <ul className="space-y-1.5">
              {answer.internal.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/learn/${a.slug}`}
                    className="text-sm font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Follow-up chips */}
        {answer.followups.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {answer.followups.map((f) => (
              <button
                key={f}
                type="button"
                disabled={disabled}
                onClick={() => onFollowup(f)}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-50"
              >
                {f} →
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Tiny Pip avatar — flat green circle, minimal side-profile head.
function PipAvatar({ small }: { small?: boolean }) {
  const s = small ? 28 : 44
  const ink = '#0f3028'
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full"
      style={{ width: s, height: s, background: '#46c08a', border: `2px solid ${ink}` }}
    >
      <svg width={s * 0.72} height={s * 0.72} viewBox="0 0 32 32" fill="none">
        {/* Crest spike */}
        <ellipse cx="14" cy="4" rx="2.5" ry="7" transform="rotate(-18 14 4)"
                 fill="#1f7a5e" stroke={ink} strokeWidth="1" />
        {/* Head */}
        <circle cx="14" cy="17" r="11" fill="#46c08a" stroke={ink} strokeWidth="1.5" />
        {/* Eye */}
        <circle cx="18" cy="15" r="4" fill="#ffffff" stroke={ink} strokeWidth="1.2" />
        <circle cx="19.5" cy="15.8" r="2" fill={ink} />
        <circle cx="20.5" cy="14.8" r="0.8" fill="#ffffff" />
        {/* Beak */}
        <path d="M24 13 Q30 14 30 17 Q29 20 25 20 Q23 18 23 15 Q23 13 24 13 Z"
              fill="#f7a93c" stroke="#c97a1e" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

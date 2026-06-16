'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Article, Level } from '@/content/learn/types'
import { useLearnProgress } from '@/lib/learn-progress'

const XP_LEVELS = [
  { min: 0,    label: 'Skin Curious',      emoji: '🌱' },
  { min: 100,  label: 'Skin Aware',        emoji: '💧' },
  { min: 300,  label: 'Barrier Builder',   emoji: '🧱' },
  { min: 600,  label: 'Ingredient Analyst', emoji: '🔬' },
  { min: 1000, label: 'Derm Scholar',      emoji: '📚' },
  { min: 1500, label: 'Skin Strategist',   emoji: '⭐' },
]

function getXpLevel(xp: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].min) return XP_LEVELS[i]
  }
  return XP_LEVELS[0]
}

function getNextLevel(xp: number) {
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (XP_LEVELS[i].min > xp) return XP_LEVELS[i]
  }
  return null
}

const LEVELS: { value: Level; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const READ_TIMES = [
  { value: 'all', label: 'Any length' },
  { value: 'short', label: 'Under 6 min' },
  { value: 'long', label: '6 min +' },
] as const

const LEVEL_BADGE: Record<Level, string> = {
  beginner: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  intermediate: 'text-amber-700 bg-amber-50 border-amber-200',
  advanced: 'text-rose-700 bg-rose-50 border-rose-200',
}

export function ResourceLibrary({
  articles,
  topics,
}: {
  articles: Article[]
  topics: string[]
}) {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [topic, setTopic] = useState<string>('all')
  const [readTime, setReadTime] = useState<(typeof READ_TIMES)[number]['value']>('all')

  const { completed, hydrated } = useLearnProgress()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (level !== 'all' && a.level !== level) return false
      if (topic !== 'all' && a.topic !== topic) return false
      if (readTime === 'short' && a.readingMinutes >= 6) return false
      if (readTime === 'long' && a.readingMinutes < 6) return false
      if (
        q &&
        !a.title.toLowerCase().includes(q) &&
        !a.summary.toLowerCase().includes(q) &&
        !a.topic.toLowerCase().includes(q)
      )
        return false
      return true
    })
  }, [articles, query, level, topic, readTime])

  const completedArticles = hydrated ? articles.filter((a) => completed.has(a.slug)) : []
  const completedCount = completedArticles.length
  const totalXp = hydrated ? completedArticles.reduce((sum, a) => sum + a.xpReward, 0) : 0
  const maxXp = articles.reduce((sum, a) => sum + a.xpReward, 0)
  const pct = Math.round((completedCount / articles.length) * 100)
  const currentLevel = hydrated ? getXpLevel(totalXp) : XP_LEVELS[0]
  const nextLevel = hydrated ? getNextLevel(totalXp) : XP_LEVELS[1]
  const xpToNext = nextLevel ? nextLevel.min - totalXp : 0
  const xpPct = nextLevel
    ? Math.round(((totalXp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
    : 100

  return (
    <div>
      {/* Progress / XP dashboard */}
      <div className="glass relative mb-8 overflow-hidden rounded-2xl p-5">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Level badge */}
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl">
              {currentLevel.emoji}
            </span>
            <div>
              <p className="font-semibold text-ink">{currentLevel.label}</p>
              <p className="text-xs text-muted">
                {hydrated
                  ? `${totalXp.toLocaleString()} XP earned · ${completedCount} of ${articles.length} lessons`
                  : 'Progress saved on this device'}
              </p>
            </div>
          </div>
          {/* XP to next level */}
          {hydrated && nextLevel && (
            <div className="text-right text-xs text-muted">
              <p className="font-medium text-ink">{nextLevel.emoji} {nextLevel.label}</p>
              <p>{xpToNext} XP to unlock</p>
            </div>
          )}
          {hydrated && !nextLevel && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-paper">Max level!</span>
          )}
        </div>
        {/* XP bar */}
        <div className="relative z-10 mt-4 h-2 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#27705f] transition-all duration-500"
            style={{ width: hydrated ? `${xpPct}%` : '0%' }}
          />
        </div>
        {/* Article progress secondary */}
        {hydrated && (
          <p className="relative z-10 mt-2 text-right text-[0.7rem] text-muted">
            {pct}% of lessons complete · {maxXp.toLocaleString()} XP total available
          </p>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" fill="none" />
          <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, topics…"
          aria-label="Search the resource library"
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <FilterGroup
          options={[{ value: 'all', label: 'All levels' }, ...LEVELS]}
          value={level}
          onChange={(v) => setLevel(v as Level | 'all')}
        />
        <span className="hidden h-5 w-px bg-line sm:block" />
        <FilterGroup
          options={[
            { value: 'all', label: 'All topics' },
            ...topics.map((t) => ({ value: t, label: t })),
          ]}
          value={topic}
          onChange={setTopic}
        />
        <span className="hidden h-5 w-px bg-line sm:block" />
        <FilterGroup
          options={READ_TIMES.map((r) => ({ value: r.value, label: r.label }))}
          value={readTime}
          onChange={(v) => setReadTime(v as (typeof READ_TIMES)[number]['value'])}
        />
      </div>

      {/* Results */}
      <p className="mb-4 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((a) => {
            const done = hydrated && completed.has(a.slug)
            return (
              <div
                key={a.slug}
                className="glass iris iris-hover group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium ${LEVEL_BADGE[a.level]}`}
                  >
                    {a.level}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.7rem] font-medium text-accent/80">
                      +{a.xpReward} XP
                    </span>
                    {done && (
                      <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-accent">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6.2l2.2 2.2 4.8-5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Done
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/learn/${a.slug}`} className="block">
                  <h3 className="mb-1.5 text-lg font-semibold text-ink group-hover:text-accent transition-colors">{a.title}</h3>
                </Link>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {a.summary}
                </p>
                {/* External sources */}
                {a.externalSources?.length ? (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {a.externalSources.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-sand/60 px-2.5 py-0.5 text-[0.7rem] font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        ↗ {s.source}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{a.topic}</span>
                  <span>·</span>
                  <span>{a.readingMinutes} min read</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass relative overflow-hidden rounded-2xl py-16 text-center text-muted">
          <p className="text-lg">No articles match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setLevel('all')
              setTopic('all')
              setReadTime('all')
            }}
            className="mt-3 text-sm font-medium text-accent hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? 'bg-accent text-paper'
                : 'border border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

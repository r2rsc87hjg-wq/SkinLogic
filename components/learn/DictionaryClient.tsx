'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { GLOSSARY_LIST, type GlossaryCategory } from '@/content/learn/glossary'

const ALL_CATEGORIES: GlossaryCategory[] = [
  'Ingredient',
  'Condition',
  'Anatomy',
  'Mechanism',
  'Product Type',
  'Treatment',
  'Measurement',
]

const CATEGORY_COLORS: Record<GlossaryCategory, string> = {
  Ingredient: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Condition: 'bg-rose-50 text-rose-700 border-rose-200',
  Anatomy: 'bg-violet-50 text-violet-700 border-violet-200',
  Mechanism: 'bg-sky-50 text-sky-700 border-sky-200',
  'Product Type': 'bg-amber-50 text-amber-700 border-amber-200',
  Treatment: 'bg-orange-50 text-orange-700 border-orange-200',
  Measurement: 'bg-slate-100 text-slate-600 border-slate-200',
}

export function DictionaryClient() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return GLOSSARY_LIST.filter((entry) => {
      const matchesCat = activeCategory === 'All' || entry.category === activeCategory
      const matchesQuery =
        !q ||
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [query, activeCategory])

  // Group into alphabetical sections
  const sections = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const entry of filtered) {
      const letter = entry.term[0].toUpperCase()
      if (!map.has(letter)) map.set(letter, [])
      map.get(letter)!.push(entry)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const alphabet = useMemo(() => Array.from(new Set(sections.map(([l]) => l))), [sections])

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg pointer-events-none">🔍</span>
        <input
          type="search"
          placeholder="Search terms or definitions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-line bg-surface pl-12 pr-5 py-3.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-lg"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
            activeCategory === 'All'
              ? 'bg-accent text-paper border-accent shadow-soft'
              : 'border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
          }`}
        >
          All ({GLOSSARY_LIST.length})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = GLOSSARY_LIST.filter((e) => e.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? 'All' : cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-paper border-accent shadow-soft'
                  : 'border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Alphabet jump bar — hidden when searching */}
      {!query && sections.length > 4 && (
        <div className="flex flex-wrap gap-1.5">
          {alphabet.map((letter) => (
            <a
              key={letter}
              href={`#dict-${letter}`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Result count when filtering */}
      {(query || activeCategory !== 'All') && (
        <p className="text-sm text-muted">
          {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
          {query ? ` for "${query}"` : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>
      )}

      {/* Empty state */}
      {sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line py-14 text-center">
          <p className="text-muted">No terms match that search.</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('All') }}
            className="mt-3 text-sm font-medium text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Alphabetical sections */}
      <div className="space-y-10">
        {sections.map(([letter, entries]) => (
          <section key={letter} id={`dict-${letter}`}>
            <h2 className="mb-5 font-display text-3xl font-semibold text-ink/20 scroll-mt-24">
              {letter}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="glass rounded-2xl p-5 flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-ink leading-tight">{entry.term}</h3>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${CATEGORY_COLORS[entry.category]}`}
                    >
                      {entry.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{entry.definition}</p>
                  {entry.relatedSlug && (
                    <Link
                      href={`/learn/${entry.relatedSlug}`}
                      className="mt-auto inline-flex items-center text-xs font-medium text-accent hover:underline"
                    >
                      Read the full guide →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

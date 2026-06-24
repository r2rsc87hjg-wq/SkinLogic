'use client'

import { useState, useMemo } from 'react'
import { IngredientCard } from '@/components/ingredient-card'

interface IngredientListItem {
  _id: string
  name: string
  slug: string
  summary: string
  studyTypes?: string[]
  category?: string
}

interface IngredientSearchProps {
  ingredients: IngredientListItem[]
}

const CATEGORY_FILTERS = [
  { id: 'all',         label: 'All',          icon: '◈' },
  { id: 'anti-aging',  label: 'Anti-aging',   icon: '↺' },
  { id: 'brightening', label: 'Brightening',  icon: '✦' },
  { id: 'exfoliant',   label: 'Exfoliants',   icon: '◦' },
  { id: 'humectant',   label: 'Humectants',   icon: '≋' },
  { id: 'barrier',     label: 'Barrier',      icon: '⬡' },
  { id: 'acne',        label: 'Acne',         icon: '⊕' },
  { id: 'antioxidant', label: 'Antioxidants', icon: '❋' },
  { id: 'soothing',    label: 'Soothing',     icon: '∿' },
]

export function IngredientSearch({ ingredients }: IngredientSearchProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // Only show categories that have at least one ingredient
  const availableCategories = useMemo(() => {
    const catSet = new Set(ingredients.map((i) => i.category).filter(Boolean))
    return CATEGORY_FILTERS.filter(
      (c) => c.id === 'all' || catSet.has(c.id)
    )
  }, [ingredients])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ingredients.filter((i) => {
      const matchesQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
      const matchesCategory =
        activeCategory === 'all' || i.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [query, activeCategory, ingredients])

  return (
    <div>
      {/* Category filter chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        {availableCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all inline-flex items-center gap-1.5',
              activeCategory === cat.id
                ? 'bg-accent text-white shadow-sm'
                : 'glass-quiet text-ink/70 hover:text-ink',
            ].join(' ')}
          >
            <span className="text-[0.7rem] leading-none" aria-hidden>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="mb-6">
        <label htmlFor="ingredient-search" className="sr-only">
          Search ingredients
        </label>
        <div className="glass relative overflow-hidden rounded-full">
          <input
            id="ingredient-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ingredients — e.g. niacinamide, retinol, SPF..."
            className="relative z-10 w-full rounded-full bg-transparent px-5 py-3.5 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/60"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {(query || activeCategory !== 'all') && (
          <p className="mt-2 text-sm text-muted">
            {filtered.length === 0
              ? 'No ingredients matched.'
              : `${filtered.length} ingredient${filtered.length === 1 ? '' : 's'}`}
          </p>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              name={ingredient.name}
              slug={ingredient.slug}
              summary={ingredient.summary}
              studyTypes={ingredient.studyTypes}
              category={ingredient.category}
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl py-12 text-center text-muted">
          <p>No ingredients matched that filter.</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('all') }}
            className="mt-3 text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { IngredientCard } from '@/components/ingredient-card'

interface IngredientListItem {
  _id: string
  name: string
  slug: string
  summary: string
  studyTypes?: string[]
}

interface IngredientSearchProps {
  ingredients: IngredientListItem[]
}

export function IngredientSearch({ ingredients }: IngredientSearchProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ingredients
    return ingredients.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q)
    )
  }, [query, ingredients])

  return (
    <div>
      <div className="mb-8">
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
        {query && (
          <p className="mt-2 text-sm text-muted">
            {filtered.length === 0
              ? 'No ingredients matched that search.'
              : `${filtered.length} ingredient${filtered.length === 1 ? '' : 's'} found`}
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
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

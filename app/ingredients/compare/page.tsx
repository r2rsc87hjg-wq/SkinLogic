import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { INGREDIENTS_LIST_QUERY } from '@/lib/queries'
import { SEED_INGREDIENTS } from '@/content/seed/ingredients'
import { IngredientCompareClient } from '@/components/ingredients/IngredientCompareClient'

export const metadata: Metadata = {
  title: 'Ingredient Comparison',
  description:
    'Side-by-side evidence comparison of any two skincare actives — mechanism, evidence quality, what they work well with, and whether you can use both.',
}

export const revalidate = 3600

interface IngredientListItem {
  _id: string
  name: string
  slug: string
}

export default async function IngredientComparePage() {
  const cmsIngredients = await sanityFetch<IngredientListItem[]>(
    INGREDIENTS_LIST_QUERY,
    {},
    ['ingredient']
  )

  const cmsSlugs = new Set((cmsIngredients ?? []).map((i) => i.slug))
  const ingredients: IngredientListItem[] = [
    ...(cmsIngredients ?? []),
    ...SEED_INGREDIENTS.filter((s) => !cmsSlugs.has(s.slug)),
  ].sort((a, b) => a.name.localeCompare(b.name))

  const names = ingredients.map((i) => i.name)

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-accent/18 blur-[120px]" />
        <div className="absolute top-52 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/16 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <header className="mb-10">
          <p className="eyebrow text-accent mb-3">Evidence-based reference</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
            Ingredient Comparison
          </h1>
          <p className="text-muted max-w-2xl leading-relaxed text-lg">
            Pick any two actives and see them compared side-by-side — mechanism,
            evidence quality, what they work well with, and whether you can use
            both in the same routine.
          </p>
        </header>

        <IngredientCompareClient ingredients={names} />
      </div>
    </main>
  )
}

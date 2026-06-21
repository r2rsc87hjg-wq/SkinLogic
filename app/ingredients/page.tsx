import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { INGREDIENTS_LIST_QUERY } from '@/lib/queries'
import { IngredientSearch } from '@/components/search/IngredientSearch'
import { SEED_INGREDIENTS } from '@/content/seed/ingredients'

export const metadata: Metadata = {
  title: 'Ingredient Explainer',
  description:
    'What the research actually says about 30 skincare actives — plain English, cited sources, zero marketing.',
}

// Revalidate once per hour. Content editors update via Sanity Studio;
// the page auto-refreshes without a redeploy.
export const revalidate = 3600

interface IngredientListItem {
  _id: string
  name: string
  slug: string
  summary: string
  studyTypes?: string[]
}

export default async function IngredientsPage() {
  const cmsIngredients = await sanityFetch<IngredientListItem[]>(
    INGREDIENTS_LIST_QUERY,
    {},
    ['ingredient']
  )

  // Merge: CMS entries take precedence; seed fills any slug not yet in Sanity.
  const cmsSlugs = new Set((cmsIngredients ?? []).map((i) => i.slug))
  const ingredients: IngredientListItem[] = [
    ...(cmsIngredients ?? []),
    ...SEED_INGREDIENTS.filter((s) => !cmsSlugs.has(s.slug)),
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="relative overflow-hidden">
      {/* Ambient liquid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-8%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/22 blur-[120px]" />
        <div className="absolute top-[44rem] right-[12%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/16 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <header className="mb-10">
          <p className="eyebrow text-accent mb-3">Evidence-based reference</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
            Ingredient Explainer
          </h1>
          <p className="text-muted max-w-2xl leading-relaxed text-lg">
            Plain English breakdowns of 30 skincare actives. Not what to buy —
            what the research actually says, what concentrations are
            evidence-based, and what brands commonly overstate. Every claim is
            cited.
          </p>

          <div className="glass relative overflow-hidden rounded-2xl mt-6 p-5 text-sm text-ink/80 max-w-2xl">
            <p className="relative z-10">
              <strong className="text-ink">
                How to read the evidence badges:
              </strong>{' '}
              Human clinical trials carry the most weight for skincare claims.
              Animal and in-vitro studies can show a mechanism exists — they
              cannot confirm it works the same way in living human skin. We
              always tell you which type of evidence a claim rests on.
            </p>
          </div>

          <div className="mt-4 max-w-2xl">
            <Link
              href="/ingredients/compare"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-2"
            >
              Compare two ingredients side-by-side →
            </Link>
          </div>
        </header>

        {ingredients.length ? (
          <IngredientSearch ingredients={ingredients} />
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  )
}

function EmptyState() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl text-center py-20 text-muted">
      <p className="text-lg">No ingredients have been added to the CMS yet.</p>
      <p className="text-sm mt-2">
        Add ingredients in the Sanity Studio to populate this library.
      </p>
    </div>
  )
}

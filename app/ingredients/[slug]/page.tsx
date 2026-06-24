import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import {
  INGREDIENT_BY_SLUG_QUERY,
  INGREDIENT_SLUGS_QUERY,
} from '@/lib/queries'
import { PortableText } from '@/components/portable-text'
import { CitationList } from '@/components/citation'
import { StudyTypeLegend } from '@/components/study-type-badge'
import { SkinDiagram } from '@/components/ingredients/SkinDiagram'
import type { Ingredient } from '@/types'
import { SEED_INGREDIENTS } from '@/content/seed/ingredients'

export const revalidate = 3600

interface Props {
  // Next.js 16: params is a Promise and must be awaited before use.
  params: Promise<{ slug: string }>
}

// Pre-generates static pages for all known ingredient slugs at build time,
// including seed ingredients so they never 404.
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(INGREDIENT_SLUGS_QUERY)
  const cmsSlugs = (slugs ?? []).map(({ slug }) => ({ slug }))
  const cmsSlugSet = new Set(cmsSlugs.map((s) => s.slug))
  const seedSlugs = SEED_INGREDIENTS
    .filter((s) => !cmsSlugSet.has(s.slug))
    .map((s) => ({ slug: s.slug }))
  return [...cmsSlugs, ...seedSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ingredient = await sanityFetch<Ingredient>(
    INGREDIENT_BY_SLUG_QUERY,
    { slug },
    ['ingredient']
  )
  if (ingredient) return { title: ingredient.name, description: ingredient.summary }
  const seed = SEED_INGREDIENTS.find((s) => s.slug === slug)
  if (seed) return { title: seed.name, description: seed.summary }
  return { title: 'Ingredient Not Found' }
}

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ingredient = await sanityFetch<Ingredient>(
    INGREDIENT_BY_SLUG_QUERY,
    { slug },
    ['ingredient']
  )

  // Fall back to seed data when the ingredient isn't yet in Sanity CMS.
  if (!ingredient) {
    const seed = SEED_INGREDIENTS.find((s) => s.slug === slug)
    if (!seed) notFound()
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <Link href="/ingredients" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← All ingredients
          </Link>
        </nav>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{seed.name}</h1>
          {seed.studyTypes?.length ? (
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Evidence types available</p>
              <StudyTypeLegend types={seed.studyTypes} />
            </div>
          ) : null}
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-4">
            {seed.summary}
          </p>
        </header>
        <SkinDiagram slug={seed.slug} />
        <p className="text-sm text-gray-400 mt-10">
          Full cited breakdown coming soon. In the meantime the summary above reflects the current research.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link
          href="/ingredients"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← All ingredients
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {ingredient.name}
        </h1>
        {ingredient.studyTypes?.length ? (
          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Evidence types available
            </p>
            <StudyTypeLegend types={ingredient.studyTypes} />
          </div>
        ) : null}
        <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-4">
          {ingredient.summary}
        </p>
      </header>

      <SkinDiagram slug={slug} />

      <div className="space-y-10 divide-y divide-gray-100 mt-10">

        {/* Biological mechanism */}
        {ingredient.biologicalMechanism?.length ? (
          <Section title="What it does at a biological level">
            <PortableText value={ingredient.biologicalMechanism as any} />
          </Section>
        ) : null}

        {/* Research summary */}
        {ingredient.researchSummary?.length ? (
          <Section title="What the research actually shows">
            <EvidenceNote types={ingredient.studyTypes} />
            <PortableText value={ingredient.researchSummary as any} />
          </Section>
        ) : null}

        {/* Evidence-based concentration */}
        {ingredient.evidenceBasedConcentration ? (
          <Section title="Evidence-based concentration">
            <p className="text-gray-700 leading-relaxed">
              {ingredient.evidenceBasedConcentration}
            </p>
          </Section>
        ) : null}

        {/* Marketing claims */}
        {ingredient.marketingClaims?.length ? (
          <Section title="What brands commonly exaggerate">
            <PortableText value={ingredient.marketingClaims as any} />
          </Section>
        ) : null}

        {/* Honest verdict */}
        {ingredient.honestVerdict ? (
          <Section title="Honest bottom line">
            <p className="text-gray-700 leading-relaxed font-medium">
              {ingredient.honestVerdict}
            </p>
          </Section>
        ) : null}

        {/* Related ingredients */}
        {ingredient.relatedIngredients?.length ? (
          <Section title="Related ingredients">
            <ul className="space-y-3">
              {ingredient.relatedIngredients.map((r) => (
                <li key={r.slug?.current ?? r.name}>
                  <Link
                    href={`/ingredients/${r.slug?.current}`}
                    className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
                  >
                    {r.name}
                  </Link>
                  {r.summary ? (
                    <p className="text-sm text-gray-500 mt-0.5">{r.summary}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Citations */}
        {ingredient.citations?.length ? (
          <div className="pt-10">
            <CitationList citations={ingredient.citations} />
          </div>
        ) : null}

      </div>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="pt-8 first:pt-0">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

// Inline note explaining why the study type matters — shown only on the
// research section so users understand what they are reading.
function EvidenceNote({ types }: { types?: string[] }) {
  if (!types?.length) return null

  const hasHuman = types.includes('Human clinical trial')
  const hasAnimal = types.includes('Animal')
  const hasInVitro = types.includes('In vitro')

  const notes: string[] = []
  if (hasHuman) notes.push('human clinical trials (highest weight for skincare claims)')
  if (hasAnimal) notes.push('animal studies (can show mechanism, cannot confirm effect in human skin)')
  if (hasInVitro) notes.push('in-vitro studies (lab conditions only — useful for early-stage research)')

  if (!notes.length) return null

  return (
    <p className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded p-3 mb-4 leading-relaxed">
      Evidence for this ingredient includes {notes.join(', and ')}.
    </p>
  )
}

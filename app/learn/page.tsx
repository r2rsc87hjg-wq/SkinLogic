import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES, ALL_TOPICS } from '@/content/learn/articles'
import { GLOSSARY_LIST } from '@/content/learn/glossary'
import { ResourceLibrary } from '@/components/learn/ResourceLibrary'
import { GuidedLearning } from '@/components/learn/GuidedLearning'

export const metadata: Metadata = {
  title: 'Learning Hub — Skincare Education',
  description:
    'A structured, searchable library of plain-English skincare education — from first routines to ingredient science, sorted by level and reading time.',
  alternates: { canonical: '/learn' },
}

// Sorted newest-first so the library leads with fresh content; the client
// component re-sorts by relevance as the user searches.
const sortedArticles = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published)
)

// ItemList schema helps search engines understand this as a content collection.
function collectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SkinLogic Learning Hub',
    description:
      'A structured, searchable library of evidence-based skincare education.',
    hasPart: ARTICLES.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      description: a.summary,
      url: `/learn/${a.slug}`,
    })),
  }
}

export default function LearnHubPage() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd()) }}
      />

      {/* Ambient liquid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-8%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/22 blur-[120px]" />
        <div className="absolute top-[48rem] right-[12%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/16 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3 text-accent">Knowledge Center</p>
          <h1 className="mb-4 font-display text-4xl font-medium text-ink md:text-5xl">
            Learning Hub
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Skincare, taught properly — clear, cited, and free of marketing.
            Start with the fundamentals or go deep on the science. Track what
            you have read, and test yourself as you go.
          </p>
        </header>

        {/* Interactive guided learning */}
        <div className="mb-12">
          <GuidedLearning />
        </div>

        <ResourceLibrary articles={sortedArticles} topics={ALL_TOPICS} />

        {/* Dictionary preview */}
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Skin Dictionary
            </h2>
            <Link
              href="/learn/dictionary"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all {GLOSSARY_LIST.length} terms →
            </Link>
          </div>
          <p className="mb-6 text-muted text-sm max-w-xl">
            Every term you will encounter in skincare — ingredients, conditions,
            anatomy, and mechanisms — defined plainly and linked to the full
            guide.
          </p>
          {/* Show first 8 terms as a teaser */}
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {GLOSSARY_LIST.slice(0, 8).map((g) => (
              <div key={g.id} className="border-l-2 border-accent/30 pl-4">
                <dt className="font-semibold text-ink">{g.term}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-muted line-clamp-2">
                  {g.definition}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 text-center">
            <Link
              href="/learn/dictionary"
              className="inline-flex items-center rounded-full border border-accent/30 px-6 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/5 hover:-translate-y-0.5"
            >
              Open the full dictionary ({GLOSSARY_LIST.length} terms) →
            </Link>
          </div>
        </section>

        {/* Cross-link to tools */}
        <section className="mt-20 rounded-2xl bg-ink px-6 py-12 text-paper shadow-lift md:px-12">
          <p className="eyebrow mb-3 text-paper/60">Put it into practice</p>
          <h2 className="max-w-2xl font-display text-2xl font-medium text-paper md:text-3xl">
            Ready to apply what you have learned?
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            Translate the research into what is relevant for your specific skin
            profile, or browse the cited ingredient explainers.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/profiler"
              className="inline-flex items-center rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Try the Skin Profiler
            </Link>
            <Link
              href="/ingredients"
              className="inline-flex items-center rounded-full border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
            >
              Browse ingredients
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

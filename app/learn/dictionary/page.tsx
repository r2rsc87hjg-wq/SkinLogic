import type { Metadata } from 'next'
import { GLOSSARY_LIST } from '@/content/learn/glossary'
import { DictionaryClient } from '@/components/learn/DictionaryClient'

export const metadata: Metadata = {
  title: 'Skin Dictionary — SkinLogic',
  description:
    'Plain-English definitions for every skincare term that matters — ingredients, conditions, anatomy, and mechanisms. Searchable and filterable.',
  alternates: { canonical: '/learn/dictionary' },
}

function dictionaryJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'SkinLogic Skin Dictionary',
    description: 'A comprehensive glossary of skin health and skincare terms.',
    hasDefinedTerm: GLOSSARY_LIST.map((entry) => ({
      '@type': 'DefinedTerm',
      name: entry.term,
      description: entry.definition,
      inDefinedTermSet: 'https://skinlogic.com/learn/dictionary',
    })),
  }
}

export default function DictionaryPage() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dictionaryJsonLd()) }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-8%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/22 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3 text-accent">Learning Hub</p>
          <h1 className="mb-4 font-display text-4xl font-medium text-ink md:text-5xl">
            Skin Dictionary
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Every term you will encounter in skincare — ingredients, conditions,
            anatomy, and the underlying biology — defined plainly and linked to
            the full guide where one exists.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-ink">{GLOSSARY_LIST.length} terms</span>
            <span className="text-muted">·</span>
            <span className="text-sm text-muted">7 categories</span>
            <span className="text-muted">·</span>
            <a href="/learn" className="text-sm text-accent hover:underline">← Back to Learning Hub</a>
          </div>
        </header>

        <DictionaryClient />
      </div>
    </main>
  )
}

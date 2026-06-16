import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import {
  SCANNER_BY_SLUG_QUERY,
  SCANNER_SLUGS_QUERY,
} from '@/lib/queries'
import { PortableText } from '@/components/portable-text'
import { CitationList } from '@/components/citation'
import { VerdictBadge } from '@/components/scanner/VerdictBadge'
import type { VerdictRating } from '@/components/scanner/VerdictBadge'

export const revalidate = 3600

interface AppScanner {
  _id: string
  name: string
  slug: string
  technology?: string
  whatItActuallyDoes?: unknown[]
  researchAccuracy?: unknown[]
  knownLimitations?: unknown[]
  conflictOfInterest?: unknown[]
  verdictRating?: VerdictRating
  verdict?: string
  worthItFor?: string[]
  notForYouIf?: string[]
  citations?: { label: string; url: string }[]
}

interface Props {
  // Next.js 16: params is a Promise and must be awaited before use.
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(SCANNER_SLUGS_QUERY)
  return (slugs ?? []).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const scanner = await sanityFetch<AppScanner>(
    SCANNER_BY_SLUG_QUERY,
    { slug },
    ['appScanner']
  )
  if (!scanner) return { title: 'App Not Found' }
  return {
    title: `${scanner.name} — Honest Review`,
    description: scanner.verdict ?? `An independent breakdown of ${scanner.name}: what it actually does, what the research says, and whether it's worth your money.`,
  }
}

export default async function ScannerPage({ params }: Props) {
  const { slug } = await params
  const scanner = await sanityFetch<AppScanner>(
    SCANNER_BY_SLUG_QUERY,
    { slug },
    ['appScanner']
  )

  if (!scanner) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link
          href="/app-scanner-comparison"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← All apps & scanners
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Independent breakdown
        </p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{scanner.name}</h1>
          {scanner.verdictRating && (
            <VerdictBadge rating={scanner.verdictRating} size="md" />
          )}
        </div>
        {scanner.technology && (
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Technology: </span>
            {scanner.technology}
          </p>
        )}
      </header>

      <div className="space-y-10 divide-y divide-gray-100">

        {/* What it actually does */}
        {scanner.whatItActuallyDoes?.length ? (
          <Section title="What it actually does technically">
            <PortableText value={scanner.whatItActuallyDoes as any} />
          </Section>
        ) : null}

        {/* Research accuracy */}
        {scanner.researchAccuracy?.length ? (
          <Section title="What peer-reviewed research says about accuracy">
            <PortableText value={scanner.researchAccuracy as any} />
          </Section>
        ) : null}

        {/* Known limitations */}
        {scanner.knownLimitations?.length ? (
          <Section title="Known limitations the company doesn't advertise">
            <PortableText value={scanner.knownLimitations as any} />
          </Section>
        ) : null}

        {/* Conflict of interest */}
        {scanner.conflictOfInterest?.length ? (
          <Section title="Who funded the studies they cite">
            <div className="mb-3 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded p-3 leading-relaxed">
              Funding source transparency is a standard part of our review.
              Company-funded research is not automatically invalid, but it
              warrants closer scrutiny. We note it here so you can weigh the
              evidence yourself.
            </div>
            <PortableText value={scanner.conflictOfInterest as any} />
          </Section>
        ) : null}

        {/* Verdict */}
        {(scanner.verdict || scanner.verdictRating) && (
          <Section title="Plain English verdict">
            {scanner.verdictRating && (
              <div className="mb-4">
                <VerdictBadge rating={scanner.verdictRating} size="md" />
              </div>
            )}
            {scanner.verdict && (
              <p className="text-gray-700 leading-relaxed">{scanner.verdict}</p>
            )}

            {(scanner.worthItFor?.length || scanner.notForYouIf?.length) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                {scanner.worthItFor?.length ? (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      Worth it if you want
                    </p>
                    <ul className="space-y-1.5">
                      {scanner.worthItFor.map((item) => (
                        <li key={item} className="flex gap-2 text-gray-700">
                          <span className="text-green-500 shrink-0 mt-0.5">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {scanner.notForYouIf?.length ? (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      Not worth it if
                    </p>
                    <ul className="space-y-1.5">
                      {scanner.notForYouIf.map((item) => (
                        <li key={item} className="flex gap-2 text-gray-700">
                          <span className="text-red-400 shrink-0 mt-0.5">−</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </Section>
        )}

        {/* Citations */}
        {scanner.citations?.length ? (
          <div className="pt-10">
            <CitationList citations={scanner.citations} />
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

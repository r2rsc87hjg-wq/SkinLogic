import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { SCANNERS_LIST_QUERY } from '@/lib/queries'
import { ScannerCard } from '@/components/scanner/ScannerCard'
import type { VerdictRating } from '@/components/scanner/VerdictBadge'
import { VerdictBadge } from '@/components/scanner/VerdictBadge'
import { SEED_SCANNERS } from '@/content/seed/scanners'

export const metadata: Metadata = {
  title: 'Skincare App & Scanner Comparison',
  description:
    'An honest audit of what skincare apps and scanners actually do, what the research says about their accuracy, and whether they are worth your money.',
}

export const revalidate = 3600

interface ScannerListItem {
  _id: string
  name: string
  slug: string
  technology?: string
  verdictRating?: VerdictRating
  verdict?: string
  worthItFor?: string[]
  notForYouIf?: string[]
}

const VERDICT_ORDER: VerdictRating[] = [
  'worth-it',
  'depends',
  'limited',
  'not-recommended',
]

export default async function AppScannerComparisonPage() {
  const cmsScanners = await sanityFetch<ScannerListItem[]>(
    SCANNERS_LIST_QUERY,
    {},
    ['appScanner']
  )

  // Merge: CMS entries take precedence; seed fills any slug not yet in Sanity.
  const cmsSlugs = new Set((cmsScanners ?? []).map((s) => s.slug))
  const scanners: ScannerListItem[] = [
    ...(cmsScanners ?? []),
    ...SEED_SCANNERS.filter((s) => !cmsSlugs.has(s.slug)),
  ]

  // Group by verdict rating so readers can scan by outcome
  const groups = VERDICT_ORDER.map((rating) => ({
    rating,
    items: scanners.filter((s) => s.verdictRating === rating),
  })).filter((g) => g.items.length > 0)

  const unrated = scanners.filter((s) => !s.verdictRating)

  return (
    <main className="relative overflow-hidden">
      {/* Ambient liquid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-12%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-52 left-[-14%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/20 blur-[120px]" />
        <div className="absolute top-[48rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/16 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <header className="mb-10">
          <p className="eyebrow text-accent mb-2">Accountability audit</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
            Skincare App &amp; Scanner Comparison
          </h1>
          <p className="text-muted leading-relaxed mb-6 text-lg">
            Skincare apps and face scanners promise personalised analysis,
            AI-powered diagnosis, and science-backed recommendations. This is an
            audit of what they actually deliver — technically, clinically, and
            commercially — versus what they claim.
          </p>

          <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm text-ink/80 leading-relaxed">
            <p className="relative z-10">
              <strong className="text-ink">How we evaluated each tool:</strong>{' '}
              We assessed what the technology actually does (not what the
              marketing says), what peer-reviewed research exists on its
              accuracy, what limitations the company doesn&apos;t disclose, and
              who funded any studies they cite. Verdict ratings reflect our
              independent assessment — not paid placements, not affiliate
              relationships.
            </p>
          </div>
        </header>

        {/* Verdict legend */}
        <div className="mb-10">
          <p className="eyebrow text-muted mb-3">Verdict key</p>
          <div className="flex flex-wrap gap-2">
            {VERDICT_ORDER.map((r) => (
              <VerdictBadge key={r} rating={r} />
            ))}
          </div>
        </div>

        {scanners.length ? (
          <>
            <CategoryContrast />
            <ComparisonTable scanners={scanners} />
            <div className="space-y-12">
              {groups.map(({ rating, items }) => (
                <section key={rating}>
                  <div className="flex items-center gap-3 mb-5">
                    <VerdictBadge rating={rating} size="md" />
                    <span className="text-sm text-muted">
                      {items.length} tool{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {items.map((scanner) => (
                      <ScannerCard key={scanner._id} {...scanner} />
                    ))}
                  </div>
                </section>
              ))}

              {unrated.length > 0 && (
                <section>
                  <p className="eyebrow text-muted mb-5">Pending full review</p>
                  <div className="space-y-4">
                    {unrated.map((scanner) => (
                      <ScannerCard key={scanner._id} {...scanner} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        ) : (
          <EmptyState />
        )}

        <footer className="mt-16 pt-8 border-t border-line">
          <h2 className="eyebrow text-muted mb-3">Methodology</h2>
          <p className="text-sm text-muted leading-relaxed">
            Each tool is evaluated on publicly available technical documentation,
            peer-reviewed research on the underlying technology (sourced from
            PubMed, the Journal of the American Academy of Dermatology, and the
            British Journal of Dermatology), independent dermatologist
            commentary, and disclosure analysis of funding sources for any
            studies cited by the company. We do not accept sponsored placements,
            free trials given in exchange for positive coverage, or affiliate
            arrangements that affect editorial judgement.
          </p>
        </footer>
      </div>
    </main>
  )
}

// Contrasting editorial summary by category — groups tools by what they
// actually do and explicitly compares approaches within each category.
function CategoryContrast() {
  return (
    <section className="mb-12 space-y-6">
      <h2 className="eyebrow text-muted">How to read this comparison</h2>

      {/* Category 1: Ingredient scanners */}
      <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed">
        <div className="relative z-10">
          <p className="font-semibold text-ink mb-1">
            Ingredient scanners: INCI Beauty vs. Think Dirty vs. EWG vs. CosDNA
          </p>
          <p className="text-ink/80">
            All four decode ingredient lists, but their methodologies diverge sharply. <strong>INCI Beauty</strong> is
            the most scientifically grounded — it identifies ingredients and cites regulatory status without
            assigning arbitrary safety scores. <strong>Think Dirty</strong> and <strong>EWG Skin Deep</strong> use
            hazard-based scoring that ignores concentration, making safe ingredients at trace quantities look
            dangerous — a methodology toxicologists widely criticise. <strong>CosDNA</strong>&apos;s
            comedogenicity ratings rest on 1970s rabbit-ear assays that correlate poorly with human acne.
            If you use one ingredient scanner, use INCI Beauty. Treat the others as lookup tools only, not
            as safety authorities.
          </p>
        </div>
      </div>

      {/* Category 2: Skin monitoring / lesion tools */}
      <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed">
        <div className="relative z-10">
          <p className="font-semibold text-ink mb-1">
            Skin monitoring: SkinVision vs. Miiskin
          </p>
          <p className="text-ink/80">
            <strong>SkinVision</strong> attempts AI-based risk classification of individual lesions — it has
            published clinical validation (77–80% sensitivity) and a CE medical device mark in Europe, but
            falls below the accuracy of a trained dermatologist with a proper dermoscope. It is useful as a
            monitoring supplement, not a diagnostic replacement. <strong>Miiskin</strong> makes no diagnostic
            claims at all — it is a structured photo-documentation tool for tracking moles over time. That
            restraint is its main strength. The two tools address different needs: SkinVision for initial
            risk triage (with caveats), Miiskin for ongoing documentation and appointment preparation.
          </p>
        </div>
      </div>

      {/* Category 3: Treatment / telehealth */}
      <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed">
        <div className="relative z-10">
          <p className="font-semibold text-ink mb-1">
            Treatment access: Curology vs. everything else on this page
          </p>
          <p className="text-ink/80">
            <strong>Curology</strong> is in a different category from all the other tools listed here. It
            is not an AI scanner — it is a telehealth service that connects patients with licensed
            healthcare practitioners who can prescribe. Where every other tool on this page provides
            information or analysis, Curology provides actual prescription treatment (tretinoin,
            clindamycin, azelaic acid). If your goal is treatment rather than information, Curology is
            the only tool on this page that can deliver it. If your goal is understanding ingredients or
            monitoring your skin, it is the wrong category of tool entirely.
          </p>
        </div>
      </div>

      {/* Category 4: Discontinued hardware */}
      <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed">
        <div className="relative z-10">
          <p className="font-semibold text-ink mb-1">
            A note on consumer skin scanners (hardware)
          </p>
          <p className="text-ink/80">
            The Neutrogena Skin360 scanner was discontinued without published accuracy data or FDA
            clearance. It represents a broader pattern worth watching: consumer hardware scanners with
            clinical-sounding language that reach market before peer-reviewed validation exists. Several
            similar devices have launched and been quietly withdrawn. When a brand launches a consumer
            face scanner, the key questions to ask are: Is there peer-reviewed accuracy data independent
            of the manufacturer? Has it been reviewed by any regulatory body as a medical device? If the
            answer to both is no, treat the output as entertainment, not clinical information.
          </p>
        </div>
      </div>
    </section>
  )
}

// Side-by-side "at a glance" table so readers can compare every tool on the
// same axes (type, verdict, who it's for) before opening a full profile.
function ComparisonTable({ scanners }: { scanners: ScannerListItem[] }) {
  const rank = (r?: VerdictRating) =>
    r ? VERDICT_ORDER.indexOf(r) : VERDICT_ORDER.length
  const rows = [...scanners].sort(
    (a, b) =>
      rank(a.verdictRating) - rank(b.verdictRating) ||
      a.name.localeCompare(b.name)
  )

  return (
    <section className="mb-12">
      <h2 className="eyebrow text-muted mb-3">At a glance</h2>
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-sand/40 text-left">
                <th className="px-4 py-3 font-semibold text-ink">Tool</th>
                <th className="px-4 py-3 font-semibold text-ink">What it is</th>
                <th className="px-4 py-3 font-semibold text-ink">Verdict</th>
                <th className="px-4 py-3 font-semibold text-ink">Best for</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const shortType = s.technology
                  ? s.technology.split(/[—(]/)[0].trim()
                  : '—'
                return (
                  <tr key={s._id} className="border-t border-line/60 align-top">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/app-scanner-comparison/${s.slug}`}
                        className="font-medium text-ink underline-offset-2 hover:text-accent hover:underline"
                      >
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{shortType}</td>
                    <td className="px-4 py-3">
                      {s.verdictRating ? (
                        <VerdictBadge rating={s.verdictRating} />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {s.worthItFor?.[0] ?? '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl text-center py-20 text-muted">
      <p className="text-lg">No app or scanner profiles added yet.</p>
      <p className="text-sm mt-2">
        Add entries in the Sanity Studio to populate this comparison.
      </p>
    </div>
  )
}

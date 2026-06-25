import type { Metadata } from 'next'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import {
  EvidenceSpectrum,
  RegulationGap,
  DermClaimsTable,
  InfluencerFlow,
  ComedogenicityChain,
  NaturalVsSynthetic,
  PriceVsIngredient,
} from '@/components/industry/Infographics'

export const metadata: Metadata = {
  title: 'How the Industry Works',
  description:
    'The systems, claims, and incentives behind skincare marketing — what "clinically proven" actually means, how the EU and US regulatory gap works, and what dermatologist-recommended really tells you.',
}

const SECTIONS = [
  { id: 'clinically-proven', label: '"Clinically proven"' },
  { id: 'eu-us-gap', label: 'EU vs. US regulation' },
  { id: 'derm-endorsed', label: 'Dermatologist-recommended' },
  { id: 'influencers', label: 'Influencer economics' },
  { id: 'non-comedogenic', label: 'Non-comedogenic claims' },
  { id: 'natural-vs-synthetic', label: 'Natural vs. synthetic' },
  { id: 'price-gap', label: 'Does price mean quality?' },
]

export default function IndustryPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute top-80 left-[-12%] h-[26rem] w-[26rem] rounded-full bg-[#c9b8ff]/14 blur-[120px]" />
        <div className="absolute top-[60rem] right-[8%] h-[22rem] w-[22rem] rounded-full bg-[#7ee1c8]/12 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Header */}
        <header className="mb-10 max-w-3xl">
          <p className="eyebrow text-accent mb-2">Transparency</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4 leading-tight">
            How the Industry Works
          </h1>
          <p className="text-muted leading-relaxed text-lg">
            The research behind skincare is one thing. The industry that sells it
            is another — the systems, claims, and incentives decoded.
          </p>
        </header>

        {/* Key stats */}
        <KeyStats />

        {/* Mobile TOC */}
        <nav
          aria-label="Page sections"
          className="glass relative overflow-hidden rounded-2xl mb-10 p-5 lg:hidden"
        >
          <p className="eyebrow text-muted mb-3">On this page</p>
          <ol className="space-y-1.5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-ink/80 hover:text-accent underline underline-offset-2 decoration-line"
                >
                  {i + 1}. {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-16 lg:items-start">
          <div className="space-y-3">

            {/* 01 — Clinically proven */}
            <CollapsibleSection id="clinically-proven" label='"Clinically proven" means almost nothing' sectionNumber={1}>
              <div className="space-y-4">
                <p className="text-sm text-ink/80 leading-relaxed">
                  No regulatory body in the US or EU restricts what brands can call "clinically proven" on a
                  cosmetic product. A 12-person perception survey, an unpublished internal test, or a
                  brand-funded questionnaire asking whether participants <em>felt</em> their skin looked better
                  — all can legally appear on packaging as "clinically proven."
                </p>
                <EvidenceSpectrum />
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-ink/80 leading-relaxed">
                  <strong className="text-ink">What carries weight:</strong> Independent peer-reviewed RCTs with 50+
                  participants, a control group, blinding, and no brand funding conflict. Check the active
                  ingredient and concentration — those variables have actual evidence behind them.
                </div>
              </div>
            </CollapsibleSection>

            {/* 02 — EU vs US */}
            <CollapsibleSection id="eu-us-gap" label="The EU has banned ~1,400 cosmetic ingredients. The US has restricted 11." sectionNumber={2}>
              <div className="space-y-4">
                <RegulationGap />
                <p className="text-sm text-ink/80 leading-relaxed">
                  The gap reflects regulatory philosophy, not a difference in ingredient danger. The EU applies a
                  precautionary principle — restrict first, verify later. The US requires demonstrated harm at
                  cosmetic doses before acting. A bigger EU list doesn't mean US products are unsafe.
                </p>
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm text-amber-900 leading-relaxed">
                  <strong>Parabens:</strong> EU-restricted in baby products, but the EU's own SCCS found
                  parabens at cosmetic concentrations pose no health risk. Many "paraben-free" replacements
                  have shorter safety histories. When an ingredient is EU-restricted, look at <em>why</em>.
                </div>
              </div>
            </CollapsibleSection>

            {/* 03 — Derm-endorsed */}
            <CollapsibleSection id="derm-endorsed" label='"Dermatologist recommended" is a marketing category, not a clinical standard' sectionNumber={3}>
              <div className="space-y-4">
                <DermClaimsTable />
                <p className="text-sm text-ink/80 leading-relaxed">
                  Paid dermatologist partnerships are common and legal. Product packaging carries no disclosure
                  requirement for these relationships — only social media content requires FTC disclosure.
                </p>
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-ink/80 leading-relaxed">
                  <strong className="text-ink">Meaningful vs. marketing:</strong> A dermatologist's published
                  peer-reviewed research tells you what they found. A packaging endorsement tells you they agreed
                  to be paid.
                </div>
              </div>
            </CollapsibleSection>

            {/* 04 — Influencers */}
            <CollapsibleSection id="influencers" label="How influencer skincare economics work" sectionNumber={4}>
              <div className="space-y-4">
                <InfluencerFlow />
                <p className="text-sm text-ink/80 leading-relaxed">
                  Paid partnerships and affiliate codes are required to be disclosed under FTC guidelines.
                  The deeper issue isn't disclosure — it's incentive structure. A creator whose income depends
                  on brand partnerships is structurally motivated to produce positive content regardless of
                  product quality.
                </p>
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm text-amber-900 leading-relaxed">
                  <strong>Testimonials aren't evidence.</strong> Skin changes over weeks due to diet, hormones,
                  sleep, and seasonal variation. Attributing a change to one product after 4 weeks may be sincere
                  — and still wrong about the cause.
                </div>
              </div>
            </CollapsibleSection>

            {/* 05 — Non-comedogenic */}
            <CollapsibleSection id="non-comedogenic" label='"Non-comedogenic" has no regulatory definition and no standard test' sectionNumber={5}>
              <div className="space-y-4">
                <ComedogenicityChain />
                <p className="text-sm text-ink/80 leading-relaxed">
                  The term is unregulated — brands self-apply it with their own testing, or no testing at all.
                  The most-cited underlying data comes from 1970s rabbit ear assays that dermatologists
                  widely criticise as poorly predictive of human comedone formation. Many ingredients flagged as
                  high-comedogenicity by these assays cause no acne in human clinical use.
                </p>
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-ink/80 leading-relaxed">
                  <strong className="text-ink">Most reliable test:</strong> Patch-test a new product on a small
                  area for 2–3 weeks before full-face use. Your own skin is the only assay that matters.
                </div>
              </div>
            </CollapsibleSection>

            {/* 06 — Natural vs synthetic */}
            <CollapsibleSection id="natural-vs-synthetic" label='"Natural" is a marketing category, not a safety category' sectionNumber={6}>
              <div className="space-y-4">
                <NaturalVsSynthetic />
                <p className="text-sm text-ink/80 leading-relaxed">
                  "Natural," "clean," and "green" have no regulatory definition in US cosmetics. Whether a
                  substance is safe depends on its molecular structure, concentration, and exposure route —
                  not whether it came from a plant or a lab. Some of the most evidence-backed actives in
                  skincare (retinol, niacinamide, glycolic acid) are synthesised for the purity and
                  concentration that clinical trials demonstrated efficacy at.
                </p>
              </div>
            </CollapsibleSection>

            {/* 07 — Price gap */}
            <CollapsibleSection id="price-gap" label="Does price correlate with efficacy in skincare?" sectionNumber={7}>
              <div className="space-y-4">
                <PriceVsIngredient />
                <p className="text-sm text-ink/80 leading-relaxed">
                  Active ingredients — retinoids, niacinamide, AHAs, vitamin C, ceramides — are inexpensive
                  to produce. Higher prices typically reflect brand positioning, packaging, fragrance, and
                  marketing spend. Where price can legitimately correlate with quality: formulation stability
                  for unstable actives like vitamin C and retinoids, where delivery system matters.
                </p>
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-ink/80 leading-relaxed">
                  <strong className="text-ink">How to evaluate:</strong> Check the active ingredient,
                  its concentration, and its position in the INCI list (listed highest to lowest by weight).
                  Price is not a proxy for any of this information.
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Sticky desktop TOC */}
          <aside className="hidden lg:block sticky top-24">
            <p className="eyebrow text-muted mb-3">On this page</p>
            <ol className="space-y-1.5">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors group"
                  >
                    <span className="text-xs tabular-nums text-muted/40 group-hover:text-accent/50 w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* Footer */}
        <div className="border-t border-line pt-8 mt-8">
          <p className="text-xs text-muted leading-relaxed">
            Every claim on this page is sourced from publicly available regulatory
            documentation, peer-reviewed research, or primary FTC/EU guidance.
            If you spot an error, flag it.
          </p>
        </div>
      </div>
    </main>
  )
}

// ── Key stats grid ────────────────────────────────────────────────────────────
function KeyStats() {
  const stats = [
    { value: '0', label: 'Legal definitions for "clean," "natural," or "non-comedogenic"', sub: 'Any brand can self-apply these terms' },
    { value: '~1,400', label: 'EU-prohibited cosmetic substances', sub: 'vs. 11 US-restricted categories' },
    { value: '1', label: 'Minimum dermatologist endorsement for "derm-recommended"', sub: 'No standard. No verification.' },
    { value: '0', label: 'Premarket safety approvals required for US cosmetics', sub: 'Brands self-certify product safety' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="glass rounded-2xl p-4 text-center">
          <div className="font-display text-3xl font-bold text-accent leading-none mb-1">{s.value}</div>
          <div className="text-xs font-semibold text-ink leading-snug mb-1">{s.label}</div>
          <div className="text-[0.65rem] text-muted leading-snug">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}



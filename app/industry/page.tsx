import type { Metadata } from 'next'
import Link from 'next/link'
import { CollapsibleSection } from '@/components/sunscreen/CollapsibleSection'

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

        {/* Compare ingredients CTA */}
        <CompareIngredientsCTA />

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

// ── Compare CTA ───────────────────────────────────────────────────────────────
function CompareIngredientsCTA() {
  return (
    <div className="mt-10 mb-4">
      <Link
        href="/ingredients/compare"
        className="group block glass sheen relative overflow-hidden rounded-2xl border border-accent/20 hover:border-accent/50 transition-all p-6"
      >
        <div className="relative z-10 flex items-start gap-5">
          <div className="shrink-0 h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
            ⚗️
          </div>
          <div className="min-w-0">
            <p className="eyebrow text-accent mb-1">Interactive tool</p>
            <h2 className="font-display text-xl font-semibold text-ink mb-1.5 group-hover:text-accent transition-colors">
              Compare Two Ingredients Side-by-Side
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Select any two actives and see evidence quality, effective concentrations,
              and how their mechanisms compare — evidence, not marketing.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Open comparison tool
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </Link>

      <div className="flex gap-3 mt-3">
        <Link
          href="/ingredients"
          className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
        >
          Ingredient library →
        </Link>
        <Link
          href="/learn"
          className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
        >
          Learning hub →
        </Link>
      </div>
    </div>
  )
}

// ── Infographic: Evidence quality spectrum ────────────────────────────────────
function EvidenceSpectrum() {
  const levels = [
    { label: 'Consumer perception survey', sub: 'e.g. "felt smoother"', weight: 'Weakest', color: '#e5e0d8' },
    { label: 'Unpublished internal test', sub: 'brand-run, not peer-reviewed', weight: 'Weak', color: '#d4c9ba' },
    { label: 'Industry-funded study', sub: 'may be peer-reviewed — check conflicts', weight: 'Moderate', color: '#a8c9b0' },
    { label: 'Independent RCT, published', sub: '50+ participants, control group, blinded', weight: 'Strong', color: '#46c08a' },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">Evidence quality — what "clinically proven" might mean</p>
      </div>
      <div className="divide-y divide-line/40">
        {levels.map((l, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: l.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink leading-tight">{l.label}</p>
              <p className="text-xs text-muted mt-0.5">{l.sub}</p>
            </div>
            <span className="text-xs font-semibold shrink-0" style={{ color: l.color === '#46c08a' ? '#46c08a' : '#9e9688' }}>
              {l.weight}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">All four can legally appear on packaging as "clinically proven"</p>
      </div>
    </figure>
  )
}

// ── Infographic: EU vs US regulation ─────────────────────────────────────────
function RegulationGap() {
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">Restricted / prohibited cosmetic ingredients</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-line/40">
        <div className="p-5 text-center">
          <div className="font-display text-5xl font-bold text-accent leading-none mb-1">~1,400</div>
          <div className="text-sm font-semibold text-ink">EU banned / restricted</div>
          <div className="text-xs text-muted mt-1 leading-snug">Annex II, EC No 1223/2009<br />Precautionary principle</div>
        </div>
        <div className="p-5 text-center">
          <div className="font-display text-5xl font-bold text-muted leading-none mb-1">11</div>
          <div className="text-sm font-semibold text-ink">US restricted categories</div>
          <div className="text-xs text-muted mt-1 leading-snug">FDA cosmetics regulation<br />Risk-based approach</div>
        </div>
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">A larger EU list ≠ safer products — many EU bans are precautionary, not evidence-based</p>
      </div>
    </figure>
  )
}

// ── Infographic: Derm claim ladder ────────────────────────────────────────────
function DermClaimsTable() {
  const claims = [
    { label: 'Dermatologist tested', what: 'A derm reviewed or applied the formula', requires: 'Minimum 1 dermatologist', regulated: false },
    { label: 'Dermatologist recommended', what: 'At least one derm endorsed the product', requires: 'Minimum 1 paid endorsement', regulated: false },
    { label: 'Dermatologist approved', what: 'No standard definition exists', requires: 'Nothing — self-applied', regulated: false },
    { label: 'FDA-approved drug claim', what: 'Clinical proof of efficacy for a medical condition', requires: 'Rigorous clinical trials', regulated: true },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">What each "dermatologist" claim actually requires</p>
      </div>
      <div className="divide-y divide-line/40">
        {claims.map((c, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <span className={`mt-0.5 shrink-0 text-[0.6rem] font-bold px-1.5 py-0.5 rounded ${c.regulated ? 'bg-accent/15 text-accent' : 'bg-amber-50 text-amber-700'}`}>
              {c.regulated ? 'REGULATED' : 'UNREGULATED'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink">{c.label}</p>
              <p className="text-xs text-muted mt-0.5">{c.requires}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

// ── Infographic: Influencer money flow ────────────────────────────────────────
function InfluencerFlow() {
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">How influencer skincare economics work</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
          {[
            { label: 'Brand', sub: 'pays flat fee\nor % commission', icon: '🏢' },
            { label: 'Creator', sub: 'produces content\n+ affiliate code', icon: '📱' },
            { label: 'Consumer', sub: 'buys via link\nor promo code', icon: '🛒' },
          ].map((node, i) => (
            <div key={i} className="rounded-xl bg-sand/60 border border-line/50 p-3">
              <div className="text-xl mb-1">{node.icon}</div>
              <div className="font-semibold text-ink">{node.label}</div>
              <div className="text-muted mt-0.5 leading-tight whitespace-pre-line">{node.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { type: 'Paid partnership', req: 'Must disclose (FTC)', ok: true },
            { type: 'Affiliate code', req: 'Must disclose (FTC)', ok: true },
            { type: 'Gifting (no payment)', req: 'Disclosure required if endorsing', ok: null },
            { type: 'Product packaging endorsement', req: 'No disclosure required', ok: false },
          ].map((row, i) => (
            <div key={i} className="rounded-lg border border-line/40 px-3 py-2">
              <div className="font-medium text-ink">{row.type}</div>
              <div className={`mt-0.5 ${row.ok === true ? 'text-accent' : row.ok === false ? 'text-amber-600' : 'text-muted'}`}>
                {row.req}
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

// ── Infographic: Non-comedogenic claim chain ──────────────────────────────────
function ComedogenicityChain() {
  const steps = [
    { icon: '🐰', label: '1970s rabbit ear assay', sub: 'Concentrated ingredient applied to rabbit ear canal' },
    { icon: '📋', label: 'Comedogenicity score', sub: 'Ingredient assigned a 0–5 rating' },
    { icon: '🌐', label: 'Published on websites', sub: 'CosDNA, Paula\'s Choice, etc. list the score' },
    { icon: '🏭', label: 'Brands avoid it', sub: '"This product contains no high-comedogenicity ingredients"' },
    { icon: '🏷️', label: '"Non-comedogenic" label', sub: 'Often with no human testing conducted' },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">How a 1970s rabbit study ends up on your moisturiser</p>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-0">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div className="h-8 w-8 rounded-full bg-sand/80 border border-line/60 flex items-center justify-center text-base">{s.icon}</div>
                {i < steps.length - 1 && <div className="w-px h-3 bg-line/40" />}
              </div>
              <div className="pb-3 min-w-0">
                <p className="text-sm font-medium text-ink leading-tight">{s.label}</p>
                <p className="text-xs text-muted mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">Rabbit ear canal ≠ human facial skin. Human comedogenicity testing exists but is rarely conducted</p>
      </div>
    </figure>
  )
}

// ── Infographic: Natural vs synthetic examples ────────────────────────────────
function NaturalVsSynthetic() {
  const natural = [
    { name: 'Poison ivy', tag: 'Natural' },
    { name: 'Arsenic', tag: 'Natural' },
    { name: 'Lead', tag: 'Natural' },
    { name: 'Botulinum toxin', tag: 'Natural' },
  ]
  const synthetic = [
    { name: 'Niacinamide', tag: 'Synthetic / synthesised' },
    { name: 'Retinol (OTC)', tag: 'Synthesised for purity' },
    { name: 'Glycolic acid', tag: 'Synthesised' },
    { name: 'Phenoxyethanol', tag: 'Synthetic preservative' },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">Origin ≠ safety</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-line/40">
        <div className="p-4">
          <p className="text-xs font-semibold text-amber-700 mb-2">❌ Natural &amp; harmful</p>
          <ul className="space-y-1.5">
            {natural.map((n, i) => (
              <li key={i} className="text-xs text-ink/80">
                <span className="font-medium">{n.name}</span>
                <span className="text-muted ml-1">({n.tag})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold text-accent mb-2">✓ Synthetic &amp; evidence-backed</p>
          <ul className="space-y-1.5">
            {synthetic.map((n, i) => (
              <li key={i} className="text-xs text-ink/80">
                <span className="font-medium">{n.name}</span>
                <span className="text-muted ml-1">({n.tag})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">Safety depends on molecular structure, concentration, and exposure — not origin</p>
      </div>
    </figure>
  )
}

// ── Infographic: Price vs active ingredient reality ───────────────────────────
function PriceVsIngredient() {
  const products = [
    { name: 'The Ordinary Niacinamide', price: '~£5', pct: '10%', brand: 'budget', verdict: 'Evidence-based dose' },
    { name: 'CeraVe PM Moisturiser', price: '~£14', pct: '~4%', brand: 'mid', verdict: 'Solid formulation' },
    { name: 'Tatcha The Dewy Skin Cream', price: '~£85', pct: 'unlisted', brand: 'luxury', verdict: 'Concentration not disclosed' },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">Niacinamide — same active, very different prices</p>
      </div>
      <div className="divide-y divide-line/40">
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded shrink-0 ${
              p.brand === 'budget' ? 'bg-accent/15 text-accent' :
              p.brand === 'mid' ? 'bg-sand text-muted' :
              'bg-amber-50 text-amber-700'
            }`}>{p.price}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{p.name}</p>
              <p className="text-xs text-muted">Niacinamide {p.pct} · {p.verdict}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">Check active concentration and ingredient list position — not the price tag</p>
      </div>
    </figure>
  )
}

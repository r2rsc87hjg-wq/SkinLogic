import type { Metadata } from 'next'
import { UVFilterTable } from '@/components/sunscreen/UVFilterTable'
import { RatingSystemTable } from '@/components/sunscreen/RatingSystemTable'
import { FormulaTypeTable } from '@/components/sunscreen/FormulaTypeTable'
import { CollapsibleSection } from '@/components/sunscreen/CollapsibleSection'

export const metadata: Metadata = {
  title: 'Sunscreen Guide',
  description:
    'How sunscreen actually works, why US consumers get inferior UV protection by default, and how to navigate it.',
}

export const revalidate = 3600

const SECTIONS = [
  { id: 'how-it-works', label: 'How sunscreen works' },
  { id: 'uva-uvb', label: 'UVA vs UVB' },
  { id: 'regulatory-gap', label: 'The US/EU gap' },
  { id: 'what-this-means', label: 'What this means for you' },
  { id: 'rating-systems', label: 'SPF and PA+++' },
  { id: 'formula-types', label: 'Chemical, mineral, tinted' },
]

export default function SunscreenGuidePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Ambient liquid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-12%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-[28rem] left-[-14%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/20 blur-[120px]" />
        <div className="absolute top-[60rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/16 blur-[120px]" />
        <div className="absolute top-[96rem] left-[10%] h-[22rem] w-[22rem] rounded-full bg-[#ffc9dd]/14 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <header className="mb-10 max-w-3xl">
          <p className="eyebrow text-accent mb-2">
            Investigative consumer guide
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
            Sunscreen Guide
          </h1>
          <p className="text-muted leading-relaxed text-lg">
            Most people using American sunscreen are getting inferior UV
            protection compared to what is available in Europe, Asia, and
            Australia — not because better products don&apos;t exist, but because
            the FDA hasn&apos;t approved the filters they use. This guide
            explains the science, the regulatory politics, and how to make
            better-informed choices.
          </p>
        </header>

        {/* Mobile ToC (shown inline before content) */}
        <nav
          aria-label="Page sections"
          className="glass relative overflow-hidden rounded-2xl mb-10 p-5 lg:hidden"
        >
          <div className="relative z-10">
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
          </div>
        </nav>

        {/* Two-column layout on desktop: content left, sticky ToC right */}
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-16 lg:items-start">

          {/* ── Main content ── */}
          <div>
            <div className="space-y-3">

              {/* 1 — How sunscreen works */}
              <CollapsibleSection id="how-it-works" label="How sunscreen actually works" sectionNumber={1}>
                <div className="prose-like space-y-4 text-ink/80 leading-relaxed">
                  <p>
                    UV comes in two forms — UVA and UVB. Both damage skin. Sunscreen works by absorbing or blocking them before they reach the deeper layers.
                  </p>
                  <p>
                    Chemical filters absorb UV and convert it to heat. Mineral filters (zinc oxide, titanium dioxide) do the same — the old "minerals reflect, chemicals absorb" framing is a marketing myth, not science.
                  </p>
                  <p>
                    SPF only measures UVB protection. The number assumes you apply the full tested dose (2 mg/cm²) — most people use half that, which roughly halves real-world protection.
                  </p>

                  <SPFBarChart />

                  <ApplicationGuide />
                  <p>
                    Reapply every two hours outdoors and after swimming. "Waterproof" is banned on US labels — "water resistant" must specify 40 or 80 minutes, after which reapplication is required.
                  </p>
                  <Callout>
                    <strong>Shelf life:</strong> Heat degrades sunscreen filters faster than the expiry date assumes. If the texture or smell has changed, don&apos;t rely on it.
                  </Callout>
                </div>
              </CollapsibleSection>

              {/* 2 — UVA vs UVB */}
              <CollapsibleSection id="uva-uvb" label="UVA vs UVB — what the difference means for your skin" sectionNumber={2}>
                <div className="space-y-4 text-ink/80 leading-relaxed">
                  <p>
                    <strong className="text-ink">UVB</strong> hits the skin&apos;s surface, causes sunburn, and varies with season and time of day.
                    <strong className="text-ink"> UVA</strong> penetrates deeper, is present year-round at near-constant intensity, passes through glass and cloud cover, and is the primary driver of photoaging — wrinkles, collagen breakdown, elasticity loss.
                  </p>
                  <p>
                    A high-SPF sunscreen with weak UVA coverage stops the burn but lets through the damage that builds over decades. The US has no standardised UVA strength rating, and the most-used UVA filter (avobenzone) is photounstable without a stabiliser.
                  </p>

                  <KeyStat>
                    UVA passes through car windows at near-constant intensity year-round. Sunscreen isn&apos;t just a beach product.
                  </KeyStat>

                  {/* UV spectrum — where UVA and UVB sit on the wavelength scale */}
                  <figure className="glass relative overflow-hidden rounded-2xl p-5 my-2">
                    <div className="relative z-10">
                      <svg
                        viewBox="0 0 600 140"
                        className="w-full"
                        role="img"
                        aria-label="Ultraviolet spectrum: UVB spans 290 to 320 nanometres at the skin surface, UVA spans 320 to 400 nanometres and penetrates deeper, with visible light beginning at 400 nanometres."
                      >
                        <defs>
                          <linearGradient id="uvb-grad" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#3a368f" />
                            <stop offset="1" stopColor="#5046b0" />
                          </linearGradient>
                          <linearGradient id="uva-grad" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#5046b0" />
                            <stop offset="1" stopColor="#8a6fd6" />
                          </linearGradient>
                          <linearGradient id="vis-grad" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#8a6fd6" />
                            <stop offset="1" stopColor="#5b8fd0" />
                          </linearGradient>
                        </defs>
                        {/* bands (linear scale: 280 nm → x40, 420 nm → x560) */}
                        <rect x="77" y="34" width="111.6" height="38" rx="2" fill="url(#uvb-grad)" />
                        <rect x="188.6" y="34" width="297.1" height="38" fill="url(#uva-grad)" />
                        <rect x="485.7" y="34" width="74.3" height="38" rx="2" fill="url(#vis-grad)" opacity="0.85" />
                        <text x="132" y="59" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600">UVB</text>
                        <text x="337" y="59" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600">UVA</text>
                        <text x="523" y="58" textAnchor="middle" fill="#fff" fontSize="11">Visible →</text>
                        {/* wavelength ticks */}
                        <g fill="#6e6e62" fontSize="11">
                          <text x="77" y="90" textAnchor="middle">290 nm</text>
                          <text x="188.6" y="90" textAnchor="middle">320 nm</text>
                          <text x="485.7" y="90" textAnchor="middle">400 nm</text>
                        </g>
                        {/* what each band does */}
                        <g fontSize="11.5" fill="#1c1c17">
                          <text x="132" y="116" textAnchor="middle">Surface · sunburn</text>
                          <text x="337" y="116" textAnchor="middle">Deep dermis · photoaging</text>
                        </g>
                      </svg>
                      <figcaption className="mt-3 text-xs text-muted leading-relaxed">
                        UVB (290–320&nbsp;nm) burns the surface; UVA (320–400&nbsp;nm)
                        penetrates deeper and drives photoaging. SPF measures UVB only.
                      </figcaption>
                    </div>
                  </figure>

                  <div className="glass overflow-hidden rounded-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-line text-left eyebrow text-muted">
                            <th className="px-4 py-3"></th>
                            <th className="px-4 py-3">UVA</th>
                            <th className="px-4 py-3">UVB</th>
                          </tr>
                        </thead>
                        <tbody className="text-ink/80">
                          {[
                            ['Wavelength', '320–400 nm', '290–320 nm'],
                            ['Penetration depth', 'Dermis (deep)', 'Epidermis (surface)'],
                            ['Causes sunburn', 'No', 'Yes — primary cause'],
                            ['Causes photoaging', 'Yes — primary driver', 'Yes — contributes'],
                            ['Melanoma risk', 'Yes', 'Yes'],
                            ['Passes through glass', 'Yes', 'Mostly blocked'],
                            ['Year-round intensity', 'Near-constant', 'Seasonal / time-of-day dependent'],
                            ['Measured by SPF', 'No', 'Yes'],
                          ].map(([label, uva, uvb]) => (
                            <tr key={label} className="border-t border-line/60">
                              <td className="px-4 py-2.5 font-medium text-muted text-xs uppercase tracking-wide">
                                {label}
                              </td>
                              <td className="px-4 py-2.5">{uva}</td>
                              <td className="px-4 py-2.5">{uvb}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* 3 — Regulatory gap */}
              <CollapsibleSection id="regulatory-gap" label="The US/EU regulatory gap — why American sunscreen lags" sectionNumber={3}>
                <div className="space-y-4 text-ink/80 leading-relaxed">
                  <p>
                    The EU has approved 28 UV filters. The US has approved 16 — and only two (zinc oxide and titanium dioxide) are fully classified as safe and effective under the FDA&apos;s 2019 review. The rest are either flagged or lack sufficient data.
                  </p>

                  <FilterCountComparison />

                  <p>
                    The missing filters aren&apos;t obscure. Tinosorb S and Tinosorb M are considered the gold standard for broad-spectrum protection by photoprotection researchers. Both have been approved in Europe for decades. Both have had FDA applications pending for over 20 years. Congress created a specific fast-track pathway in 2014 — it has not produced a single new approval.
                  </p>
                  <Callout variant="warning">
                    <strong>Conflict of interest:</strong> Some pending applications are held by companies with a financial stake in the current US filter landscape. Not deliberate obstruction — but a structural incentive that slows change.
                  </Callout>
                  <Callout>
                    <strong>On the absorption headlines:</strong> FDA-commissioned studies (JAMA 2019–2020) found four chemical filters detectable in blood after heavy use. Detection is not toxicity — the FDA&apos;s own position is that people should keep using sunscreen. But if you prefer to avoid unresolved uncertainty, mineral filters have a cleaner profile.
                  </Callout>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
                    UV filter availability: US vs EU
                  </h3>
                  <UVFilterTable />
                </div>
              </CollapsibleSection>

              {/* 4 — What this means for you */}
              <CollapsibleSection id="what-this-means" label="What this means practically — your three options" sectionNumber={4}>
                <div className="space-y-4 text-ink/80 leading-relaxed">
                  <ol className="space-y-4 list-none">
                    {[
                      {
                        n: '1',
                        title: 'Zinc oxide (US-made)',
                        body: 'Photostable, broad-spectrum, FDA-approved as GRASE. Best option if you want a domestic product. Main downside: white cast, especially on deeper skin tones.',
                      },
                      {
                        n: '2',
                        title: 'Internationally formulated sunscreen',
                        body: 'EU, Korean, Japanese, and Australian brands can use Tinosorb S, Tinosorb M, and Mexoryl — filters unavailable in the US. Importable and legal to use here. Look for PA++++ and Tinosorb S on the label.',
                      },
                      {
                        n: '3',
                        title: 'US chemical formula with stabilised avobenzone',
                        body: 'If you prefer a domestic chemical sunscreen, check that avobenzone is paired with octocrylene or another stabiliser. Avoid formulas where it\'s the only UVA filter listed.',
                      },
                    ].map((item) => (
                      <li key={item.n} className="flex gap-4">
                        <span className="text-2xl font-bold text-line shrink-0 leading-tight">
                          {item.n}
                        </span>
                        <div>
                          <p className="font-semibold text-ink mb-1">{item.title}</p>
                          <p className="text-muted text-sm">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <Callout>
                    <strong>Reading a label:</strong> "Broad spectrum" is a pass/fail threshold — not a UVA strength rating. PA++++ is meaningful. Tinosorb S in the ingredients is the strongest signal of real broad-spectrum coverage.
                  </Callout>

                  <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed text-ink/80">
                    <div className="relative z-10">
                      <p className="font-semibold text-ink mb-3">
                        Other layers that matter
                      </p>
                      <ul className="space-y-2">
                        {[
                          ['Shade', '10am–4pm is peak UVB. Shade cuts UV exposure by 50%+.'],
                          ['UPF clothing', 'UPF 50+ blocks 98% of UV and doesn\'t wear off or require reapplication.'],
                          ['Broad-brimmed hat', 'Covers ears, neck, and face — areas sunscreen often misses.'],
                          ['UV400 sunglasses', 'Both UVA and UVB contribute to cataracts and ocular melanoma.'],
                          ['Timing', 'Before 10am or after 4pm significantly reduces UV dose with no product needed.'],
                        ].map(([label, body]) => (
                          <li key={label as string} className="flex gap-3">
                            <span className="text-accent shrink-0 mt-0.5 font-semibold">+</span>
                            <span>
                              <strong className="text-ink">{label}</strong>{' — '}{body}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* 5 — Rating systems */}
              <CollapsibleSection id="rating-systems" label="SPF and PA+++ — understanding both rating systems" sectionNumber={5}>
                <div className="space-y-4 text-ink/80 leading-relaxed mb-8">
                  <p>
                    SPF only measures UVB. A product with no UVA rating tells you nothing about photoaging protection. PA++++ (used on Korean and Japanese products) is the closest thing to a meaningful UVA strength number on consumer packaging — and it only appears on internationally formulated products.
                  </p>
                </div>
                <RatingSystemTable />

                <div className="mt-8 space-y-4 text-ink/80 leading-relaxed">
                  <h3 className="font-semibold text-ink">Other rating systems you&apos;ll see</h3>
                  <div className="glass overflow-hidden rounded-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-line text-left eyebrow text-muted">
                            <th className="px-4 py-3">System</th>
                            <th className="px-4 py-3">Measures</th>
                            <th className="px-4 py-3">How to read it</th>
                          </tr>
                        </thead>
                        <tbody className="text-ink/80">
                          {[
                            [
                              'EU UVA-PF (circle UVA)',
                              'UVA as ratio to SPF',
                              'EU law requires UVA-PF ≥ ⅓ of the SPF. SPF 50 must deliver UVA-PF ≥ 16.7 to show the circle symbol. Proportional — not an absolute strength measure, but a meaningful floor.',
                            ],
                            [
                              'Boots Star Rating (UK)',
                              'UVA/UVB ratio (0–5 stars)',
                              '4–5 stars = UVA protection is high relative to UVB. Note: a 5-star SPF 15 may offer less total UVA than a 3-star SPF 50 — stars rate the ratio, not the level. Look for both high SPF and high stars.',
                            ],
                            [
                              'US "Broad Spectrum"',
                              'Passes a UVA/UVB threshold test',
                              'Binary pass/fail — tells you UVA coverage exists, not how much. SPF 15 broad-spectrum and SPF 100 broad-spectrum passed the same test. Least informative of the three systems.',
                            ],
                          ].map(([system, measures, how]) => (
                            <tr key={system as string} className="border-t border-line/60 align-top">
                              <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{system}</td>
                              <td className="px-4 py-3 text-muted whitespace-nowrap">{measures}</td>
                              <td className="px-4 py-3 text-muted leading-relaxed text-xs">{how}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted leading-relaxed">
                  Sources: AAD (aad.org), JCIA PA+ system, EU Rec. 2006/647/EC, Boots Soltan methodology.
                </p>
              </CollapsibleSection>

              {/* 6 — Formula types */}
              <CollapsibleSection id="formula-types" label="Chemical vs mineral vs hybrid — honest trade-offs" sectionNumber={6}>
                <div className="space-y-4 text-ink/80 leading-relaxed mb-8">
                  <p>
                    Mineral filters have a cleaner safety profile right now, but leave a white cast — a real barrier for daily use on darker skin tones. Chemical filters are cosmetically elegant but some carry unresolved questions. Neither side of the "clean beauty" debate is being straight with you.
                  </p>
                </div>
                <FormulaTypeTable />
              </CollapsibleSection>

            </div>

            {/* Methodology note */}
            <footer className="mt-16 pt-8 border-t border-line">
              <h2 className="eyebrow text-muted mb-3">Methodology</h2>
              <p className="text-sm text-muted leading-relaxed">
                This guide draws from FDA OTC monograph proceedings, EU Annex VI of
                Regulation (EC) No 1223/2009, published photostability research in
                the Journal of the American Academy of Dermatology and the British
                Journal of Dermatology, the EU CosIng database, and TGA (Australia)
                approved ingredient lists. All factual claims are sourced. Where
                studies are funded by UV filter manufacturers, that is noted inline.
                We do not cite brand-sponsored content.
              </p>
            </footer>
          </div>

          {/* ── Sticky ToC sidebar (desktop only) ── */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Page sections"
              className="glass relative overflow-hidden rounded-2xl p-5 sticky top-24"
            >
              <div className="relative z-10">
                <p className="eyebrow text-muted mb-3">On this page</p>
                <ol className="space-y-2">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-sm text-ink/70 hover:text-accent leading-snug transition-colors"
                      >
                        <span className="font-semibold text-muted/60 mr-1.5">{i + 1}.</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          </aside>

        </div>
      </div>
    </main>
  )
}

// ── Infographic: SPF protection bar chart ────────────────────────────────────
function SPFBarChart() {
  const rows = [
    { spf: 15, pct: 93, width: '93%' },
    { spf: 30, pct: 97, width: '97%' },
    { spf: 50, pct: 98, width: '98%' },
    { spf: 100, pct: 99, width: '99%' },
  ]
  return (
    <figure className="glass relative overflow-hidden rounded-2xl p-5 my-5">
      <div className="relative z-10">
        <p className="eyebrow text-muted mb-1">UVB rays blocked by SPF value</p>
        <p className="text-xs text-muted mb-4">At the tested application rate (2 mg/cm²)</p>
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.spf} className="flex items-center gap-3">
              <div className="w-16 text-right text-sm font-semibold text-ink shrink-0">
                SPF {r.spf}
              </div>
              <div className="relative flex-1 h-8 rounded-lg bg-line/25 overflow-hidden">
                <div
                  className="h-full rounded-lg bg-accent/70 transition-all"
                  style={{ width: r.width }}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink">
                  {r.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted leading-relaxed">
          The jump from SPF 15 to SPF 30 is meaningful (+4%). Above SPF 50,
          gains become marginal — how much you apply matters far more than the number on the label.
        </p>
      </div>
    </figure>
  )
}

// ── Infographic: Application amount guide ────────────────────────────────────
function ApplicationGuide() {
  return (
    <figure className="glass relative overflow-hidden rounded-2xl p-5 my-5">
      <div className="relative z-10">
        <p className="eyebrow text-muted mb-1">How much sunscreen your face actually needs</p>
        <p className="text-xs text-muted mb-5">To reach the protection level on the label</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-accent/10 border border-accent/25 p-4 text-center">
            <div className="font-display text-4xl font-bold text-accent mb-1">¼ tsp</div>
            <div className="text-sm font-semibold text-ink mb-1">Recommended</div>
            <div className="text-xs text-muted leading-snug">Face + neck<br />~1.5 ml — the tested dose</div>
            <div className="mt-3 h-1.5 rounded-full bg-accent/30">
              <div className="h-full w-full rounded-full bg-accent" />
            </div>
          </div>
          <div className="rounded-xl bg-line/20 border border-line/40 p-4 text-center">
            <div className="font-display text-4xl font-bold text-muted mb-1">⅛ tsp</div>
            <div className="text-sm font-semibold text-ink mb-1">What most people use</div>
            <div className="text-xs text-muted leading-snug">~50% of the tested dose<br />Roughly halves real protection</div>
            <div className="mt-3 h-1.5 rounded-full bg-line/30">
              <div className="h-full w-1/2 rounded-full bg-muted/50" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted leading-relaxed">
          Source: Diffey BL, et al. Br J Dermatol. Multiple studies consistently show mean
          application rates of 0.5–1.0 mg/cm², vs the tested 2 mg/cm².
        </p>
      </div>
    </figure>
  )
}

// ── Infographic: US vs EU filter count comparison ────────────────────────────
function FilterCountComparison() {
  return (
    <figure className="glass relative overflow-hidden rounded-2xl p-5 my-5">
      <div className="relative z-10">
        <p className="eyebrow text-muted mb-1">UV filter approvals: US vs EU</p>
        <p className="text-xs text-muted mb-6">Filters approved for use in consumer sunscreen products</p>
        <div className="grid grid-cols-2 gap-6">
          {/* EU */}
          <div className="text-center">
            <div className="font-display text-6xl font-bold text-accent leading-none mb-2">28</div>
            <div className="text-sm font-semibold text-ink mb-1">EU approved</div>
            <div className="text-xs text-muted leading-snug">
              Includes Tinosorb S, Tinosorb M,<br />Mexoryl SX, Mexoryl XL
            </div>
            <div className="mt-3 flex flex-wrap gap-1 justify-center">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: i < 28 ? 'var(--color-accent, #46c08a)' : '#e0e0d8', opacity: 0.7 + (i < 2 ? 0.3 : 0) }}
                />
              ))}
            </div>
          </div>
          {/* US */}
          <div className="text-center">
            <div className="font-display text-6xl font-bold text-muted leading-none mb-2">16</div>
            <div className="text-sm font-semibold text-ink mb-1">US approved</div>
            <div className="text-xs text-muted leading-snug">
              Only 2 classified as fully GRASE.<br />Applications pending 20+ years.
            </div>
            <div className="mt-3 flex flex-wrap gap-1 justify-center">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: i < 16 ? '#6e6e62' : 'transparent', border: i < 16 ? 'none' : '1px solid #d8d3c6', opacity: i < 2 ? 1 : 0.4 }}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted leading-relaxed border-t border-line/40 pt-3">
          Source: FDA OTC monograph / EU Annex VI, Regulation (EC) No 1223/2009. The NESE pathway
          created by Congress in 2014 to accelerate approvals has not resulted in a single new US approval.
        </p>
      </div>
    </figure>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl md:text-2xl font-medium text-ink mb-6">
      {children}
    </h2>
  )
}

function KeyStat({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent/8 px-5 py-4 my-5">
      <p className="eyebrow text-accent text-[0.6rem] mb-1.5">Key stat</p>
      <p className="text-sm font-medium text-ink leading-relaxed">{children}</p>
    </div>
  )
}

function Callout({
  children,
  variant = 'neutral',
}: {
  children: React.ReactNode
  variant?: 'neutral' | 'warning'
}) {
  if (variant === 'warning') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-relaxed text-amber-900">
        {children}
      </div>
    )
  }
  return (
    <div className="glass relative overflow-hidden rounded-xl p-4 text-sm leading-relaxed text-ink/80">
      <div className="relative z-10">{children}</div>
    </div>
  )
}

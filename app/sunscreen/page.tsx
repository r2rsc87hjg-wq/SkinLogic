import type { Metadata } from 'next'
import { UVFilterTable } from '@/components/sunscreen/UVFilterTable'
import { RatingSystemTable } from '@/components/sunscreen/RatingSystemTable'
import { FormulaTypeTable } from '@/components/sunscreen/FormulaTypeTable'

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

      <div className="max-w-3xl mx-auto px-4 py-14">
        <header className="mb-10">
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

        {/* Anchor navigation */}
        <nav
          aria-label="Page sections"
          className="glass relative overflow-hidden rounded-2xl mb-12 p-5"
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

      <div className="space-y-16 divide-y divide-line/60">

        {/* 1 — How sunscreen works */}
        <section id="how-it-works" className="pt-12 first:pt-0 scroll-mt-8">
          <SectionLabel>How sunscreen actually works</SectionLabel>
          <div className="prose-like space-y-4 text-ink/80 leading-relaxed">
            <p>
              Ultraviolet radiation from the sun reaches Earth in two relevant
              wavelength ranges: UVA (320–400 nm) and UVB (290–320 nm). Both
              cause skin damage. Sunscreen works by intercepting this radiation
              before it reaches the deeper layers of skin.
            </p>
            <p>
              Chemical (organic) filters contain molecules that absorb UV photons
              and release the energy as heat. Mineral (inorganic) filters — zinc
              oxide and titanium dioxide — primarily absorb UV radiation as well,
              though they also scatter some of it. The old framing that minerals
              "reflect" and chemicals "absorb" is an oversimplification that
              marketing has kept alive well past its usefulness.
            </p>
            <p>
              SPF — Sun Protection Factor — measures UVB protection only. An
              SPF 30 sunscreen, applied at the tested amount (2 mg/cm² of skin),
              allows through roughly 1/30th of UVB radiation. The key phrase is
              "tested amount": most people apply far less than the tested
              quantity, which substantially reduces real-world protection.
            </p>
            <Callout>
              <strong>The application gap:</strong> To achieve the labelled SPF
              on your face, you need approximately ¼ teaspoon of sunscreen for
              the face and neck alone. Studies consistently show people apply
              25–50% of the tested amount, cutting effective protection roughly
              in half.
            </Callout>
            <p>
              Reapplication matters as much as initial application. The AAD
              recommends reapplying every two hours during outdoor sun exposure,
              and immediately after swimming or sweating. Since 2012, the FDA
              has banned the word "waterproof" from US sunscreen labels — no
              product is truly waterproof. Products labelled "water resistant"
              must specify either 40 or 80 minutes of maintained protection
              during water activity; after that interval, reapplication is
              required regardless of perceived sweat or water exposure.
            </p>
            <Callout>
              <strong>Shelf life and heat degradation:</strong> Sunscreen
              filters degrade over time and faster under heat. FDA regulations
              require stability through the labelled expiry date under normal
              storage conditions — but storing sunscreen in a hot car, beach
              bag in direct sun, or bathroom with temperature fluctuations
              can accelerate that degradation before the date is reached. If
              the texture or smell has changed noticeably, the formula has
              likely degraded. Do not rely on last summer&apos;s bottle.
            </Callout>
          </div>
        </section>

        {/* 2 — UVA vs UVB */}
        <section id="uva-uvb" className="pt-16 scroll-mt-8">
          <SectionLabel>UVA vs UVB — what the difference means for your skin</SectionLabel>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              UVB rays are shorter wavelength, higher energy, and primarily
              affect the outer layer of skin (the epidermis). They are the main
              cause of sunburn and are a significant driver of squamous cell
              carcinoma. UVB intensity varies with time of day, season, and
              latitude — it is much weaker in winter and at high latitudes.
            </p>
            <p>
              UVA rays are longer wavelength, penetrate deeper into the dermis,
              and are present at near-constant intensity throughout the day,
              year-round, and through glass and cloud cover. UVA is the primary
              driver of photoaging — collagen breakdown, wrinkling, loss of
              elasticity — and contributes to melanoma risk. It also causes
              immediate pigmentation and is responsible for most drug and
              fragrance-related photosensitivity reactions.
            </p>
            <p>
              The practical implication: a high-SPF sunscreen with weak UVA
              protection is blocking the burn while letting through the damage
              that accumulates over decades. This is not hypothetical — it is
              the situation many American consumers are in, because the US has
              no standardised UVA strength rating on labels, and the most
              widely-used UVA filter (avobenzone) is photounstable unless
              properly formulated.
            </p>
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
        </section>

        {/* 3 — Regulatory gap */}
        <section id="regulatory-gap" className="pt-16 scroll-mt-8">
          <SectionLabel>The US/EU regulatory gap — why American sunscreen lags</SectionLabel>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              The European Union has approved 28 UV filters for use in
              sunscreen. The US has approved 16 — and of those, only two
              (zinc oxide and titanium dioxide) passed the FDA's 2019 proposed
              rule as "generally recognised as safe and effective" (GRASE). The
              remaining 12 were deemed "not GRASE" or had insufficient data.
            </p>
            <p>
              The filters missing from American formulations are not obscure.
              They include Tinosorb S and Tinosorb M — widely regarded by
              photoprotection researchers as the most effective broad-spectrum
              filters currently available — as well as Mexoryl SX and Mexoryl
              XL, which have been approved in Europe since 1991 and 2000
              respectively.
            </p>
            <p>
              Applications for these filters have been sitting with the FDA for
              20 years in some cases. The NESE (Nonprescription Drug Product with
              an Additional Condition for Nonexclusive Approval) pathway, created
              by Congress in 2014 specifically to accelerate UV filter approvals,
              has not resulted in a single new approval in the decade since its
              passage.
            </p>
            <Callout variant="warning">
              <strong>Conflict of interest note:</strong> Some of the pending
              applications are held by large chemical companies (BASF, L'Oréal).
              The entrenched US sunscreen market, dominated by brands built on
              existing-filter formulations, has limited commercial incentive to
              push aggressively for approvals that would benefit competitors.
              This is not a claim of deliberate obstruction — it is a structural
              dynamic worth understanding.
            </Callout>
            <p>
              <strong className="text-ink">A note on the systemic absorption data:</strong>{' '}
              A series of FDA-commissioned studies (Matta et al., JAMA 2019 and
              2020) found that four commonly used chemical filters — avobenzone,
              oxybenzone, octocrylene, and homosalate — were detectable in
              blood plasma above the FDA&apos;s 0.5 ng/mL threshold for further
              safety testing after a single day of beach-simulated use. This
              was widely misreported as evidence that sunscreen causes harm.
              Detection in blood does not equal toxicity — the FDA&apos;s explicit
              position, repeated in both papers, is that this finding warrants
              further investigation and does not mean people should stop using
              sunscreen. The benefit of photoprotection is not in question.
              What it does mean is that the data gap the FDA cited — insufficient
              pharmacokinetic and pharmacodynamic safety data for these filters —
              is real, and provides additional reason to prefer mineral filters
              if you want to avoid unresolved uncertainty.
            </p>
            <p>
              The practical effect for consumers: if you buy a sunscreen made
              and regulated under US OTC rules, you are limited to older UV
              filter technology. The best broad-spectrum UVA protection
              available — photostable filters that don't carry the concerns
              attached to oxybenzone or the instability issues of avobenzone —
              is only accessible through internationally formulated products.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
              UV filter availability: US vs EU
            </h3>
            <UVFilterTable />
          </div>
        </section>

        {/* 4 — What this means for you */}
        <section id="what-this-means" className="pt-16 scroll-mt-8">
          <SectionLabel>What this means practically — navigating it as a US consumer</SectionLabel>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              You have three realistic options:
            </p>
            <ol className="space-y-5 list-none">
              {[
                {
                  n: '1',
                  title: 'Use a domestic US sunscreen with zinc oxide',
                  body: 'Zinc oxide is photostable, provides genuine broad-spectrum coverage, and is approved as GRASE. A well-formulated zinc oxide sunscreen — ideally 15–20%+ concentration — is a legitimate and accessible choice. The limitation is cosmetic: most zinc formulas leave a white cast, particularly on darker skin tones.',
                },
                {
                  n: '2',
                  title: 'Use an internationally formulated product',
                  body: 'Brands formulated under EU, Australian, Japanese, or Korean regulations can use Tinosorb S, Tinosorb M, Mexoryl SX/XL, and other filters. These are legally importable and usable in the US — they simply cannot be manufactured for the US market under FDA OTC rules. Many are available on Amazon or direct from international retailers. Look for PA++++ ratings and Tinosorb S in the ingredient list as a signal of strong UVA coverage.',
                },
                {
                  n: '3',
                  title: 'Use a domestic chemical formula with a stabilised avobenzone system',
                  body: 'If cosmetic elegance is the priority and you prefer a US-made product, look for formulas where avobenzone is stabilised by octocrylene, or better yet, where the brand explicitly addresses photostability in its formulation notes. Avoid formulas where avobenzone is the only UVA filter with no stabiliser.',
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="text-2xl font-bold text-line shrink-0 leading-tight">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-semibold text-ink mb-1">{item.title}</p>
                    <p className="text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Callout>
              <strong>What to look for on a label:</strong> "Broad spectrum" is
              a legal minimum — it means the product passed a basic UVA/UVB
              ratio test, not that it provides strong UVA protection. PA++++ on
              an Asian-formulated product is a more meaningful signal. Tinosorb
              S in the ingredient list is the strongest signal of quality
              broad-spectrum UVA protection currently available.
            </Callout>

            <div className="glass relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed text-ink/80">
              <div className="relative z-10">
                <p className="font-semibold text-ink mb-2">
                  Sunscreen is one layer — not the only layer
                </p>
                <p className="mb-3">
                  The AAD&apos;s official sun protection guidance frames sunscreen
                  as part of a layered approach, not a standalone solution. SPF
                  alone, even applied correctly, does not capture the full
                  reduction in UV dose that comes from behavioural and physical
                  measures. The additional layers:
                </p>
                <ul className="space-y-2">
                  {[
                    ['Seek shade', 'Particularly between 10 am and 4 pm when UVB intensity peaks. Shade can reduce UV exposure by 50% or more depending on type.'],
                    ['Protective clothing', 'UPF-rated fabrics (UPF 50+ blocks 98% of UV radiation) are more reliable than sunscreen because they don\'t wear off, require reapplication, or vary with application thickness.'],
                    ['Broad-brimmed hats', 'A hat with a brim of at least 3 inches covers the face, ears, and back of neck — areas that sunscreen misses in practice and that account for a disproportionate share of skin cancers.'],
                    ['UV-blocking sunglasses', 'UVA and UVB both contribute to cataract risk and ocular melanoma. Look for "100% UV protection" or "UV400" labelling.'],
                    ['Timing', 'Scheduling extended outdoor activity before 10 am or after 4 pm reduces UV dose significantly without any product.'],
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
        </section>

        {/* 5 — Rating systems */}
        <section id="rating-systems" className="pt-16 scroll-mt-8">
          <SectionLabel>SPF and PA+++ — understanding both rating systems</SectionLabel>
          <div className="space-y-4 text-ink/80 leading-relaxed mb-8">
            <p>
              SPF only tells you about UVB protection. If a product carries
              only an SPF number and no UVA rating, you have no standardised
              indication of how well it protects against the wavelengths
              responsible for photoaging and part of melanoma risk.
            </p>
            <p>
              The PA+ system, developed by the Japanese Cosmetic Industry
              Association, uses Persistent Pigment Darkening (PPD) to measure
              UVA protection in a standardised way. PA++++ means a PPD factor
              of 16 or higher. This is the closest thing to a meaningful UVA
              strength number that appears on consumer packaging — and it only
              appears on internationally formulated products.
            </p>
          </div>
          <RatingSystemTable />

          <div className="mt-8 space-y-4 text-ink/80 leading-relaxed">
            <h3 className="font-semibold text-ink">Two more systems you&apos;ll see on international products</h3>
            <div className="glass overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-line text-left eyebrow text-muted">
                      <th className="px-4 py-3">System</th>
                      <th className="px-4 py-3">What it measures</th>
                      <th className="px-4 py-3">How to read it</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink/80">
                    {[
                      [
                        'EU UVA-PF (circle UVA symbol)',
                        'UVA protection factor as a ratio to SPF',
                        'EU law (Rec. 2006/647/EC) requires the UVA protection factor be at least ⅓ of the labelled SPF. A product claiming SPF 50 must deliver UVA-PF ≥ 16.7 to display the "UVA in a circle" symbol. This is a proportional requirement — not the same as measuring absolute UVA strength, but a meaningful minimum floor.',
                      ],
                      [
                        'Boots Star Rating (UK)',
                        'Ratio of UVA to UVB protection (0–5 stars)',
                        'Independently developed. Measures what proportion of the product\'s total UV absorption is in the UVA range. 4–5 stars means UVA protection is high relative to UVB protection. A 5-star product at SPF 15 may provide less total UVA protection than a 3-star product at SPF 50 — the stars rate the ratio, not the absolute level. Look for both a high SPF and a high star rating.',
                      ],
                      [
                        'US "Broad Spectrum" label',
                        'Passes a threshold UVA/UVB test',
                        '"Broad spectrum" under FDA regulations means the product passed the FDA\'s critical wavelength test (CW ≥ 370 nm). This is a binary pass/fail, not a rating — it tells you UVA protection exists, not how much. A broad-spectrum SPF 15 and a broad-spectrum SPF 100+ both passed the same threshold test. This is why US labels give you far less UVA information than EU or Asian products.',
                      ],
                    ].map(([system, measures, how]) => (
                      <tr key={system as string} className="border-t border-line/60 align-top">
                        <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{system}</td>
                        <td className="px-4 py-3 text-muted">{measures}</td>
                        <td className="px-4 py-3 text-muted leading-relaxed">{how}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted leading-relaxed">
            Sources: American Academy of Dermatology (aad.org) — SPF guidance.
            Japanese Cosmetic Industry Association — PA+ system definition.
            EU Commission Recommendation 2006/647/EC — UVA protection labelling.
            Boots Soltan methodology (independent UK testing protocol).
          </p>
        </section>

        {/* 6 — Formula types */}
        <section id="formula-types" className="pt-16 scroll-mt-8">
          <SectionLabel>Chemical vs mineral vs hybrid — honest trade-offs</SectionLabel>
          <div className="space-y-4 text-ink/80 leading-relaxed mb-8">
            <p>
              The chemical vs mineral debate is one of the most
              marketing-distorted topics in skincare. "Clean beauty" marketing
              has positioned mineral sunscreen as categorically safer, while
              chemical sunscreen brands have pushed back on the basis that the
              evidence for harm at real-world exposure levels is weak. Both
              sides overstate their case.
            </p>
            <p>
              The honest picture: mineral filters have a cleaner safety profile
              at this point in time, but the cosmetic experience is worse — a
              real barrier for daily adherence, especially on darker skin tones.
              Chemical filters offer better cosmetic elegance but some carry
              legitimate unresolved questions. The best approach is to understand
              the trade-offs and choose accordingly.
            </p>
          </div>
          <FormulaTypeTable />
        </section>


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
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl md:text-2xl font-medium text-ink mb-6">
      {children}
    </h2>
  )
}

function Callout({
  children,
  variant = 'neutral',
}: {
  children: React.ReactNode
  variant?: 'neutral' | 'warning'
}) {
  // Warning keeps a warm amber tint to signal caution; neutral uses frosted glass.
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

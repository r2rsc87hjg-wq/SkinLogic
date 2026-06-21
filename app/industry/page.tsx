import type { Metadata } from 'next'
import Link from 'next/link'

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

      <article className="max-w-3xl mx-auto px-4 py-14">
        {/* Header */}
        <header className="mb-12">
          <p className="eyebrow text-accent mb-3">Transparency</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-ink mb-5 leading-tight">
            How the Industry Works
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            The research behind skincare is one thing. The industry that sells it
            is another. This page explains the systems, claims, and incentives
            that shape what gets marketed to you — so you can evaluate them
            independently.
          </p>
          <div className="mt-6 glass rounded-2xl px-5 py-4 text-sm text-ink/80 leading-relaxed">
            <strong className="text-ink">A note on tone:</strong> This is not
            an attack on the skincare industry. Many brands do excellent science.
            The goal here is to explain how the machinery works so that marketing
            language stops doing the work that evidence should be doing.
          </div>
        </header>

        {/* Jump nav */}
        <nav aria-label="Page sections" className="mb-14">
          <p className="eyebrow text-muted mb-3">On this page</p>
          <ol className="space-y-1.5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors group"
                >
                  <span className="text-xs tabular-nums text-muted/50 group-hover:text-accent/60 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── 1. Clinically proven ─────────────────────────────────────── */}
        <section id="clinically-proven" className="mb-16 scroll-mt-24">
          <SectionHeading number="01" title='"Clinically proven" means almost nothing' />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The phrase "clinically proven" appears on a huge proportion of skincare
              products. It sounds like a regulated claim backed by peer-reviewed
              science. In the cosmetics industry, it is not. No regulatory body in
              the US or EU restricts what a brand can call "clinically proven" on a
              cosmetic product.
            </p>
            <p>
              In practice, the phrase can be supported by almost anything: a 12-person
              consumer perception survey, a single unpublished internal test, a
              non-peer-reviewed study funded by the brand, or a questionnaire asking
              people whether they <em>felt</em> their skin looked better. All of these
              can become "clinically proven" in marketing copy.
            </p>
            <Callout variant="what-to-look-for">
              <strong>What actually carries weight:</strong> Independent peer-reviewed
              trials published in journals like the Journal of the American Academy
              of Dermatology or the British Journal of Dermatology. Look for sample
              size (ideally 50+ participants), a control group, blinding (participants
              didn&apos;t know which treatment they received), and researcher independence
              from the brand. When a brand cites a study, check whether they funded it
              and whether it has been independently replicated.
            </Callout>
            <p>
              This does not mean products making "clinically proven" claims cannot
              work. It means the claim itself tells you nothing. Evaluate the active
              ingredients and their concentrations instead — those are the variables
              with actual evidence behind them.
            </p>
          </div>
        </section>

        {/* ── 2. EU vs US ──────────────────────────────────────────────── */}
        <section id="eu-us-gap" className="mb-16 scroll-mt-24">
          <SectionHeading number="02" title="The EU has banned ~1,400 cosmetic ingredients. The US has restricted 11." />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              This statistic is widely cited and broadly accurate. The EU Cosmetics
              Regulation (EC No 1223/2009) maintains Annex II, a list of substances
              prohibited in cosmetic products sold in Europe. It currently contains
              around 1,400 entries. The FDA&apos;s equivalent list has 11 categories
              of restricted or prohibited ingredients.
            </p>
            <p>
              The regulatory philosophy behind the gap matters more than the
              numbers. The EU applies a precautionary principle: if an ingredient
              raises credible safety concerns — even without definitive proof of
              harm at cosmetic doses — it can be restricted pending further evidence.
              The US applies a risk-based approach: ingredients are generally permitted
              unless evidence of harm at the doses being used is established.
            </p>
            <Callout variant="important">
              <strong>What this gap does not mean:</strong> A banned-in-EU ingredient
              is not automatically dangerous when used in a US cosmetic. Many EU
              restrictions are precautionary, not based on evidence of harm at
              real-world cosmetic concentrations. Parabens, for example, are heavily
              restricted in EU baby products — but the scientific consensus from
              bodies including the EU&apos;s own Scientific Committee on Consumer Safety
              (SCCS) is that parabens at typical cosmetic concentrations do not pose
              a health risk. The EU restriction reflects political caution, not
              established harm.
            </Callout>
            <p>
              The practical implication: the EU/US gap is a useful starting point for
              questions, not a verdict. When an ingredient is restricted in the EU,
              the right response is to look at why — the SCCS opinions are publicly
              available and readable. Some EU decisions are well-supported by evidence.
              Others are precautionary calls that the science does not strongly back.
              Treat each on its merits.
            </p>
          </div>
        </section>

        {/* ── 3. Derm-endorsed ─────────────────────────────────────────── */}
        <section id="derm-endorsed" className="mb-16 scroll-mt-24">
          <SectionHeading number="03" title='"Dermatologist recommended" is a marketing category, not a clinical standard' />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              "Dermatologist recommended," "dermatologist tested," and
              "dermatologist approved" appear on products across every price point.
              None of these phrases is regulated in the US or EU. There is no
              minimum number of dermatologists required, no standard testing
              protocol, and no independent body verifying the claim.
            </p>
            <p>
              "Dermatologist tested" typically means a dermatologist reviewed the
              formula or applied it to skin under supervised conditions —
              it says nothing about efficacy. "Dermatologist recommended" can be
              supported by a single paid endorsement from a single clinician.
              "Dermatologist approved" has no standard meaning at all.
            </p>
            <p>
              Paid dermatologist partnerships are common and legal. A brand can pay
              a board-certified dermatologist to endorse their product, and that
              dermatologist is not required to disclose the relationship in the same
              way an influencer is under FTC rules — though FTC guidelines do
              require material connection disclosures in social media contexts.
              The product packaging itself carries no such requirement.
            </p>
            <Callout variant="what-to-look-for">
              <strong>What to look for instead:</strong> Dermatologists publishing
              independent research in peer-reviewed journals, contributing to
              clinical guidelines (AAD, BSAD), or commenting on studies they have
              no financial relationship with. A dermatologist&apos;s endorsement on
              packaging tells you they agreed to be paid. A dermatologist&apos;s
              published research tells you something about what they actually found.
            </Callout>
          </div>
        </section>

        {/* ── 4. Influencers ───────────────────────────────────────────── */}
        <section id="influencers" className="mb-16 scroll-mt-24">
          <SectionHeading number="04" title="How influencer skincare economics work" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Influencer skincare recommendations exist within a commercial
              ecosystem. Understanding how it works does not require cynicism —
              it just requires knowing what you are looking at.
            </p>
            <p>
              The primary structures are: paid partnerships (the brand pays the
              creator a flat fee or percentage of sales to promote a product),
              gifting (products are sent free in exchange for coverage, which may
              or may not be disclosed), and affiliate codes (the creator earns a
              commission on purchases made through their link). All three are
              legal. Paid partnerships and affiliate arrangements are required to
              be disclosed under FTC guidelines in the US — the requirement is
              "clear and conspicuous" disclosure, not a small-print footnote.
            </p>
            <p>
              The deeper issue is not corruption but incentive structure. A creator
              whose income depends on brand partnerships is structurally incentivised
              to produce positive content about those brands, independent of whether
              the products work. This does not mean every paid recommendation is
              dishonest — many creators genuinely believe in what they promote. It
              means the incentive for positive coverage exists regardless of product
              quality, and your calibration of a recommendation should account for
              that.
            </p>
            <Callout variant="important">
              <strong>The testimonial problem:</strong> Personal skincare testimonials
              — "this changed my skin" — are not evidence of efficacy. Skin changes
              over time due to seasonal variation, diet, stress, hormones, sleep, and
              other product interactions. A creator attributing a visible skin change
              to one product after using it for four weeks may be entirely sincere
              and entirely wrong about the cause. This is why clinical trials use
              control groups — human perception of causation is unreliable.
            </Callout>
            <p>
              None of this means influencer content has no value. Tutorials, texture
              reviews, and formulation comparisons can be genuinely useful. The
              question to hold is: does this person have a financial relationship
              with this brand, and am I watching a testimonial or a demonstration?
            </p>
          </div>
        </section>

        {/* ── 5. Non-comedogenic ───────────────────────────────────────── */}
        <section id="non-comedogenic" className="mb-16 scroll-mt-24">
          <SectionHeading number="05" title='"Non-comedogenic" has no regulatory definition and no standard test' />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              "Non-comedogenic" means "does not block pores" and is one of the most
              prominent claims in skincare for acne-prone skin. It is not a
              regulated term. No certification body issues it. Brands self-apply it
              on the basis of their own testing, or sometimes on the basis of no
              testing at all.
            </p>
            <p>
              The comedogenicity rating scale most often referenced — the Kligman
              rabbit ear assay, developed in the 1970s — involves applying
              concentrated ingredients to rabbit ear canals to assess follicular
              plugging. The human relevance of this model is poor. The rabbit ear
              canal is not anatomically equivalent to human facial skin. Many
              ingredients rated comedogenic in rabbit ear studies do not cause
              comedones in human clinical use, and vice versa.
            </p>
            <p>
              Human comedogenicity testing exists but is expensive and infrequently
              used. The most rigorous version involves applying a test formula to
              the backs of human participants under occlusion for several weeks,
              then biopsying follicles. Very few brands run this test before applying
              the "non-comedogenic" label.
            </p>
            <Callout variant="what-to-look-for">
              <strong>What this means practically:</strong> "Non-comedogenic" on a
              label is a reasonable signal that the brand has thought about the
              formulation — but it is not a guarantee. Individual skin response to
              ingredients varies significantly. Patch testing a new product on a
              small area for 2–3 weeks before full-face use remains the most reliable
              way to determine whether a formula will clog your specific pores.
            </Callout>
          </div>
        </section>

        {/* ── 6. Natural vs synthetic ──────────────────────────────────── */}
        <section id="natural-vs-synthetic" className="mb-16 scroll-mt-24">
          <SectionHeading number="06" title='"Natural" is a marketing category, not a safety category' />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              "Natural," "clean," and "green" are among the most commercially
              successful terms in contemporary skincare marketing. None of them
              has a regulatory definition in the US cosmetics market. The EU has
              introduced some constraints on "organic" claims but "natural" and
              "clean" remain self-defined by brands.
            </p>
            <p>
              The implied premise — that natural origin correlates with safety and
              synthetic origin correlates with risk — is not supported by the
              evidence. Poison ivy, arsenic, lead, and botulinum toxin are natural.
              The preservatives that prevent bacterial contamination in water-based
              cosmetics are typically synthetic. Whether a substance is safe depends
              on its molecular structure, concentration, and route of exposure —
              not whether it originated in a plant or a laboratory.
            </p>
            <p>
              Some of the most evidence-backed actives in skincare — retinol,
              niacinamide, azelaic acid, glycolic acid — are either synthetic or
              synthesised for consistency, because natural extraction cannot reliably
              produce the purity and concentration that clinical trials demonstrated
              efficacy at. A retinol derived from a plant source at an unspecified
              concentration is not equivalent to synthetic retinol at 0.1%.
            </p>
            <Callout variant="important">
              <strong>The parabens case:</strong> Parabens are synthetic preservatives
              that have been progressively removed from formulations in response to
              consumer concern. The concern originated from a 2004 study detecting
              parabens in breast tumour tissue — but detection is not causation, and
              the study drew no conclusions about parabens causing cancer. Subsequent
              review by the EU&apos;s Scientific Committee on Consumer Safety found
              parabens at cosmetic concentrations do not pose a health risk. Many
              "paraben-free" products now use alternative preservatives with
              shorter safety histories and less regulatory review. Removing a
              well-studied, well-understood preservative in favour of newer
              alternatives because it sounds cleaner is not necessarily a safety
              improvement.
            </Callout>
            <p>
              This is not a defence of all synthetic ingredients or a dismissal of
              all natural ones. Some natural ingredients — plant oils, ceramides,
              shea butter — have genuine evidence and are excellent formulation
              choices. The point is that origin is not a proxy for safety or efficacy.
              Evidence is.
            </p>
          </div>
        </section>

        {/* ── 7. Price gap ─────────────────────────────────────────────── */}
        <section id="price-gap" className="mb-16 scroll-mt-24">
          <SectionHeading number="07" title="Does price correlate with efficacy in skincare?" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The honest answer is: often not, but sometimes yes, and rarely for
              the reasons marketing implies.
            </p>
            <p>
              The active ingredients that drive most of the measurable skin benefit
              in skincare — retinoids, niacinamide, AHAs, vitamin C, salicylic acid,
              ceramides — are inexpensive to produce. A 5% niacinamide formulation
              does the same biological work whether it costs £8 or £80. The
              underlying mechanism does not change based on the packaging.
            </p>
            <p>
              What higher prices frequently reflect: brand positioning and marketing
              spend, packaging materials and retail margins, fragrance and texture
              ingredients that improve the experience but not the outcome, small-batch
              or artisan production, and prestige perception. None of these reliably
              improve clinical efficacy.
            </p>
            <p>
              Where price can legitimately correlate with quality: formulation
              stability. Vitamin C (L-ascorbic acid) is notoriously unstable and
              requires careful encapsulation or anhydrous formulation to reach the
              skin in active form. Some cheaper vitamin C products degrade before
              use. Retinoids similarly vary in delivery system quality. In these
              cases, a more expensive formulation may genuinely deliver more of the
              active — but the relevant question is the formulation approach and
              stability testing, not the price point.
            </p>
            <Callout variant="what-to-look-for">
              <strong>How to evaluate:</strong> Check the active ingredient, its
              concentration, and its position in the ingredient list (ingredients
              are listed in descending order by weight in both the US and EU). A
              product listing niacinamide in the top five ingredients at an
              evidence-based concentration will outperform a prestige product
              listing it at the bottom. Price is not a reliable proxy for this
              information — the ingredient list is.
            </Callout>
          </div>
        </section>

        {/* Footer callout */}
        <div className="border-t border-line pt-10 mt-10">
          <p className="text-sm text-muted leading-relaxed mb-6">
            Every claim on this page is sourced from publicly available regulatory
            documentation, peer-reviewed research, or primary FTC/EU guidance.
            Where evidence is contested or evolving, we have tried to represent
            that accurately. If you spot an error or a claim that should be
            updated, the right thing to do is flag it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/ingredients"
              className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Ingredient library →
            </Link>
            <Link
              href="/ingredients/compare"
              className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Compare two ingredients →
            </Link>
            <Link
              href="/learn"
              className="flex-1 text-center text-sm font-medium py-2.5 px-4 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Learning hub →
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex gap-4 items-start">
      <span className="text-xs font-semibold tabular-nums text-muted/50 pt-1.5 shrink-0 w-6">
        {number}
      </span>
      <h2 className="font-display text-2xl font-medium text-ink leading-snug">{title}</h2>
    </div>
  )
}

function Callout({
  variant,
  children,
}: {
  variant: 'what-to-look-for' | 'important'
  children: React.ReactNode
}) {
  const isImportant = variant === 'important'
  return (
    <div
      className={`rounded-xl border px-5 py-4 text-sm leading-relaxed ${
        isImportant
          ? 'border-amber-200 bg-amber-50/60 text-amber-900'
          : 'border-accent/20 bg-accent/5 text-ink/80'
      }`}
    >
      {children}
    </div>
  )
}

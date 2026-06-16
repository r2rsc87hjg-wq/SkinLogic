// Honest comparison of chemical, mineral, and hybrid sunscreen formulas.
// Surfaces the real trade-offs rather than repeating marketing claims.

interface FormulaType {
  name: 'Chemical' | 'Mineral' | 'Hybrid' | 'Tinted (Iron Oxide)'
  howItWorks: string
  pros: string[]
  cons: string[]
  bestFor: string
}

const FORMULA_TYPES: FormulaType[] = [
  {
    name: 'Chemical',
    howItWorks:
      'Organic (carbon-based) molecules absorb UV radiation and convert it to heat, which dissipates from the skin.',
    pros: [
      'Cosmetically elegant — no white cast',
      'Spreads easily, works well under makeup',
      'Can achieve very high SPF values',
      'Thinner formulas suited to oily skin',
    ],
    cons: [
      'Some filters (avobenzone) are photounstable without stabilisers',
      'Oxybenzone and octinoxate flagged for potential hormonal effects and reef harm',
      'Require 15–20 minutes to absorb before sun exposure',
      'More likely to cause irritation on sensitive skin',
    ],
    bestFor: 'Daily urban use, oily skin, under makeup. Strong option for UVB protection.',
  },
  {
    name: 'Mineral',
    howItWorks:
      'Zinc oxide and titanium dioxide sit on the skin surface and physically scatter and reflect UV radiation. The old "physical blocker" framing is outdated — they primarily absorb UV, not reflect it.',
    pros: [
      'Photostable — do not degrade in sunlight',
      'Effective immediately on application',
      'Better tolerated on sensitive and acne-prone skin',
      'Zinc oxide provides the broadest single-filter UVA + UVB coverage available',
      'No concerns about hormonal activity',
    ],
    cons: [
      'Traditional formulas leave a white cast — worse on deeper skin tones',
      'Micronised/nano zinc mitigates cast but raises questions (unresolved) about skin penetration',
      'Thicker texture, harder to blend',
      'Titanium dioxide alone has weaker UVA coverage than zinc oxide',
    ],
    bestFor:
      'Sensitive skin, rosacea, post-procedure skin, children. Zinc oxide alone or zinc+titanium is a solid all-around choice.',
  },
  {
    name: 'Hybrid',
    howItWorks:
      'Combines chemical and mineral filters. Attempts to capture the cosmetic elegance of chemical formulas with the photostability of mineral filters.',
    pros: [
      'Can reduce white cast while maintaining photostability',
      'Lower concentrations of each individual filter possible',
      'Often includes newer EU filters (where formulated outside the US)',
    ],
    cons: [
      'Still subject to the same chemical filter concerns if oxybenzone or octinoxate are present',
      'More complex formulations — more ingredients to react with sensitive skin',
    ],
    bestFor:
      'General use. The best international hybrid formulas (using Tinosorb S + zinc) offer superior broad-spectrum coverage — unavailable in the US under domestic brands.',
  },
  {
    name: 'Tinted (Iron Oxide)',
    howItWorks:
      'Adds iron oxide pigments to any sunscreen base (mineral, chemical, or hybrid). Iron oxides absorb visible light in the 400–700 nm range — the wavelengths immediately beyond UV — and provide coverage against high-energy visible (HEV) light that standard UV filters do not block.',
    pros: [
      'Blocks HEV/visible light that drives hyperpigmentation and melasma — standard sunscreens do not',
      'RCT evidence (Castanedo-Cazares et al.; Mahmoud et al.) shows tinted formulas outperform untinted for melasma and PIH',
      'Iron oxides counteract the white cast of mineral filters on deeper skin tones',
      'Suitable for all filter types — tinting is additive, not a separate chemistry',
    ],
    cons: [
      '"Blue light protection" marketing is often misleading when applied to indoor screen exposure — outdoor sun HEV is the clinically relevant concern',
      'Limited shade range in some brands; may not match all skin tones well',
      'The added benefit is specifically for visible-light-triggered pigmentation — not a reason to choose tinted over untinted if that is not your concern',
    ],
    bestFor:
      'Anyone managing melasma, post-inflammatory hyperpigmentation, or any pigmentation that is worsened by visible light. Also the most practical solution for the white-cast problem on medium-to-deep skin tones. Look for iron oxides in the inactive ingredients list.',
  },
]

export function FormulaTypeTable() {
  return (
    <div className="space-y-6">
      {FORMULA_TYPES.map((f) => (
        <div key={f.name} className="glass sheen relative overflow-hidden rounded-2xl p-5">
          <div className="relative z-10">
            <h3 className="font-semibold text-ink text-lg mb-1">{f.name}</h3>
            <p className="text-sm text-muted mb-4 leading-relaxed">{f.howItWorks}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="eyebrow text-muted mb-2">Strengths</p>
                <ul className="space-y-1">
                  {f.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-ink/80">
                      <span className="text-accent mt-0.5 shrink-0">+</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-muted mb-2">Limitations</p>
                <ul className="space-y-1">
                  {f.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-ink/80">
                      <span className="text-amber-600 mt-0.5 shrink-0">−</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted bg-sand/60 rounded-lg p-3">
              <strong className="text-ink">Best for: </strong>
              {f.bestFor}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

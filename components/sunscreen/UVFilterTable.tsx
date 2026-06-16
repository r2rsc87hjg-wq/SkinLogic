// The core investigative table — which UV filters actually exist and where.
// Data sourced from FDA OTC monograph, EU Annex VI of Regulation 1223/2009,
// and published photostability research.

interface Filter {
  name: string
  alsoKnownAs?: string
  coverage: 'UVA' | 'UVB' | 'Broad spectrum'
  photostable: boolean
  approvedUS: boolean
  approvedEU: boolean
  note?: string
}

const UV_FILTERS: Filter[] = [
  // --- Currently approved in the US ---
  {
    name: 'Zinc oxide',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Mineral. Broad UVA + UVB. Photostable.',
  },
  {
    name: 'Titanium dioxide',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Mineral. Stronger UVB than UVA. Photostable.',
  },
  {
    name: 'Avobenzone',
    alsoKnownAs: 'Butyl methoxydibenzoylmethane',
    coverage: 'UVA',
    photostable: false,
    approvedUS: true,
    approvedEU: true,
    note: 'Photounstable — degrades in sunlight unless stabilised with octocrylene or Tinosorb S. Most US UVA protection depends on this filter.',
  },
  {
    name: 'Oxybenzone',
    alsoKnownAs: 'Benzophenone-3',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Effective but flagged for potential hormone disruption at high doses (animal studies). Listed as a reef hazard in Hawaii legislation. Use is declining in newer formulations.',
  },
  {
    name: 'Octinoxate',
    alsoKnownAs: 'Ethylhexyl methoxycinnamate',
    coverage: 'UVB',
    photostable: false,
    approvedUS: true,
    approvedEU: true,
    note: 'UVB only. Photounstable. Also listed as a reef hazard.',
  },
  {
    name: 'Octocrylene',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Frequently used as a photostabiliser for avobenzone.',
  },
  {
    name: 'Homosalate',
    coverage: 'UVB',
    photostable: false,
    approvedUS: true,
    approvedEU: true,
    note: 'EU has recommended a concentration cap of 7.34% due to potential systemic absorption concerns. US has no equivalent restriction.',
  },
  {
    name: 'Octisalate',
    alsoKnownAs: 'Ethylhexyl salicylate',
    coverage: 'UVB',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Mild UVB filter, often used to stabilise avobenzone.',
  },
  {
    name: 'Ensulizole',
    alsoKnownAs: 'Phenylbenzimidazole sulfonic acid',
    coverage: 'UVB',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Water-soluble UVB filter used in lightweight, cosmetically elegant formulas. Rarely the primary filter.',
  },
  {
    name: 'Sulisobenzone',
    alsoKnownAs: 'Benzophenone-4',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: true,
    note: 'Broad-spectrum filter in the benzophenone class (same family as oxybenzone). Less commonly used in newer formulations.',
  },
  {
    name: 'Dioxybenzone',
    alsoKnownAs: 'Benzophenone-8',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: true,
    approvedEU: false,
    note: 'Benzophenone-class filter. Used mainly in older US formulations; not approved in the EU. Declining use.',
  },
  {
    name: 'Meradimate',
    alsoKnownAs: 'Menthyl anthranilate',
    coverage: 'UVA',
    photostable: false,
    approvedUS: true,
    approvedEU: false,
    note: 'Weak UVA filter — one of the only UVA-absorbing filters approved under the US OTC monograph aside from avobenzone and zinc oxide. Rarely used in modern formulations. Not approved in the EU.',
  },
  {
    name: 'Padimate O',
    alsoKnownAs: 'OD-PABA / Ethylhexyl dimethyl PABA',
    coverage: 'UVB',
    photostable: false,
    approvedUS: true,
    approvedEU: true,
    note: 'Derivative of PABA (para-aminobenzoic acid). Mostly historical — PABA itself was voluntarily withdrawn from the US market after allergy concerns, and padimate O has largely been replaced by more modern UVB filters.',
  },
  {
    name: 'Trolamine Salicylate',
    coverage: 'UVB',
    photostable: true,
    approvedUS: true,
    approvedEU: false,
    note: 'Weak UVB filter, occasionally found in older US formulations. Not approved in the EU. Rarely included in contemporary products.',
  },
  // --- Pending FDA approval (available in EU, Canada, Australia, Japan, Korea) ---
  {
    name: 'Tinosorb S',
    alsoKnownAs: 'Bemotrizinol / Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Widely considered the gold-standard broad-spectrum filter. Photostable. Also stabilises avobenzone. Application submitted to FDA in 2003. Still pending in 2024.',
  },
  {
    name: 'Tinosorb M',
    alsoKnownAs: 'Bisoctrizole / Methylene Bis-Benzotriazolyl Tetramethylbutylphenol',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Hybrid chemical/physical filter. Strong UVA and UVB. FDA application pending since 2005.',
  },
  {
    name: 'Mexoryl SX',
    alsoKnownAs: 'Ecamsule',
    coverage: 'UVA',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Approved in the EU since 1991. FDA approved it in 2006 in one specific L\'Oréal product (Anthelios SX) via NDA — not via the OTC monograph, meaning other brands cannot use it. Pending general approval since 2002.',
  },
  {
    name: 'Mexoryl XL',
    alsoKnownAs: 'Drometrizole trisiloxane',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Broad-spectrum, photostable. FDA application pending.',
  },
  {
    name: 'Uvinul A Plus',
    alsoKnownAs: 'Diethylamino Hydroxybenzoyl Hexyl Benzoate (DHHB)',
    coverage: 'UVA',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Strong UVA filter. Photostable. FDA application pending.',
  },
]

export function UVFilterTable() {
  const approved = UV_FILTERS.filter((f) => f.approvedUS)
  const pending = UV_FILTERS.filter((f) => !f.approvedUS)

  return (
    <div className="space-y-10">
      <FilterGroup
        title="Approved in both the US and EU"
        filters={approved}
        headingColor="text-ink"
      />
      <FilterGroup
        title="Approved in the EU — pending FDA approval (some for 20+ years)"
        filters={pending}
        headingColor="text-amber-700"
        highlight
      />
    </div>
  )
}

function FilterGroup({
  title,
  filters,
  headingColor,
  highlight,
}: {
  title: string
  filters: Filter[]
  headingColor: string
  highlight?: boolean
}) {
  return (
    <div>
      <h3 className={`font-semibold mb-3 ${headingColor}`}>{title}</h3>
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-line text-left eyebrow text-muted">
                <th className="px-4 py-3">Filter</th>
                <th className="px-4 py-3">Coverage</th>
                <th className="px-4 py-3">Photostable</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filters.map((f) => (
                <tr
                  key={f.name}
                  className={`border-t border-line/60 align-top ${highlight ? 'bg-amber-50/50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-ink">{f.name}</span>
                    {f.alsoKnownAs && (
                      <span className="block text-xs text-muted mt-0.5">{f.alsoKnownAs}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted whitespace-nowrap">{f.coverage}</td>
                  <td className="px-4 py-3">
                    <span className={f.photostable ? 'text-accent font-medium' : 'text-amber-600 font-medium'}>
                      {f.photostable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted leading-relaxed">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

'use client'

import { CollapsibleBlock } from './CollapsibleBlock'

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
    note: 'Weak UVA filter. Rarely used in modern formulations. Not approved in the EU.',
  },
  {
    name: 'Padimate O',
    alsoKnownAs: 'OD-PABA / Ethylhexyl dimethyl PABA',
    coverage: 'UVB',
    photostable: false,
    approvedUS: true,
    approvedEU: true,
    note: 'Derivative of PABA. Mostly historical — largely replaced by more modern UVB filters.',
  },
  {
    name: 'Trolamine Salicylate',
    coverage: 'UVB',
    photostable: true,
    approvedUS: true,
    approvedEU: false,
    note: 'Weak UVB filter, occasionally found in older US formulations. Not approved in the EU.',
  },
  {
    name: 'Tinosorb S',
    alsoKnownAs: 'Bemotrizinol / Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine',
    coverage: 'Broad spectrum',
    photostable: true,
    approvedUS: false,
    approvedEU: true,
    note: 'Widely considered the gold-standard broad-spectrum filter. Photostable. Also stabilises avobenzone. FDA application submitted 2003, still pending.',
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
    note: "Approved in EU since 1991. FDA approved it in one specific L'Oréal product via NDA — other brands cannot use it. Pending general approval since 2002.",
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
    <div className="space-y-4">
      <CollapsibleBlock
        title={`Approved in both the US and EU (${approved.length} filters)`}
        defaultOpen
      >
        <FilterRows filters={approved} />
      </CollapsibleBlock>

      <CollapsibleBlock
        title={`EU-approved — pending FDA approval for 20+ years (${pending.length} filters)`}
        titleColor="text-amber-700"
        defaultOpen
      >
        <FilterRows filters={pending} highlight />
      </CollapsibleBlock>
    </div>
  )
}

function FilterRows({ filters, highlight }: { filters: Filter[]; highlight?: boolean }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[540px]">
          <thead>
            <tr className="border-b border-line text-left eyebrow text-muted">
              <th className="px-4 py-3 w-36">Filter</th>
              <th className="px-4 py-3 w-28">Coverage</th>
              <th className="px-4 py-3 w-24">Photostable</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filters.map((f) => (
              <tr
                key={f.name}
                className={`border-t border-line/60 align-top ${highlight ? 'bg-amber-50/40' : ''}`}
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{f.name}</span>
                  {f.alsoKnownAs && (
                    <span className="block text-xs text-muted mt-0.5 leading-snug">{f.alsoKnownAs}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted whitespace-nowrap">{f.coverage}</td>
                <td className="px-4 py-3">
                  <span className={f.photostable ? 'text-accent font-medium' : 'text-amber-600 font-medium'}>
                    {f.photostable ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted leading-relaxed text-xs">{f.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card stack */}
      <div className="sm:hidden divide-y divide-line/40">
        {filters.map((f) => (
          <div
            key={f.name}
            className={`px-4 py-3 ${highlight ? 'bg-amber-50/40' : ''}`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="font-medium text-ink text-sm">{f.name}</span>
                {f.alsoKnownAs && (
                  <span className="block text-xs text-muted mt-0.5">{f.alsoKnownAs}</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                <span className="text-xs text-muted">{f.coverage}</span>
                <span className={`text-xs font-semibold ${f.photostable ? 'text-accent' : 'text-amber-600'}`}>
                  {f.photostable ? '✓ Stable' : '⚠ Unstable'}
                </span>
              </div>
            </div>
            {f.note && <p className="text-xs text-muted leading-relaxed">{f.note}</p>}
          </div>
        ))}
      </div>
    </>
  )
}

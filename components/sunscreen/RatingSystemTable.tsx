'use client'

import { CollapsibleBlock } from './CollapsibleBlock'

const SPF_ROWS = [
  { rating: 'SPF 15', uvbBlocked: '93%', note: 'Minimum for daily use (AAD)' },
  { rating: 'SPF 30', uvbBlocked: '97%', note: 'AAD-recommended minimum' },
  { rating: 'SPF 50', uvbBlocked: '98%', note: 'Standard for outdoor activity' },
  { rating: 'SPF 50+', uvbBlocked: '98%+', note: 'Common on EU/Asian formulas' },
  { rating: 'SPF 100', uvbBlocked: '99%', note: 'Marginal gain over SPF 50' },
]

const PA_ROWS = [
  { rating: 'PA+', ppd: 'PPD 2–4', protection: 'Minimal UVA protection' },
  { rating: 'PA++', ppd: 'PPD 4–8', protection: 'Moderate UVA protection' },
  { rating: 'PA+++', ppd: 'PPD 8–16', protection: 'High UVA protection' },
  { rating: 'PA++++', ppd: 'PPD 16+', protection: 'Highest UVA protection' },
]

export function RatingSystemTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CollapsibleBlock
        title="SPF — UVB protection"
        subtitle="Sun Protection Factor. Measures how much UVB radiation is blocked. The scale is not linear — the jump from SPF 30 to SPF 50 is smaller than it looks."
        defaultOpen
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-line text-left eyebrow text-muted">
              <th className="px-4 py-2.5">Rating</th>
              <th className="px-4 py-2.5">UVB blocked</th>
              <th className="px-4 py-2.5">Context</th>
            </tr>
          </thead>
          <tbody>
            {SPF_ROWS.map((r) => (
              <tr key={r.rating} className="border-b border-line/60">
                <td className="px-4 py-2.5 font-medium text-ink whitespace-nowrap">{r.rating}</td>
                <td className="px-4 py-2.5 text-ink/80">{r.uvbBlocked}</td>
                <td className="px-4 py-2.5 text-muted text-xs">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleBlock>

      <CollapsibleBlock
        title="PA+ — UVA protection"
        subtitle='Persistent Pigment Darkening (PPD) based. Used in Japan, Korea, and internationally. The US has no equivalent — "broad spectrum" is a pass/fail threshold, not a strength rating.'
        defaultOpen
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-line text-left eyebrow text-muted">
              <th className="px-4 py-2.5">Rating</th>
              <th className="px-4 py-2.5">PPD value</th>
              <th className="px-4 py-2.5">What it means</th>
            </tr>
          </thead>
          <tbody>
            {PA_ROWS.map((r) => (
              <tr key={r.rating} className="border-b border-line/60">
                <td className="px-4 py-2.5 font-medium text-ink whitespace-nowrap">{r.rating}</td>
                <td className="px-4 py-2.5 text-ink/80 whitespace-nowrap">{r.ppd}</td>
                <td className="px-4 py-2.5 text-muted text-xs">{r.protection}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted px-4 py-3 border-t border-line/40">
          Source: Japanese Cosmetic Industry Association (JCIA). PPD = Persistent Pigment Darkening factor.
        </p>
      </CollapsibleBlock>
    </div>
  )
}

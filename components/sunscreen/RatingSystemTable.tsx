// Side-by-side comparison of SPF (UVB) and PA+ (UVA) rating systems.
// PA+ is the Japanese/Asian standard and is increasingly appearing on
// internationally formulated products sold in the US.

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SPF */}
      <div className="glass relative overflow-hidden rounded-2xl p-5">
        <h3 className="font-semibold text-ink mb-1">SPF — UVB protection</h3>
        <p className="text-sm text-muted mb-3">
          Sun Protection Factor. Measures how much UVB radiation is blocked.
          The scale is not linear — the jump from SPF 30 to SPF 50 is smaller
          than it looks.
        </p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-line text-left eyebrow text-muted">
              <th className="py-2 pr-4">Rating</th>
              <th className="py-2 pr-4">UVB blocked</th>
              <th className="py-2">Context</th>
            </tr>
          </thead>
          <tbody>
            {SPF_ROWS.map((r) => (
              <tr key={r.rating} className="border-b border-line/60">
                <td className="py-2 pr-4 font-medium text-ink">{r.rating}</td>
                <td className="py-2 pr-4 text-ink/80">{r.uvbBlocked}</td>
                <td className="py-2 text-muted text-xs">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PA+ */}
      <div className="glass relative overflow-hidden rounded-2xl p-5">
        <h3 className="font-semibold text-ink mb-1">PA+ — UVA protection</h3>
        <p className="text-sm text-muted mb-3">
          Persistent Pigment Darkening (PPD) based. Used in Japan, Korea, and
          increasingly on international products. The US has no equivalent
          standardised UVA rating system — "broad spectrum" on a US label only
          means the product passed a basic UVA/UVB ratio test, not a UVA
          strength test.
        </p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-line text-left eyebrow text-muted">
              <th className="py-2 pr-4">Rating</th>
              <th className="py-2 pr-4">PPD value</th>
              <th className="py-2">What it means</th>
            </tr>
          </thead>
          <tbody>
            {PA_ROWS.map((r) => (
              <tr key={r.rating} className="border-b border-line/60">
                <td className="py-2 pr-4 font-medium text-ink">{r.rating}</td>
                <td className="py-2 pr-4 text-ink/80">{r.ppd}</td>
                <td className="py-2 text-muted text-xs">{r.protection}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted mt-3">
          Source: Japanese Cosmetic Industry Association (JCIA) PA+ system.
          PPD = Persistent Pigment Darkening factor.
        </p>
      </div>
    </div>
  )
}

// Infographic components for the Industry transparency page.
// All are server components — no client state needed.

export function EvidenceSpectrum() {
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

export function RegulationGap() {
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

export function DermClaimsTable() {
  const claims = [
    { label: 'Dermatologist tested', requires: 'Minimum 1 dermatologist', regulated: false },
    { label: 'Dermatologist recommended', requires: 'Minimum 1 paid endorsement', regulated: false },
    { label: 'Dermatologist approved', requires: 'Nothing — self-applied', regulated: false },
    { label: 'FDA-approved drug claim', requires: 'Rigorous clinical trials', regulated: true },
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

export function InfluencerFlow() {
  const nodes = [
    { label: 'Brand', sub: 'pays flat fee\nor % commission', icon: '🏢' },
    { label: 'Creator', sub: 'produces content\n+ affiliate code', icon: '📱' },
    { label: 'Consumer', sub: 'buys via link\nor promo code', icon: '🛒' },
  ]
  const disclosures = [
    { type: 'Paid partnership', req: 'Must disclose (FTC)', ok: true },
    { type: 'Affiliate code', req: 'Must disclose (FTC)', ok: true },
    { type: 'Gifting (no payment)', req: 'Disclosure required if endorsing', ok: null },
    { type: 'Product packaging endorsement', req: 'No disclosure required', ok: false },
  ]
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">How influencer skincare economics work</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
          {nodes.map((node, i) => (
            <div key={i} className="rounded-xl bg-sand/60 border border-line/50 p-3">
              <div className="text-xl mb-1">{node.icon}</div>
              <div className="font-semibold text-ink">{node.label}</div>
              <div className="text-muted mt-0.5 leading-tight whitespace-pre-line">{node.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {disclosures.map((row, i) => (
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

export function ComedogenicityChain() {
  const steps = [
    { icon: '🐰', label: '1970s rabbit ear assay', sub: 'Concentrated ingredient applied to rabbit ear canal' },
    { icon: '📋', label: 'Comedogenicity score', sub: 'Ingredient assigned a 0–5 rating' },
    { icon: '🌐', label: 'Published on websites', sub: "CosDNA, Paula's Choice, etc. list the score" },
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

export function NaturalVsSynthetic() {
  const natural = ['Poison ivy', 'Arsenic', 'Lead', 'Botulinum toxin']
  const synthetic = ['Niacinamide', 'Retinol (OTC)', 'Glycolic acid', 'Phenoxyethanol']
  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="bg-sand/40 px-4 py-2.5 border-b border-line/40">
        <p className="eyebrow text-muted text-[0.6rem]">Origin ≠ safety</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-line/40">
        <div className="p-4">
          <p className="text-xs font-semibold text-amber-700 mb-2">❌ Natural &amp; harmful</p>
          <ul className="space-y-1.5">
            {natural.map((n) => <li key={n} className="text-xs text-ink/80 font-medium">{n}</li>)}
          </ul>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold text-accent mb-2">✓ Synthetic &amp; evidence-backed</p>
          <ul className="space-y-1.5">
            {synthetic.map((n) => <li key={n} className="text-xs text-ink/80 font-medium">{n}</li>)}
          </ul>
        </div>
      </div>
      <div className="bg-sand/20 px-4 py-2 border-t border-line/40">
        <p className="text-[0.65rem] text-muted">Safety depends on molecular structure, concentration, and exposure — not origin</p>
      </div>
    </figure>
  )
}

export function PriceVsIngredient() {
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

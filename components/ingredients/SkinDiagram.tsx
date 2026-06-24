'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Config types ─────────────────────────────────────────────────────────────

interface Callout {
  title: string
  body: string
}

interface DiagramConfig {
  heading: string
  depth: 'surface' | 'epidermis' | 'dermis'
  particleLabel: string
  callouts: Callout[]
  showCollagen?: boolean
}

// ─── Y positions — centred in each layer ─────────────────────────────────────
// SC: y≈42–100  → centre 71
// Epidermis: y≈100–182  → centre 141
// Dermis: y≈182–250  → centre 216

const DEPTH_Y: Record<string, number> = {
  surface: 71,
  epidermis: 141,
  dermis: 216,
}

// ─── Ingredient configs ───────────────────────────────────────────────────────
// Keys match the ingredient slug with any "seed-" prefix stripped.

const DIAGRAMS: Record<string, DiagramConfig> = {
  retinol: {
    heading: 'How retinol works in skin',
    depth: 'dermis',
    particleLabel: 'Retinol',
    showCollagen: true,
    callouts: [
      { title: 'Converts to retinoic acid', body: 'Inside keratinocytes in the epidermis' },
      { title: '↑ Collagen synthesis', body: 'Activates fibroblasts deep in the dermis' },
      { title: '↑ Cell turnover', body: 'Normalises skin shedding rate' },
    ],
  },
  retinaldehyde: {
    heading: 'How retinaldehyde works in skin',
    depth: 'dermis',
    particleLabel: 'RAL',
    showCollagen: true,
    callouts: [
      { title: 'One conversion step from retinoic acid', body: 'More potent than retinol, milder than tretinoin' },
      { title: '↑ Collagen synthesis', body: 'Direct fibroblast activation in the dermis' },
    ],
  },
  'hyaluronic-acid': {
    heading: 'How hyaluronic acid works in skin',
    depth: 'surface',
    particleLabel: 'HA',
    callouts: [
      { title: 'Binds water at the surface', body: 'Holds up to 1,000× its own weight in water' },
      { title: 'Plumps the stratum corneum', body: 'Reduces appearance of fine lines temporarily' },
    ],
  },
  'polyglutamic-acid': {
    heading: 'How polyglutamic acid works in skin',
    depth: 'surface',
    particleLabel: 'PGA',
    callouts: [
      { title: 'Larger molecule than hyaluronic acid', body: 'Stays on the surface — strong film-forming effect' },
      { title: 'Reduces water loss', body: 'Occlusive humectant layer on stratum corneum' },
    ],
  },
  niacinamide: {
    heading: 'How niacinamide works in skin',
    depth: 'epidermis',
    particleLabel: 'B3',
    callouts: [
      { title: 'Blocks melanin transfer', body: 'Between melanocytes and keratinocytes' },
      { title: '↑ Ceramide production', body: 'Strengthens the skin barrier' },
      { title: 'Reduces sebum output', body: 'Via sebocyte regulation' },
    ],
  },
  'vitamin-c': {
    heading: 'How vitamin C works in skin',
    depth: 'epidermis',
    particleLabel: 'Vit C',
    callouts: [
      { title: 'Neutralises free radicals', body: 'Antioxidant shield against UV damage' },
      { title: 'Inhibits melanin production', body: 'Tyrosinase enzyme is blocked' },
    ],
  },
  'salicylic-acid': {
    heading: 'How salicylic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'BHA',
    callouts: [
      { title: 'Oil-soluble — enters pores', body: 'Penetrates the lipid-rich pore lining' },
      { title: 'Dissolves dead skin cells', body: 'Breaks bonds between corneocytes' },
    ],
  },
  'glycolic-acid': {
    heading: 'How glycolic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'AHA',
    callouts: [
      { title: 'Loosens dead surface cells', body: 'Breaks corneodesmosomes at the surface' },
      { title: 'Smooths texture, fades PIH', body: 'Accelerates epidermal turnover' },
    ],
  },
  'lactic-acid': {
    heading: 'How lactic acid works in skin',
    depth: 'surface',
    particleLabel: 'AHA',
    callouts: [
      { title: 'Gentle surface exfoliation', body: 'Larger molecule = milder than glycolic acid' },
      { title: 'Humectant effect', body: 'Draws water into the stratum corneum' },
    ],
  },
  'mandelic-acid': {
    heading: 'How mandelic acid works in skin',
    depth: 'surface',
    particleLabel: 'AHA',
    callouts: [
      { title: 'Largest common AHA molecule', body: 'Slowest penetration — gentlest exfoliant' },
      { title: 'Fades pigmentation', body: 'Inhibits tyrosinase, accelerates cell turnover' },
    ],
  },
  'azelaic-acid': {
    heading: 'How azelaic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'AzA',
    callouts: [
      { title: 'Kills acne bacteria', body: 'Antibacterial at the follicle opening' },
      { title: 'Reduces pigmentation', body: 'Tyrosinase inhibition in keratinocytes' },
    ],
  },
  'benzoyl-peroxide': {
    heading: 'How benzoyl peroxide works in skin',
    depth: 'epidermis',
    particleLabel: 'BPO',
    callouts: [
      { title: 'Releases oxygen inside pores', body: 'Kills C. acnes — an anaerobic bacteria' },
      { title: 'No antibiotic resistance risk', body: 'Bacteria cannot adapt to oxidative stress' },
    ],
  },
  'alpha-arbutin': {
    heading: 'How alpha-arbutin works in skin',
    depth: 'epidermis',
    particleLabel: 'α-Arb',
    callouts: [
      { title: 'Inhibits tyrosinase enzyme', body: 'Blocks melanin production at its source' },
      { title: 'Gentler than hydroquinone', body: 'Hydrolyses slowly — less irritation risk' },
    ],
  },
  'tranexamic-acid': {
    heading: 'How tranexamic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'TXA',
    callouts: [
      { title: 'Blocks plasmin activity', body: 'Reduces UV-induced prostaglandin release' },
      { title: 'Reduces melanin transfer', body: 'Shown effective on melasma in clinical trials' },
    ],
  },
  bakuchiol: {
    heading: 'How bakuchiol works in skin',
    depth: 'epidermis',
    particleLabel: 'Bak',
    callouts: [
      { title: 'Activates retinoid receptors', body: 'Despite being structurally unrelated to retinol' },
      { title: '↑ Cell turnover', body: 'Without the peeling of retinol at equivalent doses' },
    ],
  },
  peptides: {
    heading: 'How signal peptides work in skin',
    depth: 'dermis',
    particleLabel: 'Pep',
    showCollagen: true,
    callouts: [
      { title: 'Reach dermis fibroblasts', body: 'Small enough to penetrate epidermis' },
      { title: 'Mimic wound-repair signals', body: 'Trigger collagen and elastin synthesis' },
    ],
  },
  'centella-asiatica': {
    heading: 'How centella asiatica works in skin',
    depth: 'epidermis',
    particleLabel: 'Cica',
    callouts: [
      { title: 'Madecassoside calms inflammation', body: 'Reduces redness and sensitisation' },
      { title: '↑ Collagen via TGF-β pathway', body: 'Asiaticoside stimulates wound repair' },
    ],
  },
  'kojic-acid': {
    heading: 'How kojic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'Koj',
    callouts: [
      { title: 'Chelates copper in tyrosinase', body: 'Disrupts the enzyme needed to make melanin' },
      { title: 'Inhibits melanin production', body: 'Reduces dark spots and uneven tone' },
    ],
  },
  panthenol: {
    heading: 'How panthenol (B5) works in skin',
    depth: 'epidermis',
    particleLabel: 'B5',
    callouts: [
      { title: 'Converts to pantothenic acid', body: 'Supports barrier lipid synthesis' },
      { title: 'Humectant — draws in water', body: 'Holds moisture in the epidermis' },
      { title: 'Accelerates wound healing', body: 'Promotes keratinocyte proliferation' },
    ],
  },
  'ferulic-acid': {
    heading: 'How ferulic acid works in skin',
    depth: 'surface',
    particleLabel: 'Fer',
    callouts: [
      { title: 'Neutralises UV-generated radicals', body: 'Potent antioxidant at the skin surface' },
      { title: 'Stabilises vitamin C formulas', body: 'Doubles the photoprotection of Vit C + E' },
    ],
  },
  squalane: {
    heading: 'How squalane works in skin',
    depth: 'surface',
    particleLabel: 'Sq',
    callouts: [
      { title: "Mimics skin's own sebum", body: 'Identical structure to natural squalene' },
      { title: 'Occlusive barrier seal', body: 'Prevents moisture escaping the surface' },
    ],
  },
  ceramides: {
    heading: 'How ceramides work in skin',
    depth: 'surface',
    particleLabel: 'Cer',
    callouts: [
      { title: 'Fill gaps in the skin barrier', body: 'Lipid "mortar" between corneocytes' },
      { title: 'Lock in moisture', body: 'Reduce transepidermal water loss (TEWL)' },
    ],
  },
  allantoin: {
    heading: 'How allantoin works in skin',
    depth: 'surface',
    particleLabel: 'All',
    callouts: [
      { title: 'Gentle keratolytic effect', body: 'Softens and loosens dead surface cells' },
      { title: 'Promotes cell regeneration', body: 'Stimulates healthy new keratinocyte growth' },
      { title: 'Soothes inflammation', body: 'Calms redness and irritated skin' },
    ],
  },
  zinc: {
    heading: 'How zinc works in skin',
    depth: 'epidermis',
    particleLabel: 'Zn',
    callouts: [
      { title: 'Reduces sebum production', body: 'Inhibits 5-alpha reductase activity' },
      { title: 'Antibacterial at the follicle', body: 'Directly inhibits C. acnes growth' },
      { title: 'Calms redness', body: 'Anti-inflammatory effect on keratinocytes' },
    ],
  },
  resveratrol: {
    heading: 'How resveratrol works in skin',
    depth: 'epidermis',
    particleLabel: 'Res',
    callouts: [
      { title: 'Activates SIRT1 longevity proteins', body: 'Protects cells from oxidative stress' },
      { title: 'Neutralises free radicals', body: 'Polyphenol antioxidant at the epidermal level' },
    ],
  },
  'licorice-root': {
    heading: 'How licorice root works in skin',
    depth: 'epidermis',
    particleLabel: 'Lic',
    callouts: [
      { title: 'Glabridin inhibits tyrosinase', body: 'Reduces UV-triggered pigmentation' },
      { title: 'Anti-inflammatory', body: 'Glycyrrhizin calms redness and sensitivity' },
    ],
  },
  'colloidal-oatmeal': {
    heading: 'How colloidal oatmeal works in skin',
    depth: 'surface',
    particleLabel: 'Oat',
    callouts: [
      { title: 'Forms protective film on skin', body: 'Physically shields and seals the barrier' },
      { title: 'Relieves itch', body: 'Avenanthramides block itch-signalling pathways' },
      { title: 'Normalises skin pH', body: 'Buffers acidic or alkaline irritants' },
    ],
  },
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SkinDiagram({ slug }: { slug: string }) {
  const key = slug.replace(/^seed-/, '')
  const config = DIAGRAMS[key]
  if (!config) return null
  return <DiagramView config={config} />
}

// ─── Diagram rendering ────────────────────────────────────────────────────────

function DiagramView({ config }: { config: DiagramConfig }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const endY = DEPTH_Y[config.depth]
  const px = 300

  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-line/40 bg-sand/40">
        <p className="eyebrow text-muted text-[0.6rem]">{config.heading}</p>
      </div>

      <div className="bg-[#fdf3ea]">
        <svg
          ref={svgRef}
          viewBox="0 0 480 250"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden
        >
          {/* Above-skin zone */}
          <rect x="0" y="0" width="480" height="42" fill="#fdf3ea" />

          {/* Ingredient label */}
          <g transform={`translate(${px}, 18)`}>
            <rect x="-28" y="-13" width="56" height="20" rx="10" fill="#46c08a" opacity="0.12" />
            <rect x="-28" y="-13" width="56" height="20" rx="10" fill="none" stroke="#46c08a" strokeWidth="1" opacity="0.4" />
            <text textAnchor="middle" y="3" fontSize="9.5" fontWeight="700" fill="#46c08a" fontFamily="system-ui,-apple-system,sans-serif">
              {config.particleLabel}
            </text>
          </g>

          {/* Stratum Corneum */}
          <path
            d="M 0 42 C 55 36 110 48 165 42 C 220 36 275 48 330 42 C 385 36 430 46 480 42 L 480 100 C 430 106 385 94 330 100 C 275 106 220 94 165 100 C 110 106 55 94 0 100 Z"
            fill="#fde4c2"
          />
          {[30, 75, 125, 195, 245, 380, 435].map((x) => (
            <ellipse key={x} cx={x} cy={42} rx="2.5" ry="1.5" fill="#f5c99a" opacity="0.5" />
          ))}
          <text x="12" y="68" fontSize="7.5" fontWeight="700" fill="#9e7040" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">STRATUM CORNEUM</text>
          <text x="12" y="80" fontSize="7" fill="#b58a60" fontFamily="system-ui,-apple-system,sans-serif">~15 cell layers</text>

          {/* Epidermis */}
          <path
            d="M 0 100 C 55 94 110 106 165 100 C 220 94 275 106 330 100 C 385 94 430 104 480 100 L 480 182 C 430 188 385 176 330 182 C 275 188 220 176 165 182 C 110 188 55 176 0 182 Z"
            fill="#dba07a"
          />
          <text x="12" y="140" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.88)" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">EPIDERMIS</text>
          <text x="12" y="152" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="system-ui,-apple-system,sans-serif">50–100 μm</text>

          {/* Dermis */}
          <path
            d="M 0 182 C 55 176 110 188 165 182 C 220 176 275 188 330 182 C 385 176 430 186 480 182 L 480 250 L 0 250 Z"
            fill="#c4785a"
          />
          <text x="12" y="215" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.88)" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">DERMIS</text>
          <text x="12" y="227" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="system-ui,-apple-system,sans-serif">1–4 mm · collagen-rich</text>

          {/* Collagen fibers (retinoids only) */}
          {config.showCollagen && [196, 210, 224, 237, 248].map((y, i) => (
            <path
              key={y}
              d={`M 0 ${y} C 80 ${y - 3} 160 ${y + 3} 240 ${y} C 320 ${y - 3} 400 ${y + 3} 480 ${y}`}
              stroke="rgba(255,230,200,0.55)"
              strokeWidth="1.5"
              fill="none"
              style={{ opacity: active ? 1 : 0, transition: `opacity 0.5s ease ${1.9 + i * 0.12}s` }}
            />
          ))}

          {/* Particle trail */}
          <line
            x1={px} y1={18} x2={px} y2={endY}
            stroke="#46c08a" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round"
            style={{ strokeDashoffset: active ? 0 : 300, transition: 'stroke-dashoffset 1.1s ease-out 0.3s' }}
          />

          {/* Particle dot */}
          <circle cx={px} cy={18} r="7" fill="#46c08a" opacity="0.2"
            style={{ transform: `translateY(${active ? endY - 18 : 0}px)`, transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s' }}
          />
          <circle cx={px} cy={18} r="5" fill="#46c08a"
            style={{ transform: `translateY(${active ? endY - 18 : 0}px)`, transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s' }}
          />
          <circle cx={px} cy={18} r="2.5" fill="white" opacity="0.85"
            style={{ transform: `translateY(${active ? endY - 18 : 0}px)`, transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s' }}
          />
        </svg>
      </div>

      {/* Mechanism callout cards */}
      <div className="bg-[#fdf3ea] px-4 pb-4">
        <div className={`grid gap-2 ${config.callouts.length > 2 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {config.callouts.map((c, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/75 border border-accent/20 px-3 py-2.5"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.4s ease ${1.2 + i * 0.2}s, transform 0.4s ease ${1.2 + i * 0.2}s`,
              }}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink leading-snug">{c.title}</p>
                  <p className="text-[0.65rem] text-muted mt-0.5 leading-snug">{c.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

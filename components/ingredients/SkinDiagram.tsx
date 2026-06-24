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

// ─── Y positions for each penetration depth (inside 250px-tall skin area) ────

const DEPTH_Y: Record<string, number> = {
  surface: 68,
  epidermis: 136,
  dermis: 212,
}

// ─── Ingredient configs ───────────────────────────────────────────────────────
// Keys match slug with "seed-" prefix stripped.

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
  'hyaluronic-acid': {
    heading: 'How hyaluronic acid works in skin',
    depth: 'surface',
    particleLabel: 'HA',
    callouts: [
      { title: 'Binds water at the surface', body: 'Holds up to 1,000× its own weight in water' },
      { title: 'Plumps the stratum corneum', body: 'Reduces the appearance of fine lines temporarily' },
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
  'salicylic-acid': {
    heading: 'How salicylic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'BHA',
    callouts: [
      { title: 'Oil-soluble — enters pores', body: 'Penetrates the lipid-rich pore lining' },
      { title: 'Dissolves dead skin cells', body: 'Breaks bonds between corneocytes' },
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
  'glycolic-acid': {
    heading: 'How glycolic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'AHA',
    callouts: [
      { title: 'Loosens dead surface cells', body: 'Breaks corneodesmosomes at the surface' },
      { title: 'Smooths texture, reduces PIH', body: 'Accelerates epidermal turnover' },
    ],
  },
  'lactic-acid': {
    heading: 'How lactic acid works in skin',
    depth: 'surface',
    particleLabel: 'AHA',
    callouts: [
      { title: 'Gentle surface exfoliation', body: 'Larger molecule = milder than glycolic' },
      { title: 'Humectant effect', body: 'Draws water into the stratum corneum' },
    ],
  },
  'azelaic-acid': {
    heading: 'How azelaic acid works in skin',
    depth: 'epidermis',
    particleLabel: 'AzA',
    callouts: [
      { title: 'Kills acne bacteria', body: 'Antibacterial at the follicle' },
      { title: 'Reduces pigmentation', body: 'Tyrosinase inhibition in keratinocytes' },
    ],
  },
  'benzoyl-peroxide': {
    heading: 'How benzoyl peroxide works in skin',
    depth: 'surface',
    particleLabel: 'BPO',
    callouts: [
      { title: 'Releases oxygen in the pore', body: 'Kills C. acnes (anaerobic bacteria)' },
      { title: 'No antibiotic resistance risk', body: 'Bacteria cannot adapt to oxidative stress' },
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
  squalane: {
    heading: 'How squalane works in skin',
    depth: 'surface',
    particleLabel: 'Sq',
    callouts: [
      { title: 'Mimics skin\'s own sebum', body: 'Identical structure to natural squalene' },
      { title: 'Occlusive barrier seal', body: 'Prevents moisture escaping the surface' },
    ],
  },
  retinaldehyde: {
    heading: 'How retinaldehyde works in skin',
    depth: 'dermis',
    particleLabel: 'RAL',
    showCollagen: true,
    callouts: [
      { title: 'One step from retinoic acid', body: 'More potent than retinol, milder than tretinoin' },
      { title: '↑ Collagen synthesis', body: 'Direct fibroblast activation in the dermis' },
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
  const px = 300 // particle x-position

  return (
    <figure className="rounded-2xl border border-line/60 overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-2.5 border-b border-line/40 bg-sand/40">
        <p className="eyebrow text-muted text-[0.6rem]">{config.heading}</p>
      </div>

      {/* SVG cross-section */}
      <div className="bg-[#fdf3ea]">
        <svg
          ref={svgRef}
          viewBox="0 0 480 250"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden
        >
          {/* ── Above-skin zone ── */}
          <rect x="0" y="0" width="480" height="42" fill="#fdf3ea" />

          {/* Ingredient label above skin */}
          <g transform={`translate(${px}, 18)`}>
            <rect x="-28" y="-13" width="56" height="20" rx="10" fill="#46c08a" opacity="0.12" />
            <rect x="-28" y="-13" width="56" height="20" rx="10" fill="none" stroke="#46c08a" strokeWidth="1" opacity="0.4" />
            <text textAnchor="middle" y="3" fontSize="9.5" fontWeight="700" fill="#46c08a" fontFamily="system-ui,-apple-system,sans-serif">
              {config.particleLabel}
            </text>
          </g>

          {/* ── Stratum Corneum layer ── */}
          {/* Wavy skin surface at top */}
          <path
            d="M 0 42 C 55 36 110 48 165 42 C 220 36 275 48 330 42 C 385 36 430 46 480 42 L 480 100 C 430 106 385 94 330 100 C 275 106 220 94 165 100 C 110 106 55 94 0 100 Z"
            fill="#fde4c2"
          />
          {/* SC top texture dots */}
          {[30, 75, 125, 195, 245, 380, 435].map((x) => (
            <ellipse key={x} cx={x} cy={42} rx="2.5" ry="1.5" fill="#f5c99a" opacity="0.5" />
          ))}

          {/* SC label */}
          <text x="12" y="66" fontSize="7.5" fontWeight="700" fill="#9e7040" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">
            STRATUM CORNEUM
          </text>
          <text x="12" y="78" fontSize="7" fill="#b58a60" fontFamily="system-ui,-apple-system,sans-serif">
            ~15 cell layers
          </text>

          {/* ── Epidermis layer ── */}
          <path
            d="M 0 100 C 55 94 110 106 165 100 C 220 94 275 106 330 100 C 385 94 430 104 480 100 L 480 182 C 430 188 385 176 330 182 C 275 188 220 176 165 182 C 110 188 55 176 0 182 Z"
            fill="#dba07a"
          />

          {/* Epidermis label */}
          <text x="12" y="140" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.88)" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">
            EPIDERMIS
          </text>
          <text x="12" y="152" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="system-ui,-apple-system,sans-serif">
            50–100 μm
          </text>

          {/* ── Dermis layer ── */}
          <path
            d="M 0 182 C 55 176 110 188 165 182 C 220 176 275 188 330 182 C 385 176 430 186 480 182 L 480 250 L 0 250 Z"
            fill="#c4785a"
          />

          {/* Dermis label */}
          <text x="12" y="218" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.88)" letterSpacing="0.1em" fontFamily="system-ui,-apple-system,sans-serif">
            DERMIS
          </text>
          <text x="12" y="230" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="system-ui,-apple-system,sans-serif">
            1–4 mm · collagen-rich
          </text>

          {/* ── Collagen fibers (dermis, for retinoids) ── */}
          {config.showCollagen && [196, 210, 224, 237, 248].map((y, i) => (
            <path
              key={y}
              d={`M 0 ${y} C 80 ${y - 3} 160 ${y + 3} 240 ${y} C 320 ${y - 3} 400 ${y + 3} 480 ${y}`}
              stroke="rgba(255,230,200,0.55)"
              strokeWidth="1.5"
              fill="none"
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity 0.5s ease ${1.9 + i * 0.12}s`,
              }}
            />
          ))}

          {/* ── Particle trail ── */}
          <line
            x1={px} y1={18} x2={px} y2={endY}
            stroke="#46c08a"
            strokeWidth="2"
            strokeDasharray="5 4"
            strokeLinecap="round"
            style={{
              strokeDashoffset: active ? 0 : 300,
              transition: 'stroke-dashoffset 1.1s ease-out 0.3s',
            }}
          />

          {/* ── Particle dot (animated down) ── */}
          <circle
            cx={px} cy={18} r="7"
            fill="#46c08a"
            opacity="0.2"
            style={{
              transform: `translateY(${active ? endY - 18 : 0}px)`,
              transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s',
            }}
          />
          <circle
            cx={px} cy={18} r="5"
            fill="#46c08a"
            style={{
              transform: `translateY(${active ? endY - 18 : 0}px)`,
              transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s',
            }}
          />
          <circle
            cx={px} cy={18} r="2.5"
            fill="white"
            opacity="0.85"
            style={{
              transform: `translateY(${active ? endY - 18 : 0}px)`,
              transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s',
            }}
          />

          {/* Destination pulse ring */}
          <circle
            cx={px} cy={endY} r="10"
            fill="none"
            stroke="#46c08a"
            strokeWidth="1.5"
            style={{
              opacity: active ? 0 : 0,
              transform: active ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${px}px ${endY}px`,
              transition: active ? 'transform 0.8s ease-out 1.5s, opacity 0.8s ease-out 1.5s' : 'none',
            }}
          />

          {/* Depth indicator line across the diagram */}
          <line
            x1={0} y1={endY} x2={px - 10} y2={endY}
            stroke="#46c08a"
            strokeWidth="0.75"
            strokeDasharray="3 4"
            opacity="0.25"
            style={{
              opacity: active ? 0.25 : 0,
              transition: 'opacity 0.4s ease 1.4s',
            }}
          />
        </svg>
      </div>

      {/* ── Mechanism callout cards (HTML for crisp text) ── */}
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

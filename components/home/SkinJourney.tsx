'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Journey stops ────────────────────────────────────────────────────────────
const STOPS = [
  {
    id: 'hero',
    step: null,
    label: 'Begin',
    title: 'Your skin,\nunderstood.',
    desc: "SkinLogic is the explainer layer for skincare — radically transparent, plain-English, science-backed. Scroll to travel the journey.",
    href: null,
    cta: null,
    accent: '#46c08a',
    glow: 'rgba(70,192,138,0.20)',
    icon: <PipIcon />,
    sources: true,
  },
  {
    id: 'learn',
    step: '01',
    label: 'Learning Hub',
    title: 'Learn the science,\nskip the noise.',
    desc: 'A structured library of plain-English skincare education — sorted by level and reading time, with progress tracking and knowledge checks.',
    href: '/learn',
    cta: 'Explore articles',
    accent: '#1f5b4e',
    glow: 'rgba(31,91,78,0.25)',
    icon: <BookIcon />,
    sources: false,
  },
  {
    id: 'ingredients',
    step: '02',
    label: 'Ingredient Explainer',
    title: 'What ingredients\nactually do.',
    desc: 'Skincare actives decoded — what the research shows, what the marketing exaggerates, and the honest bottom line on every one.',
    href: '/ingredients',
    cta: 'Read the explainers',
    accent: '#5b8a3c',
    glow: 'rgba(91,138,60,0.22)',
    icon: <FlaskIcon />,
    sources: false,
  },
  {
    id: 'analysis',
    step: '03',
    label: 'AI Skin Analysis',
    title: 'Your profile.\nYour photo.\nYour science.',
    desc: 'Answer a few questions about your skin, then optionally add a photo. The AI combines what it sees with what the research says about your specific profile.',
    href: '/analysis',
    cta: 'Try the analysis',
    accent: '#2d6b8a',
    glow: 'rgba(45,107,138,0.22)',
    icon: <CameraIcon />,
    sources: false,
  },
  {
    id: 'cta',
    step: null,
    label: "You're ready",
    title: 'Everything you need\nis here.',
    desc: 'Every tool is free, every claim is cited, and nothing sells you anything. This is skincare education the way it should be.',
    href: '/learn',
    cta: 'Start exploring',
    accent: '#46c08a',
    glow: 'rgba(70,192,138,0.20)',
    icon: <StarIcon />,
    sources: false,
  },
]

// ── Main component ────────────────────────────────────────────────────────────
export function SkinJourney() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: () => `+=${(STOPS.length - 1) * window.innerHeight}`,
        onUpdate(self) {
          const raw = self.progress * (STOPS.length - 1)
          const idx = Math.min(Math.floor(raw), STOPS.length - 1)
          const within = raw - idx // 0→1 within this stop

          // Fade-out warning at 80% through a stop
          const isLeaving = within > 0.8 && idx < STOPS.length - 1
          setLeaving(isLeaving)

          setActive((prev) => {
            if (prev !== idx) {
              if (leaveTimer.current) clearTimeout(leaveTimer.current)
              return idx
            }
            return prev
          })
        },
      })
    }, wrapRef)

    return () => {
      ctx.revert()
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  const stop = STOPS[active]

  return (
    <>
      {/* ── Scroll container — gives GSAP room to scrub ── */}
      <div
        ref={wrapRef}
        style={{ height: `${STOPS.length * 100}vh` }}
        className="relative"
      >
        {/* ── Sticky stage — stays in view while we scroll ── */}
        <div
          ref={stageRef}
          className="sticky top-0 h-screen overflow-hidden flex flex-col"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, #0b2218 0%, #04100a 100%)',
          }}
        >
          {/* Ambient colour blob — shifts with each stop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-all duration-[1500ms] ease-out"
            style={{
              background: `radial-gradient(ellipse at 38% 48%, ${stop.glow} 0%, transparent 68%)`,
            }}
          />
          {/* Secondary accent blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 78% 28%, rgba(31,91,78,0.10) 0%, transparent 55%)`,
            }}
          />

          {/* Particle canvas */}
          <ParticleField accent={stop.accent} stopId={stop.id} />

          {/* ── Road rail (desktop) ── */}
          <RoadRail active={active} accent={stop.accent} total={STOPS.length} />

          {/* ── Top label ── */}
          <div className="relative z-20 flex justify-center pt-20 sm:pt-24">
            <div
              className="rounded-full px-4 py-1 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-700"
              style={{
                color: stop.accent,
                background: `${stop.accent}18`,
                border: `1px solid ${stop.accent}30`,
              }}
            >
              {stop.step ? `Stop ${stop.step} · ` : ''}{stop.label}
            </div>
          </div>

          {/* ── Main card ── */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 lg:px-20 -mt-8">
            <div className="w-full max-w-2xl lg:max-w-xl">
              {/* Animate on stop change */}
              <StopCard stop={stop} leaving={leaving} active={active} />
            </div>
          </div>

          {/* ── Trusted sources (hero only) ── */}
          <div
            className="absolute bottom-20 left-0 right-0 flex flex-wrap justify-center gap-x-6 gap-y-1 transition-all duration-700"
            style={{ opacity: active === 0 && !leaving ? 0.35 : 0 }}
            aria-hidden
          >
            {['PubMed', 'AAD', 'EU CosIng', 'Br. J. Dermatology', 'FDA'].map((s) => (
              <span key={s} className="text-[0.6rem] font-semibold tracking-widest uppercase text-white">
                {s}
              </span>
            ))}
          </div>

          {/* ── Progress dots ── */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
            {STOPS.map((s, i) => (
              <div
                key={s.id}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 20 : 5,
                  height: 5,
                  background:
                    i === active
                      ? stop.accent
                      : i < active
                      ? 'rgba(255,255,255,0.35)'
                      : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── After the journey: full tool grid ── */}
      <AllTools />
    </>
  )
}

// ── Animated card ────────────────────────────────────────────────────────────
function StopCard({
  stop,
  leaving,
  active,
}: {
  stop: (typeof STOPS)[0]
  leaving: boolean
  active: number
}) {
  return (
    <div
      key={active}
      className="journey-card"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'translateY(-14px) scale(0.97)' : 'translateY(0) scale(1)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        animation: 'card-enter 0.55s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      {/* Icon */}
      <div
        className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background: `${stop.accent}20`,
          border: `1px solid ${stop.accent}38`,
          color: stop.accent,
        }}
      >
        {stop.icon}
      </div>

      {/* Headline */}
      <h1
        className="font-display font-semibold leading-[1.06] mb-5"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          color: '#f0ede8',
          whiteSpace: 'pre-line',
        }}
      >
        {stop.title}
      </h1>

      {/* Body */}
      <p
        className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
        style={{ color: 'rgba(240,237,232,0.60)' }}
      >
        {stop.desc}
      </p>

      {/* CTA */}
      {stop.cta && (
        stop.href ? (
          <Link
            href={stop.href}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: stop.accent,
              color: '#050e0a',
              boxShadow: `0 0 28px ${stop.accent}50`,
            }}
          >
            {stop.cta}
            <ArrowIcon />
          </Link>
        ) : (
          <p className="text-sm font-medium" style={{ color: stop.accent, opacity: 0.8 }}>
            {stop.cta}
          </p>
        )
      )}

      {/* Scroll hint on hero */}
      {active === 0 && (
        <div
          className="mt-10 flex items-center gap-2 text-xs"
          style={{ color: 'rgba(240,237,232,0.30)' }}
        >
          <ScrollMouse />
          Scroll to travel the journey
        </div>
      )}
    </div>
  )
}

// ── Road rail SVG ─────────────────────────────────────────────────────────────
function RoadRail({
  active,
  accent,
  total,
}: {
  active: number
  accent: string
  total: number
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-10 top-0 hidden h-full w-14 lg:block"
    >
      <svg viewBox="0 0 56 900" preserveAspectRatio="none" className="h-full w-full">
        {/* Dashed track */}
        <path
          d="M28 20 C22 110,34 220,28 330 C22 440,34 550,28 660 C22 770,34 840,28 880"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="2"
          strokeDasharray="6 9"
          fill="none"
        />
        {/* Waypoints */}
        {STOPS.map((s, i) => {
          const y = 20 + (i / (total - 1)) * 860
          const isActive = i === active
          const isPast = i < active
          return (
            <g key={s.id}>
              {/* Pulse ring on active */}
              {isActive && (
                <circle
                  cx="28"
                  cy={y}
                  r="13"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1"
                  opacity="0.45"
                  style={{ animation: 'road-ping 2s ease-out infinite' }}
                />
              )}
              <circle
                cx="28"
                cy={y}
                r={isActive ? 6 : 3.5}
                fill={
                  isActive
                    ? accent
                    : isPast
                    ? 'rgba(255,255,255,0.50)'
                    : 'rgba(255,255,255,0.18)'
                }
                style={{ transition: 'all 0.7s ease' }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Floating particles ────────────────────────────────────────────────────────
const PARTICLE_CONFIG = [
  { x: '14%', y: '22%', r: 1.5, delay: '0s', dur: '5s' },
  { x: '82%', y: '14%', r: 1, delay: '0.9s', dur: '4.2s' },
  { x: '62%', y: '72%', r: 2, delay: '1.3s', dur: '6s' },
  { x: '26%', y: '78%', r: 1, delay: '0.5s', dur: '4.8s' },
  { x: '88%', y: '58%', r: 1.5, delay: '1.9s', dur: '5.5s' },
  { x: '44%', y: '9%', r: 1, delay: '0.7s', dur: '4.5s' },
  { x: '9%', y: '52%', r: 2, delay: '2.2s', dur: '5s' },
  { x: '72%', y: '42%', r: 1, delay: '1.6s', dur: '4s' },
  { x: '34%', y: '91%', r: 1.5, delay: '0.3s', dur: '5.8s' },
  { x: '56%', y: '58%', r: 1, delay: '2.5s', dur: '4.2s' },
  { x: '78%', y: '84%', r: 2, delay: '1s', dur: '6.2s' },
  { x: '6%', y: '38%', r: 1, delay: '1.2s', dur: '4.7s' },
]

function ParticleField({ accent, stopId }: { accent: string; stopId: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      {PARTICLE_CONFIG.map((p, i) => (
        <circle
          key={`${stopId}-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={accent}
          style={{
            animation: `particle-glow ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  )
}

// ── Post-journey tool grid ────────────────────────────────────────────────────
const TOOLS = [
  { href: '/learn', title: 'Learning Hub', desc: 'Structured skincare education sorted by level, with progress tracking.', tag: 'Free' },
  { href: '/ingredients', title: 'Ingredient Explainer', desc: 'Actives decoded: research vs marketing, honest bottom lines.', tag: 'Free' },
  { href: '/sunscreen', title: 'Sunscreen Guide', desc: 'How sunscreen works, the US vs EU gap, and how to get real protection.', tag: 'Free' },
  { href: '/app-scanner-comparison', title: 'App & Scanner Audit', desc: 'What skincare apps really do vs what they claim.', tag: 'Free' },
  { href: '/analysis', title: 'AI Skin Analysis', desc: 'Your profile + optional photo → personalised research from the AI. Nothing stored.', tag: 'Free' },
  { href: '/tracker', title: 'Skin Tracker', desc: 'Upload a photo, get a plain-English analysis, track changes over time.', tag: 'Free' },
]

const PRINCIPLES = [
  { title: 'We cite everything', desc: 'Every claim traces to peer-reviewed research or a recognized authority — PubMed, the AAD, EU CosIng.' },
  { title: 'Plain English first', desc: 'A clear summary anyone can grasp, with deeper chemistry and regulation one click away.' },
  { title: 'We show our work', desc: 'We explain how we evaluate things and distinguish strong trials from thin in-vitro hints.' },
  { title: 'No bias, no shop', desc: "We don't sell products and take no sponsorship. If cheaper works as well as luxury, we say so." },
]

function AllTools() {
  return (
    <div className="relative">
      {/* Seamless fade from the dark journey into the page background.
          Fades to transparent (not a solid colour) so the page's liquid
          background shows through with no visible seam. */}
      <div
        aria-hidden
        className="w-full"
        style={{
          height: '320px',
          background:
            'linear-gradient(to bottom, #04100a 0%, rgba(4,16,10,0.65) 38%, rgba(4,16,10,0.25) 68%, rgba(4,16,10,0) 100%)',
        }}
      />

      {/* Tools grid */}
      <section className="mx-auto max-w-5xl px-4 pb-24 -mt-16">
        <div className="mb-12 text-center">
          <p className="eyebrow text-accent mb-3">Everything in one place</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
            All the tools
          </h2>
          <p className="mt-3 text-muted text-lg">Free. Cited. No agenda.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className="group glass iris iris-hover rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="glass-quiet eyebrow rounded-full px-2.5 py-0.5 text-[0.625rem] text-ink/60">{t.tag}</span>
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">{t.title}</h3>
              <p className="text-sm leading-relaxed text-muted flex-1">{t.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                Open <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-2xl bg-ink px-6 py-12 md:px-12 md:py-14 text-paper shadow-lift">
          <p className="eyebrow text-paper/60 mb-3">How we work</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-paper max-w-2xl">
            The standards behind everything on this site.
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-paper/15 pt-4">
                <h3 className="font-semibold text-paper mb-1.5">{p.title}</h3>
                <p className="text-sm leading-relaxed text-paper/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PipIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="20" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="16" cy="20" r="6" fill="currentColor" opacity="0.6" />
      <ellipse cx="16" cy="8" rx="2.5" ry="6.5" transform="rotate(-15 16 8)" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  )
}
function FlaskIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M9 3h6M9 3v7l-4.5 8A2 2 0 0 0 6 21h12a2 2 0 0 0 1.5-3L15 10V3" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
function ScrollMouse() {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1" width="12" height="20" rx="6" />
      <line x1="7" y1="5" x2="7" y2="9" strokeLinecap="round">
        <animate attributeName="y1" values="5;8;5" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="9;12;9" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.6s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}

'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

// ── Journey stops ─────────────────────────────────────────────────────────────
const STOPS = [
  {
    id: 'hero',
    step: null,
    label: 'Begin',
    title: 'Your skin,\nunderstood.',
    desc: 'SkinLogic is the explainer layer for skincare — radically transparent, plain-English, science-backed.',
    href: null,
    cta: null,
    accent: '#46c08a',
    glow: 'rgba(70,192,138,0.20)',
  },
  {
    id: 'learn',
    step: '01',
    label: 'Learning Hub',
    title: 'Learn the science,\nskip the noise.',
    desc: 'Structured skincare education sorted by level and reading time — with progress tracking and knowledge checks.',
    href: '/learn',
    cta: 'Explore articles',
    accent: '#1f5b4e',
    glow: 'rgba(31,91,78,0.28)',
  },
  {
    id: 'ingredients',
    step: '02',
    label: 'Ingredient Explainer',
    title: 'What ingredients\nactually do.',
    desc: 'Skincare actives decoded — what the research shows, what the marketing exaggerates, and the honest bottom line.',
    href: '/ingredients',
    cta: 'Read the explainers',
    accent: '#5b8a3c',
    glow: 'rgba(91,138,60,0.25)',
  },
  {
    id: 'analysis',
    step: '03',
    label: 'AI Skin Analysis',
    title: 'Your profile.\nYour science.',
    desc: 'Answer a few questions, optionally add a photo. The AI combines what it sees with what the research says about your specific skin.',
    href: '/analysis',
    cta: 'Try the analysis',
    accent: '#2d6b8a',
    glow: 'rgba(45,107,138,0.25)',
  },
  {
    id: 'cta',
    step: null,
    label: "You're ready",
    title: 'Everything in\none place.',
    desc: 'Every tool is free, every claim is cited, nothing sells you anything.',
    href: '/learn',
    cta: 'Start exploring',
    accent: '#46c08a',
    glow: 'rgba(70,192,138,0.20)',
  },
]

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className,
  from = 'up',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  from?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
        } else if (e.boundingClientRect.top > 0) {
          // Element is below the viewport — reset so animation replays on next scroll-down
          setShown(false)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const hiddenTransform =
    from === 'left' ? 'translateX(-48px)' :
    from === 'right' ? 'translateX(48px)' :
    'translateY(28px)'
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translate(0,0)' : hiddenTransform,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Word-by-word fade-in triggered by intersection
function FadeWords({
  text,
  as: Tag = 'h2',
  style,
  className,
  startDelay = 0,
}: {
  text: string
  as?: 'h1' | 'h2'
  style?: React.CSSProperties
  className?: string
  startDelay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
        } else if (e.boundingClientRect.top > 0) {
          setShown(false)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Split on newlines first, then words within each line
  const lines = text.split('\n')
  let wordIndex = 0
  const rendered = lines.map((line, li) => {
    const words = line.split(' ').filter(Boolean)
    const lineSpans = words.map((word) => {
      const idx = wordIndex++
      return (
        <span
          key={`${li}-${idx}`}
          style={{
            display: 'inline-block',
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.55s ease ${startDelay + idx * 55}ms, transform 0.55s ease ${startDelay + idx * 55}ms`,
            marginRight: '0.28em',
          }}
        >
          {word}
        </span>
      )
    })
    return (
      <span key={li} style={{ display: 'block' }}>
        {lineSpans}
      </span>
    )
  })

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} style={style} className={className}>
      {rendered}
    </Tag>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export function SkinJourney() {
  return (
    <>
      <div
        style={{ background: 'radial-gradient(ellipse at 50% 55%, #0b2218 0%, #04100a 100%)', position: 'relative' }}
      >
        {/* Single continuous ambient glow layer — no per-section seams */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: 'absolute', top: '8%', left: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(70,192,138,0.14) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '28%', right: '-8%', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,91,78,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,138,60,0.14) 0%, transparent 65%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '72%', right: '5%', width: '48vw', height: '48vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,107,138,0.16) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        </div>

        {STOPS.map((stop, i) => (
          <section
            key={stop.id}
            id={`journey-${stop.id}`}
            className="relative min-h-[80vh] flex flex-col"
          >
            <ParticleField accent={stop.accent} stopId={stop.id} />
            <RoadRail active={i} accent={stop.accent} total={STOPS.length} />

            {/* Content — unique layout per stop */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6 lg:px-20 pt-14">
              {i === 0 && <HeroSlide stop={stop} />}
              {i === 1 && <LearnSlide stop={stop} />}
              {i === 2 && <IngredientsSlide stop={stop} />}
              {i === 3 && <AnalysisSlide stop={stop} />}
              {i === 4 && <CTASlide stop={stop} />}
            </div>

            {/* Trusted sources — hero only */}
            {i === 0 && (
              <div
                className="relative z-10 flex flex-wrap justify-center gap-x-6 gap-y-1 pb-20"
                style={{ opacity: 0.32 }}
                aria-hidden
              >
                {['PubMed', 'AAD', 'EU CosIng', 'Br. J. Dermatology', 'FDA'].map((s) => (
                  <span key={s} className="text-[0.6rem] font-semibold tracking-widest uppercase text-white">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <AllTools />
    </>
  )
}

// ── Slide layouts ─────────────────────────────────────────────────────────────

function HeroSlide({ stop }: { stop: typeof STOPS[0] }) {
  return (
    <div className="w-full max-w-3xl py-12">
      <h1
        className="font-display font-semibold leading-[1.03] mb-6"
        style={{ fontSize: 'clamp(3.8rem, 10vw, 7rem)', color: '#f0ede8', whiteSpace: 'pre-line' }}
      >
        {stop.title}
      </h1>
      <p className="text-base md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(240,237,232,0.55)' }}>
        {stop.desc}
      </p>
      <div className="flex flex-wrap gap-6 mb-10">
        {[
          { n: '30+', label: 'Ingredients decoded' },
          { n: '100%', label: 'Claims cited' },
          { n: '£0', label: 'Cost' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-2xl font-semibold" style={{ color: stop.accent }}>
              {stat.n}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(240,237,232,0.28)' }}>
        <ScrollMouse />
        Scroll to explore
      </div>
    </div>
  )
}

function LearnSlide({ stop }: { stop: typeof STOPS[0] }) {
  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12">
      <div>
        <FadeIn from="left">
          <div
            className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${stop.accent}20`, border: `1px solid ${stop.accent}35`, color: stop.accent }}
          >
            <BookIcon />
          </div>
        </FadeIn>
        <FadeWords
          text={stop.title}
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: '#f0ede8', lineHeight: 1.05, marginBottom: '1.1rem' }}
          className="font-display font-semibold"
          startDelay={80}
        />
        <FadeIn from="left" delay={400}>
          <p className="text-lg leading-relaxed mb-7 max-w-md" style={{ color: 'rgba(240,237,232,0.58)' }}>
            {stop.desc}
          </p>
          <Link
            href={stop.href!}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: stop.accent, color: '#050e0a', boxShadow: `0 0 24px ${stop.accent}45` }}
          >
            {stop.cta} <ArrowIcon />
          </Link>
        </FadeIn>
      </div>

      {/* Illustration: stacked article cards */}
      <FadeIn from="right" delay={150} className="hidden lg:block" aria-hidden>
        <div className="relative mx-auto" style={{ width: 280, height: 240 }}>
          {[2, 1].map((depth) => (
            <div
              key={depth}
              className="absolute rounded-2xl"
              style={{
                top: depth * 12,
                left: depth * 8,
                right: -(depth * 8),
                height: 180,
                background: `rgba(255,255,255,${0.03 + depth * 0.02})`,
                border: `1px solid rgba(255,255,255,${0.05 + depth * 0.03})`,
              }}
            />
          ))}
          <div
            className="absolute rounded-2xl p-5"
            style={{ top: 0, left: 0, right: 0, height: 180, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-10 rounded-full" style={{ background: stop.accent, opacity: 0.85 }} />
              <div className="h-2 w-16 rounded-full bg-white/20" />
            </div>
            <div className="space-y-2 mb-5">
              <div className="h-2 rounded-full bg-white/18" />
              <div className="h-2 w-5/6 rounded-full bg-white/12" />
              <div className="h-2 w-3/4 rounded-full bg-white/10" />
            </div>
            <div className="text-[0.6rem] tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.30)' }}>
              Progress
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full w-3/5 rounded-full" style={{ background: stop.accent }} />
            </div>
            <div className="mt-1.5 text-[0.6rem]" style={{ color: `${stop.accent}aa` }}>62% complete</div>
          </div>
          <div
            className="absolute -bottom-2 -right-4 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: stop.accent, color: '#050e0a' }}
          >
            Human RCT ✓
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

function IngredientsSlide({ stop }: { stop: typeof STOPS[0] }) {
  const pills = [
    { name: 'Retinol', featured: true, x: '5%', y: '5%' },
    { name: 'Niacinamide', featured: false, x: '46%', y: '0%' },
    { name: 'Vitamin C', featured: false, x: '18%', y: '38%' },
    { name: 'Ceramides', featured: true, x: '52%', y: '42%' },
    { name: 'Glycolic Acid', featured: false, x: '0%', y: '70%' },
    { name: 'Bakuchiol', featured: false, x: '44%', y: '78%' },
    { name: 'Hyaluronic Acid', featured: false, x: '14%', y: '112%' },
    { name: 'Tranexamic Acid', featured: false, x: '52%', y: '118%' },
  ]

  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12">
      {/* Illustration left on desktop */}
      <FadeIn from="left" delay={150} className="hidden lg:block lg:order-1" aria-hidden>
        <div className="relative mx-auto" style={{ width: 280, height: 180 }}>
          {pills.map((pill) => (
            <div
              key={pill.name}
              className="absolute rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                left: pill.x,
                top: pill.y,
                background: pill.featured ? stop.accent : 'rgba(255,255,255,0.08)',
                color: pill.featured ? '#050e0a' : 'rgba(255,255,255,0.68)',
                border: pill.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap',
              }}
            >
              {pill.name}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Text right on desktop */}
      <div className="lg:order-2">
        <FadeIn from="right">
          <div
            className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${stop.accent}20`, border: `1px solid ${stop.accent}35`, color: stop.accent }}
          >
            <FlaskIcon />
          </div>
        </FadeIn>
        <FadeWords
          text={stop.title}
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: '#f0ede8', lineHeight: 1.05, marginBottom: '1.1rem' }}
          className="font-display font-semibold"
          startDelay={80}
        />
        <FadeIn from="right" delay={400}>
          <p className="text-lg leading-relaxed mb-7 max-w-md" style={{ color: 'rgba(240,237,232,0.58)' }}>
            {stop.desc}
          </p>
          <Link
            href={stop.href!}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: stop.accent, color: '#050e0a', boxShadow: `0 0 24px ${stop.accent}45` }}
          >
            {stop.cta} <ArrowIcon />
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}

function AnalysisSlide({ stop }: { stop: typeof STOPS[0] }) {
  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12">
      <div>
        <FadeIn from="left">
          <div
            className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${stop.accent}20`, border: `1px solid ${stop.accent}35`, color: stop.accent }}
          >
            <CameraIcon />
          </div>
        </FadeIn>
        <FadeWords
          text={stop.title}
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: '#f0ede8', lineHeight: 1.05, marginBottom: '1.1rem' }}
          className="font-display font-semibold"
          startDelay={80}
        />
        <FadeIn from="left" delay={400}>
          <p className="text-lg leading-relaxed mb-7 max-w-md" style={{ color: 'rgba(240,237,232,0.58)' }}>
            {stop.desc}
          </p>
          <Link
            href={stop.href!}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: stop.accent, color: '#050e0a', boxShadow: `0 0 24px ${stop.accent}45` }}
          >
            {stop.cta} <ArrowIcon />
          </Link>
        </FadeIn>
      </div>

      <FadeIn from="right" delay={150} className="hidden lg:flex items-center justify-center" aria-hidden>
        <div
          className="relative rounded-[28px] p-2"
          style={{ width: 160, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)' }}
        >
          <div
            className="rounded-[20px] overflow-hidden flex items-center justify-center"
            style={{ aspectRatio: '9/16', background: 'rgba(0,0,0,0.45)', position: 'relative' }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 72, height: 72, border: `1.5px dashed ${stop.accent}55` }}
            >
              <div className="rounded-full" style={{ width: 36, height: 36, background: `${stop.accent}18` }} />
            </div>
            <div
              className="absolute left-6 right-6"
              style={{ top: '42%', height: 1, background: `linear-gradient(90deg, transparent, ${stop.accent}80, transparent)` }}
            />
            <svg className="absolute top-3 left-3" width="14" height="14" fill="none">
              <path d="M0 7V0h7" stroke={stop.accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>
            <svg className="absolute top-3 right-3" width="14" height="14" fill="none">
              <path d="M14 7V0H7" stroke={stop.accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>
            <svg className="absolute bottom-8 left-3" width="14" height="14" fill="none">
              <path d="M0 7v7h7" stroke={stop.accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>
            <svg className="absolute bottom-8 right-3" width="14" height="14" fill="none">
              <path d="M14 7v7H7" stroke={stop.accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </svg>
            <div className="absolute bottom-5 flex gap-1.5">
              {[0.5, 0.7, 1].map((op, idx) => (
                <div key={idx} className="rounded-full" style={{ width: 5, height: 5, background: stop.accent, opacity: op }} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2 pb-1">
            <div className="rounded-full" style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.18)' }} />
          </div>
        </div>
        <div
          className="absolute ml-28 mt-16 rounded-xl px-3 py-2.5 text-xs"
          style={{ background: stop.accent, color: '#050e0a', boxShadow: `0 4px 20px ${stop.accent}50` }}
        >
          <div className="font-semibold">Skin type: Combination</div>
          <div className="opacity-70 mt-0.5">3 personalised insights →</div>
        </div>
      </FadeIn>
    </div>
  )
}

function CTASlide({ stop }: { stop: typeof STOPS[0] }) {
  return (
    <div className="w-full max-w-xl text-center py-12">
      <FadeIn>
        <div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl mx-auto"
          style={{ background: `${stop.accent}20`, border: `1px solid ${stop.accent}35`, color: stop.accent }}
        >
          <StarIcon />
        </div>
      </FadeIn>
      <FadeWords
        text={stop.title}
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: '#f0ede8', lineHeight: 1.05, marginBottom: '1.1rem' }}
        className="font-display font-semibold"
        startDelay={80}
      />
      <FadeIn delay={380}>
        <p className="text-base leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'rgba(240,237,232,0.55)' }}>
          {stop.desc}
        </p>
        <Link
          href={stop.href!}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: stop.accent, color: '#050e0a', boxShadow: `0 0 28px ${stop.accent}50` }}
        >
          {stop.cta} <ArrowIcon />
        </Link>
      </FadeIn>
    </div>
  )
}

// ── Road rail ─────────────────────────────────────────────────────────────────
function RoadRail({ active, accent, total }: { active: number; accent: string; total: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute right-10 top-0 hidden h-full w-14 lg:block">
      <svg viewBox="0 0 56 900" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M28 20 C22 110,34 220,28 330 C22 440,34 550,28 660 C22 770,34 840,28 880"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          strokeDasharray="6 9"
          fill="none"
        />
        {STOPS.map((s, i) => {
          const y = 20 + (i / (total - 1)) * 860
          const isActive = i === active
          const isPast = i < active
          return (
            <g key={s.id}>
              {isActive && (
                <circle cx="28" cy={y} r="13" fill="none" stroke={accent} strokeWidth="1" opacity="0.4"
                  style={{ animation: 'road-ping 2s ease-out infinite' }} />
              )}
              <circle cx="28" cy={y} r={isActive ? 6 : 3.5}
                fill={isActive ? accent : isPast ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'all 0.5s ease' }} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Particles ─────────────────────────────────────────────────────────────────
const PARTICLE_CONFIG = [
  { x: '14%', y: '22%', r: 1.5, delay: '0s', dur: '5s' },
  { x: '82%', y: '14%', r: 1, delay: '0.9s', dur: '4.2s' },
  { x: '62%', y: '72%', r: 2, delay: '1.3s', dur: '6s' },
  { x: '26%', y: '78%', r: 1, delay: '0.5s', dur: '4.8s' },
  { x: '88%', y: '58%', r: 1.5, delay: '1.9s', dur: '5.5s' },
  { x: '44%', y: '9%', r: 1, delay: '0.7s', dur: '4.5s' },
  { x: '9%', y: '52%', r: 2, delay: '2.2s', dur: '5s' },
  { x: '72%', y: '42%', r: 1, delay: '1.6s', dur: '4s' },
]

function ParticleField({ accent, stopId }: { accent: string; stopId: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
      {PARTICLE_CONFIG.map((p, i) => (
        <circle key={`${stopId}-${i}`} cx={p.x} cy={p.y} r={p.r} fill={accent}
          style={{ animation: `particle-glow ${p.dur} ${p.delay} ease-in-out infinite` }} />
      ))}
    </svg>
  )
}

// ── Post-journey tools ────────────────────────────────────────────────────────
const TOOLS = [
  { href: '/learn', title: 'Learning Hub', desc: 'Structured skincare education sorted by level, with progress tracking.', tag: 'Free' },
  { href: '/ingredients', title: 'Ingredient Explainer', desc: 'Actives decoded: research vs marketing, honest bottom lines.', tag: 'Free' },
  { href: '/sunscreen', title: 'Sunscreen Guide', desc: 'How sunscreen works, the US vs EU gap, and how to get real protection.', tag: 'Free' },
  { href: '/app-scanner-comparison', title: 'App & Scanner Audit', desc: 'What skincare apps really do vs what they claim.', tag: 'Free' },
  { href: '/analysis', title: 'AI Skin Analysis', desc: 'Your profile + optional photo → personalised research from the AI.', tag: 'Free' },
  { href: '/industry', title: 'How the Industry Works', desc: 'What "clinically proven" really means, influencer economics, why price ≠ quality.', tag: 'Free' },
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
      <div
        aria-hidden
        className="w-full"
        style={{
          height: '320px',
          background: 'linear-gradient(to bottom, #04100a 0%, rgba(4,16,10,0.65) 38%, rgba(4,16,10,0.25) 68%, rgba(4,16,10,0) 100%)',
        }}
      />
      <section className="mx-auto max-w-5xl px-4 pb-24 -mt-16">
        <div className="mb-12 text-center">
          <p className="eyebrow text-accent mb-3">Everything in one place</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">All the tools</h2>
          <p className="mt-3 text-muted text-lg">Free. Cited. No agenda.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Link key={t.href} href={t.href}
              className="group glass iris iris-hover rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lift">
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
function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function FlaskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M9 3h6M9 3v7l-4.5 8A2 2 0 0 0 6 21h12a2 2 0 0 0 1.5-3L15 10V3" />
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
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

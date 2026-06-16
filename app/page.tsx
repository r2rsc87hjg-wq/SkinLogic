import Link from 'next/link'
import { TiltCard } from '@/components/ui/TiltCard'
import { BotanicalAccent } from '@/components/ui/BotanicalAccent'
import { DailyTip } from '@/components/learn/DailyTip'

const TOOLS = [
  {
    href: '/learn',
    title: 'Learning Hub',
    desc: 'A structured, searchable library of plain-English skincare education — sorted by level and reading time, with progress tracking and knowledge checks.',
    tag: 'Free',
  },
  {
    href: '/ingredients',
    title: 'Ingredient Explainer',
    desc: 'What 30 skincare actives actually do — what the research shows, what the marketing exaggerates, and the honest bottom line.',
    tag: 'Free',
  },
  {
    href: '/sunscreen',
    title: 'Sunscreen Guide',
    desc: 'How sunscreen works, the US vs EU filter gap, and how to get genuinely better protection as a US consumer.',
    tag: 'Free',
  },
  {
    href: '/app-scanner-comparison',
    title: 'App & Scanner Comparison',
    desc: 'An accountability audit of skincare apps and scanners — what they really do vs. what they claim, and who funded the studies.',
    tag: 'Free',
  },
  {
    href: '/profiler',
    title: 'Skin Profile Educator',
    desc: 'Translate the research into what’s relevant for your specific skin profile. Educational — never a prescription.',
    tag: 'AI',
  },
  {
    href: '/analysis',
    title: 'AI Skin Analysis',
    desc: 'A single, pay-per-use AI reading of one photo. Explains what it sees and why. Your image and result are never stored.',
    tag: 'Paid',
  },
  {
    href: '/tracker',
    title: 'Skin Tracker',
    desc: 'Upload a photo, get a plain-English skin read, and track changes over time. Your photo is never stored — only the written analysis.',
    tag: 'Pro',
  },
]

const PRINCIPLES = [
  {
    title: 'We cite everything',
    desc: 'Every claim traces to peer-reviewed research or a recognized authority — PubMed, the AAD, EU CosIng. No influencers, no brand-sponsored studies.',
  },
  {
    title: 'Plain English first',
    desc: 'A clear summary anyone can grasp immediately, with the deeper chemistry, regulation, and market context one click away if you want it.',
  },
  {
    title: 'We show our work',
    desc: 'We explain how we evaluate things and distinguish strong human trials from thin in-vitro hints — and say so when the evidence is weak.',
  },
  {
    title: 'No bias, no shop',
    desc: 'We don’t sell products and take no sponsorship. If a cheaper option works as well as a luxury one, we say so plainly.',
  },
]

const SOURCES = ['PubMed', 'AAD', 'EU CosIng', 'Br. J. Dermatology', 'FDA']

// Trust stats surfaced inside the hero glass panel.
const HERO_STATS = [
  { value: '30+', label: 'Actives explained' },
  { value: '100%', label: 'Cited claims' },
  { value: '0', label: 'Brand sponsors' },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient liquid background — soft color blobs the glass refracts */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[120px]" />
          <div className="absolute top-8 left-[-12%] h-[28rem] w-[28rem] rounded-full bg-[#7ee1c8]/30 blur-[120px]" />
          <div className="absolute top-[20rem] right-[16%] h-[24rem] w-[24rem] rounded-full bg-[#c9b8ff]/25 blur-[120px]" />
          <div className="absolute top-[24rem] left-[18%] h-[20rem] w-[20rem] rounded-full bg-[#ffc9dd]/20 blur-[120px]" />
        </div>

        {/* Nature accent — faint botanical line-art */}
        <BotanicalAccent className="pointer-events-none absolute -left-4 top-20 -z-10 hidden h-80 w-auto text-accent/[0.07] md:block" />

        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-14 md:pt-28 md:pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-up">
              <p className="eyebrow text-accent mb-5">Skincare, made legible</p>
              <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-ink">
                Understand <em className="italic">why</em> — not just what to
                buy.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                SkinLogic is the explainer layer for skincare: radically
                transparent, plain-English, science-backed. We translate the
                research, the regulation, and the marketing so you leave smarter
                and more independent — not sold to.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/ingredients"
                  className="inline-flex items-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-6 py-3 text-sm font-medium text-paper shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all"
                >
                  Browse the explainers
                </Link>
                <Link
                  href="/analysis"
                  className="glass relative inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5"
                >
                  Try the AI analysis →
                </Link>
              </div>

              <p className="mt-7 text-sm font-medium text-muted">
                Cited sources · Plain English · Zero bias
              </p>
            </div>

            {/* Glass centerpiece — frosted panel with the brand aperture + trust stats */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="glass iris iris-on sheen relative overflow-hidden rounded-[1.75rem] p-8">
                <div className="relative z-10">
                  <HeroMark />
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    {HERO_STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="glass-quiet relative rounded-2xl px-3 py-4 text-center"
                      >
                        <div className="font-display text-2xl font-semibold text-accent">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-[0.7rem] leading-tight text-muted">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Source-credibility bar — frosted glass strip, kept prominent */}
        <div className="glass-quiet relative border-y border-white/40">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-5">
            <span className="eyebrow text-muted">Every claim sourced from</span>
            {SOURCES.map((s) => (
              <span key={s} className="text-sm font-semibold text-ink/70">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Did You Know — daily tip from the Learning Hub */}
      <section className="mx-auto max-w-5xl px-4 mt-16">
        <DailyTip />
      </section>

      {/* Tools */}
      <section className="relative mx-auto max-w-5xl px-4 mt-20 overflow-hidden">
        {/* Ambient blobs so the glass cards have color to refract */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-10 left-[-6%] h-[26rem] w-[26rem] rounded-full bg-[#7ee1c8]/20 blur-[120px]" />
          <div className="absolute bottom-0 right-[-6%] h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[120px]" />
        </div>

        <div className="flex items-end justify-between border-b border-line pb-4 mb-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            What you can explore
          </h2>
          <span className="hidden sm:block text-sm text-muted">
            Tools and guides, one job: make the industry legible.
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <TiltCard
              key={tool.href}
              href={tool.href}
              className="glass iris iris-hover group overflow-hidden rounded-2xl p-6"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-sm text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="glass-quiet relative eyebrow rounded-full px-2.5 py-0.5 text-[0.625rem] text-ink/60">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted flex-1">
                  {tool.desc}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-accent">
                  Open
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-5xl px-4 mt-20">
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
    </main>
  )
}

// "Pip" — the SkinLogic mascot. Minimalist side-profile parrot doodle: flat
// colors, clean outlines, no gradients. Bobs gently inside a soft halo.
function HeroMark() {
  const ink = '#0f3028'
  const green = '#46c08a'
  const dark = '#1f7a5e'
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[240px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" aria-hidden>
        {/* Soft halo */}
        <circle cx="200" cy="200" r="174" fill="#b0c8ff" fillOpacity="0.14" />
        <circle cx="200" cy="200" r="132" fill="#c9b8ff" fillOpacity="0.09" />

        {/* Pip bobs as one group */}
        <g style={{ transformBox: 'view-box', transformOrigin: '195px 235px', animation: 'float-bob 5s ease-in-out infinite' }}>

          {/* Tail — single flat fan behind body */}
          <path
            d="M172 316 Q156 370 178 386 Q194 356 200 342 Q207 356 222 386 Q242 368 226 316 Z"
            fill={dark} stroke={ink} strokeWidth="3.5" strokeLinejoin="round"
          />

          {/* Body */}
          <ellipse cx="195" cy="245" rx="63" ry="90" transform="rotate(-5 195 245)"
                   fill={green} stroke={ink} strokeWidth="4" />

          {/* Belly — subtle lighter wash */}
          <ellipse cx="216" cy="268" rx="34" ry="56" transform="rotate(-4 216 268)"
                   fill="#cdf5e2" fillOpacity="0.32" />

          {/* Wing — minimalist curve stroke only */}
          <path d="M146 204 C126 252 134 310 168 328"
                stroke={ink} strokeWidth="4" strokeLinecap="round" />

          {/* Crest — two clean spikes */}
          <ellipse cx="200" cy="64" rx="7.5" ry="24" transform="rotate(-30 200 64)"
                   fill={dark} stroke={ink} strokeWidth="3" />
          <ellipse cx="222" cy="60" rx="7" ry="20" transform="rotate(-10 222 60)"
                   fill={green} stroke={ink} strokeWidth="3" />

          {/* Head */}
          <circle cx="214" cy="122" r="52" fill={green} stroke={ink} strokeWidth="4" />

          {/* Eye — blinking */}
          <g style={{ transformBox: 'view-box', transformOrigin: '228px 112px', animation: 'blink 5.5s ease-in-out infinite' }}>
            <circle cx="228" cy="112" r="16" fill="#ffffff" stroke={ink} strokeWidth="3" />
            <circle cx="234" cy="115" r="8" fill={ink} />
            <circle cx="238" cy="111" r="3" fill="#ffffff" />
          </g>

          {/* Beak — clean hooked triangle */}
          <path
            d="M262 106 Q302 110 304 130 Q302 150 276 152 Q268 142 266 130 Q262 118 262 106 Z"
            fill="#f7a93c" stroke="#c97a1e" strokeWidth="3" strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}

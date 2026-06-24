'use client'

import { useState } from 'react'
import Link from 'next/link'
import { VerdictBadge } from './VerdictBadge'
import type { VerdictRating } from './VerdictBadge'

interface ScannerCardProps {
  name: string
  slug: string
  domain?: string
  url?: string
  technology?: string
  verdictRating?: VerdictRating
  verdict?: string
  worthItFor?: string[]
  notForYouIf?: string[]
}

type LogoStage = 'clearbit' | 'favicon' | 'failed'

function AppLogo({ name, domain }: { name: string; domain?: string }) {
  const [stage, setStage] = useState<LogoStage>('clearbit')
  const letter = name.charAt(0).toUpperCase()

  if (domain && stage !== 'failed') {
    const src =
      stage === 'clearbit'
        ? `https://logo.clearbit.com/${domain}`
        : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

    return (
      <div
        className="flex-shrink-0 h-10 w-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm"
        aria-hidden
      >
        <img
          src={src}
          alt=""
          width={32}
          height={32}
          className="object-contain"
          onError={() => setStage(stage === 'clearbit' ? 'favicon' : 'failed')}
        />
      </div>
    )
  }

  return (
    <div
      className="flex-shrink-0 h-10 w-10 rounded-xl glass-quiet flex items-center justify-center"
      aria-hidden
    >
      <span className="font-display text-base font-semibold text-ink/60">
        {letter}
      </span>
    </div>
  )
}

export function ScannerCard({
  name,
  slug,
  domain,
  url,
  technology,
  verdictRating,
  verdict,
  worthItFor,
  notForYouIf,
}: ScannerCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasBody = verdict || worthItFor?.length || notForYouIf?.length

  return (
    <article className="glass sheen relative overflow-hidden rounded-2xl">
      {/* ── Always-visible header ── */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="relative z-10 w-full text-left px-5 py-4"
        aria-expanded={expanded}
        aria-controls={`scanner-body-${slug}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <AppLogo name={name} domain={domain} />
            <div className="min-w-0">
              <h2 className="font-semibold text-ink text-base leading-tight">{name}</h2>
              {technology && (
                <p className="text-xs text-muted mt-0.5 truncate">{technology}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {verdictRating && <VerdictBadge rating={verdictRating} />}
            {hasBody && (
              <span
                aria-hidden
                className="text-muted/60 transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </button>

      {/* ── Collapsible body ── */}
      {hasBody && (
        <div
          id={`scanner-body-${slug}`}
          className="relative z-10 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: expanded ? '1000px' : '0px',
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="px-5 pb-5 space-y-4 border-t border-line/40 pt-4">
            {verdict && (
              <p className="text-sm text-ink/80 leading-relaxed">{verdict}</p>
            )}

            {(worthItFor?.length || notForYouIf?.length) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {worthItFor?.length ? (
                  <div>
                    <p className="eyebrow text-muted mb-1.5">Worth it if you want</p>
                    <ul className="space-y-1">
                      {worthItFor.map((item) => (
                        <li key={item} className="flex gap-2 text-ink/80">
                          <span className="text-accent shrink-0 mt-0.5">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {notForYouIf?.length ? (
                  <div>
                    <p className="eyebrow text-muted mb-1.5">Not worth it if</p>
                    <ul className="space-y-1">
                      {notForYouIf.map((item) => (
                        <li key={item} className="flex gap-2 text-ink/80">
                          <span className="text-red-400 shrink-0 mt-0.5">−</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/app-scanner-comparison/${slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Full breakdown — research, limitations, conflicts of interest
                <span aria-hidden>→</span>
              </Link>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full glass-quiet text-ink/70 hover:text-ink transition-colors"
                >
                  Visit site
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

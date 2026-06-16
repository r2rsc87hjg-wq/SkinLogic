import Link from 'next/link'
import { VerdictBadge } from './VerdictBadge'
import type { VerdictRating } from './VerdictBadge'

interface ScannerCardProps {
  name: string
  slug: string
  technology?: string
  verdictRating?: VerdictRating
  verdict?: string
  worthItFor?: string[]
  notForYouIf?: string[]
}

export function ScannerCard({
  name,
  slug,
  technology,
  verdictRating,
  verdict,
  worthItFor,
  notForYouIf,
}: ScannerCardProps) {
  return (
    <article className="glass sheen relative overflow-hidden rounded-2xl p-5">
      <div className="relative z-10 space-y-4">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-ink text-lg">{name}</h2>
            {technology && (
              <p className="text-xs text-muted mt-0.5">{technology}</p>
            )}
          </div>
          {verdictRating && <VerdictBadge rating={verdictRating} />}
        </div>

        {/* Verdict summary */}
        {verdict && (
          <p className="text-sm text-ink/80 leading-relaxed">{verdict}</p>
        )}

        {/* Worth it / not worth it */}
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

        <Link
          href={`/app-scanner-comparison/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Full breakdown — research, limitations, conflicts of interest
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}

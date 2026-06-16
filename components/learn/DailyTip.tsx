import Link from 'next/link'
import { getTipOfTheDay } from '@/content/learn/tips'
import { getArticle } from '@/content/learn/articles'

// "Did You Know?" widget for the homepage. Server-rendered with a deterministic
// day-of-year tip, so there is no hydration mismatch and it refreshes daily.
export function DailyTip() {
  const tip = getTipOfTheDay()
  const article = tip.readMore ? getArticle(tip.readMore) : undefined

  return (
    <div className="glass iris iris-on sheen relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
        <span
          aria-hidden
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8.9.9 1.5l.2 1.1h4.8l.2-1.1c.1-.6.4-1.1.9-1.5A6 6 0 0 0 12 3Zm-2 16h4m-3.5 2h3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="flex-1">
          <p className="eyebrow mb-2 text-accent">Did you know?</p>
          <p className="text-[1.05rem] leading-relaxed text-ink">{tip.fact}</p>
          {article && (
            <Link
              href={`/learn/${article.slug}`}
              className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              Read: {article.title}
              <span className="ml-1">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

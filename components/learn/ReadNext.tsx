import Link from 'next/link'
import type { Article } from '@/content/learn/types'

const LEVEL_LABEL: Record<Article['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

// "Read next" suggestions shown at the foot of every article.
export function ReadNext({ articles }: { articles: Article[] }) {
  if (!articles.length) return null

  return (
    <section aria-label="Read next" className="mt-14 border-t border-line pt-8">
      <h2 className="eyebrow mb-5 text-muted">Read next</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="glass iris iris-hover group relative overflow-hidden rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="mb-2 flex items-center gap-2 text-[0.7rem]">
              <span className="eyebrow text-accent">{LEVEL_LABEL[a.level]}</span>
              <span className="text-muted">· {a.readingMinutes} min</span>
            </div>
            <h3 className="mb-1 font-semibold text-ink">{a.title}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {a.summary}
            </p>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-accent">
              Read
              <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

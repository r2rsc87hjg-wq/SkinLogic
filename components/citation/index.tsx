import type { Citation } from '@/types'

interface CitationListProps {
  citations: Citation[]
}

export function CitationList({ citations }: CitationListProps) {
  if (!citations?.length) return null

  return (
    <section aria-label="Citations">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        Sources
      </h3>
      <ol className="space-y-1">
        {citations.map((c, i) => (
          <li key={i} className="text-sm text-gray-600">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-900 transition-colors"
            >
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

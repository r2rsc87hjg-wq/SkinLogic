'use client'

import { useLearnProgress } from '@/lib/learn-progress'

// "Mark as read" control shown at the top of each article. Reflects and updates
// the localStorage progress used across the hub.
export function ReadToggle({ slug }: { slug: string }) {
  const { isCompleted, toggle, hydrated } = useLearnProgress()
  const done = isCompleted(slug)

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={done}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        done
          ? 'border-accent/40 bg-accent-soft text-accent'
          : 'border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
      }`}
    >
      <span
        aria-hidden
        className={`grid h-4 w-4 place-items-center rounded-full border ${
          done ? 'border-accent bg-accent text-paper' : 'border-muted/50'
        }`}
      >
        {done && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2l2.2 2.2 4.8-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {/* Avoid hydration flash: show neutral label until client state loads */}
      {!hydrated ? 'Mark as read' : done ? 'Completed' : 'Mark as read'}
    </button>
  )
}

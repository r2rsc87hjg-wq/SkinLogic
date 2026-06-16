import type { CalloutVariant } from '@/content/learn/types'
import { InlineText } from './InlineText'

// Tip / note / warning banner used inside articles. Each variant carries its own
// color, icon, and default label, while staying on the warm editorial palette.
const VARIANTS: Record<
  CalloutVariant,
  { label: string; ring: string; bg: string; icon: React.ReactNode; iconColor: string }
> = {
  tip: {
    label: 'Tip',
    ring: 'border-accent/30',
    bg: 'bg-accent-soft',
    iconColor: 'text-accent',
    icon: (
      <path
        d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8.9.9 1.5l.2 1.1h4.8l.2-1.1c.1-.6.4-1.1.9-1.5A6 6 0 0 0 12 3Zm-2 16h4m-3.5 2h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  note: {
    label: 'Note',
    ring: 'border-line',
    bg: 'bg-sand',
    iconColor: 'text-muted',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M12 11v5m0-8.5v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  warning: {
    label: 'Important',
    ring: 'border-amber-400/50',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    icon: (
      <>
        <path
          d="M12 3 2.5 20h19L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M12 10v4m0 3v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
}

export function Callout({
  variant,
  title,
  text,
}: {
  variant: CalloutVariant
  title?: string
  text: string
}) {
  const v = VARIANTS[variant]
  return (
    <aside
      className={`my-6 flex gap-3 rounded-2xl border ${v.ring} ${v.bg} p-4`}
      role="note"
    >
      <span className={`mt-0.5 shrink-0 ${v.iconColor}`} aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24">
          {v.icon}
        </svg>
      </span>
      <div className="text-sm leading-relaxed text-ink/90">
        <p className="mb-0.5 font-semibold text-ink">{title ?? v.label}</p>
        <p>
          <InlineText text={text} />
        </p>
      </div>
    </aside>
  )
}

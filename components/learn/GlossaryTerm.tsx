'use client'

import { useId, useState } from 'react'
import { GLOSSARY } from '@/content/learn/glossary'

// Inline glossary term with a hover/focus tooltip. Renders as a dotted-underline
// span; the definition appears on hover (mouse) or focus (keyboard), so it is
// fully accessible. If the id is unknown, it degrades to plain text.
export function GlossaryTerm({
  termId,
  children,
}: {
  termId: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()
  const entry = GLOSSARY[termId]

  if (!entry) return <>{children}</>

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-help border-b border-dotted border-accent/60 font-medium text-accent decoration-dotted underline-offset-2 focus:outline-none focus-visible:rounded-sm"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          id={tooltipId}
          className="glass absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl p-3 text-left text-xs font-normal not-italic leading-relaxed text-ink shadow-lift"
        >
          <span className="mb-0.5 block font-semibold text-ink">
            {entry.term}
          </span>
          <span className="block text-muted">{entry.definition}</span>
        </span>
      )}
    </span>
  )
}

'use client'

import { useState, useId } from 'react'

export function CollapsibleSection({
  id,
  label,
  sectionNumber,
  children,
  defaultOpen = true,
}: {
  id: string
  label: string
  sectionNumber?: number
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <section
      id={id}
      className="scroll-mt-24 glass overflow-hidden rounded-2xl"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {sectionNumber != null && (
            <span className="text-xs font-bold tabular-nums text-accent/50 shrink-0 w-5 text-right">
              {String(sectionNumber).padStart(2, '0')}
            </span>
          )}
          <span className="font-display text-base font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
            {label}
          </span>
        </div>
        <span
          className="text-muted/50 transition-transform duration-300 shrink-0"
          aria-hidden
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="border-t border-line/40 px-6 pb-6 pt-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

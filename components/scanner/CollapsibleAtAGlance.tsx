'use client'

import { useState } from 'react'

export function CollapsibleAtAGlance({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="mb-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 mb-3 group"
      >
        <h2 className="eyebrow text-muted group-hover:text-accent transition-colors">At a glance</h2>
        <span
          className="text-muted/50 transition-transform duration-300 shrink-0"
          aria-hidden
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          {children}
        </div>
      </div>

      {!open && (
        <p className="text-xs text-muted/60 mt-1">
          Click to expand comparison table
        </p>
      )}
    </section>
  )
}

'use client'

import { useState, useId } from 'react'

/**
 * Lightweight collapsible panel for inline tables and cards.
 * Uses grid-template-rows animation — no max-height hack, smooth in both directions.
 */
export function CollapsibleBlock({
  title,
  subtitle,
  children,
  defaultOpen = true,
  titleColor = 'text-ink',
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  defaultOpen?: boolean
  titleColor?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left group min-h-[3rem]"
      >
        <div className="min-w-0">
          <span className={`font-semibold text-sm ${titleColor} group-hover:text-accent transition-colors leading-snug`}>
            {title}
          </span>
          {subtitle && (
            <span className="block text-xs text-muted mt-0.5 leading-snug">{subtitle}</span>
          )}
        </div>
        <span
          className="text-muted/50 mt-0.5 shrink-0 transition-transform duration-300"
          aria-hidden
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* grid-template-rows: the correct way to animate height in CSS */}
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
          <div className="border-t border-line/40">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

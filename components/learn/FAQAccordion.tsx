'use client'

import { useState } from 'react'
import { InlineText } from './InlineText'

// Expandable FAQ list. Each row is a native <button> for keyboard accessibility;
// the answer region is associated via aria-controls/aria-expanded.
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="my-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-medium text-ink transition-colors hover:bg-sand/50"
              >
                <span>{item.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${i}`}
                className="px-5 pb-5 text-sm leading-relaxed text-muted"
              >
                <InlineText text={item.a} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

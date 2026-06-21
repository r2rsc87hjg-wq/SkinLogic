import Link from 'next/link'

const COLUMNS = [
  {
    heading: 'Learn',
    links: [
      { href: '/learn', label: 'Learning Hub' },
      { href: '/ingredients', label: 'Ingredient Explainer' },
      { href: '/ingredients/compare', label: 'Compare Ingredients' },
      { href: '/sunscreen', label: 'Sunscreen Guide' },
      { href: '/app-scanner-comparison', label: 'Apps & Scanners' },
      { href: '/industry', label: 'How the Industry Works' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { href: '/profiler', label: 'Skin Profile Educator' },
      { href: '/analysis', label: 'AI Skin Analysis' },
    ],
  },
  {
    heading: 'About',
    links: [{ href: '/privacy', label: 'Privacy Policy' }],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand/40 mt-24">
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand + ethos */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                aria-hidden
                className="grid place-items-center h-7 w-7 rounded-full bg-accent text-paper"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="2.25" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                SkinLogic
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              The explainer layer for skincare. We help you understand the{' '}
              <em>why</em> — the research, the regulation, the marketing — so you
              leave smarter and more independent, not sold to.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="eyebrow text-muted mb-3">{col.heading}</h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Methodology / disclaimer strip */}
        <div className="mt-12 border-t border-line pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted leading-relaxed max-w-2xl">
            Every factual claim is sourced from peer-reviewed research or
            recognized authorities (PubMed, AAD, EU CosIng, and others). We are
            not a shop and take no brand sponsorship. Educational information
            only — not medical advice. Consult a board-certified dermatologist
            for diagnosis or treatment.
          </p>
          <p className="text-xs text-muted shrink-0">
            © {new Date().getFullYear()} SkinLogic
          </p>
        </div>
      </div>
    </footer>
  )
}

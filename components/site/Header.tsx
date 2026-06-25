'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV = [
  { href: '/learn', label: 'Learn' },
  { href: '/ingredients', label: 'Ingredients' },
  { href: '/sunscreen', label: 'Sunscreen' },
  { href: '/app-scanner-comparison', label: 'Apps & Scanners' },
  { href: '/industry', label: 'Industry' },
  { href: '/profiler', label: 'Skin Profiler' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)

  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setAtTop(window.scrollY < 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Highlight the section the user is currently in (incl. detail sub-routes).
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={`sticky top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4 transition-colors duration-300 ${isHome && atTop ? 'bg-[#04100a]' : ''}`}>
      <div className={`relative mx-auto flex max-w-5xl items-center gap-6 rounded-full px-4 sm:px-5 h-16 ${
        isHome
          ? 'border border-white/10 bg-transparent'
          : 'glass iris iris-on'
      }`}>
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          onClick={() => setOpen(false)}
        >
          <Mark />
          <span className={`font-display text-xl font-semibold tracking-tight ${
            isHome ? 'text-white' : 'text-ink'
          }`}>
            SkinLogic
          </span>
        </Link>

        {/* Primary nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isHome
                    ? active ? 'text-white' : 'text-white/80 hover:text-white'
                    : active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-1.5 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* CTA */}
          <Link
            href="/analysis"
            className="shimmer hidden sm:inline-flex items-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-4 py-2 text-sm font-medium text-paper shadow-soft hover:shadow-lift transition-shadow"
          >
            AI Analysis
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`md:hidden grid place-items-center h-10 w-10 -mr-2 rounded-full transition-colors ${
              isHome ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-sand'
            }`}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="glass iris iris-on relative md:hidden mx-3 mt-2 rounded-2xl px-4 py-3 animate-fade-in-up">
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? 'bg-accent-soft text-accent font-medium'
                        : 'text-ink hover:bg-sand'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                href="/analysis"
                onClick={() => setOpen(false)}
                className="shimmer block rounded-full bg-gradient-to-br from-accent to-[#27705f] px-4 py-2.5 text-center text-sm font-medium text-paper"
              >
                AI Analysis
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

// Minimal lens/clarity mark — an abstract aperture, not a stock icon.
function Mark() {
  return (
    <span
      aria-hidden
      className="grid place-items-center h-8 w-8 rounded-full bg-accent text-paper transition-transform group-hover:scale-105"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2.25" fill="currentColor" />
      </svg>
    </span>
  )
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

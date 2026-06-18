import type { Metadata } from 'next'
import { Newsreader, Public_Sans } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site/Header'
import { SiteFooter } from '@/components/site/Footer'
import { LiquidBackground } from '@/components/ui/LiquidBackground'

// Self-hosted by next/font at build time → fast, and no external requests,
// so the Content-Security-Policy (font-src 'self') stays intact.
const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

const sans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SkinLogic — Skincare Transparency & Education',
    template: '%s | SkinLogic',
  },
  description:
    'Plain English skincare science. We explain the research — not what to buy.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen text-ink antialiased flex flex-col">
        <LiquidBackground />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}

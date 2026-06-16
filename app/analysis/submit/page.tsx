import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AnalysisClient } from '@/components/analysis/AnalysisClient'

export const metadata: Metadata = {
  title: 'Your AI Skin Analysis',
  // No reason for search engines to index a post-payment landing page.
  robots: { index: false, follow: false },
}

export default function AnalysisSubmitPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Pay-per-use · AI analysis
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Your skin analysis</h1>
      </header>

      <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
        <AnalysisClient />
      </Suspense>
    </main>
  )
}

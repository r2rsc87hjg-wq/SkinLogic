import type { Metadata } from 'next'
import { PrivacyBanner } from './components/PrivacyBanner'
import { MedicalDisclaimer } from './components/MedicalDisclaimer'
import { ReferralExplainer } from './components/ReferralExplainer'

export const metadata: Metadata = {
  title: 'Care Navigator',
  description:
    'A healthcare GPS to help you find the right specialist and understand referral letters — privately, in your browser.',
}

export default function NavigatorPage() {
  return (
    <div className="relative min-h-screen bg-paper">
      {/* Ambient color blobs — backdrop for glass refraction */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-accent/[0.07] blur-[90px]" />
        <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-violet-300/[0.08] blur-[70px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] rounded-full bg-rose-200/[0.07] blur-[80px]" />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        {/* Page header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            AI-powered · private by design
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-3">
            Care Navigator
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed">
            A healthcare GPS for patients. Find the right specialist and decode
            referral letters — all privately in your browser.
          </p>
        </header>

        <PrivacyBanner />

        <ReferralExplainer />

        <MedicalDisclaimer />
      </main>
    </div>
  )
}

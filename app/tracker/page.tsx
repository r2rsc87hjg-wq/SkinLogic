import { SkinTrackerClient } from '@/components/tracker/SkinTrackerClient'

export const metadata = {
  title: 'Skin Tracker — SkinLogic',
  description: 'Track your skin health over time with AI-powered analysis. Educational, not diagnostic.',
}

export default function TrackerPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <p className="eyebrow text-accent mb-2">Subscriber feature</p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-3">Skin Tracker</h1>
        <p className="text-muted leading-relaxed max-w-lg">
          Upload a photo of your skin and get a plain-English educational read on what&apos;s visible.
          Your history is saved so you can track changes over time. Your photo is <strong>never stored</strong> — only the written analysis.
        </p>
      </div>

      <SkinTrackerClient />

      <p className="mt-8 text-center text-xs text-muted">
        SkinLogic Skin Tracker is an educational tool, not a medical device.
        It does not diagnose skin conditions. Always consult a board-certified dermatologist
        for any concerning skin changes.
      </p>
    </main>
  )
}

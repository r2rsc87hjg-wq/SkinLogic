import type { Metadata } from 'next'
import { SkinAnalysisClient } from '@/components/analysis/SkinAnalysisClient'

export const metadata: Metadata = {
  title: 'AI Skin Analysis',
  description:
    'Tell us about your skin profile, then optionally add a photo. The AI combines what it sees with what the research says about your specific biology. Nothing is ever stored.',
}

export default function AnalysisPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="eyebrow text-accent mb-3">Free · AI analysis</p>
        <h1 className="text-4xl font-medium text-ink mb-4">AI Skin Analysis</h1>
        <p className="text-lg text-muted leading-relaxed">
          Answer a few questions about your skin profile, then optionally add a photo.
          The AI combines what it observes with what the research says for your specific
          biology — and calibrates the explanation to your knowledge level.
        </p>
      </header>

      <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-blue-800 leading-relaxed space-y-2">
        <p className="font-semibold">About your data</p>
        <p>
          Nothing you enter here is stored. Your answers and any photo are sent to an AI
          model, used to generate your analysis, and immediately discarded. We do not log
          your inputs, your results, or your IP address in connection with this tool.
        </p>
        <p>
          Gender and ethnicity are optional. They are used only to make the research
          translation more accurate — they are never stored or associated with you in
          any way.
        </p>
      </div>

      <SkinAnalysisClient />
    </main>
  )
}

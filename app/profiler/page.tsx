import type { Metadata } from 'next'
import { ProfilerForm } from '@/components/profiler/ProfilerForm'

export const metadata: Metadata = {
  title: 'Skin Profile Educator',
  description:
    'Find out what the research says about skincare for your specific skin profile. Educational only — not medical advice.',
}

export default function ProfilerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          AI-powered education tool
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Skin Profile Educator
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This tool translates peer-reviewed research into plain English based
          on your skin profile. It does not tell you what to buy. It explains
          what the research says is biologically relevant to your specific
          combination of factors.
        </p>
      </header>

      {/* Privacy notice — displayed before any personal data is collected */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900 leading-relaxed space-y-1.5">
        <p className="font-semibold">About your data</p>
        <p>
          Nothing you enter here is stored. Your answers are sent to an AI
          model, used to generate your educational profile, and immediately
          discarded. We do not log your inputs, your results, or your IP
          address in connection with this tool.
        </p>
        <p>
          Gender and ethnicity are optional. They are used only to make the
          research translation more accurate — they are never stored or
          associated with you in any way.
        </p>
      </div>

      <ProfilerForm />
    </main>
  )
}

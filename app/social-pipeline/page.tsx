import type { Metadata } from 'next'
import { SocialPipelineForm } from '@/components/social/SocialPipelineForm'

export const metadata: Metadata = {
  title: 'Social Media Content Pipeline',
  description:
    'Translate evidence-based skincare content into Instagram carousels, video scripts, and infographic layouts — citations preserved.',
}

export default function SocialPipelinePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Content creation tool
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Social Media Content Pipeline
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Paste any piece of site content — an ingredient breakdown, a
          sunscreen section, a scanner review — and get it translated into
          three social formats. Citations are always preserved. The voice stays
          honest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            {
              title: 'Instagram carousel',
              desc: 'Slide-by-slide script, one idea per slide, citations on the final slide',
            },
            {
              title: 'Video script',
              desc: '60–90 seconds: myth hook → explanation → honest bottom line → CTA',
            },
            {
              title: 'Infographic',
              desc: 'One counterintuitive fact, 3–5 supporting points, source cited, no hyperbole',
            },
          ].map((format) => (
            <div
              key={format.title}
              className="border border-gray-200 rounded-lg p-3"
            >
              <p className="font-medium text-gray-900 mb-1">{format.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{format.desc}</p>
            </div>
          ))}
        </div>
      </header>

      <SocialPipelineForm />
    </main>
  )
}

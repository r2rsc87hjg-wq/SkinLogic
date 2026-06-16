import type { VideoSection } from '@/types/social'

interface VideoScriptOutputProps {
  totalDuration: string
  sections: VideoSection[]
}

const LABEL_STYLES: Record<string, string> = {
  Hook:          'bg-amber-100 text-amber-800',
  Explanation:   'bg-blue-100 text-blue-800',
  'Bottom Line': 'bg-green-100 text-green-800',
  CTA:           'bg-purple-100 text-purple-800',
}

function getLabelStyle(label: string) {
  for (const key of Object.keys(LABEL_STYLES)) {
    if (label.toLowerCase().includes(key.toLowerCase())) {
      return LABEL_STYLES[key]
    }
  }
  return 'bg-gray-100 text-gray-700'
}

export function VideoScriptOutput({ totalDuration, sections }: VideoScriptOutputProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        Total estimated duration: <strong className="text-gray-700">{totalDuration}</strong>
      </p>

      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getLabelStyle(section.label)}`}
              >
                {section.label}
              </span>
              <span className="text-xs text-gray-400">{section.durationNote}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.script}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

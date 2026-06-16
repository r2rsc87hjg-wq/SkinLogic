interface InfographicOutputProps {
  headline: string
  mainFact: string
  supportingPoints: string[]
  source: string
  visualSuggestion: string
}

export function InfographicOutput({
  headline,
  mainFact,
  supportingPoints,
  source,
  visualSuggestion,
}: InfographicOutputProps) {
  return (
    <div className="space-y-5">
      {/* Preview mockup */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4 bg-gray-50">
        <p className="text-xs uppercase tracking-widest text-gray-400 text-center">
          Layout preview
        </p>

        <div className="space-y-1 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">Headline</p>
          <p className="font-bold text-gray-900 text-lg leading-tight">{headline}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded p-3">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Key fact</p>
          <p className="text-gray-800 font-medium text-sm leading-relaxed">{mainFact}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Supporting points
          </p>
          <ul className="space-y-2">
            {supportingPoints.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-gray-300 shrink-0 font-mono">{i + 1}.</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-blue-700 font-medium">Source: {source}</p>
        </div>
      </div>

      {/* Designer note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">
          Visual direction
        </p>
        <p className="text-sm text-amber-900 leading-relaxed">{visualSuggestion}</p>
      </div>
    </div>
  )
}

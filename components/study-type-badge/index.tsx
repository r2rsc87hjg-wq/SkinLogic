// Visual indicator of evidence strength. Shown on every ingredient
// so readers immediately understand what kind of research backs a claim.

const BADGE_STYLES: Record<string, string> = {
  'Human clinical trial': 'bg-green-100 text-green-800',
  'Meta-analysis':        'bg-blue-100 text-blue-800',
  'Animal':               'bg-yellow-100 text-yellow-800',
  'In vitro':             'bg-orange-100 text-orange-800',
  'Case report':          'bg-gray-100 text-gray-700',
}

interface StudyTypeBadgeProps {
  type: string
}

export function StudyTypeBadge({ type }: StudyTypeBadgeProps) {
  const style = BADGE_STYLES[type] ?? 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${style}`}>
      {type}
    </span>
  )
}

interface StudyTypeLegendProps {
  types: string[]
}

export function StudyTypeLegend({ types }: StudyTypeLegendProps) {
  if (!types?.length) return null
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Evidence types available">
      {types.map((t) => (
        <StudyTypeBadge key={t} type={t} />
      ))}
    </div>
  )
}

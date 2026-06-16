export type VerdictRating = 'worth-it' | 'limited' | 'depends' | 'not-recommended'

const VERDICT_CONFIG: Record<
  VerdictRating,
  { label: string; style: string }
> = {
  'worth-it':        { label: 'Worth it — with caveats', style: 'bg-green-100 text-green-800' },
  'limited':         { label: 'Limited value',           style: 'bg-yellow-100 text-yellow-800' },
  'depends':         { label: 'Depends on your goal',    style: 'bg-blue-100 text-blue-800' },
  'not-recommended': { label: 'Not recommended',         style: 'bg-red-100 text-red-800' },
}

interface VerdictBadgeProps {
  rating: VerdictRating
  size?: 'sm' | 'md'
}

export function VerdictBadge({ rating, size = 'sm' }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[rating]
  if (!config) return null
  const padding = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'
  return (
    <span className={`inline-block font-medium rounded-full ${padding} ${config.style}`}>
      {config.label}
    </span>
  )
}

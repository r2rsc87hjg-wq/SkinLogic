import { StudyTypeLegend } from '@/components/study-type-badge'
import { TiltCard } from '@/components/ui/TiltCard'

interface IngredientCardProps {
  name: string
  slug: string
  summary: string
  studyTypes?: string[]
}

export function IngredientCard({ name, slug, summary, studyTypes }: IngredientCardProps) {
  return (
    <TiltCard
      href={`/ingredients/${slug}`}
      className="glass iris iris-hover group overflow-hidden rounded-2xl p-5"
    >
      <div className="flex h-full flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">{name}</h2>

        {studyTypes?.length ? <StudyTypeLegend types={studyTypes} /> : null}

        <p className="text-sm leading-relaxed text-muted flex-1">{summary}</p>

        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent">
          Read the research
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </TiltCard>
  )
}

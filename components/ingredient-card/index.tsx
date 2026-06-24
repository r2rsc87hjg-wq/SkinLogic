import { TiltCard } from '@/components/ui/TiltCard'

interface IngredientCardProps {
  name: string
  slug: string
  summary: string
  studyTypes?: string[]
  category?: string
}

// Category config — icon (SVG path d attr), label, colors
const CATEGORY_CONFIG: Record<string, { label: string; iconPath: string; bg: string; text: string; dot: string }> = {
  'anti-aging':  { label: 'Anti-aging',    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'brightening': { label: 'Brightening',   iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  'exfoliant':   { label: 'Exfoliant',     iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  'humectant':   { label: 'Hydration',     iconPath: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.518 4.08 2 6.5 2c1.438 0 2.888.555 4.176 1.74A6.607 6.607 0 0112 5.5a6.607 6.607 0 011.324-1.76C14.612 2.555 16.062 2 17.5 2 19.92 2 23 3.518 23 7.191c0 4.105-5.37 8.863-11 14.402z', bg: 'bg-sky-50',    text: 'text-sky-700',    dot: 'bg-sky-500' },
  'barrier':     { label: 'Barrier repair', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bg: 'bg-teal-50',   text: 'text-teal-700',   dot: 'bg-teal-500' },
  'acne':        { label: 'Acne',          iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  'soothing':    { label: 'Soothing',      iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  'antioxidant': { label: 'Antioxidant',   iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', bg: 'bg-rose-50',   text: 'text-rose-700',   dot: 'bg-rose-500' },
}

const DEFAULT_CATEGORY = { label: 'Ingredient', iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' }

function getEvidence(studyTypes?: string[]): { level: 1 | 2 | 3; label: string } {
  if (!studyTypes?.length) return { level: 1, label: 'Emerging' }
  if (studyTypes.includes('Meta-analysis')) return { level: 3, label: 'Strong evidence' }
  if (studyTypes.includes('Human clinical trial')) return { level: 2, label: 'Good evidence' }
  return { level: 1, label: 'Emerging' }
}

// First 2 sentences only
function shortSummary(text: string): string {
  const sentences = text.match(/[^.!?]*[.!?]+/g) ?? []
  return sentences.slice(0, 2).join(' ').trim() || text.slice(0, 160)
}

export function IngredientCard({ name, slug, summary, studyTypes, category }: IngredientCardProps) {
  const cat = (category && CATEGORY_CONFIG[category]) ?? DEFAULT_CATEGORY
  const ev = getEvidence(studyTypes)

  return (
    <TiltCard
      href={`/ingredients/${slug}`}
      className="glass iris iris-hover group overflow-hidden rounded-2xl flex flex-col"
    >
      {/* Category + evidence header */}
      <div className={`flex items-center justify-between px-5 pt-4 pb-3 ${cat.bg} border-b border-line/30`}>
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${cat.text}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={cat.iconPath} />
          </svg>
          {cat.label}
        </div>

        {/* Evidence dots */}
        <div className="flex items-center gap-1" title={ev.label}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`block w-2 h-2 rounded-full transition-colors ${n <= ev.level ? cat.dot : 'bg-line/50'}`}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted font-medium hidden sm:inline">{ev.label}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h2 className="text-base font-semibold text-ink leading-snug">{name}</h2>
        <p className="text-sm leading-relaxed text-muted flex-1">{shortSummary(summary)}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-1">
          Read the research
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
        </span>
      </div>
    </TiltCard>
  )
}

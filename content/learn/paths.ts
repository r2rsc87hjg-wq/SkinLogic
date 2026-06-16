import type { Path } from './types'

export const PATHS: Path[] = [
  {
    id: 'skincare-fundamentals',
    title: 'Skincare Fundamentals',
    emoji: '🧴',
    description: 'The essential building blocks — routines, skin types, cleansing, and moisturising. Start here if you are new or want to get the basics exactly right.',
    accentColor: '#46c08a',
    bgClass: 'bg-emerald-50',
    level: 'beginner',
    lessonSlugs: [
      'build-your-first-routine',
      'identify-your-skin-type',
      'double-cleansing-guide',
      'skin-cycling-explained',
      'the-moisture-sandwich',
      'patch-testing-guide',
      'morning-vs-night-routine',
      'choosing-a-cleanser',
      'moisturiser-ingredients-explained',
    ],
  },
  {
    id: 'ingredient-science',
    title: 'Ingredient Science',
    emoji: '🔬',
    description: 'Decode the actives that actually work — niacinamide, ceramides, vitamin C, retinoids, peptides, and more. Learn what they do and how to combine them.',
    accentColor: '#9b87f5',
    bgClass: 'bg-violet-50',
    level: 'intermediate',
    lessonSlugs: [
      'niacinamide-complete-guide',
      'ceramides-explained',
      'vitamin-c-guide',
      'retinoids-mechanism-and-evidence',
      'peptides-for-skin',
      'azelaic-acid-guide',
      'tranexamic-acid-guide',
      'hyaluronic-acid-explained',
      'aha-bha-deep-dive',
      'bakuchiol-retinol-alternative',
      'glycerin-squalane-guide',
      'zinc-for-skin',
    ],
  },
  {
    id: 'sun-protection',
    title: 'Sun Protection Mastery',
    emoji: '☀️',
    description: 'From SPF basics to advanced sun strategy — mineral vs. chemical, reapplication, UV indexes, and why this is the highest-impact step in any routine.',
    accentColor: '#f59e0b',
    bgClass: 'bg-amber-50',
    level: 'beginner',
    lessonSlugs: [
      'spf-the-one-non-negotiable',
      'chemical-vs-mineral-sunscreen',
      'spf-numbers-explained',
      'sunscreen-reapplication-guide',
      'uv-index-explained',
      'sunscreen-for-dark-skin',
      'vitamin-d-and-sunscreen',
      'outdoor-sports-sun-protection',
    ],
  },
  {
    id: 'skin-mental-health',
    title: 'Skin & Mental Health',
    emoji: '🧠',
    description: 'The brain–skin axis is real. Explore how stress affects your skin, the emotional weight of skin conditions, and how to build a healthier relationship with your skin.',
    accentColor: '#7dd3fc',
    bgClass: 'bg-sky-50',
    level: 'all',
    lessonSlugs: [
      'stress-and-your-skin',
      'stress-cortisol-skin',
      'dermatillomania-compassionate-guide',
      'skin-confidence-guide',
      'teen-skincare-guide',
      'mindful-skincare-rituals',
    ],
  },
  {
    id: 'athlete-skincare',
    title: 'Athlete Skincare',
    emoji: '🏃',
    description: 'Training is tough on skin — sweat, friction, chlorine, sun, and shared gear all create unique challenges. Build a routine that keeps up with your training.',
    accentColor: '#2dd4bf',
    bgClass: 'bg-teal-50',
    level: 'intermediate',
    lessonSlugs: [
      'skincare-for-athletes',
      'chlorine-and-swimming-skin',
      'sweat-and-skin-health',
      'post-workout-skincare',
      'helmet-friction-skincare',
      'outdoor-athlete-skincare',
    ],
  },
  {
    id: 'conditions-deep-dives',
    title: 'Conditions Deep Dives',
    emoji: '🩺',
    description: 'Evidence-based guides to acne, eczema, rosacea, and hyperpigmentation — what causes them, what the research says, and when to see a dermatologist.',
    accentColor: '#f87171',
    bgClass: 'bg-rose-50',
    level: 'advanced',
    lessonSlugs: [
      'understanding-acne',
      'acne-types-explained',
      'eczema-trigger-and-repair',
      'hyperpigmentation-types-guide',
      'hormonal-acne-guide',
      'rosacea-management',
      'perioral-dermatitis',
      'skincare-for-black-brown-skin',
      'mature-skin-guide',
    ],
  },
]

export function getPath(id: string): Path | undefined {
  return PATHS.find((p) => p.id === id)
}

// Returns all paths that include a given lesson slug.
export function getPathsForLesson(slug: string): Path[] {
  return PATHS.filter((p) => p.lessonSlugs.includes(slug))
}

// Returns the slug of the next lesson in the same path, or null.
export function getNextInPath(pathId: string, currentSlug: string): string | null {
  const path = getPath(pathId)
  if (!path) return null
  const idx = path.lessonSlugs.indexOf(currentSlug)
  if (idx === -1 || idx >= path.lessonSlugs.length - 1) return null
  return path.lessonSlugs[idx + 1]
}

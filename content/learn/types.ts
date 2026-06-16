// Type definitions for the Learning Hub.

export type Level = 'beginner' | 'intermediate' | 'advanced'

export interface ExternalSource {
  title: string
  url: string
  source: string // e.g. 'AAD', 'DermNet NZ', 'PubMed'
}

export type Topic =
  | 'Routines'
  | 'Skin types'
  | 'Conditions'
  | 'Ingredients'
  | 'Sun protection'
  | 'Mental health'
  | 'Lifestyle'
  | 'Athlete skincare'

// Richer block types for interactive lessons
export type Block =
  | { type: 'heading'; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'callout'; variant: CalloutVariant; title?: string; text: string }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'quiz'; questions: QuizQuestion[] }
  | { type: 'ingredient-spotlight'; name: string; whatItDoes: string; goodFor: string[]; avoidIf: string[] }
  | { type: 'myth-fact'; myth: string; fact: string }
  | { type: 'pip-links'; items: { title: string; url: string; source: string }[] }

export type CalloutVariant = 'tip' | 'note' | 'warning'

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explanation: string
}

export interface Article {
  slug: string
  title: string
  summary: string
  level: Level
  topic: Topic
  pathId: string
  pathOrder: number
  xpReward: number
  readingMinutes: number
  published: string
  related: string[]
  prerequisiteSlug?: string
  externalSources?: ExternalSource[]
  body: Block[]
}

// A learning path groups sequential lessons into a curriculum track.
export interface Path {
  id: string
  title: string
  emoji: string
  description: string
  accentColor: string    // hex used for border/glow
  bgClass: string        // Tailwind bg utility for the card
  level: Level | 'all'
  lessonSlugs: string[]  // ordered — defines prerequisite chain
}

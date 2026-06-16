// Shared TypeScript types across the application.
// Each tool will add its own types here as it is built.

// --- Sanity document types ---

export interface Ingredient {
  _id: string
  name: string
  slug: { current: string }
  summary: string
  biologicalMechanism: unknown[]
  researchSummary: unknown[]
  studyTypes: string[]
  evidenceBasedConcentration: string
  marketingClaims: unknown[]
  honestVerdict: string
  citations: Citation[]
  relatedIngredients?: Ingredient[]
}

export interface AppScanner {
  _id: string
  name: string
  slug: { current: string }
  technology: string
  whatItActuallyDoes: unknown[]
  researchAccuracy: unknown[]
  knownLimitations: unknown[]
  conflictOfInterest: unknown[]
  verdict: string
  worthItFor: string[]
  citations: Citation[]
}

export interface SunscreenBrand {
  _id: string
  name: string
  slug: { current: string }
  origin: string
  uvFilters: string[]
  uvaProtection: string
  uvbSpf: number
  formulationType: 'Chemical' | 'Mineral' | 'Hybrid'
  availableInUS: boolean
  importRequired: boolean
  notes: unknown[]
  citations: Citation[]
}

export interface Citation {
  label: string
  url: string
}

// --- Tool 4: Profiler ---

export interface ProfilerInput {
  skinType: 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal'
  primaryConcern: 'acne' | 'aging' | 'hyperpigmentation' | 'redness' | 'texture' | 'dehydration'
  ageRange: string
  gender?: string
  ethnicity?: string
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced'
  climate: string
}

// --- Tool 6: Paid Analysis ---

export interface TransactionRecord {
  transaction_id: string
  timestamp: string
  amount_cents: number
  stripe_payment_intent_id: string
  token_hash: string
  api_status: 'success' | 'failure'
  token_count: number
}

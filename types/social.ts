// Shared types for the Social Media Content Pipeline (Tool 5).
// These mirror the JSON schema in the Anthropic tool definition — keep in sync.

export interface CarouselSlide {
  slideNumber: number
  headline: string
  body: string
  citationNote?: string
}

export interface VideoSection {
  label: string
  script: string
  durationNote: string
}

export interface SocialContentOutput {
  carousel: {
    slides: CarouselSlide[]
  }
  video: {
    totalDuration: string
    sections: VideoSection[]
  }
  infographic: {
    headline: string
    mainFact: string
    supportingPoints: string[]
    source: string
    visualSuggestion: string
  }
}

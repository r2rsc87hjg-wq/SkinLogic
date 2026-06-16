import 'server-only'
// ^ This import causes a build error if this file is ever imported
// in a Client Component or browser context. Hard guarantee that
// the Anthropic API key never reaches the client.

import Anthropic from '@anthropic-ai/sdk'

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY environment variable is not set')
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Default ceilings applied to every call site.
// Individual routes may lower these; none should raise them without review.
export const CLAUDE_DEFAULTS = {
  model: 'claude-sonnet-4-6' as const,
  max_tokens: 1024,
}

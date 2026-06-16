import { Fragment } from 'react'
import { GlossaryTerm } from './GlossaryTerm'

// Parses {{glossary-id|display text}} tokens in article copy and renders the
// display text wrapped in a <GlossaryTerm> tooltip. Plain text passes through
// untouched. Used by every block that contains body copy.
const TOKEN = /\{\{([a-z0-9-]+)\|([^}]+)\}\}/g

export function InlineText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  TOKEN.lastIndex = 0
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      )
    }
    const [, termId, display] = match
    nodes.push(
      <GlossaryTerm key={key++} termId={termId}>
        {display}
      </GlossaryTerm>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }

  return <>{nodes}</>
}

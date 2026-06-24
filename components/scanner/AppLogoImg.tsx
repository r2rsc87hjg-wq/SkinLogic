'use client'

import { useState } from 'react'

type Stage = 'clearbit' | 'favicon' | 'failed'

/**
 * Renders a brand logo fetched via Clearbit → Google favicon fallback.
 * When domain is absent or both fetches fail, shows a letter avatar using
 * the first character of `name`.
 */
export function AppLogoImg({
  domain,
  name = '',
  size = 20,
}: {
  domain?: string
  name?: string
  size?: number
}) {
  const [stage, setStage] = useState<Stage>('clearbit')
  const letter = name.charAt(0).toUpperCase() || '?'

  if (!domain || stage === 'failed') {
    return (
      <span
        className="inline-flex items-center justify-center rounded bg-sand border border-line/60 font-bold text-ink/50 shrink-0 select-none"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        aria-hidden
      >
        {letter}
      </span>
    )
  }

  const src =
    stage === 'clearbit'
      ? `https://logo.clearbit.com/${domain}`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="rounded-md object-contain bg-white shrink-0"
      onError={() => setStage(stage === 'clearbit' ? 'favicon' : 'failed')}
    />
  )
}

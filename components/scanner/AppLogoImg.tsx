'use client'

import { useState } from 'react'

type Stage = 'clearbit' | 'favicon' | 'failed'

export function AppLogoImg({ domain, size = 20 }: { domain: string; size?: number }) {
  const [stage, setStage] = useState<Stage>('clearbit')

  if (stage === 'failed') return null

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

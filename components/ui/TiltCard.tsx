'use client'

import Link from 'next/link'
import { useRef } from 'react'

interface TiltCardProps {
  /** When set, the whole card is a link to this href. */
  href?: string
  /** Classes applied to the tilting glass surface (e.g. `glass iris ... rounded-2xl p-6`). */
  className?: string
  /** Max tilt in degrees. */
  max?: number
  children: React.ReactNode
}

/**
 * A glass card that subtly bends toward the cursor in 3D, with a specular
 * highlight that tracks the pointer. The transformed element is a direct child
 * of the perspective container so the 3D reads correctly. Honors
 * prefers-reduced-motion via CSS (see globals.css).
 */
export function TiltCard({ href, className = '', max = 7, children }: TiltCardProps) {
  const inner = useRef<HTMLElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = inner.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--tilt-on', '1')
  }

  const onLeave = () => {
    const el = inner.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--tilt-on', '0')
  }

  const inside = (
    <>
      <span aria-hidden className="tilt-glare" />
      <div className="relative z-10 h-full">{children}</div>
    </>
  )

  return (
    <div className="tilt-outer" onMouseMove={onMove} onMouseLeave={onLeave}>
      {href ? (
        <Link
          href={href}
          ref={inner as React.Ref<HTMLAnchorElement>}
          className={`tilt-surface block ${className}`}
        >
          {inside}
        </Link>
      ) : (
        <div
          ref={inner as React.Ref<HTMLDivElement>}
          className={`tilt-surface ${className}`}
        >
          {inside}
        </div>
      )}
    </div>
  )
}

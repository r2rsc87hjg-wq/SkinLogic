'use client'

import { useEffect, useRef } from 'react'

// Animated liquid background: soft, morphing, drifting colour blobs on a fixed
// layer behind all content. Adds a cheap scroll-parallax (different depths move
// at different rates) and disables it entirely for prefers-reduced-motion.
// Drop once near the root; it is purely decorative (aria-hidden).

interface BlobDef {
  color: string
  size: string
  top: string
  left?: string
  right?: string
  opacity: number
  depth: number // parallax factor — larger = moves more
  delay: string
}

const BLOBS: BlobDef[] = [
  { color: 'var(--blob-aqua)', size: '34rem', top: '-6rem', right: '-6%', opacity: 0.5, depth: 0.06, delay: '0s' },
  { color: 'var(--blob-lavender)', size: '30rem', top: '6rem', left: '-10%', opacity: 0.42, depth: 0.12, delay: '-6s' },
  { color: 'var(--blob-periwinkle)', size: '26rem', top: '34rem', right: '14%', opacity: 0.38, depth: 0.09, delay: '-11s' },
  { color: 'var(--blob-blush)', size: '24rem', top: '52rem', left: '12%', opacity: 0.32, depth: 0.15, delay: '-3s' },
  { color: 'var(--blob-teal)', size: '22rem', top: '76rem', right: '-4%', opacity: 0.16, depth: 0.07, delay: '-9s' },
]

export function LiquidBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !ref.current) return

    const blobs = Array.from(
      ref.current.querySelectorAll<HTMLElement>('[data-depth]')
    )
    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        for (const el of blobs) {
          const depth = Number(el.dataset.depth)
          // Parallax is composed via a CSS var so it stacks with the keyframe
          // drift animation instead of overwriting its transform.
          el.style.setProperty('--py', `${-y * depth}px`)
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="liquid-bg" aria-hidden>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          data-depth={b.depth}
          className="blob"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            opacity: b.opacity,
            background: b.color,
            animationDelay: `${b.delay}, ${b.delay}`,
            // The parallax offset rides on top of the drift keyframes.
            translate: 'var(--px, 0) var(--py, 0)',
          }}
        />
      ))}
    </div>
  )
}

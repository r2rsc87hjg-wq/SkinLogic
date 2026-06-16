'use client'

// Client-only reading-progress tracker. Persists to localStorage (no account
// required) and broadcasts changes within the tab so the hub progress bar and
// per-article toggles stay in sync. SSR-safe: reads happen after mount.

import { useCallback, useEffect, useState } from 'react'

const KEY = 'skinclear:learn:completed'
const EVENT = 'skinclear:learn:progress'

function readSet(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

function writeSet(set: Set<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]))
    // Notify other hook instances mounted in the same tab.
    window.dispatchEvent(new CustomEvent(EVENT))
  } catch {
    // Storage unavailable (private mode / quota) — fail silently.
  }
}

// Returns the set of completed slugs plus toggle/check helpers.
// `hydrated` guards against rendering server/client-mismatched UI before the
// first client read completes.
export function useLearnProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  const refresh = useCallback(() => setCompleted(readSet()), [])

  useEffect(() => {
    refresh()
    setHydrated(true)
    const onChange = () => refresh()
    window.addEventListener(EVENT, onChange)
    window.addEventListener('storage', onChange) // cross-tab sync
    return () => {
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [refresh])

  const toggle = useCallback((slug: string) => {
    const next = readSet()
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    writeSet(next)
    setCompleted(next)
  }, [])

  const isCompleted = useCallback(
    (slug: string) => completed.has(slug),
    [completed]
  )

  return { completed, hydrated, toggle, isCompleted }
}

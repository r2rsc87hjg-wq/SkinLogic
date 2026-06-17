'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EnterPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-3xl border border-ink/10 bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">SkinLogic</h1>
          <p className="mt-1 text-sm text-muted">Enter the password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-xl border border-ink/10 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          {error && (
            <p className="text-center text-xs text-rose-500">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-br from-accent to-[#27705f] py-2.5 text-sm font-medium text-paper shadow-soft transition-all hover:shadow-lift disabled:opacity-60"
          >
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}

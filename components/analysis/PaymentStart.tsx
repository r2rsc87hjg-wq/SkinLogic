'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Tool 6 — the paywall CTA. Starts a Stripe Checkout Session and
// redirects to Stripe's hosted page. No card data ever touches our app.
export function PaymentStart({ priceLabel }: { priceLabel: string }) {
  const params = useSearchParams()
  const canceled = params.get('canceled') === '1'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function startCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/analysis/checkout', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message ?? 'Could not start checkout. Please try again.')
        setLoading(false)
        return
      }
      // Hand off to Stripe's hosted checkout.
      window.location.href = data.url
    } catch {
      setError('Could not start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {canceled && (
        <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Your checkout was canceled — you were not charged.
        </div>
      )}

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <button
        onClick={startCheckout}
        disabled={loading}
        className="w-full bg-accent text-paper text-sm font-medium py-3 px-4 rounded-full hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Redirecting to secure checkout…' : `Start analysis — ${priceLabel}`}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Payment is processed securely by Stripe. You pay once, per analysis —
        no subscription, no account. The price above is the full price; there
        are no surprise charges.
      </p>
    </div>
  )
}

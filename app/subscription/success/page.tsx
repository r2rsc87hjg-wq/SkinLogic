'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { setSubscriptionToken } from '@/lib/free-tier'

type State = 'loading' | 'success' | 'already_active' | 'error'

export default function SubscriptionSuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const [state, setState] = useState<State>('loading')

  useEffect(() => {
    if (!sessionId) {
      setState('error')
      return
    }

    fetch(`/api/stripe/verify-subscription?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.token) {
          setSubscriptionToken(data.token)
          setState('success')
        } else if (data.error === 'already_issued') {
          // Token was already saved on a previous visit — nothing to do.
          setState('already_active')
        } else {
          setState('error')
        }
      })
      .catch(() => setState('error'))
  }, [sessionId])

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="glass iris iris-on max-w-md w-full rounded-3xl p-8 text-center">
        {state === 'loading' && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              Activating your subscription…
            </h1>
            <p className="text-sm text-muted">Just a moment</p>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl">
              🎉
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              You&apos;re all set!
            </h1>
            <p className="text-sm text-muted mb-6">
              Unlimited AI chat and Pip sessions are now active on this device.
              Your subscription renews monthly — cancel any time from your email receipt.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-6 py-2.5 text-sm font-medium text-paper shadow-soft hover:shadow-lift transition-all"
              >
                Start learning with Pip
              </Link>
              <Link
                href="/"
                className="glass inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5"
              >
                Go home
              </Link>
            </div>
          </>
        )}

        {state === 'already_active' && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl">
              ✓
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              Already active
            </h1>
            <p className="text-sm text-muted mb-6">
              Your subscription is active. If you&apos;re on a new device, your access
              is tied to this browser — just use the same device you subscribed on.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-6 py-2.5 text-sm font-medium text-paper shadow-soft hover:shadow-lift transition-all"
            >
              Back to SkinLogic
            </Link>
          </>
        )}

        {state === 'error' && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-3xl">
              ⚠️
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-muted mb-6">
              We couldn&apos;t activate your subscription automatically. Your payment
              was processed — please contact us and we&apos;ll sort it out right away.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#27705f] px-6 py-2.5 text-sm font-medium text-paper shadow-soft hover:shadow-lift transition-all"
            >
              Back to SkinLogic
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

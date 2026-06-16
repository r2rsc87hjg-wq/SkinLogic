import { NextRequest, NextResponse } from 'next/server'
import { validateSubscriptionToken } from '@/lib/subscription-token'
import { getServiceClient } from '@/lib/supabase'

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const buf = await crypto.subtle.digest('SHA-256', encoder.encode(token))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  const rawToken = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!rawToken) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const valid = await validateSubscriptionToken(rawToken).catch(() => null)
  if (!valid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const tokenHash = await hashToken(rawToken)
  const client = getServiceClient()
  const { data } = await client
    .from('skin_scans')
    .select('id, overview, concerns, positives, watch_next, created_at')
    .eq('token_hash', tokenHash)
    .order('created_at', { ascending: false })
    .limit(12)

  return NextResponse.json({ history: data ?? [] })
}

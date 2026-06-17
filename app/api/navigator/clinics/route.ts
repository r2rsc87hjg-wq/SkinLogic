import { NextRequest, NextResponse } from 'next/server'
import { getNavigatorClinicsLimiter, getIp , safeLimit } from '@/lib/rate-limit'

const PLACES_KEY = process.env.GOOGLE_MAPS_API_KEY
const SEARCH_RADIUS = 10000 // 10 km

export async function POST(request: NextRequest) {
  const ip = getIp(request.headers)
  const limiter = getNavigatorClinicsLimiter()
  const { success, limit, remaining, reset } = await safeLimit(limiter, ip)

  if (!success) {
    const minutesUntilReset = Math.ceil((new Date(reset).getTime() - Date.now()) / 60000)
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    )
  }

  if (!PLACES_KEY) {
    return NextResponse.json(
      { error: 'not_configured', message: 'Maps API not configured.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Invalid JSON.' },
      { status: 400 }
    )
  }

  const { lat, lng } = (body ?? {}) as Record<string, unknown>

  if (
    typeof lat !== 'number' ||
    typeof lng !== 'number' ||
    isNaN(lat) ||
    isNaN(lng) ||
    lat < -90 || lat > 90 ||
    lng < -180 || lng > 180
  ) {
    return NextResponse.json(
      { error: 'validation_failed', message: 'Valid lat and lng coordinates are required.' },
      { status: 400 }
    )
  }

  try {
    // Text search gives better results for specialised queries than nearbysearch
    const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    url.searchParams.set('query', 'dermatologist skin clinic')
    url.searchParams.set('location', `${lat},${lng}`)
    url.searchParams.set('radius', String(SEARCH_RADIUS))
    url.searchParams.set('key', PLACES_KEY)

    const res = await fetch(url.toString(), { next: { revalidate: 0 } })
    if (!res.ok) throw new Error(`Places API HTTP ${res.status}`)

    const data = await res.json()

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('[navigator:clinics] Places API status:', data.status, data.error_message)
      return NextResponse.json(
        { error: 'api_error', message: 'Could not fetch nearby clinics.' },
        { status: 502 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clinics = ((data.results ?? []) as any[]).slice(0, 10).map((r) => ({
      name: r.name as string,
      address: (r.formatted_address ?? r.vicinity ?? '') as string,
      rating: typeof r.rating === 'number' ? r.rating : undefined,
      userRatingsTotal: typeof r.user_ratings_total === 'number' ? r.user_ratings_total : undefined,
      placeId: r.place_id as string,
      openNow: r.opening_hours?.open_now as boolean | undefined,
    }))

    return NextResponse.json({ clinics })
  } catch (err) {
    console.error('[navigator:clinics] Error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json(
      { error: 'api_error', message: 'Could not fetch nearby clinics.' },
      { status: 500 }
    )
  }
}

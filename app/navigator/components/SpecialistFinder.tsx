'use client'

import { useState } from 'react'

interface Clinic {
  name: string
  address: string
  rating?: number
  userRatingsTotal?: number
  placeId: string
  openNow?: boolean
}

type Status = 'idle' | 'locating' | 'loading' | 'done' | 'error'

const MAPS_EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export function SpecialistFinder() {
  const [status, setStatus] = useState<Status>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const mapsSearchUrl = coords
    ? `https://www.google.com/maps/search/dermatologist+skin+clinic/@${coords.lat},${coords.lng},13z`
    : 'https://www.google.com/maps/search/dermatologist+near+me'

  const embedSrc = coords && MAPS_EMBED_KEY
    ? `https://www.google.com/maps/embed/v1/search?key=${MAPS_EMBED_KEY}&q=dermatologist+skin+clinic&location=${coords.lat},${coords.lng}&zoom=13`
    : null

  async function handleLocate() {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.')
      setStatus('error')
      return
    }

    setStatus('locating')
    setErrorMessage('')

    navigator.geolocation.getCurrentPosition(
      async ({ coords: pos }) => {
        const lat = pos.latitude
        const lng = pos.longitude
        setCoords({ lat, lng })
        setStatus('loading')

        try {
          const res = await fetch('/api/navigator/clinics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lng }),
          })

          if (!res.ok) {
            const data = await res.json()
            // If Places API not configured, still show the map
            if (data.error === 'not_configured') {
              setClinics([])
              setStatus('done')
              return
            }
            setErrorMessage(data.message ?? 'Could not load clinics. Please try again.')
            setStatus('error')
            return
          }

          const data = await res.json()
          setClinics(data.clinics ?? [])
          setStatus('done')
        } catch {
          setErrorMessage('Could not load clinics. Please try again.')
          setStatus('error')
        }
      },
      (err) => {
        setErrorMessage(
          err.code === 1
            ? 'Location access was denied. Please allow location access in your browser and try again.'
            : 'Could not determine your location. Please try again.'
        )
        setStatus('error')
      },
      { timeout: 10000 }
    )
  }

  function handleReset() {
    setStatus('idle')
    setCoords(null)
    setClinics([])
    setErrorMessage('')
  }

  return (
    <div className="relative glass iris-hover sheen rounded-3xl p-6 flex flex-col gap-5">
      <header className="flex items-start gap-3">
        <span className="shrink-0 grid place-items-center h-10 w-10 rounded-2xl bg-accent/10">
          <IconMapPin />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Find a Dermatologist</h2>
          <p className="text-sm text-muted mt-0.5">Locate skin clinics and dermatologists near you.</p>
        </div>
      </header>

      {/* Idle */}
      {status === 'idle' && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span aria-hidden className="text-muted/30">
            <IconMapBig />
          </span>
          <p className="text-sm text-muted max-w-xs">
            Share your location to find dermatologists and skin clinics nearby on Google Maps.
          </p>
          <button
            type="button"
            onClick={handleLocate}
            className="inline-flex items-center gap-2 bg-accent text-paper rounded-full px-5 py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <IconLocate />
            Use My Location
          </button>
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted underline underline-offset-2 hover:text-ink transition-colors"
          >
            Or search Google Maps directly ↗
          </a>
        </div>
      )}

      {/* Loading states */}
      {(status === 'locating' || status === 'loading') && (
        <div className="flex flex-col items-center gap-3 py-10">
          <div className="h-8 w-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
          <p className="text-sm text-muted">
            {status === 'locating' ? 'Getting your location…' : 'Finding nearby clinics…'}
          </p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
            {errorMessage}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleLocate}
              className="text-sm text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
            >
              Try again
            </button>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline underline-offset-2 hover:text-ink transition-colors"
            >
              Search Google Maps ↗
            </a>
          </div>
        </div>
      )}

      {/* Results */}
      {status === 'done' && coords && (
        <div className="flex flex-col gap-4">
          {/* Map embed or fallback button */}
          {embedSrc ? (
            <div className="rounded-2xl overflow-hidden border border-line" style={{ aspectRatio: '4/3' }}>
              <iframe
                src={embedSrc}
                width="100%"
                height="100%"
                className="border-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nearby dermatologists"
              />
            </div>
          ) : (
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line hover:border-accent/40 bg-sand hover:bg-white/30 transition-colors px-4 py-8 text-sm font-medium text-ink"
            >
              <IconExternalLink />
              View dermatologists near you on Google Maps ↗
            </a>
          )}

          {/* Clinic cards from Places API */}
          {clinics.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                Nearby Skin Clinics
              </p>
              <ul className="flex flex-col gap-2">
                {clinics.map((clinic) => (
                  <li
                    key={clinic.placeId}
                    className="glass-quiet rounded-xl px-4 py-3 border border-white/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink leading-snug">{clinic.name}</p>
                        <p className="text-xs text-muted mt-0.5 leading-relaxed">{clinic.address}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {clinic.rating !== undefined && (
                            <span className="text-xs text-muted">
                              ★ {clinic.rating.toFixed(1)}
                              {clinic.userRatingsTotal !== undefined && (
                                <> ({clinic.userRatingsTotal.toLocaleString()})</>
                              )}
                            </span>
                          )}
                          {clinic.openNow === true && (
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                              Open now
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps/place/?q=place_id:${clinic.placeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-xs font-medium text-accent hover:text-accent-hover underline underline-offset-2 transition-colors mt-0.5"
                      >
                        Directions ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex items-center justify-between pt-1">
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted underline underline-offset-2 hover:text-ink transition-colors"
            >
              Open full map ↗
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted hover:text-ink transition-colors underline underline-offset-2"
            >
              Search again
            </button>
          </div>

          <p className="text-xs text-muted/70 italic">
            Location is used only to find nearby clinics and is not stored anywhere.
          </p>
        </div>
      )}
    </div>
  )
}

function IconMapPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function IconMapBig() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function IconLocate() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconExternalLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

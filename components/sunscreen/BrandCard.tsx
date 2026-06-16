import { PortableText } from '@/components/portable-text'
import { CitationList } from '@/components/citation'
import type { SunscreenBrand } from '@/types'

interface BrandCardProps {
  brand: SunscreenBrand
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <article className="glass sheen relative overflow-hidden rounded-2xl p-5">
      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-ink text-lg">{brand.name}</h3>
            {brand.origin && (
              <p className="text-xs text-muted mt-0.5">{brand.origin}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.formulationType && (
              <span className="glass-quiet relative text-xs text-ink/70 px-2.5 py-0.5 rounded-full">
                {brand.formulationType}
              </span>
            )}
            {brand.availableInUS ? (
              <span className="text-xs bg-accent-soft text-accent px-2.5 py-0.5 rounded-full font-medium">
                Available in US
              </span>
            ) : (
              <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-medium">
                Import required
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Stat label="SPF" value={brand.uvbSpf ? `SPF ${brand.uvbSpf}` : '—'} />
          <Stat label="UVA rating" value={brand.uvaProtection || '—'} />
          <Stat
            label="US available"
            value={brand.availableInUS ? 'Yes' : 'No'}
            valueClass={brand.availableInUS ? 'text-accent' : 'text-amber-700'}
          />
          <Stat
            label="Import required"
            value={brand.importRequired ? 'Yes' : 'No'}
            valueClass={brand.importRequired ? 'text-amber-700' : 'text-ink'}
          />
        </div>

        {brand.uvFilters?.length ? (
          <div>
            <p className="eyebrow text-muted mb-1.5">UV Filters</p>
            <div className="flex flex-wrap gap-1.5">
              {brand.uvFilters.map((f) => (
                <span
                  key={f}
                  className="glass-quiet relative text-xs text-ink/70 px-2.5 py-0.5 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {brand.notes?.length ? (
          <div className="text-sm text-ink/80">
            <PortableText value={brand.notes as any} />
          </div>
        ) : null}

        {brand.citations?.length ? (
          <CitationList citations={brand.citations} />
        ) : null}
      </div>
    </article>
  )
}

function Stat({
  label,
  value,
  valueClass = 'text-ink',
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className={`font-medium mt-0.5 ${valueClass}`}>{value}</p>
    </div>
  )
}

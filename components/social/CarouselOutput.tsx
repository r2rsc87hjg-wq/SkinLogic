import type { CarouselSlide } from '@/types/social'

interface CarouselOutputProps {
  slides: CarouselSlide[]
}

export function CarouselOutput({ slides }: CarouselOutputProps) {
  const isCitationSlide = (slide: CarouselSlide) =>
    slide.slideNumber === slides.length

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 leading-relaxed">
        {slides.length} slides · Final slide shows citations
      </p>

      <div className="space-y-2">
        {slides.map((slide) => (
          <div
            key={slide.slideNumber}
            className={`rounded-lg border p-4 ${
              isCitationSlide(slide)
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex gap-3">
              <span className="text-xs font-mono text-gray-400 shrink-0 mt-0.5 w-5">
                {slide.slideNumber}
              </span>
              <div className="space-y-1 flex-1">
                <p className="font-semibold text-gray-900 text-sm leading-snug">
                  {slide.headline}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {slide.body}
                </p>
                {slide.citationNote && (
                  <p className="text-xs text-blue-700 mt-2 font-medium">
                    Source: {slide.citationNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

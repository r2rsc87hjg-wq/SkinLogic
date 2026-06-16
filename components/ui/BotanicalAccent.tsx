/**
 * Subtle botanical line-art sprig used as a faint nature accent. Decorative
 * only — set color/opacity via `className` (e.g. `text-accent/[0.07]`).
 */
export function BotanicalAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 240"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* main stem */}
      <path
        d="M80 236 C 78 180 86 130 78 84 C 74 56 80 30 92 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* leaf pairs, top to bottom */}
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <path d="M82 66 C 66 62 56 67 49 79 C 64 79 75 76 82 66 Z" />
        <path d="M82 66 C 98 62 108 67 115 79 C 100 79 89 76 82 66 Z" />
        <path d="M79 108 C 60 103 48 109 40 123 C 57 123 71 119 79 108 Z" />
        <path d="M79 108 C 98 103 110 109 118 123 C 101 123 87 119 79 108 Z" />
        <path d="M80 150 C 58 144 44 151 35 167 C 55 167 71 163 80 150 Z" />
        <path d="M80 150 C 102 144 116 151 125 167 C 105 167 89 163 80 150 Z" />
        <path d="M80 196 C 56 188 40 196 30 214 C 52 214 70 210 80 196 Z" />
        <path d="M80 196 C 104 188 120 196 130 214 C 108 214 90 210 80 196 Z" />
      </g>
    </svg>
  )
}

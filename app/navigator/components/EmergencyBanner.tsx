interface EmergencyBannerProps {
  visible: boolean
}

export function EmergencyBanner({ visible }: EmergencyBannerProps) {
  if (!visible) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3.5 mb-4"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0 mt-0.5 text-red-600"
      >
        <path
          d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-sm font-semibold text-red-800 leading-relaxed">
        If this is a medical emergency, call{' '}
        <a href="tel:911" className="underline underline-offset-2">
          911
        </a>{' '}
        or go to your nearest emergency room immediately.
      </p>
    </div>
  )
}

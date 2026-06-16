export function PrivacyBanner() {
  return (
    <div className="glass-quiet rounded-2xl px-5 py-4 mb-8 border border-white/50">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="flex items-start gap-3">
          <IconLock />
          <div>
            <p className="text-sm font-semibold text-ink">Your information never leaves your device.</p>
            <p className="text-sm text-muted mt-0.5">Nothing is stored on our servers. All data — appointments, medications, and uploaded files — lives only in your browser.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 sm:border-l sm:border-line sm:pl-8">
          <IconClock />
          <div>
            <p className="text-sm font-semibold text-ink">Session data clears when you close this tab.</p>
            <p className="text-sm text-muted mt-0.5">Save anything important before you leave — nothing is automatically saved between visits.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconLock() {
  return (
    <span className="mt-0.5 shrink-0 grid place-items-center h-8 w-8 rounded-full bg-accent/10">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1f5b4e" strokeWidth="1.75" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#1f5b4e" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function IconClock() {
  return (
    <span className="mt-0.5 shrink-0 grid place-items-center h-8 w-8 rounded-full bg-accent/10">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#1f5b4e" strokeWidth="1.75" />
        <path d="M12 7v5l3 3" stroke="#1f5b4e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

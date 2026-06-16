export function MedicalDisclaimer() {
  return (
    <div className="sticky bottom-0 z-10 mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="glass-quiet border-t border-white/60 px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-xs text-center text-muted max-w-3xl mx-auto leading-relaxed">
          <strong className="text-ink font-semibold">Informational purposes only.</strong>{' '}
          This tool is not medical advice and is not a substitute for professional medical care.
          Always consult your doctor or a licensed healthcare provider before making any medical decisions.
        </p>
      </div>
    </div>
  )
}

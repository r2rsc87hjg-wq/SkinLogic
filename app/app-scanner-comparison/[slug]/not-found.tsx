import Link from 'next/link'

export default function ScannerNotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        App not found
      </h1>
      <p className="text-gray-600 mb-6">
        That app or scanner isn't in our database yet.
      </p>
      <Link
        href="/app-scanner-comparison"
        className="text-sm font-medium underline underline-offset-2 text-gray-900 hover:text-gray-600"
      >
        ← Back to the comparison
      </Link>
    </main>
  )
}

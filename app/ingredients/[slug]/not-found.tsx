import Link from 'next/link'

export default function IngredientNotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Ingredient not found
      </h1>
      <p className="text-gray-600 mb-6">
        That ingredient isn't in our library yet.
      </p>
      <Link
        href="/ingredients"
        className="text-sm font-medium underline underline-offset-2 text-gray-900 hover:text-gray-600"
      >
        ← Back to the ingredient library
      </Link>
    </main>
  )
}

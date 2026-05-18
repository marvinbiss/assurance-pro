/**
 * Loading state contextuel /devis — skeleton form 3 étapes premium.
 * Évite layout shift + signale chargement progressif (Web Vitals INP).
 */

export default function DevisLoading() {
  return (
    <div className="min-h-screen bg-sand-50 py-16">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Hero skeleton */}
        <div className="mb-10 space-y-4 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-sand-200" />
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-lg bg-sand-200" />
          <div className="mx-auto h-5 w-2/3 animate-pulse rounded-md bg-sand-100" />
        </div>

        {/* Stepper skeleton */}
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-2">
              <div className="h-2 w-full animate-pulse rounded-full bg-sand-200" />
              {i < 3 && <div className="h-2 w-2 rounded-full bg-sand-300" />}
            </div>
          ))}
        </div>

        {/* Form fields skeleton */}
        <div className="space-y-6 rounded-2xl border border-sand-200 bg-white p-8 shadow-soft">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-sand-200" />
              <div className="h-12 animate-pulse rounded-lg bg-sand-100" />
            </div>
          ))}
          <div className="mt-8 h-12 animate-pulse rounded-xl bg-primary-200" />
        </div>
      </div>
    </div>
  )
}

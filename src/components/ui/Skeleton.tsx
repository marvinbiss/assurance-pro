import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-shimmer animate-pulse rounded-md bg-sand-200 dark:bg-charcoal-800',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Chargement" className="container mx-auto max-w-5xl px-4 py-12">
      <Skeleton className="mb-4 h-10 w-2/3" />
      <Skeleton className="mb-8 h-4 w-1/2" />
      <div className="space-y-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <span className="sr-only">Chargement en cours…</span>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement carte"
      className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft dark:border-charcoal-800 dark:bg-charcoal-950"
    >
      <Skeleton className="mb-4 h-5 w-3/4" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="mb-2 h-3 w-5/6" />
      <Skeleton className="mb-4 h-3 w-4/6" />
      <Skeleton className="h-8 w-32 rounded-full" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Chargement de la liste"
      className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Chargement de {count} éléments…</span>
    </div>
  )
}

export function ArticleSkeleton() {
  return (
    <article
      role="status"
      aria-label="Chargement de l'article"
      className="container mx-auto max-w-3xl px-4 py-12"
    >
      <Skeleton className="mb-3 h-4 w-32 rounded-full" />
      <Skeleton className="mb-4 h-12 w-full" />
      <Skeleton className="mb-2 h-12 w-4/5" />
      <Skeleton className="mb-8 h-4 w-2/3" />
      <Skeleton className="mb-8 aspect-video w-full rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10/12" />
      </div>
      <Skeleton className="mt-8 h-32 w-full rounded-2xl" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-9/12" />
      </div>
      <span className="sr-only">Chargement de l&apos;article…</span>
    </article>
  )
}

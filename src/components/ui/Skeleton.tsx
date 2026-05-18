import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/**
 * Composant primitif de chargement.
 * Animation pulse Tailwind, hauteur/largeur via className.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-sand-200', className)} aria-hidden="true" />
  )
}

/**
 * Skeleton plein-page utilisé par les `loading.tsx` Next.js.
 * Affiche un faux header + 3 blocs de contenu.
 */
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { WifiOff, Home, BookOpen, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hors ligne — Vivos Assurance',
  description:
    'Vous êtes actuellement hors ligne. Reconnectez-vous pour accéder à toutes les ressources Vivos Assurance.',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <div className="container mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-100 text-secondary-700">
          <WifiOff className="h-8 w-8" strokeWidth={2.2} />
        </span>

        <h1 className="mb-3 font-heading text-3xl font-extrabold tracking-tight text-charcoal-900 md:text-4xl">
          Vous êtes hors ligne
        </h1>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-charcoal-600 md:text-lg">
          Cette page ou les ressources demandées ne sont pas disponibles dans votre cache.
          Reconnectez-vous à Internet pour accéder à l&apos;ensemble du site Vivos Assurance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-extrabold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-700"
          >
            <Home className="h-4 w-4" strokeWidth={2.4} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-5 py-3 text-sm font-bold text-charcoal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700"
          >
            <BookOpen className="h-4 w-4" strokeWidth={2.4} />
            Voir le blog
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-charcoal-100 bg-white p-5 text-sm text-charcoal-600 shadow-soft">
          <h2 className="mb-2 font-heading text-base font-extrabold text-charcoal-900">
            Pages disponibles hors ligne
          </h2>
          <p className="text-xs leading-relaxed">
            Les pages que vous avez déjà visitées récemment sont en cache et accessibles même sans
            connexion. Réessayez la page précédente ou parcourez votre historique.
          </p>
        </div>

        <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-charcoal-500">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.4} />
          Besoin d&apos;aide ? Rappelez-vous au 01 82 88 51 27 (sans connexion Internet)
        </p>
      </div>
    </main>
  )
}

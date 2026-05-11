import type { Metadata } from 'next'
import Link from 'next/link'
import { ReclamationForm } from '@/components/forms/ReclamationForm'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Déposer une réclamation | Assurance Pro',
  description:
    'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
  alternates: { canonical: `${SITE_URL}/reclamation` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Déposer une réclamation | Assurance Pro',
    description:
      'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
    url: `${SITE_URL}/reclamation`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déposer une réclamation | Assurance Pro',
    description:
      'Procédure de réclamation conforme à la Recommandation ACPR 2024-R-02. Formulaire en ligne, accusé réception sous 10 jours ouvrés, réponse sous 2 mois.',
  },
}

export default function ReclamationPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-8">
          <nav aria-label="Fil d'Ariane" className="mb-3 text-sm text-gray-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            › <span className="text-gray-900">Déposer une réclamation</span>
          </nav>
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Déposer une réclamation</h1>
          <p className="text-lg text-gray-700">
            Vous avez un différend avec notre cabinet ou avec un produit que nous avons
            distribué&nbsp;? Nous traitons votre réclamation dans le respect de la{' '}
            <strong>Recommandation ACPR 2024-R-02</strong>.
          </p>
        </header>

        <section className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-2 text-lg font-bold">Engagements de notre cabinet</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-blue-900">
            <li>
              <strong>Accusé de réception</strong> sous <strong>10 jours ouvrés</strong> à compter
              de la réception
            </li>
            <li>
              <strong>Réponse sur le fond</strong> sous <strong>2 mois maximum</strong>
            </li>
            <li>
              Tenue d&apos;un <strong>registre des réclamations</strong> conforme ACPR
            </li>
            <li>
              Information sur la possibilité de saisir le{' '}
              <strong>Médiateur de l&apos;Assurance</strong>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold">Comment procéder ?</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>
              <strong>1ère étape — interne</strong> : remplissez le formulaire ci-dessous ou écrivez
              à{' '}
              <a
                href="mailto:reclamations@vivos-assurance.fr"
                className="text-blue-700 hover:underline"
              >
                reclamations@vivos-assurance.fr
              </a>
              .
            </li>
            <li>
              <strong>2e étape — médiation</strong> : si la réponse interne ne vous satisfait pas,
              vous pouvez saisir gratuitement le Médiateur de l&apos;Assurance.{' '}
              <a href="/mediation" className="text-blue-700 hover:underline">
                Procédure détaillée
              </a>
              .
            </li>
            <li>
              <strong>3e étape — recours juridictionnel</strong> : à tout moment, vous conservez la
              possibilité de saisir les tribunaux compétents.
            </li>
          </ol>
        </section>

        <ReclamationForm />

        <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="mb-2 text-base font-bold">Adresse postale</h2>
          <p className="text-sm text-gray-700">
            Si vous préférez écrire par courrier&nbsp;:
            <br />
            Service Réclamations — Assurance Pro
            <br />
            {process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? 'XX rue de la Paix, 75000 Paris'}
          </p>
        </section>
      </div>
    </main>
  )
}

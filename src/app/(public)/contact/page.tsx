import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Contact — Cabinet de courtage ORIAS | Assurance Pro',
  description:
    'Contactez notre cabinet de courtage ORIAS. Conseil personnalisé, devis gratuit, gestion sinistres. Réponse sous 24h ouvrées.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact — Cabinet de courtage ORIAS | Assurance Pro',
    description:
      'Contactez notre cabinet de courtage ORIAS. Conseil personnalisé, devis gratuit, gestion sinistres. Réponse sous 24h ouvrées.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Cabinet de courtage ORIAS | Assurance Pro',
    description:
      'Contactez notre cabinet de courtage ORIAS. Conseil personnalisé, devis gratuit, gestion sinistres. Réponse sous 24h ouvrées.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Nous contacter</h1>
          <p className="text-lg text-gray-600">
            Cabinet de courtage ORIAS — Conseil personnalisé, gestion contrats, sinistres et
            réclamations
          </p>
        </header>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl" aria-hidden="true">
              💼
            </div>
            <h2 className="mb-2 font-semibold">Demande de devis</h2>
            <p className="mb-4 text-sm text-gray-600">
              Recevez vos devis personnalisés sur 10 assureurs en 24&nbsp;heures.
            </p>
            <Link
              href="/devis"
              className="inline-block w-full rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Devis gratuit →
            </Link>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl" aria-hidden="true">
              📧
            </div>
            <h2 className="mb-2 font-semibold">Email général</h2>
            <p className="mb-4 text-sm text-gray-600">
              Pour toute question sur nos services, conseil produit, partenariat.
            </p>
            <a
              href="mailto:contact@vivos-assurance.fr"
              className="inline-block w-full rounded border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
            >
              contact@vivos-assurance.fr
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl" aria-hidden="true">
              📞
            </div>
            <h2 className="mb-2 font-semibold">Téléphone</h2>
            <p className="mb-4 text-sm text-gray-600">
              Lundi-vendredi 9h-19h. Conseiller ORIAS dédié.
            </p>
            <a
              href="tel:+33186652485"
              className="inline-block w-full rounded border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
            >
              01 86 65 24 85
            </a>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Réclamations</h2>
          <p className="mb-3 text-gray-700">
            Pour toute réclamation, vous pouvez nous écrire à&nbsp;:
          </p>
          <p className="mb-3">
            <a
              href="mailto:reclamations@vivos-assurance.fr"
              className="font-semibold text-blue-700 underline"
            >
              reclamations@vivos-assurance.fr
            </a>
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Conformément à la <strong>Recommandation ACPR 2024-R-02</strong>, nous nous engageons
            à&nbsp;:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-sm text-gray-700">
            <li>
              Vous accuser réception sous <strong>10 jours ouvrés</strong>
            </li>
            <li>
              Vous répondre sur le fond sous <strong>2 mois maximum</strong>
            </li>
            <li>Vous tenir informé(e) à chaque étape</li>
          </ul>
          <p className="text-sm text-gray-600">
            En cas de désaccord persistant, vous pouvez saisir le{' '}
            <a
              href="https://www.mediation-assurance.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              Médiateur de l&apos;Assurance
            </a>{' '}
            (TSA 50110, 75441 Paris cedex 09).
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Vos données personnelles</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Conformément au RGPD, les données personnelles que vous nous transmettez sont traitées
            par notre cabinet en sa qualité de responsable de traitement, aux fins de répondre à
            votre demande et de vous présenter une offre d&apos;assurance adaptée. Durée de
            conservation&nbsp;: 3&nbsp;ans à compter du dernier contact en l&apos;absence de
            souscription.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            Pour exercer vos droits (accès, rectification, effacement, opposition, portabilité,
            retrait du consentement)&nbsp;:{' '}
            <a href="mailto:dpo@vivos-assurance.fr" className="text-blue-700 underline">
              dpo@vivos-assurance.fr
            </a>
            . Vous pouvez également adresser une réclamation à la CNIL.
          </p>
        </div>
      </div>
    </main>
  )
}

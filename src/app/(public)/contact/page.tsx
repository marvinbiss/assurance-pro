import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Contact — Cabinet de courtage ORIAS | Assurance Pro',
  description:
    'Contactez notre cabinet de courtage ORIAS. Conseil personnalisé, devis gratuit, gestion sinistres. Réponse sous 24h ouvrées.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Nous contacter</h1>
          <p className="text-gray-600 text-lg">
            Cabinet de courtage ORIAS — Conseil personnalisé, gestion contrats, sinistres et réclamations
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">💼</div>
            <h2 className="font-semibold mb-2">Demande de devis</h2>
            <p className="text-sm text-gray-600 mb-4">
              Recevez vos devis personnalisés sur 10 assureurs en 24&nbsp;heures.
            </p>
            <Link
              href="/devis"
              className="inline-block w-full px-4 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800"
            >
              Devis gratuit →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">📧</div>
            <h2 className="font-semibold mb-2">Email général</h2>
            <p className="text-sm text-gray-600 mb-4">
              Pour toute question sur nos services, conseil produit, partenariat.
            </p>
            <a
              href="mailto:contact@assurance-pro.fr"
              className="inline-block w-full px-4 py-2 border border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-50"
            >
              contact@assurance-pro.fr
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">📞</div>
            <h2 className="font-semibold mb-2">Téléphone</h2>
            <p className="text-sm text-gray-600 mb-4">
              Lundi-vendredi 9h-19h. Conseiller ORIAS dédié.
            </p>
            <a
              href="tel:+33186652485"
              className="inline-block w-full px-4 py-2 border border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-50"
            >
              01 86 65 24 85
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-10">
          <h2 className="text-xl font-bold mb-4">Réclamations</h2>
          <p className="text-gray-700 mb-3">
            Pour toute réclamation, vous pouvez nous écrire à&nbsp;:
          </p>
          <p className="mb-3">
            <a href="mailto:reclamations@assurance-pro.fr" className="text-blue-700 underline font-semibold">
              reclamations@assurance-pro.fr
            </a>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Conformément à la <strong>Recommandation ACPR 2024-R-02</strong>, nous nous engageons à&nbsp;:
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mb-4">
            <li>Vous accuser réception sous <strong>10 jours ouvrés</strong></li>
            <li>Vous répondre sur le fond sous <strong>2 mois maximum</strong></li>
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold mb-4">Vos données personnelles</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Conformément au RGPD, les données personnelles que vous nous transmettez sont traitées par notre
            cabinet en sa qualité de responsable de traitement, aux fins de répondre à votre demande et de
            vous présenter une offre d&apos;assurance adaptée. Durée de conservation&nbsp;: 3&nbsp;ans à compter du
            dernier contact en l&apos;absence de souscription.
          </p>
          <p className="text-sm text-gray-700 mt-3">
            Pour exercer vos droits (accès, rectification, effacement, opposition, portabilité, retrait du
            consentement)&nbsp;:{' '}
            <a href="mailto:dpo@assurance-pro.fr" className="text-blue-700 underline">
              dpo@assurance-pro.fr
            </a>
            . Vous pouvez également adresser une réclamation à la CNIL.
          </p>
        </div>
      </div>
    </main>
  )
}

/**
 * Outil — Modèle attestation RC Pro (générateur PDF gratuit)
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "attestation rc pro"             → 350 vol, KD 3, CPC 350€ ⭐
 * - "attestation responsabilité civile professionnelle" → 350 vol, KD 3, CPC 450€
 * - "attestation rc pro vtc"         → 100 vol, KD 1
 * - "attestation rc pro auto-entrepreneur" → 50 vol, KD 9, CPC 250€
 * - Famille cumulée : ~920 vol/mois
 *
 * Stratégie : 2e outil PDF de la série utilitaires (après attestation décennale).
 * Réutilise l'infra @react-pdf/renderer + pattern dynamic import SSR-safe.
 *
 * Concurrent benchmark :
 * - assurup.com/.../responsabilite-civile-pro → 456 vis/mois (PAS de PDF)
 * → AUCUN concurrent ne propose de générateur PDF — opportunité.
 */

import type { Metadata } from 'next'
import { AttestationRcProForm } from '@/components/outils/AttestationRcProForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/modele-attestation-rc-pro'

export const metadata: Metadata = {
  title: 'Modèle attestation RC Pro PDF — Générateur gratuit 2026 | Assurance Pro',
  description:
    "Générez votre modèle d'attestation RC Pro au format PDF en 2 minutes. Conforme arrêté du 23 janvier 2024 (mentions obligatoires). Téléchargement immédiat, gratuit, sans inscription. Bonus : devis RC Pro ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle attestation RC Pro PDF — Générateur gratuit 2026',
    description: "Générateur PDF d'attestation RC Pro conforme arrêté 23 janvier 2024. 100% gratuit, sans inscription.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/guides/attestation-rc-pro" className="hover:underline">Guide attestation RC Pro</a>{' '}/{' '}
            <span>Modèle PDF</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 100% gratuit, sans inscription
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Modèle attestation RC Pro PDF
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Générez votre modèle d&apos;attestation RC Pro au format PDF en 2 minutes.
            Conforme à l&apos;<strong>arrêté du 23 janvier 2024</strong> (mentions obligatoires).
            Indispensable pour s&apos;inscrire sur les plateformes B2B (Malt, Crème de la Crème, ComeUp Pro).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📄 Format PDF</strong><br />Téléchargement direct</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Arrêté 2024</strong><br />Mentions obligatoires</div>
            <div className="bg-white/10 rounded p-3"><strong>🔒 100% privé</strong><br />Aucune donnée envoyée</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />Sans inscription</div>
          </div>
        </div>
      </header>

      {/* GENERATEUR PDF */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez vos informations</h2>
          <p className="text-gray-600 mb-6">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>. Conformité RGPD totale.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <AttestationRcProForm />
          </div>
        </div>
      </section>

      {/* AVERTISSEMENT */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Modèle pédagogique uniquement</h2>
          <p className="text-sm">
            Ce générateur produit un <strong>MODÈLE PÉDAGOGIQUE</strong> conforme aux mentions
            obligatoires de l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation
            d&apos;assurance valable juridiquement — seule une attestation émise et signée par votre
            assureur réel a une valeur opposable. Pour obtenir une attestation conforme :
            <a href="/outils/devis-rc-pro" className="font-semibold text-blue-700 underline ml-1">
              souscrivez votre RC Pro ORIAS sous 24h →
            </a>
          </p>
        </div>
      </section>

      {/* PLATEFORMES B2B EXIGENT L'ATTESTATION */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Pourquoi vous avez besoin d&apos;une attestation RC Pro</h2>
          <p className="text-sm text-gray-700 mb-4">
            <strong>78% des plateformes B2B</strong> exigent une attestation RC Pro à
            l&apos;inscription d&apos;un freelance ou indépendant :
          </p>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            <li>✓ <strong>Malt</strong> (validation profil pro, missions corporate)</li>
            <li>✓ <strong>Crème de la Crème</strong> (top 5% freelances)</li>
            <li>✓ <strong>ComeUp Pro</strong> (services aux entreprises)</li>
            <li>✓ <strong>Upwork France</strong> (validation profil pro)</li>
            <li>✓ <strong>Fiverr Pro</strong> (services premium)</li>
            <li>✓ <strong>Hunteed</strong> (recrutement freelance)</li>
            <li>✓ <strong>Talent.io</strong> (tech freelance)</li>
            <li>✓ <strong>Codeur.com</strong> (dev/design)</li>
          </ul>
          <p className="mt-4 text-sm">
            Pour comprendre les 8 mentions obligatoires en détail :
            <a href="/guides/attestation-rc-pro" className="text-blue-600 underline ml-1">
              guide complet attestation RC Pro →
            </a>
          </p>
        </div>
      </section>

      {/* CTA souscription */}
      <section className="py-12 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Besoin d&apos;une vraie attestation ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            de nos 8 assureurs partenaires. Tarifs RC Pro à partir de <strong>89 €/an</strong>.
            Attestation conforme arrêté 23 janvier 2024 téléchargeable dans les 24h suivant la souscription.
          </p>
          <a
            href="/outils/devis-rc-pro"
            className="inline-block bg-white text-purple-700 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            → Devis RC Pro gratuit (2 min)
          </a>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle attestation RC Pro PDF — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de modèle d'attestation RC Pro au format PDF. Conforme arrêté 23 janvier 2024.",
          }),
        }}
      />
    </main>
  )
}

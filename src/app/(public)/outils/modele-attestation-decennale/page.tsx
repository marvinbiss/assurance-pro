/**
 * Outil — Modèle attestation décennale (générateur PDF gratuit)
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe) :
 * - "attestation décennale"          → 600 vol, KD 1, CPC 300€ ⭐
 * - "attestation décennale pdf"      → 200 vol, KD 0, CPC 250€ ⭐ (intent download)
 * - "attestation assurance décennale" → 200 vol, KD 0, CPC 300€
 * - "attestation décennale standard" →  60 vol, KD 1, CPC 170€
 * - "modèle attestation décennale"   →  20 vol, CPC 120€
 * - "attestation décennale entreprise" → 20 vol
 * - "attestation décennale rapide"   →  20 vol (intent commercial)
 * - Famille cumulée : ~1 800 vol/mois
 *
 * Stratégie : OUTIL UTILITAIRE TÉLÉCHARGEABLE — pattern coover.fr (14 792 vis/mois
 * sur /outils/modele-facture). Pages d'outils = magnets de backlinks naturels +
 * trafic organique massif sur intent commercial fort.
 *
 * Génération PDF 100% client-side via @react-pdf/renderer (pas de backend, pas de
 * RGPD à gérer car aucune donnée n'est envoyée au serveur).
 *
 * Concurrent benchmark :
 * - assurup.com/blog/articles/attestation-assurance-decennale → 175 vis/mois (pas de PDF)
 * - pro.april.fr/guide/tout-comprendre-attestation-decennale → 156 vis/mois (pas de PDF)
 * → AUCUN concurrent ne propose de générateur PDF — opportunité massive.
 */

import type { Metadata } from 'next'
import { AttestationDecennaleForm } from '@/components/outils/AttestationDecennaleForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/modele-attestation-decennale'

export const metadata: Metadata = {
  title: 'Modèle attestation décennale PDF — Générateur gratuit 2026 | Assurance Pro',
  description:
    "Générez votre modèle d'attestation décennale au format PDF en 2 minutes. Conforme arrêté du 23 janvier 2024 (11 mentions obligatoires). Téléchargement immédiat, gratuit, sans inscription. Bonus : devis décennale ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle attestation décennale PDF — Générateur gratuit 2026',
    description: "Générez votre modèle d'attestation décennale PDF en 2 min. Conforme arrêté 23 janvier 2024.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/guides/attestation-decennale" className="hover:underline">Guide attestation</a>{' '}/{' '}
            <span>Modèle PDF</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 100% gratuit, sans inscription
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Modèle attestation décennale PDF
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Générez votre modèle d&apos;attestation décennale au format PDF en 2 minutes.
            Conforme à l&apos;<strong>arrêté du 23 janvier 2024</strong> (11 mentions obligatoires).
            Téléchargement immédiat, gratuit, sans inscription.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📄 Format PDF</strong><br />Téléchargement direct</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Arrêté 2024</strong><br />11 mentions obligatoires</div>
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
            <AttestationDecennaleForm />
          </div>
        </div>
      </section>

      {/* AVERTISSEMENT IMPORTANT */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Important : modèle pédagogique uniquement</h2>
          <p className="text-sm">
            Ce générateur produit un <strong>MODÈLE PÉDAGOGIQUE</strong> conforme aux 11 mentions
            obligatoires de l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation
            d&apos;assurance valable juridiquement — seule une attestation émise et signée par votre
            assureur réel a une valeur opposable aux tiers (clients, maîtres d&apos;ouvrage,
            administration). Pour obtenir une attestation conforme et opposable :
            <a href="/outils/devis-assurance-decennale" className="font-semibold text-blue-700 underline ml-1">
              souscrivez une décennale ORIAS sous 24h →
            </a>
          </p>
        </div>
      </section>

      {/* RAPPEL 11 MENTIONS OBLIGATOIRES */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Les 11 mentions obligatoires d&apos;une attestation conforme</h2>
          <p className="text-sm text-gray-700 mb-4">
            Imposées par l&apos;<strong>arrêté du 23 janvier 2024</strong> (en vigueur depuis le 1er
            juillet 2024). Toute attestation qui omet UNE seule mention peut être considérée comme
            non-conforme.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li><strong>Identification de l&apos;assureur</strong> (raison sociale, SIREN, agrément ACPR)</li>
            <li><strong>Identification de l&apos;assuré</strong> (raison sociale, SIRET, adresse, statut juridique)</li>
            <li><strong>Numéro de police</strong> + date d&apos;émission</li>
            <li><strong>Période de validité</strong> précise (début + fin, jamais « contrat en cours »)</li>
            <li><strong>Activités professionnelles couvertes</strong> (codes NAF, nomenclature FFB/CAPEB)</li>
            <li><strong>Zone géographique de couverture</strong> (France métropolitaine, DOM, UE, monde)</li>
            <li><strong>Garanties souscrites</strong> avec plafonds et franchises</li>
            <li><strong>Référence Loi Spinetta</strong> (art. L. 241-1 C. assur.)</li>
            <li><strong>Mention de l&apos;intermédiaire</strong> (le cas échéant) : courtier ORIAS, n° immatriculation, lien orias.fr cliquable</li>
            <li><strong>Modalités de réclamation</strong> + médiateur de l&apos;assurance (Reco ACPR 2024-R-02)</li>
            <li><strong>Date d&apos;établissement</strong> + signature/cachet de l&apos;assureur</li>
          </ol>
          <p className="mt-4 text-sm">
            Pour comprendre chaque mention en détail :
            <a href="/guides/attestation-decennale" className="text-blue-600 underline ml-1">
              guide complet attestation décennale →
            </a>
          </p>
        </div>
      </section>

      {/* CTA souscription */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Besoin d&apos;une vraie attestation ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            de nos 8 assureurs partenaires BTP. Tarifs négociés à partir de <strong>480 €/an</strong>.
            Attestation conforme arrêté 23 janvier 2024 téléchargeable dans les 24h suivant la souscription.
          </p>
          <a
            href="/outils/devis-assurance-decennale"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            → Devis décennale gratuit (2 min)
          </a>
        </div>
      </section>

      {/* JSON-LD WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle attestation décennale PDF — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              "Générateur gratuit de modèle d'attestation décennale au format PDF. Conforme arrêté 23 janvier 2024 (11 mentions obligatoires). 100% client-side, RGPD compliant.",
            featureList: [
              '11 mentions obligatoires arrêté 23 janvier 2024',
              'Génération PDF côté navigateur (RGPD compliant)',
              'Téléchargement immédiat sans inscription',
              'Conforme Loi Spinetta art. L. 241-1 C. assur.',
            ],
          }),
        }}
      />
    </main>
  )
}

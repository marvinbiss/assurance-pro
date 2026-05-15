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
import Link from 'next/link'
import { AttestationDecennaleForm } from '@/components/outils/AttestationDecennaleForm'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/modele-attestation-decennale'

export const metadata: Metadata = {
  title: 'Modèle attestation décennale PDF — Générateur gratuit 2026',
  description:
    "Générez votre modèle d'attestation décennale au format PDF en 2 minutes. Conforme arrêté du 23 janvier 2024 (11 mentions obligatoires). Téléchargement immédiat, gratuit, sans inscription. Bonus : devis décennale ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle attestation décennale PDF — Générateur gratuit 2026',
    description:
      "Générez votre modèle d'attestation décennale PDF en 2 min. Conforme arrêté 23 janvier 2024.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-charcoal-900 via-primary-700 to-primary-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/guides/attestation-decennale" className="hover:underline">
              Guide attestation
            </Link>{' '}
            / <span>Modèle PDF</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ 100% gratuit, sans inscription
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Modèle attestation décennale PDF
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Générez votre modèle d&apos;attestation décennale au format PDF en 2 minutes. Conforme à
            l&apos;<strong>arrêté du 23 janvier 2024</strong> (11 mentions obligatoires).
            Téléchargement immédiat, gratuit, sans inscription.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>📄 Format PDF</strong>
              <br />
              Téléchargement direct
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>⚖️ Arrêté 2024</strong>
              <br />
              11 mentions obligatoires
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🔒 100% privé</strong>
              <br />
              Aucune donnée envoyée
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              Sans inscription
            </div>
          </div>
        </div>
      </header>

      {/* GENERATEUR PDF */}
      <section className="py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez vos informations</h2>
          <p className="mb-6 text-gray-600">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>. Conformité RGPD
            totale.
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <AttestationDecennaleForm />
          </div>
        </div>
      </section>

      {/* AVERTISSEMENT IMPORTANT */}
      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Important : modèle pédagogique uniquement
          </h2>
          <p className="text-sm">
            Ce générateur produit un <strong>MODÈLE PÉDAGOGIQUE</strong> conforme aux 11 mentions
            obligatoires de l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation
            d&apos;assurance valable juridiquement — seule une attestation émise et signée par votre
            assureur réel a une valeur opposable aux tiers (clients, maîtres d&apos;ouvrage,
            administration). Pour obtenir une attestation conforme et opposable :
            <Link
              href="/outils/devis-assurance-decennale"
              className="ml-1 font-semibold text-primary-700 underline"
            >
              souscrivez une décennale ORIAS sous 24h →
            </Link>
          </p>
        </div>
      </section>

      {/* RAPPEL 11 MENTIONS OBLIGATOIRES */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Les 11 mentions obligatoires d&apos;une attestation conforme
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Imposées par l&apos;<strong>arrêté du 23 janvier 2024</strong> (en vigueur depuis le 1er
            juillet 2024). Toute attestation qui omet UNE seule mention peut être considérée comme
            non-conforme.
          </p>
          <ol className="list-decimal space-y-2 pl-6 text-sm">
            <li>
              <strong>Identification de l&apos;assureur</strong> (raison sociale, SIREN, agrément
              ACPR)
            </li>
            <li>
              <strong>Identification de l&apos;assuré</strong> (raison sociale, SIRET, adresse,
              statut juridique)
            </li>
            <li>
              <strong>Numéro de police</strong> + date d&apos;émission
            </li>
            <li>
              <strong>Période de validité</strong> précise (début + fin, jamais « contrat en cours
              »)
            </li>
            <li>
              <strong>Activités professionnelles couvertes</strong> (codes NAF, nomenclature
              FFB/CAPEB)
            </li>
            <li>
              <strong>Zone géographique de couverture</strong> (France métropolitaine, DOM, UE,
              monde)
            </li>
            <li>
              <strong>Garanties souscrites</strong> avec plafonds et franchises
            </li>
            <li>
              <strong>Référence Loi Spinetta</strong> (art. L. 241-1 C. assur.)
            </li>
            <li>
              <strong>Mention de l&apos;intermédiaire</strong> (le cas échéant) : courtier ORIAS, n°
              immatriculation, lien orias.fr cliquable
            </li>
            <li>
              <strong>Modalités de réclamation</strong> + médiateur de l&apos;assurance (Reco ACPR
              2024-R-02)
            </li>
            <li>
              <strong>Date d&apos;établissement</strong> + signature/cachet de l&apos;assureur
            </li>
          </ol>
          <p className="mt-4 text-sm">
            Pour comprendre chaque mention en détail :
            <Link href="/guides/attestation-decennale" className="ml-1 text-primary-600 underline">
              guide complet attestation décennale →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA souscription */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Besoin d&apos;une vraie attestation ?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            de nos 8 assureurs partenaires BTP. Tarifs négociés à partir de{' '}
            <strong>480 €/an</strong>. Attestation conforme arrêté 23 janvier 2024 téléchargeable
            dans les 24h suivant la souscription.
          </p>
          <Link
            href="/outils/devis-assurance-decennale"
            className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-primary-700 shadow-lg transition hover:bg-gray-100"
          >
            → Devis décennale gratuit (2 min)
          </Link>
        </div>
      </section>

      {/* JSON-LD WebApplication */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle attestation décennale PDF — Vivos Assurance',
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
          },
          nonce
        )}
      />
    </main>
  )
}

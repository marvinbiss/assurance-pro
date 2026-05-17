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
import Link from 'next/link'
import { AttestationRcProForm } from '@/components/outils/AttestationRcProForm'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / modele-attestation-rc-pro'

export const metadata: Metadata = {
  title: 'Modèle attestation RC Pro PDF — Générateur gratuit 2026',
  description:
    "Générez votre modèle d'attestation RC Pro au format PDF en 2 minutes. Conforme arrêté du 23 janvier 2024 (mentions obligatoires). Téléchargement immédiat, gratuit, sans inscription. Bonus : devis RC Pro ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle attestation RC Pro PDF — Générateur gratuit 2026',
    description:
      "Générateur PDF d'attestation RC Pro conforme arrêté 23 janvier 2024. 100% gratuit, sans inscription.",
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
            ›{' '}
            <Link href="/guides/attestation-rc-pro" className="hover:underline">
              Guide attestation RC Pro
            </Link>{' '}
            › <span>Modèle PDF</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ 100% gratuit, sans inscription
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Modèle attestation RC Pro PDF
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Générez votre modèle d&apos;attestation RC Pro au format PDF en 2 minutes. Conforme à
            l&apos;<strong>arrêté du 23 janvier 2024</strong> (mentions obligatoires). Indispensable
            pour s&apos;inscrire sur les plateformes B2B (Malt, Crème de la Crème, ComeUp Pro).
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
              Mentions obligatoires
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
            <AttestationRcProForm />
          </div>
        </div>
      </section>

      {/* AVERTISSEMENT */}
      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Modèle pédagogique uniquement
          </h2>
          <p className="text-sm">
            Ce générateur produit un <strong>MODÈLE PÉDAGOGIQUE</strong> conforme aux mentions
            obligatoires de l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation
            d&apos;assurance valable juridiquement — seule une attestation émise et signée par votre
            assureur réel a une valeur opposable. Pour obtenir une attestation conforme :
            <Link
              href="/outils/devis-rc-pro"
              className="ml-1 font-semibold text-primary-700 underline"
            >
              souscrivez votre RC Pro ORIAS sous 24h →
            </Link>
          </p>
        </div>
      </section>

      {/* PLATEFORMES B2B EXIGENT L'ATTESTATION */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Pourquoi vous avez besoin d&apos;une attestation RC Pro
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            <strong>78% des plateformes B2B</strong> exigent une attestation RC Pro à
            l&apos;inscription d&apos;un freelance ou indépendant :
          </p>
          <ul className="grid gap-2 text-sm md:grid-cols-2">
            <li>
              ✓ <strong>Malt</strong> (validation profil pro, missions corporate)
            </li>
            <li>
              ✓ <strong>Crème de la Crème</strong> (top 5% freelances)
            </li>
            <li>
              ✓ <strong>ComeUp Pro</strong> (services aux entreprises)
            </li>
            <li>
              ✓ <strong>Upwork France</strong> (validation profil pro)
            </li>
            <li>
              ✓ <strong>Fiverr Pro</strong> (services premium)
            </li>
            <li>
              ✓ <strong>Hunteed</strong> (recrutement freelance)
            </li>
            <li>
              ✓ <strong>Talent.io</strong> (tech freelance)
            </li>
            <li>
              ✓ <strong>Codeur.com</strong> (dev ou design)
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Pour comprendre les 8 mentions obligatoires en détail :
            <Link href="/guides/attestation-rc-pro" className="ml-1 text-primary-600 underline">
              guide complet attestation RC Pro →
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
            de nos 8 assureurs partenaires. Tarifs RC Pro à partir de <strong>89 € par an</strong>.
            Attestation conforme arrêté 23 janvier 2024 téléchargeable dans les 24h suivant la
            souscription.
          </p>
          <Link
            href="/outils/devis-rc-pro"
            className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-purple-700 shadow-lg transition hover:bg-gray-100"
          >
            → Devis RC Pro gratuit (2 min)
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle attestation RC Pro PDF — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de modèle d'attestation RC Pro au format PDF. Conforme arrêté 23 janvier 2024.",
          },
          nonce
        )}
      />
    </main>
  )
}

/**
 * Outil — Modèle facture pro (générateur PDF gratuit)
 *
 * KW Ahrefs cibles : famille "facture en ligne" / "modèle facture" / "facture auto entrepreneur"
 * Concurrent benchmark : coover.fr/outils/modele-facture = 14 792 vis/mois ⭐⭐⭐⭐⭐
 * (PAGE #1 du marché entier des outils utilitaires assurance pro France)
 *
 * Stratégie : réplique du pattern coover #1. Conformité art. L. 441-9 C. com. +
 * arrêté 22/03/2017 (mentions légales obligatoires). Mention assurance pro
 * incluse (décret 2024 BTP/santé/transport).
 *
 * Génération 100% client-side via @react-pdf/renderer (RGPD compliant total).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FactureForm } from '@/components/outils/FactureForm'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / modele-facture-pro'

export const metadata: Metadata = {
  title: 'Modèle facture pro PDF — Générateur gratuit auto-entrepreneur 2026',
  description:
    'Générez votre facture professionnelle au format PDF en 2 minutes. Conforme art. L. 441-9 C. com. (mentions légales obligatoires) + mention assurance pro (décret 2024). Auto-entrepreneur, EI, EURL, SARL, SASU. Téléchargement immédiat, gratuit, sans inscription.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle facture pro PDF — Générateur gratuit 2026',
    description:
      'Facture pro PDF en 2 minutes. Conforme art. L. 441-9 C. com. Auto-entrepreneur + entreprises.',
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
            › <span>Modèle facture pro PDF</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ 100% gratuit, sans inscription, sans limite
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Modèle facture pro PDF
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Générez vos factures professionnelles au format PDF en 2 minutes. Conforme à l&apos;
            <strong>article L. 441-9 du Code de commerce</strong> (mentions légales obligatoires) et
            à l&apos;<strong>arrêté du 22 mars 2017</strong>. Auto-entrepreneur, EI, EURL, SARL,
            SASU — tous statuts. Téléchargement immédiat.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>📄 Format PDF</strong>
              <br />
              Téléchargement direct
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>⚖️ Art. L. 441-9</strong>
              <br />
              Code de commerce
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🔒 100% privé</strong>
              <br />
              Aucune donnée envoyée
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Sans inscription</strong>
              <br />
              Sans limite
            </div>
          </div>
        </div>
      </header>

      {/* GENERATEUR */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre facture</h2>
          <p className="mb-6 text-charcoal-600">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>.
          </p>
          <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-sm">
            <FactureForm />
          </div>
        </div>
      </section>

      {/* MENTIONS OBLIGATOIRES */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Mentions obligatoires sur une facture pro 2026
          </h2>
          <p className="mb-4 text-sm text-charcoal-700">
            Imposées par l&apos;<strong>article L. 441-9 du Code de commerce</strong> et
            l&apos;arrêté du 22 mars 2017. Sanctions absence : amende administrative jusqu&apos;à{' '}
            <strong>375 000 € personne morale</strong> (art. L. 441-16 C. com.).
          </p>
          <ol className="list-decimal space-y-1 pl-6 text-sm">
            <li>
              <strong>Identité émetteur</strong> : raison sociale, forme juridique, adresse, SIRET,
              n° TVA intracommunautaire
            </li>
            <li>
              <strong>Identité destinataire</strong> : raison sociale, adresse, SIRET (B2B)
            </li>
            <li>
              <strong>N° de facture</strong> unique et chronologique (art. 242 nonies A CGI)
            </li>
            <li>
              <strong>Date d&apos;émission</strong> + date d&apos;échéance
            </li>
            <li>
              <strong>Désignation détaillée</strong> des produits ou services + quantités + prix
              unitaires HT
            </li>
            <li>
              <strong>Total HT + TVA + TTC</strong> avec taux applicable
            </li>
            <li>
              <strong>Conditions de paiement</strong> (délai max 60 jours ou 45 jours fin de mois —
              Loi LME 2008)
            </li>
            <li>
              <strong>Pénalités de retard</strong> (taux BCE + 10 points) + indemnité forfaitaire 40
              € (art. D. 441-5 C. com.)
            </li>
            <li>
              <strong>Mention TVA</strong> (« TVA non applicable, art. 293 B du CGI » pour les
              micro-entreprises sous franchise)
            </li>
            <li>
              <strong>Mention assurance pro</strong> (depuis décret 2024 — pour BTP, santé,
              transport, conseil financier)
            </li>
          </ol>
        </div>
      </section>

      {/* CTA assurance pro */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Mention assurance pro obligatoire ?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Depuis le décret 2024, l&apos;assurance pro doit obligatoirement figurer sur les
            factures pour les artisans BTP (Loi Spinetta), professions de santé, conseil financier
            (CGP ou CIF) et transport. Notre cabinet ORIAS vous transmet sous 24h 3 à 5 propositions
            adaptées.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <a
              href="/outils/devis-rc-pro"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-primary-700 shadow-lg transition hover:bg-sand-100"
            >
              → Devis RC Pro (2 min)
            </a>
            <a
              href="/outils/devis-assurance-decennale"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-primary-700 shadow-lg transition hover:bg-sand-100"
            >
              → Devis décennale (2 min)
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle facture pro PDF — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Générateur gratuit de modèle de facture pro au format PDF. Conforme art. L. 441-9 C. com. + arrêté 22 mars 2017. Auto-entrepreneur, EI, EURL, SARL, SASU.',
            featureList: [
              'Mentions légales obligatoires art. L. 441-9 C. com.',
              'Génération PDF côté navigateur (RGPD compliant)',
              'Mention assurance pro intégrée (décret 2024)',
              'Multi-statuts : AE, EI, EURL, SARL, SASU, SAS',
            ],
          },
          nonce
        )}
      />
    </main>
  )
}

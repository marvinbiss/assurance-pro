/**
 * Outil — Lettre de résiliation assurance pro (générateur PDF Loi Hamon)
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "résiliation assurance professionnelle" + variantes
 * - "lettre type résiliation assurance"
 * - "loi hamon assurance pro"
 * - Famille cumulée estimée : 500-700 vol/mois (long-tail concentré)
 *
 * Stratégie : 5e outil PDF de la série utilitaires. Patterns coover/april ont des
 * pages de "modèle lettre" qui rankent bien — ici on combine le contenu éducationnel
 * (Loi Hamon) avec un générateur PDF instantané.
 *
 * Levier conversion : utilisateur en train de résilier = INTENT TRÈS FORT pour
 * souscrire un nouveau contrat ailleurs → CTA appuyé vers /outils/devis-rc-pro.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { LettreResiliationForm } from '@/components/outils/LettreResiliationForm'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / lettre-resiliation-assurance'

export const metadata: Metadata = {
  title: 'Lettre de résiliation assurance pro PDF — Loi Hamon 2026',
  description:
    "Générez votre lettre de résiliation d'assurance professionnelle au format PDF en 2 minutes. Conforme Loi Hamon (art. L. 113-15-2 C. assur.) — résiliation infra-annuelle après 1 an, sans frais, sans motif. Modèle prêt à imprimer + envoyer en LRAR.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Lettre résiliation assurance pro PDF — Loi Hamon',
    description:
      'Lettre PDF prête à imprimer en 2 min. Conforme Loi Hamon. Sans frais, sans motif après 1 an.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-rose-700 to-pink-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/guides/resiliation-assurance-professionnelle" className="hover:underline">
              Guide résiliation
            </Link>{' '}
            › <span>Lettre PDF</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ Loi Hamon — sans frais, sans motif
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Lettre de résiliation assurance pro
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Générez votre lettre de résiliation au format PDF en 2 minutes. Conforme à la
            <strong> Loi Hamon</strong> (article L. 113-15-2 du Code des assurances) — résiliation
            infra-annuelle après 1 an d&apos;engagement, <strong>sans frais, sans motif</strong>.
            Modèle prêt à imprimer, signer et envoyer en lettre recommandée avec AR.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>📄 Format PDF</strong>
              <br />
              Téléchargement direct
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>⚖️ Loi Hamon</strong>
              <br />
              Art. L. 113-15-2
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

      {/* GENERATEUR */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez les informations de votre contrat</h2>
          <p className="mb-6 text-charcoal-600">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>.
          </p>
          <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-sm">
            <LettreResiliationForm />
          </div>
        </div>
      </section>

      {/* CONDITIONS LOI HAMON */}
      <section className="border-y border-amber-200 bg-amber-50 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚖️ Conditions Loi Hamon (art. L. 113-15-2)
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              ✓ <strong>Au moins 1 an d&apos;engagement</strong> dans le contrat actuel (sinon
              attendre l&apos;échéance avec préavis 2 mois)
            </li>
            <li>
              ✓ <strong>Sans frais</strong> de résiliation
            </li>
            <li>
              ✓ <strong>Sans motif</strong> à fournir (la Loi Hamon n&apos;en exige aucun)
            </li>
            <li>
              ✓ <strong>Délai d&apos;effet : 1 mois</strong> après réception par l&apos;assureur
            </li>
            <li>
              ✓ <strong>Remboursement prorata temporis</strong> de la prime déjà versée
            </li>
            <li>
              📮 <strong>Lettre RECOMMANDÉE avec accusé de réception (LRAR)</strong> obligatoire
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Cas particuliers (résiliation IMMÉDIATE possible) : cession fonds de commerce, cessation
            d&apos;activité, changement situation matérielle, augmentation tarif &gt; 10%. Voir
            notre{' '}
            <Link
              href="/guides/resiliation-assurance-professionnelle"
              className="text-primary-600 underline"
            >
              guide complet résiliation
            </Link>
            .
          </p>
        </div>
      </section>

      {/* PROCÉDURE */}
      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Procédure de résiliation en 5 étapes</h2>
          <ol className="space-y-3 text-sm">
            <li>
              <strong>1. Souscrire le NOUVEAU contrat AVANT</strong> de résilier l&apos;ancien
              (éviter rupture de couverture)
            </li>
            <li>
              <strong>2. Générer la lettre PDF</strong> ci-dessus avec les informations de votre
              contrat
            </li>
            <li>
              <strong>3. Imprimer + signer + dater</strong> la lettre
            </li>
            <li>
              <strong>4. Envoyer en LRAR</strong> au service résiliations de votre assureur (ou
              notification dans votre espace assuré avec preuve datée)
            </li>
            <li>
              <strong>5. Conserver le récépissé LRAR + l&apos;accusé de réception</strong> comme
              preuve. Effet : 1 mois après réception.
            </li>
          </ol>
          <p className="mt-4 border-l-4 border-primary-500 bg-primary-50 p-3 text-sm">
            <strong>💡 Astuce :</strong> demandez à votre nouveau courtier ORIAS d&apos;effectuer la
            résiliation à votre place (mandat de résiliation). Notre cabinet le fait gratuitement
            pour ses nouveaux clients — gain de temps + zéro risque de rupture de couverture.
          </p>
        </div>
      </section>

      {/* CTA SOUSCRIPTION NOUVEAU CONTRAT */}
      <section className="bg-gradient-to-br from-rose-600 to-pink-700 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Vous résiliez ? Comparez avant !</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            de nos 8 assureurs partenaires. Économies typiques <strong>15-30%</strong> vs votre
            contrat actuel. Mandat de résiliation pris en charge gratuitement.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <Link
              href="/outils/devis-rc-pro"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-rose-700 shadow-lg transition hover:bg-sand-100"
            >
              → Devis RC Pro (2 min)
            </Link>
            <Link
              href="/outils/devis-assurance-decennale"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-rose-700 shadow-lg transition hover:bg-sand-100"
            >
              → Devis décennale (2 min)
            </Link>
            <Link
              href="/outils/comparateur-mutuelle-pro"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-rose-700 shadow-lg transition hover:bg-sand-100"
            >
              → Comparateur mutuelle
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur lettre de résiliation assurance pro PDF — Loi Hamon',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de lettre de résiliation d'assurance professionnelle au format PDF. Conforme Loi Hamon (art. L. 113-15-2 C. assur.).",
          },
          nonce
        )}
      />
    </div>
  )
}

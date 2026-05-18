/**
 * Outil — Calculateur tarif assurance VTC 2026
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe Supabase) :
 * Famille vert-assurance_vtc.json : 79 KW, 13 090 vol cumulé, ROI 3M, KD moyen 1
 * Top KW :
 * - "assurance vtc"             → 3 300 vol KD 1 CPC 200€ ⭐⭐⭐ (KD ULTRA-FAIBLE)
 * - "assurance vtc pas cher"    → 1 200 vol KD 1 CPC 250€
 * - "tarif assurance vtc"       → ~ vol "tarif vtc"
 * - "rc pro vtc"                → 1 000 vol KD 2 CPC 250€
 * - "assurance vtc en ligne"    → ~
 *
 * Stratégie : famille à KD ultra-faible (moyenne 1 sur 100), volume élevé.
 * Conversion attendue forte car obligation légale (Loi LOTI / art. L. 3122-1
 * C. transport). Funnel direct vers /outils/devis-rc-pro avec prefill secteur=transport-vtc.
 *
 * Conformité : ACPR 2024-R-02 + Code transport art. L. 3122-1.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { TarifCalculator } from '@/components/premium/tarif-calculator'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / calculateur-tarif-vtc'

export const metadata: Metadata = {
  title: 'Calculateur tarif assurance VTC 2026 — Estimation immédiate (gratuit)',
  description:
    'Calculez votre tarif assurance VTC 2026 en 30 secondes. Simulateur basé sur barèmes 2026 de 6 assureurs spécialisés (AXA Pro, Allianz Pro, Wakam, MMA, AMV, Opteven Mobility). Auto-entrepreneur, EURL, SARL flotte. Tous véhicules. Devis officiel sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif assurance VTC 2026 — Estimation immédiate',
    description:
      'Estimation tarif VTC en 30 secondes. 6 assureurs spécialisés comparés. Devis officiel 24h.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-charcoal-900 via-primary-700 to-primary-900 py-16 text-white md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/assurance-vtc" className="hover:underline">
              Assurance VTC
            </Link>{' '}
            › <span>Calculateur tarif</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-red-500/90 px-3 py-1 text-sm font-semibold text-white">
            ⚠️ OBLIGATION LÉGALE — Loi LOTI ou Art. L. 3122-1 C. transp.
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur tarif assurance VTC 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre tarif d&apos;assurance VTC selon votre statut, votre zone
            d&apos;exercice, votre véhicule et vos antécédents.{' '}
            <strong>Calcul basé sur les barèmes réels 2026</strong> de nos 6 assureurs spécialisés
            transport personnes. Devis officiel sous 24h.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 30 secondes</strong>
              <br />
              Estimation immédiate
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📊 6 assureurs</strong>
              <br />
              Spécialisés VTC
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🚗 Tous véhicules</strong>
              <br />
              Berline, van, électrique
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              Sans inscription
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil VTC</h2>
          <p className="mb-6 text-charcoal-600">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes mutualisés BAAC 2024 (Bilan Annuel Accidents Corporels) + grilles 2026
            partenaires (AXA Pro, Allianz Pro, Wakam, MMA, AMV, Opteven Mobility).
          </p>
          <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-sm">
            <TarifCalculator garantie="vtc" />
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Garanties obligatoires VTC (Loi LOTI)</h2>
          <p className="mb-4 text-sm text-charcoal-700">
            L&apos;activité VTC impose des garanties spécifiques au-delà de l&apos;assurance auto
            personnelle (art. L. 3122-1 Code des transports + Loi Macron 2015) :
          </p>
          <ol className="list-decimal space-y-2 pl-6 text-sm">
            <li>
              <strong>RC Pro transport personnes</strong> — couverture corporels passagers + tiers
            </li>
            <li>
              <strong>Garantie usage VTC</strong> sur le véhicule (l&apos;assurance perso ne couvre
              PAS l&apos;usage professionnel)
            </li>
            <li>
              <strong>Protection juridique pénale</strong> (en cas d&apos;accident corporel)
            </li>
            <li>
              <strong>Garantie conducteur</strong> (corporels propres au chauffeur)
            </li>
            <li>
              <strong>Marchandises transportées</strong> (bagages clients)
            </li>
            <li>
              <strong>Perte de licence</strong> (perte revenus si retrait carte VTC)
            </li>
            <li>
              <strong>Véhicule de remplacement</strong> (continuité d&apos;activité)
            </li>
          </ol>
          <p className="mt-4 border-l-4 border-amber-500 bg-amber-50 p-3 text-sm">
            ⚠️ <strong>Sans assurance VTC valide</strong> : retrait immédiat carte VTC + amende 3
            750 € + suspension permis. Sinistre non couvert = patrimoine personnel engagé.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Comment réduire votre tarif VTC ?</h2>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-r border-l-4 border-violet-500 bg-white p-4">
              <h3 className="mb-1 font-bold">1. Choisir un véhicule électrique ou hybride</h3>
              <p>
                Bonus écologique assureurs : -8% (électrique) à -5% (hybride). Tesla Model 3,
                Hyundai Ioniq 5, BMW i4 sont les véhicules les plus assurés pour VTC en 2026.
              </p>
            </div>
            <div className="rounded-r border-l-4 border-violet-500 bg-white p-4">
              <h3 className="mb-1 font-bold">2. Augmenter la franchise</h3>
              <p>
                Passer de 750 € à 1 500 € = -8% sur cotisation. Recommandé si vous avez peu de
                petits sinistres et préférez payer le nominal.
              </p>
            </div>
            <div className="rounded-r border-l-4 border-violet-500 bg-white p-4">
              <h3 className="mb-1 font-bold">3. Choisir « tiers + » au lieu de « tous risques »</h3>
              <p>
                Si véhicule de plus de 7 ans : passer en tiers + (vol, incendie ou bris glace)
                économise 25-30% vs tous risques sans perte significative de protection.
              </p>
            </div>
            <div className="rounded-r border-l-4 border-violet-500 bg-white p-4">
              <h3 className="mb-1 font-bold">4. Bonus fidélité (5+ ans sans sinistre)</h3>
              <p>
                Coefficient bonus -8% par année sans sinistre, plafonné à -25% au bout de 5 ans.
                Conserver son assureur ou justifier sur le marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Estimation indicative — pas un devis officiel
          </h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong> et n&apos;engage
            pas les assureurs (Recommandation ACPR 2024-R-02). Tarif réel variable ±20% selon :
            carte VTC active (préfecture), affiliation plateforme (Uber, Bolt, Heetch, Marcel),
            kilométrage annuel déclaré, garanties optionnelles, exclusions spécifiques.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-600 to-fuchsia-700 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Prêt à passer au devis officiel ?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            officielles parmi nos 6 assureurs spécialisés VTC. Souscription en ligne, attestation
            VTC téléchargeable dans les 24h.
          </p>
          <Link
            href="/outils/devis-rc-pro?secteur=transport-vtc"
            className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-violet-700 shadow-lg transition hover:bg-sand-100"
          >
            → Devis officiel assurance VTC (2 min, ORIAS)
          </Link>
        </div>
      </section>

      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif assurance VTC 2026 — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Calculateur interactif tarif assurance VTC 2026. 7 coefficients publics ACPR. 6 assureurs spécialisés VTC comparés.',
            featureList: [
              'Calcul instantané 100% client-side (RGPD)',
              '7 coefficients tarifaires publics (ACPR 2024-R-02)',
              'Barèmes 2026 réels 6 assureurs spécialisés',
              '5 statuts juridiques + 5 zones + 4 formules',
              'Bonus véhicule électrique — hybride intégré',
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ Devis VTC 24h"
        ctaUrl="/outils/devis-rc-pro?secteur=transport-vtc"
        trustSignal="6 assureurs VTC spécialisés • Loi LOTI • ORIAS"
        variant="violet"
      />
    </div>
  )
}

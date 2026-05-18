/**
 * Outil — Calculateur tarif multirisque professionnelle 2026
 *
 * KW Ahrefs (kw_universe) :
 * - Famille vert-multirisque_professionnelle.json : 8 KW, 1 580 vol, ROI 508k score
 * - "multirisque professionnelle" 600 vol KD 1 + tail
 * - "tarif multirisque pro" / "prix multirisque pro" 80-150 vol CPC 280€
 * - "devis multirisque professionnelle" 150 vol CPC 600€
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

const SLUG = 'outils / calculateur-tarif-multirisque-pro'

export const metadata: Metadata = {
  title: 'Calculateur tarif multirisque pro 2026 — Bureau, commerce, atelier (gratuit)',
  description:
    'Calculez votre tarif multirisque professionnelle 2026 en 30 secondes. 7 types de locaux (bureau, commerce, restaurant, atelier, entrepôt, cabinet médical, showroom). 7 assureurs comparés. 4 formules. Devis officiel sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif multirisque pro 2026',
    description: 'Estimation multirisque pro en 30 secondes. 7 types locaux. 7 assureurs comparés.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-orange-700 to-red-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/multirisque-pro" className="hover:underline">
              Multirisque pro
            </Link>{' '}
            › <span>Calculateur tarif</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ 7 types locaux + 7 assureurs comparés
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur tarif multirisque pro 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre tarif multirisque professionnelle selon le type de locaux,
            la surface, votre CA et le niveau de couverture souhaité.{' '}
            <strong>8 coefficients publics</strong> + barèmes 2026 de 7 assureurs partenaires.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 30 secondes</strong>
              <br />
              Estimation immédiate
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🏢 7 types locaux</strong>
              <br />
              Bureau, commerce, restaurant…
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📊 4 formules</strong>
              <br />
              Essentielle → Premium
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              Sans inscription
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil locaux</h2>
          <p className="mb-6 text-gray-600">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes mutualisés FFA 2024 + grilles 2026 des 7 assureurs partenaires (MMA Pro, AXA
            Pro, Allianz Pro, Generali, MAIF Pro, Pro BTP MR, April Pro).
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <TarifCalculator garantie="multirisque-pro" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Tarifs au m² 2026 par type de locaux</h2>
          <table className="w-full border-collapse bg-white text-sm">
            <thead>
              <tr className="bg-orange-50">
                <th className="border p-2 text-left">Type de locaux</th>
                <th className="border p-2 text-right">Tarif base m² par an</th>
                <th className="border p-2 text-left">Sinistralité dominante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Entrepôt — stockage</td>
                <td className="border p-2 text-right">3,80 € par m²</td>
                <td className="border p-2">Vol marchandises, incendie</td>
              </tr>
              <tr>
                <td className="border p-2">Bureau</td>
                <td className="border p-2 text-right">4,20 € par m²</td>
                <td className="border p-2">Dégâts eaux, vol matériel IT</td>
              </tr>
              <tr>
                <td className="border p-2">Commerce de détail</td>
                <td className="border p-2 text-right">6,80 € par m²</td>
                <td className="border p-2">Vol caisse, vandalisme nocturne</td>
              </tr>
              <tr>
                <td className="border p-2">Showroom — magasin</td>
                <td className="border p-2 text-right">7,20 € par m²</td>
                <td className="border p-2">Bris vitrine, vol expositions</td>
              </tr>
              <tr>
                <td className="border p-2">Atelier</td>
                <td className="border p-2 text-right">7,50 € par m²</td>
                <td className="border p-2">Incendie machines, accidents corporels</td>
              </tr>
              <tr>
                <td className="border p-2">Cabinet médical — paramédical</td>
                <td className="border p-2 text-right">8,20 € par m²</td>
                <td className="border p-2">Vol équipement médical, dégâts eaux</td>
              </tr>
              <tr>
                <td className="border p-2">Restaurant — brasserie</td>
                <td className="border p-2 text-right">11,50 € par m²</td>
                <td className="border p-2">Incendie cuisine, intoxications, vol</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs italic text-gray-600">
            Tarifs base au m² × surface × coefficients (statut, CA, formule, mobilier, zone, perte
            exploitation). Sources : FFA 2024 + grilles assureurs 2026.
          </p>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Estimation indicative — pas un devis officiel
          </h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Tarif réel
            variable ±20% selon : présence sprinklers, alarme ou coffre-fort (rabais 5-15%),
            proximité caserne pompiers (-5%), antécédents 5 ans, activités annexes (laboratoire,
            matières dangereuses, ERP recevant public). Conformité ACPR 2024-R-02.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-700 to-red-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Prêt à protéger vos locaux ?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 7 partenaires multirisque pro. Tarif négocié -10-25% vs direct.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <Link
              href="/multirisque-pro"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-orange-700 shadow-lg transition hover:bg-gray-100"
            >
              → Pilier multirisque pro
            </Link>
            <Link
              href="/assurance-locaux-entreprise"
              className="inline-block rounded-lg border border-white/30 bg-orange-800 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-orange-900"
            >
              → Guide assurance locaux entreprise
            </Link>
          </div>
        </div>
      </section>

      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif multirisque pro 2026 — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Calculateur interactif multirisque professionnelle 2026. 8 coefficients publics ACPR. 7 types locaux × 7 assureurs comparés.',
            featureList: [
              'Calcul instantané 100% client-side',
              '7 types locaux (bureau, commerce, restaurant, atelier, entrepôt, médical, showroom)',
              '4 formules (Essentielle → Premium)',
              "Calcul perte d'exploitation intégré",
              'Affichage garanties incluses temps réel',
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ Devis multirisque 24h"
        ctaUrl="/outils/devis-rc-pro?secteur=multirisque"
        trustSignal="7 assureurs comparés • Tarif négocié -10-25%"
        variant="orange"
      />
    </main>
  )
}

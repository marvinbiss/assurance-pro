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
import { CalculateurTarifMultirisquePro } from '@/components/outils/CalculateurTarifMultirisquePro'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-multirisque-pro'

export const metadata: Metadata = {
  title: 'Calculateur tarif multirisque pro 2026 — Bureau, commerce, atelier (gratuit)',
  description:
    "Calculez votre tarif multirisque professionnelle 2026 en 30 secondes. 7 types de locaux (bureau, commerce, restaurant, atelier, entrepôt, cabinet médical, showroom). 7 assureurs comparés. 4 formules. Devis officiel sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif multirisque pro 2026',
    description: "Estimation multirisque pro en 30 secondes. 7 types locaux. 7 assureurs comparés.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-orange-700 to-red-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/multirisque-pro" className="hover:underline">Multirisque pro</a>{' '}/{' '}
            <span>Calculateur tarif</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 7 types locaux + 7 assureurs comparés
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Calculateur tarif multirisque pro 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Estimez immédiatement votre tarif multirisque professionnelle selon le type de locaux,
            la surface, votre CA et le niveau de couverture souhaité.{' '}
            <strong>8 coefficients publics</strong> + barèmes 2026 de 7 assureurs partenaires.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 30 secondes</strong><br />Estimation immédiate</div>
            <div className="bg-white/10 rounded p-3"><strong>🏢 7 types locaux</strong><br />Bureau, commerce, restaurant…</div>
            <div className="bg-white/10 rounded p-3"><strong>📊 4 formules</strong><br />Essentielle → Premium</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />Sans inscription</div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre profil locaux</h2>
          <p className="text-gray-600 mb-6">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes mutualisés FFA 2024 + grilles 2026 des 7 assureurs partenaires (MMA Pro, AXA Pro,
            Allianz Pro, Generali, MAIF Pro, Pro BTP MR, April Pro).
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <CalculateurTarifMultirisquePro />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Tarifs au m² 2026 par type de locaux</h2>
          <table className="w-full text-sm border-collapse bg-white">
            <thead>
              <tr className="bg-orange-50">
                <th className="border p-2 text-left">Type de locaux</th>
                <th className="border p-2 text-right">Tarif base m²/an</th>
                <th className="border p-2 text-left">Sinistralité dominante</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Entrepôt / stockage</td><td className="border p-2 text-right">3,80 €/m²</td><td className="border p-2">Vol marchandises, incendie</td></tr>
              <tr><td className="border p-2">Bureau</td><td className="border p-2 text-right">4,20 €/m²</td><td className="border p-2">Dégâts eaux, vol matériel IT</td></tr>
              <tr><td className="border p-2">Commerce de détail</td><td className="border p-2 text-right">6,80 €/m²</td><td className="border p-2">Vol caisse, vandalisme nocturne</td></tr>
              <tr><td className="border p-2">Showroom / magasin</td><td className="border p-2 text-right">7,20 €/m²</td><td className="border p-2">Bris vitrine, vol expositions</td></tr>
              <tr><td className="border p-2">Atelier</td><td className="border p-2 text-right">7,50 €/m²</td><td className="border p-2">Incendie machines, accidents corporels</td></tr>
              <tr><td className="border p-2">Cabinet médical / paramédical</td><td className="border p-2 text-right">8,20 €/m²</td><td className="border p-2">Vol équipement médical, dégâts eaux</td></tr>
              <tr><td className="border p-2">Restaurant / brasserie</td><td className="border p-2 text-right">11,50 €/m²</td><td className="border p-2">Incendie cuisine, intoxications, vol</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-gray-600 italic">
            Tarifs base au m² × surface × coefficients (statut, CA, formule, mobilier, zone, perte exploitation).
            Sources : FFA 2024 + grilles assureurs 2026.
          </p>
        </div>
      </section>

      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Estimation indicative — pas un devis officiel</h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Tarif réel variable
            ±20% selon : présence sprinklers/alarme/coffre-fort (rabais 5-15%), proximité caserne
            pompiers (-5%), antécédents 5 ans, activités annexes (laboratoire, matières dangereuses,
            ERP recevant public). Conformité ACPR 2024-R-02.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-orange-700 to-red-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à protéger vos locaux ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 7 partenaires multirisque pro. Tarif négocié -10-25% vs direct.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/multirisque-pro" className="inline-block bg-white text-orange-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Pilier multirisque pro</a>
            <a href="/assurance-locaux-entreprise" className="inline-block bg-orange-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-900 transition shadow-lg border border-white/30">→ Guide assurance locaux entreprise</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif multirisque pro 2026 — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Calculateur interactif multirisque professionnelle 2026. 8 coefficients publics ACPR. 7 types locaux × 7 assureurs comparés.",
            featureList: [
              'Calcul instantané 100% client-side',
              '7 types locaux (bureau, commerce, restaurant, atelier, entrepôt, médical, showroom)',
              '4 formules (Essentielle → Premium)',
              'Calcul perte d\'exploitation intégré',
              'Affichage garanties incluses temps réel',
            ],
          }),
        }}
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

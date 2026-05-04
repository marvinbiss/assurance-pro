/**
 * Outil — Devis assurance décennale
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "devis assurance décennale"            → 450 vol, KD 7, CPC 900€ ⭐⭐⭐ (CPC max marché)
 * - "devis assurance décennale auto entrepreneur" → 100 vol, KD 2, CPC 1 000€
 * - "comparateur assurance décennale"      →  50 vol, KD 2, CPC 800€
 * - "courtier assurance décennale"         → 150 vol, KD 3, CPC 700€
 * - "assurance décennale immédiate"        → 150 vol, KD 0, CPC 700€
 * - "assurance décennale devis"            → 100 vol, CPC 800€
 * - Famille cumulée : ~1 100 vol/mois (CPC moyen 800€ — INTENT COMMERCIAL EXTRÊME)
 *
 * Stratégie : page TRANSACTIONNELLE qui réutilise l'API /api/devis-assurance et
 * le composant DevisAssuranceForm avec PRÉ-REMPLISSAGE garantie_code='decennale'.
 * Cible artisans BTP — sinistre majeur si pas assurés (75 000€ + 6 mois prison).
 */

import type { Metadata } from 'next'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/devis-assurance-decennale'

export const metadata: Metadata = {
  title: 'Devis assurance décennale 2026 — Comparateur 8 assureurs BTP en 2 minutes',
  description:
    "Devis assurance décennale gratuit en 2 minutes : comparatif 8 assureurs spécialisés BTP (SMABTP, MAAF Pro, Hiscox, April Pro, AXA Pro, Allianz, Wakam, Generali). Tarifs 480-1 540€/an. Attestation 24h. Conseil ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Devis assurance décennale 2026 — Comparateur 8 assureurs BTP',
    description: "Devis décennale en 2 minutes. 8 assureurs comparés. Attestation 24h.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-orange-700 to-red-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/assurance-decennale" className="hover:underline">Décennale</a>{' '}/{' '}
            <span>Devis décennale</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-red-500/90 text-white rounded-full text-sm font-semibold">
            ⚠️ OBLIGATION LÉGALE — LOI SPINETTA
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Devis assurance décennale 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Comparateur des 8 assureurs spécialisés BTP (SMABTP, MAAF Pro, Hiscox, April Pro,
            AXA Pro, Allianz, Wakam, Generali). Tarifs négociés <strong>à partir de 480 €/an</strong>.
            Attestation conforme arrêté 23 janvier 2024 sous <strong>24h</strong>. Sans engagement.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 2 minutes</strong><br />Formulaire</div>
            <div className="bg-white/10 rounded p-3"><strong>📧 24h</strong><br />Devis personnalisés</div>
            <div className="bg-white/10 rounded p-3"><strong>📜 Attestation</strong><br />24h après souscription</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />ORIAS</div>
          </div>
        </div>
      </header>

      {/* TARIFS RÉFÉRENCE */}
      <section className="py-10 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Tarifs décennale 2026 par métier (auto-entrepreneur)</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="border p-2 text-left">Métier</th>
                <th className="border p-2 text-right">Tarif annuel HT</th>
                <th className="border p-2 text-left">Sinistralité AQC</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Peintre / plaquiste</td><td className="border p-2 text-right">480 € – 760 €</td><td className="border p-2">3,1 %</td></tr>
              <tr><td className="border p-2">Plombier</td><td className="border p-2 text-right">540 € – 980 €</td><td className="border p-2">7,2 % (dégâts eaux encastrés)</td></tr>
              <tr><td className="border p-2">Électricien</td><td className="border p-2 text-right">490 € – 880 €</td><td className="border p-2">5,8 %</td></tr>
              <tr><td className="border p-2">Carreleur</td><td className="border p-2 text-right">560 € – 920 €</td><td className="border p-2">6,5 %</td></tr>
              <tr><td className="border p-2">Maçon</td><td className="border p-2 text-right">720 € – 1 380 €</td><td className="border p-2">11,4 % (fissures structurelles)</td></tr>
              <tr><td className="border p-2">Couvreur-zingueur</td><td className="border p-2 text-right">820 € – 1 540 €</td><td className="border p-2">13,2 % (étanchéité toiture)</td></tr>
              <tr><td className="border p-2">RGE photovoltaïque</td><td className="border p-2 text-right">880 € – 1 680 €</td><td className="border p-2">9,2 %</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 italic mt-2">
            Sources : AQC SYCODÉS 2024 + barèmes 2026 nos 8 assureurs partenaires. Pour SARL avec
            salariés, multiplier par 2-4 selon effectif.
          </p>
        </div>
      </section>

      {/* FORMULAIRE — pré-rempli garantie_code='decennale' */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Démarrer mon devis décennale</h2>
          <p className="text-gray-600 mb-6">
            3 étapes — 2 minutes. Vos données sont transmises uniquement aux 3-5 assureurs
            BTP sélectionnés pour votre métier. Conformité RGPD + ACPR 2024-R-03.
          </p>
          <DevisAssuranceForm prefill={{ garantie_code: 'decennale' }} />
        </div>
      </section>

      {/* PROCÉDURE 24h */}
      <section className="py-10 bg-orange-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Procédure « Express 24h » : de la demande à l&apos;attestation</h2>
          <ol className="space-y-2 text-sm">
            <li><strong>1. Formulaire</strong> (5 min) : métier, CA prévisionnel, antécédents</li>
            <li><strong>2. Comparatif sous 24h</strong> : 3-5 propositions de nos partenaires BTP</li>
            <li><strong>3. Conseil ORIAS</strong> (15-30 min) : décryptage des nuances + choix optimal</li>
            <li><strong>4. Signature électronique</strong> (5 min) + paiement 1re cotisation (CB ou virement)</li>
            <li><strong>5. Attestation décennale</strong> téléchargeable dans les 24h suivant le paiement</li>
          </ol>
          <p className="mt-4 text-sm">
            <strong>Procédure « Express 6h »</strong> disponible pour chantiers urgents (+80 € HT) :
            attestation provisoire le jour même.
          </p>
        </div>
      </section>

      {/* SANCTIONS — anti-procrastination */}
      <section className="py-10 bg-red-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-red-900">⚠️ Sanctions absence décennale (rappel Loi Spinetta)</h2>
          <ul className="space-y-1 text-sm">
            <li>• <strong>75 000 €</strong> d&apos;amende personne physique (375 000 € personne morale)</li>
            <li>• <strong>6 mois d&apos;emprisonnement</strong></li>
            <li>• <strong>Interdiction d&apos;exercer</strong> l&apos;activité d&apos;artisan BTP</li>
            <li>• <strong>Responsabilité civile et pénale personnelle</strong> en cas de sinistre (patrimoine privé engagé)</li>
            <li>• <strong>Mention obligatoire</strong> de l&apos;assureur + n° police sur 100% des devis et factures (décret 2024)</li>
          </ul>
        </div>
      </section>

      {/* JSON-LD WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Devis assurance décennale — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              "Devis assurance décennale gratuit en 2 minutes. Comparateur 8 assureurs spécialisés BTP. Attestation 24h.",
          }),
        }}
      />
    </main>
  )
}

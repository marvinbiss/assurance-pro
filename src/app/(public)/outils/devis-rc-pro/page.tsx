/**
 * Outil — Devis RC Pro
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "devis rc pro"                    → 400 vol, KD 0, CPC 600€ ⭐
 * - "devis rc pro en ligne"           → 200 vol, KD 0, CPC 500€
 * - "tarif rc pro"                    → 250 vol, KD 3, CPC 250€
 * - "tarif rc pro auto-entrepreneur"  → 400 vol, KD 2, CPC 160€
 * - "comparateur rc pro"              → 300 vol, KD 9, CPC 400€
 * - Famille cumulée : ~1 600 vol/mois (CPC moyen 350€ — INTENT COMMERCIAL EXTRÊME)
 *
 * Stratégie : page TRANSACTIONNELLE qui réutilise l'API /api/devis-assurance et
 * le composant DevisAssuranceForm avec PRÉ-REMPLISSAGE garantie_code='rc-pro'.
 * Conversion attendue 3-5% (vs 0,3% page éditoriale) → meilleur ROI du site.
 *
 * Concurrent benchmark : simplis.fr capte 1 209 vis/mois sur "rc pro auto entrepreneur"
 * via formulaire dédié — c'est ce pattern qu'on reproduit ici.
 */

import type { Metadata } from 'next'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/devis-rc-pro'

export const metadata: Metadata = {
  title: 'Devis RC Pro 2026 — Comparateur 8 assureurs en 2 minutes | Assurance Pro',
  description:
    "Devis RC Pro gratuit en 2 minutes : comparatif 8 assureurs (Hiscox, AXA Pro, Allianz Pro, MMA Pro, MAAF Pro, April Pro, Generali, Wakam). Tarifs 89-2 800€/an. Conseil ORIAS sous 24h. Sans engagement.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Devis RC Pro 2026 — Comparateur 8 assureurs gratuit',
    description: "Devis RC Pro en 2 minutes. 8 assureurs comparés. Tarifs négociés. Conseil ORIAS sous 24h.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/responsabilite-civile-professionnelle" className="hover:underline">RC Pro</a>{' '}/{' '}
            <span>Devis RC Pro</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ Devis gratuit en 2 minutes
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Devis RC Pro 2026 — Comparateur 8 assureurs
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Recevez sous 24h ouvrées 3-5 propositions personnalisées de nos 8 assureurs
            partenaires (Hiscox, AXA Pro, Allianz Pro, MMA, MAAF, April Pro, Generali, Wakam).
            Économies typiques 15-30% vs souscription directe. Conseil ORIAS sans engagement.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 2 minutes</strong><br />Formulaire</div>
            <div className="bg-white/10 rounded p-3"><strong>📧 24h</strong><br />Devis personnalisés</div>
            <div className="bg-white/10 rounded p-3"><strong>💰 -15-30%</strong><br />vs direct</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />ORIAS</div>
          </div>
        </div>
      </header>

      {/* TARIFS RÉFÉRENCE */}
      <section className="py-10 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Tarifs RC Pro 2026 par profil</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="border p-2 text-left">Profil</th>
                <th className="border p-2 text-right">Plafond</th>
                <th className="border p-2 text-right">Tarif annuel HT</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Freelance digital sans antécédent</td><td className="border p-2 text-right">1,5 M€</td><td className="border p-2 text-right">89 € – 180 €</td></tr>
              <tr><td className="border p-2">Auto-entrepreneur services</td><td className="border p-2 text-right">1,5 M€</td><td className="border p-2 text-right">220 € – 380 €</td></tr>
              <tr><td className="border p-2">Consultant management senior</td><td className="border p-2 text-right">5 M€</td><td className="border p-2 text-right">980 € – 1 480 €</td></tr>
              <tr><td className="border p-2">Freelance IT / DevOps</td><td className="border p-2 text-right">5 M€</td><td className="border p-2 text-right">780 € – 1 280 €</td></tr>
              <tr><td className="border p-2">Cabinet expertise comptable</td><td className="border p-2 text-right">2,5 M€</td><td className="border p-2 text-right">1 200 € – 2 800 €</td></tr>
              <tr><td className="border p-2">CGP / CIF agréé ACPR</td><td className="border p-2 text-right">5 M€ obl.</td><td className="border p-2 text-right">1 800 € – 3 800 €</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 italic mt-2">
            Tarifs indicatifs. Devis personnalisé selon votre profil exact (métier, CA, antécédents).
          </p>
        </div>
      </section>

      {/* FORMULAIRE — pré-rempli garantie_code='rc-pro' */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Démarrer mon devis RC Pro</h2>
          <p className="text-gray-600 mb-6">
            3 étapes — 2 minutes. Vos données sont transmises uniquement aux 3-5 assureurs
            sélectionnés pour votre profil. Conformité RGPD + ACPR 2024-R-03 (devoir de conseil tracé).
          </p>
          <DevisAssuranceForm prefill={{ garantie_code: 'rc-pro' }} />
        </div>
      </section>

      {/* TRUST FOOTER */}
      <section className="py-10 bg-blue-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Pourquoi passer par notre cabinet ORIAS ?</h2>
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            <li>⚖️ <strong>Indépendance</strong> : 8 assureurs comparés, pas de mandat exclusif</li>
            <li>🆓 <strong>Service gratuit</strong> : rémunération par commission assureur, pas par vous</li>
            <li>🛡️ <strong>Conformité ACPR/DDA</strong> : devoir de conseil tracé (Reco 2024-R-03)</li>
            <li>⚡ <strong>Réactivité 24h</strong> : 3-5 propositions sous 24h ouvrées</li>
            <li>💰 <strong>Économie 15-30%</strong> vs souscription directe</li>
            <li>📞 <strong>Suivi sinistres</strong> : interlocuteur dédié à vie</li>
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
            name: 'Devis RC Pro — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              "Devis RC Pro gratuit en 2 minutes. Comparateur 8 assureurs (Hiscox, AXA Pro, Allianz, MMA, MAAF, April, Generali, Wakam).",
          }),
        }}
      />
    </main>
  )
}

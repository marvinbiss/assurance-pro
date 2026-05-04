/**
 * Outil — Calculateur tarif cyber assurance 2026
 *
 * KW Ahrefs (kw_universe) :
 * - Famille vert-cyber_assurance.json : 9 KW, 1 990 vol, ROI 330k score
 * - "cyber assurance entreprise" → 200 vol KD 1 CPC 350€
 * - "cyber assurance prix" / "tarif cyber assurance" → 80-150 vol CPC 280€
 * - "assurance cyber pme" → 100 vol KD 0
 * - + sous-fam guide RGPD : "rgpd entreprise assurance" 110 vol KD 3 CPC 350€
 *
 * Conversion attendue plus élevée car coût moyen sinistre 80-300k€ PME (ANSSI 2024)
 * = ROI breakeven dès le 1er sinistre, intent commercial fort.
 */

import type { Metadata } from 'next'
import { CalculateurTarifCyber } from '@/components/outils/CalculateurTarifCyber'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-cyber-assurance'

export const metadata: Metadata = {
  title: 'Calculateur tarif cyber assurance 2026 — Estimation immédiate (gratuit)',
  description:
    "Calculez votre tarif cyber assurance 2026 en 30 secondes. 6 assureurs cyber comparés (Hiscox CyberClear, Stoïk, Beazley, AIG CyberEdge, AXA Cyber Secure, Allianz Cyber Risk). Plafonds 100k€-10M€. RGPD + ANSSI. Devis officiel sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif cyber assurance 2026',
    description: "Estimation tarif cyber en 30 secondes. 6 assureurs comparés. Plafond 100k€-10M€.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-slate-700 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/cyber-assurance" className="hover:underline">Cyber assurance</a>{' '}/{' '}
            <span>Calculateur tarif</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-red-500/90 text-white rounded-full text-sm font-semibold">
            ⚠️ 1 entreprise sur 4 subit une cyberattaque (ANSSI)
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Calculateur tarif cyber assurance 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Estimez immédiatement votre tarif cyber assurance selon votre secteur, CA, volume de
            données clients et maturité cybersécurité. <strong>6 coefficients publics</strong> +{' '}
            barèmes 2026 de 6 assureurs spécialisés (Hiscox, Stoïk, Beazley, AIG, AXA, Allianz).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 30 secondes</strong><br />Estimation immédiate</div>
            <div className="bg-white/10 rounded p-3"><strong>📊 6 assureurs cyber</strong><br />Spécialisés</div>
            <div className="bg-white/10 rounded p-3"><strong>🔒 RGPD + ANSSI</strong><br />Conformité intégrée</div>
            <div className="bg-white/10 rounded p-3"><strong>💰 Plafond 100k-10M€</strong><br />Modulable</div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre profil cyber</h2>
          <p className="text-gray-600 mb-6">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes ANSSI 2024 (statistiques attaques par taille) + grilles 2026 des 6 assureurs
            cyber partenaires.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <CalculateurTarifCyber />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Que couvre la cyber assurance ?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white border-l-4 border-slate-700 p-4 rounded-r">
              <h3 className="font-bold mb-2">🛡️ Pertes financières directes</h3>
              <ul className="space-y-1">
                <li>• Rançon ransomware (selon contrat)</li>
                <li>• Fraude au virement (FOVI / arnaque président)</li>
                <li>• Détournement données bancaires</li>
                <li>• Perte d&apos;exploitation post-attaque</li>
              </ul>
            </div>
            <div className="bg-white border-l-4 border-slate-700 p-4 rounded-r">
              <h3 className="font-bold mb-2">⚖️ Responsabilité civile cyber</h3>
              <ul className="space-y-1">
                <li>• Recours clients suite breach</li>
                <li>• Recours partenaires/fournisseurs</li>
                <li>• Atteinte propriété intellectuelle</li>
                <li>• Diffusion contenu illégal involontaire</li>
              </ul>
            </div>
            <div className="bg-white border-l-4 border-slate-700 p-4 rounded-r">
              <h3 className="font-bold mb-2">📞 Frais de gestion crise</h3>
              <ul className="space-y-1">
                <li>• Expert forensique (analyse breach)</li>
                <li>• Avocat RGPD + plainte CNIL</li>
                <li>• Communication crise + réputation</li>
                <li>• Notification clients (RGPD art. 34)</li>
              </ul>
            </div>
            <div className="bg-white border-l-4 border-slate-700 p-4 rounded-r">
              <h3 className="font-bold mb-2">🔧 Frais de restauration</h3>
              <ul className="space-y-1">
                <li>• Restauration systèmes IT (réinstallation)</li>
                <li>• Restauration données (sauvegardes)</li>
                <li>• Mises à niveau sécurité post-incident</li>
                <li>• Assistance technique 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Estimation indicative — pas un devis officiel</h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Les assureurs
            cyber pratiquent un <strong>questionnaire ACPR détaillé</strong> (40-80 questions sur
            votre infrastructure IT, processus, fournisseurs cloud, sauvegardes) qui peut faire
            varier le tarif réel de ±25%. Notre cabinet ORIAS optimise ce questionnaire dans tous
            ses devis.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-slate-700 to-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à protéger votre entreprise ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 6 assureurs cyber partenaires. Audit cyber gratuit inclus.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/cyber-assurance" className="inline-block bg-white text-slate-800 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Pilier cyber assurance</a>
            <a href="/guides/assurance-rgpd" className="inline-block bg-slate-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-900 transition shadow-lg border border-white/30">→ Guide RGPD entreprise</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif cyber assurance 2026 — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Calculateur interactif tarif cyber assurance 2026. 6 coefficients publics ACPR. 6 assureurs cyber comparés. Plafond modulable 100k€-10M€.",
            featureList: [
              'Calcul instantané 100% client-side',
              '6 coefficients tarifaires publics',
              'Barèmes 2026 réels 6 assureurs cyber',
              '9 secteurs (TPE → grandes entreprises)',
              'Calibrage maturité cyber (ISO 27001 = -22%)',
            ],
          }),
        }}
      />
      <StickyConversionBar
        ctaText="→ Devis cyber 24h"
        ctaUrl="/outils/devis-rc-pro?secteur=cyber"
        trustSignal="6 assureurs cyber spécialisés • RGPD + ANSSI • ORIAS"
        variant="slate"
      />
    </main>
  )
}

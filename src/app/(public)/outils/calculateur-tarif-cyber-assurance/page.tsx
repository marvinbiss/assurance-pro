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
import Link from 'next/link'
import { CalculateurTarifCyber } from '@/components/outils/CalculateurTarifCyber'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / calculateur-tarif-cyber-assurance'

export const metadata: Metadata = {
  title: 'Calculateur tarif cyber assurance 2026 — Estimation immédiate (gratuit)',
  description:
    'Calculez votre tarif cyber assurance 2026 en 30 secondes. 6 assureurs cyber comparés (Hiscox CyberClear, Stoïk, Beazley, AIG CyberEdge, AXA Cyber Secure, Allianz Cyber Risk). Plafonds 100k€-10M€. RGPD + ANSSI. Devis officiel sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif cyber assurance 2026',
    description: 'Estimation tarif cyber en 30 secondes. 6 assureurs comparés. Plafond 100k€-10M€.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-slate-700 to-slate-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/cyber-assurance" className="hover:underline">
              Cyber assurance
            </Link>{' '}
            › <span>Calculateur tarif</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-red-500/90 px-3 py-1 text-sm font-semibold text-white">
            ⚠️ 1 entreprise sur 4 subit une cyberattaque (ANSSI)
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur tarif cyber assurance 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre tarif cyber assurance selon votre secteur, CA, volume de
            données clients et maturité cybersécurité. <strong>6 coefficients publics</strong> +{' '}
            barèmes 2026 de 6 assureurs spécialisés (Hiscox, Stoïk, Beazley, AIG, AXA, Allianz).
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 30 secondes</strong>
              <br />
              Estimation immédiate
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📊 6 assureurs cyber</strong>
              <br />
              Spécialisés
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🔒 RGPD + ANSSI</strong>
              <br />
              Conformité intégrée
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>💰 Plafond 100k-10M€</strong>
              <br />
              Modulable
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil cyber</h2>
          <p className="mb-6 text-gray-600">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes ANSSI 2024 (statistiques attaques par taille) + grilles 2026 des 6 assureurs
            cyber partenaires.
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CalculateurTarifCyber />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Que couvre la cyber assurance ?</h2>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-r border-l-4 border-slate-700 bg-white p-4">
              <h3 className="mb-2 font-bold">🛡️ Pertes financières directes</h3>
              <ul className="space-y-1">
                <li>• Rançon ransomware (selon contrat)</li>
                <li>• Fraude au virement (FOVI — arnaque président)</li>
                <li>• Détournement données bancaires</li>
                <li>• Perte d&apos;exploitation post-attaque</li>
              </ul>
            </div>
            <div className="rounded-r border-l-4 border-slate-700 bg-white p-4">
              <h3 className="mb-2 font-bold">⚖️ Responsabilité civile cyber</h3>
              <ul className="space-y-1">
                <li>• Recours clients suite breach</li>
                <li>• Recours partenaires ou fournisseurs</li>
                <li>• Atteinte propriété intellectuelle</li>
                <li>• Diffusion contenu illégal involontaire</li>
              </ul>
            </div>
            <div className="rounded-r border-l-4 border-slate-700 bg-white p-4">
              <h3 className="mb-2 font-bold">📞 Frais de gestion crise</h3>
              <ul className="space-y-1">
                <li>• Expert forensique (analyse breach)</li>
                <li>• Avocat RGPD + plainte CNIL</li>
                <li>• Communication crise + réputation</li>
                <li>• Notification clients (RGPD art. 34)</li>
              </ul>
            </div>
            <div className="rounded-r border-l-4 border-slate-700 bg-white p-4">
              <h3 className="mb-2 font-bold">🔧 Frais de restauration</h3>
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

      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Estimation indicative — pas un devis officiel
          </h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Les assureurs
            cyber pratiquent un <strong>questionnaire ACPR détaillé</strong> (40-80 questions sur
            votre infrastructure IT, processus, fournisseurs cloud, sauvegardes) qui peut faire
            varier le tarif réel de ±25%. Notre cabinet ORIAS optimise ce questionnaire dans tous
            ses devis.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-700 to-slate-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Prêt à protéger votre entreprise ?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 6 assureurs cyber partenaires. Audit cyber gratuit inclus.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <Link
              href="/cyber-assurance"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-slate-800 shadow-lg transition hover:bg-gray-100"
            >
              → Pilier cyber assurance
            </Link>
            <Link
              href="/guides/assurance-rgpd"
              className="inline-block rounded-lg border border-white/30 bg-slate-800 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-slate-900"
            >
              → Guide RGPD entreprise
            </Link>
          </div>
        </div>
      </section>

      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif cyber assurance 2026 — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Calculateur interactif tarif cyber assurance 2026. 6 coefficients publics ACPR. 6 assureurs cyber comparés. Plafond modulable 100k€-10M€.',
            featureList: [
              'Calcul instantané 100% client-side',
              '6 coefficients tarifaires publics',
              'Barèmes 2026 réels 6 assureurs cyber',
              '9 secteurs (TPE → grandes entreprises)',
              'Calibrage maturité cyber (ISO 27001 = -22%)',
            ],
          },
          nonce
        )}
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

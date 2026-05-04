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
import { FactureForm } from '@/components/outils/FactureForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/modele-facture-pro'

export const metadata: Metadata = {
  title: 'Modèle facture pro PDF — Générateur gratuit auto-entrepreneur 2026 | Assurance Pro',
  description:
    "Générez votre facture professionnelle au format PDF en 2 minutes. Conforme art. L. 441-9 C. com. (mentions légales obligatoires) + mention assurance pro (décret 2024). Auto-entrepreneur, EI, EURL, SARL, SASU. Téléchargement immédiat, gratuit, sans inscription.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle facture pro PDF — Générateur gratuit 2026',
    description: "Facture pro PDF en 2 minutes. Conforme art. L. 441-9 C. com. Auto-entrepreneur + entreprises.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-cyan-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <span>Modèle facture pro PDF</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 100% gratuit, sans inscription, sans limite
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Modèle facture pro PDF
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Générez vos factures professionnelles au format PDF en 2 minutes. Conforme à
            l&apos;<strong>article L. 441-9 du Code de commerce</strong> (mentions légales
            obligatoires) et à l&apos;<strong>arrêté du 22 mars 2017</strong>. Auto-entrepreneur,
            EI, EURL, SARL, SASU — tous statuts. Téléchargement immédiat.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📄 Format PDF</strong><br />Téléchargement direct</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Art. L. 441-9</strong><br />Code de commerce</div>
            <div className="bg-white/10 rounded p-3"><strong>🔒 100% privé</strong><br />Aucune donnée envoyée</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Sans inscription</strong><br />Sans limite</div>
          </div>
        </div>
      </header>

      {/* GENERATEUR */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre facture</h2>
          <p className="text-gray-600 mb-6">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <FactureForm />
          </div>
        </div>
      </section>

      {/* MENTIONS OBLIGATOIRES */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Mentions obligatoires sur une facture pro 2026</h2>
          <p className="text-sm text-gray-700 mb-4">
            Imposées par l&apos;<strong>article L. 441-9 du Code de commerce</strong> et l&apos;arrêté
            du 22 mars 2017. Sanctions absence : amende administrative jusqu&apos;à <strong>375 000 €
            personne morale</strong> (art. L. 441-16 C. com.).
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li><strong>Identité émetteur</strong> : raison sociale, forme juridique, adresse, SIRET, n° TVA intracommunautaire</li>
            <li><strong>Identité destinataire</strong> : raison sociale, adresse, SIRET (B2B)</li>
            <li><strong>N° de facture</strong> unique et chronologique (art. 242 nonies A CGI)</li>
            <li><strong>Date d&apos;émission</strong> + date d&apos;échéance</li>
            <li><strong>Désignation détaillée</strong> des produits/services + quantités + prix unitaires HT</li>
            <li><strong>Total HT + TVA + TTC</strong> avec taux applicable</li>
            <li><strong>Conditions de paiement</strong> (délai max 60 jours / 45 jours fin de mois — Loi LME 2008)</li>
            <li><strong>Pénalités de retard</strong> (taux BCE + 10 points) + indemnité forfaitaire 40 € (art. D. 441-5 C. com.)</li>
            <li><strong>Mention TVA</strong> (« TVA non applicable, art. 293 B du CGI » pour les micro-entreprises sous franchise)</li>
            <li><strong>Mention assurance pro</strong> (depuis décret 2024 — pour BTP, santé, transport, conseil financier)</li>
          </ol>
        </div>
      </section>

      {/* CTA assurance pro */}
      <section className="py-12 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Mention assurance pro obligatoire ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Depuis le décret 2024, l&apos;assurance pro doit obligatoirement figurer sur les
            factures pour les artisans BTP (Loi Spinetta), professions de santé, conseil
            financier (CGP/CIF) et transport. Notre cabinet ORIAS vous transmet sous 24h
            3 à 5 propositions adaptées.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/outils/devis-rc-pro" className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis RC Pro (2 min)</a>
            <a href="/outils/devis-assurance-decennale" className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis décennale (2 min)</a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur modèle facture pro PDF — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de modèle de facture pro au format PDF. Conforme art. L. 441-9 C. com. + arrêté 22/03/2017. Auto-entrepreneur, EI, EURL, SARL, SASU.",
            featureList: [
              'Mentions légales obligatoires art. L. 441-9 C. com.',
              'Génération PDF côté navigateur (RGPD compliant)',
              'Mention assurance pro intégrée (décret 2024)',
              'Multi-statuts : AE, EI, EURL, SARL, SASU, SAS',
            ],
          }),
        }}
      />
    </main>
  )
}

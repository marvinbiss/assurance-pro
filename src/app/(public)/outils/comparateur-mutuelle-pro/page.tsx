/**
 * Outil — Comparateur mutuelle pro
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "comparateur mutuelle tns"        → 100 vol, KD 8, CPC 600€ ⭐
 * - "comparatif mutuelle tns"         →  90 vol, KD -
 * - "comparateur mutuelle santé tns"  →  70 vol, KD 7
 * - "devis mutuelle pro btp"          → 150 vol, KD 1, CPC 200€
 * - "comparatif prévoyance tns"       →  70 vol, KD - (vu dans piliers TNS)
 * - Famille mutuelle/prévoyance pro cumulée : ~600 vol/mois (CPC 200-600€)
 *
 * Stratégie : outil TRANSACTIONNEL qui couvre les 2 segments principaux
 * (TNS Madelin + BTP) en pré-remplissant garantie_code='mutuelle-pro'.
 * Réutilise l'API /api/devis-assurance et le composant DevisAssuranceForm
 * existants (RPC atomique, rate-limit, Sentry, emails Resend).
 *
 * Concurrent benchmark : pro.april.fr capte 357 vis/mois sur famille « april entreprise
 * prevoyance » via formulaire de devis dédié — pattern qu'on reproduit.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / comparateur-mutuelle-pro'

export const metadata: Metadata = {
  title: 'Comparateur mutuelle pro 2026 — TNS, BTP, dirigeant',
  description:
    'Comparateur mutuelle pro gratuit en 2 minutes : TNS Madelin déductible, mutuelle pro BTP (16k recherches par mois), mutuelle dirigeant SASU ou SAS. 6 assureurs comparés (PRO BTP, April Pro, MMA, Generali, Aon, Harmonie). Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Comparateur mutuelle pro 2026 — TNS Madelin + BTP + dirigeant',
    description:
      'Comparatif 6 mutuelles pro (PRO BTP, April, MMA, Generali, Aon, Harmonie). Devis sous 24h.',
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
      <header className="bg-gradient-to-br from-emerald-700 to-teal-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/mutuelle-pro" className="hover:underline">
              Mutuelle pro
            </Link>{' '}
            › <span>Comparateur mutuelle pro</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-amber-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ Madelin déductible (TNS) — économie ~1 750 € par an
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Comparateur mutuelle pro 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Comparatif gratuit des 6 principales mutuelles pro distribuées en France :
            <strong>
              {' '}
              PRO BTP, April Pro Santé, MMA Pro, Generali, Aon, Harmonie Mutuelle Pro
            </strong>
            . Tarifs négociés à partir de <strong>32 € par mois</strong> (formule TNS de base)
            jusqu&apos;à
            <strong> 280 € par mois</strong> (haut de gamme famille). Conseil ORIAS sous 24h.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 2 minutes</strong>
              <br />
              Formulaire
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📧 24h</strong>
              <br />
              3-5 propositions
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>💰 Madelin</strong>
              <br />
              Déductible TNS
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              ORIAS
            </div>
          </div>
        </div>
      </header>

      {/* TARIFS RÉFÉRENCE */}
      <section className="border-b bg-sand-50 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Tarifs mutuelle pro 2026 par profil</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white">
                <th className="border p-2 text-left">Profil</th>
                <th className="border p-2 text-left">Formule</th>
                <th className="border p-2 text-right">Cotisation mensuelle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Artisan TNS solo, 35 ans (BTP)</td>
                <td className="border p-2">PRO BTP Madelin Confort</td>
                <td className="border p-2 text-right">38 € – 62 €</td>
              </tr>
              <tr>
                <td className="border p-2">Consultant TNS solo, 35 ans (tertiaire)</td>
                <td className="border p-2">April Pro Santé Madelin</td>
                <td className="border p-2 text-right">32 € – 55 €</td>
              </tr>
              <tr>
                <td className="border p-2">Médecin libéral 40 ans</td>
                <td className="border p-2">MACSF Madelin Premium</td>
                <td className="border p-2 text-right">68 € – 110 €</td>
              </tr>
              <tr>
                <td className="border p-2">Dirigeant SASU ou SAS 45 ans (assimilé salarié)</td>
                <td className="border p-2">Régime collectif 1 personne</td>
                <td className="border p-2 text-right">95 € – 180 €</td>
              </tr>
              <tr>
                <td className="border p-2">Famille TNS 4 personnes (40 ans)</td>
                <td className="border p-2">Madelin Premium famille</td>
                <td className="border p-2 text-right">160 € – 280 €</td>
              </tr>
              <tr>
                <td className="border p-2">Salarié BTP collectif obligatoire</td>
                <td className="border p-2">ANI 2013 (50% employeur)</td>
                <td className="border p-2 text-right">~50% pris en charge</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs italic text-charcoal-600">
            Loi Madelin (art. 154 bis CGI) : pour TNS au régime réel, cotisations mutuelle +
            prévoyance déductibles dans plafond commun ~5 800 € par an pour 60 k€ de bénéfice
            (économie d&apos;impôt nette ~1 750 € par an à TMI 30%).
          </p>
        </div>
      </section>

      {/* FORMULAIRE — pré-rempli garantie_code='mutuelle-pro' */}
      <section className="py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Démarrer mon comparatif mutuelle pro</h2>
          <p className="mb-6 text-charcoal-600">
            3 étapes — 2 minutes. Vos données sont transmises uniquement aux 3-5 mutuelles
            sélectionnées pour votre profil (TNS, dirigeant assimilé salarié, BTP). Conformité RGPD
            + ACPR 2024-R-03 (devoir de conseil tracé).
          </p>
          <DevisAssuranceForm prefill={{ garantie_code: 'mutuelle-pro' }} />
        </div>
      </section>

      {/* COMPARATIF 6 MUTUELLES */}
      <section className="border-t bg-emerald-50 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Comparatif des 6 mutuelles pro distribuées en France
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white">
                <th className="border p-2 text-left">Mutuelle</th>
                <th className="border p-2 text-left">Spécialité</th>
                <th className="border p-2 text-left">Atout clé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <strong>PRO BTP</strong>
                </td>
                <td className="border p-2">Régime historique branche BTP</td>
                <td className="border p-2">
                  Réseau santé conventionné, prévoyance + retraite intégrées
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>April Pro Santé</strong>
                </td>
                <td className="border p-2">Multi-secteurs TNS</td>
                <td className="border p-2">Modulaire à la carte, app mobile, dématérialisation</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>MMA Pro Santé</strong>
                </td>
                <td className="border p-2">TPE — PME locales</td>
                <td className="border p-2">Réseau agences physique fort, conseiller dédié</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Generali Santé</strong>
                </td>
                <td className="border p-2">Cabinets libéraux + dirigeants</td>
                <td className="border p-2">
                  Garanties haut de gamme (médecines douces, optique premium)
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Aon Santé Pro</strong>
                </td>
                <td className="border p-2">Cadres + dirigeants haut de gamme</td>
                <td className="border p-2">Couverture expat OK, garanties premium</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Harmonie Mutuelle Pro</strong>
                </td>
                <td className="border p-2">Mutualiste TPE ou PME</td>
                <td className="border p-2">Sans actionnaire, prix attractifs entrée gamme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TNS vs ASSIMILÉ SALARIÉ — clé de choix */}
      <section className="border-t bg-white py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-xl font-bold">
            TNS vs assimilé salarié : impact sur votre mutuelle
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-sand-100">
                <th className="border p-2 text-left">Statut</th>
                <th className="border p-2 text-left">Régime</th>
                <th className="border p-2 text-left">Madelin éligible</th>
                <th className="border p-2 text-left">Mutuelle adaptée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">SARL gérant majoritaire</td>
                <td className="border p-2">TNS</td>
                <td className="border p-2">✅ OUI (régime réel)</td>
                <td className="border p-2">Madelin individuelle</td>
              </tr>
              <tr>
                <td className="border p-2">EI — EURL</td>
                <td className="border p-2">TNS</td>
                <td className="border p-2">✅ OUI (régime réel)</td>
                <td className="border p-2">Madelin individuelle</td>
              </tr>
              <tr>
                <td className="border p-2">Profession libérale BNC</td>
                <td className="border p-2">TNS</td>
                <td className="border p-2">✅ OUI</td>
                <td className="border p-2">Madelin individuelle</td>
              </tr>
              <tr>
                <td className="border p-2">Auto-entrepreneur micro-fiscal</td>
                <td className="border p-2">TNS</td>
                <td className="border p-2">❌ NON</td>
                <td className="border p-2">Mutuelle individuelle non-Madelin</td>
              </tr>
              <tr>
                <td className="border p-2">SASU — SAS président</td>
                <td className="border p-2">Assimilé salarié</td>
                <td className="border p-2">❌ NON</td>
                <td className="border p-2">Régime collectif (déductible 100% résultat)</td>
              </tr>
              <tr>
                <td className="border p-2">SARL gérant minoritaire</td>
                <td className="border p-2">Assimilé salarié</td>
                <td className="border p-2">❌ NON</td>
                <td className="border p-2">Régime collectif</td>
              </tr>
              <tr>
                <td className="border p-2">Salarié employeur</td>
                <td className="border p-2">Salarié</td>
                <td className="border p-2">❌</td>
                <td className="border p-2">
                  Mutuelle collective ANI 2013 obligatoire (50% employeur)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Comparateur mutuelle pro — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              'Comparateur mutuelle pro gratuit en 2 minutes. 6 mutuelles comparées (PRO BTP, April, MMA, Generali, Aon, Harmonie). TNS Madelin + dirigeant + BTP.',
          },
          nonce
        )}
      />
    </main>
  )
}

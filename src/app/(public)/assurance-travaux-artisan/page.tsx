/**
 * Pilier — Assurance travaux artisan
 * KW Ahrefs : "assurance travaux artisan" 150 vol KD 3 CPC 100€
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-travaux-artisan'
const TITLE = 'Assurance travaux artisan — Pack chantier 2026 (TRC, RC, décennale)'
const TAGLINE =
  "L'assurance dédiée aux TRAVAUX réalisés par un artisan : décennale + RC Pro travaux + TRC pour gros chantiers + garantie outillage embarqué."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance travaux artisan : pack chantier complet (décennale Loi Spinetta + RC Pro travaux + TRC + garantie outillage + véhicule pro). Pour artisans BTP réalisant des chantiers réguliers. Tarifs 980-2 800€ par an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance travaux artisan désigne le pack standard d'assurances nécessaires à un artisan BTP réalisant des chantiers de construction, rénovation ou aménagement. Elle combine 5 garanties : (1) décennale OBLIGATOIRE Loi Spinetta — couvre les dommages affectant la solidité de l'ouvrage 10 ans après réception, (2) RC Pro travaux — couvre les dommages causés AUX TIERS PENDANT le chantier (voisin, passant, client), (3) TRC (Tous Risques Chantier) recommandée pour gros chantiers — couvre les dommages AU CHANTIER LUI-MÊME, (4) garantie outillage embarqué — couvre l'outillage transporté + matériel sur chantier, (5) véhicule pro avec garantie marchandises. Tarifs 2026 : 980-2 800€ par an selon métier et taille. Cette page renvoie vers nos piliers spécialisés."
      legalReference="Loi Spinetta + Code des assurances + DTU"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: '5 garanties chantier',
          desc: 'Décennale + RC Pro + TRC + outillage + véhicule pro',
        },
        {
          icon: '⚖️',
          title: 'Décennale OBLIGATOIRE',
          desc: 'Loi Spinetta — sanctions absence : 75 000€ + 6 mois prison',
        },
        {
          icon: '🔧',
          title: 'Outillage embarqué',
          desc: "Couvre l'outillage transporté + matériel sur chantier (vol, casse, incendie)",
        },
        {
          icon: '💰',
          title: '980 € à 2 800 € par an',
          desc: 'AE peintre : 980€ par an. SARL maçonnerie 5 salariés : 2 800-6 800€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Hub travaux artisan : nos pages-piliers',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP
                  </Link>{' '}
                  — Loi Spinetta + 37 métiers
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale AE BTP
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-artisan" className="text-primary-600 underline">
                    Pack artisan complet
                  </Link>{' '}
                  — pilier transverse global
                </li>
                <li>
                  <Link href="/assurance-btp" className="text-primary-600 underline">
                    Hub BTP
                  </Link>{' '}
                  — 8 garanties détaillées
                </li>
                <li>
                  <Link href="/guides/tous-risques-chantier" className="text-primary-600 underline">
                    Guide TRC
                  </Link>
                </li>
                <li>
                  <Link href="/guides/parfait-achevement" className="text-primary-600 underline">
                    Guide GPA
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles assurances obligatoires pour un artisan en travaux ?',
          a: "DÉCENNALE (Loi Spinetta — TOUS artisans BTP) + assurance véhicule pro (RC circulation). RC Pro travaux et multirisque pro non obligatoires stricto sensu mais EXIGÉES par 100% des donneurs d'ordre B2B.",
        },
        {
          q: "Combien coûte l'assurance travaux d'un artisan en 2026 ?",
          a: 'AE peintre : 980€ par an. AE plombier ou électricien : 1 280-1 980€ par an. AE maçon : 1 580-2 380€ par an. SARL maçonnerie 5 salariés : 2 800-6 800€ par an. Variables : métier (sinistralité AQC), CA, antécédents.',
        },
        {
          q: 'Garantie outillage embarqué : utile ?',
          a: "OUI — un fourgon plombier transporte typiquement 10-25 k€ d'outillage. La garantie outillage couvre le vol nocturne (effraction véhicule) et les dommages sur chantier. Coût : 80-200€ par an. Indispensable.",
        },
        {
          q: 'Plus de détails sur les garanties travaux ?',
          a: "Voir nos pages dédiées : <a href='/assurance-btp' class='text-primary-600 underline'>/assurance-btp</a> (8 garanties détaillées), <a href='/assurance-artisan' class='text-primary-600 underline'>/assurance-artisan</a> (pack complet), <a href='/assurance-decennale' class='text-primary-600 underline'>/assurance-decennale</a> (Loi Spinetta).",
        },
      ]}
    />
  )
}

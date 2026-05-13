/**
 * Pilier — Décennale photovoltaïque (sous /assurance-decennale/[slug])
 * KW long-tail RGE PV : "assurance décennale photovoltaïque", "décennale RGE", "PV solaire artisan"
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/photovoltaique'
const TITLE = 'Décennale photovoltaïque RGE — Tarifs 2026 (installateur PV)'
const TAGLINE =
  'La décennale obligatoire pour installateurs photovoltaïques RGE : couverture spécifique panneaux solaires, onduleurs, étanchéité toiture. Tarifs majorés.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Décennale photovoltaïque RGE : OBLIGATOIRE Loi Spinetta + qualification RGE. Couverture panneaux solaires + onduleurs + étanchéité toiture. Sinistralité AQC 9,2% (incendies onduleurs). Tarifs 880-1 680€/an AE, 9 200-16 000€/an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale photovoltaïque est OBLIGATOIRE pour tout installateur de panneaux solaires en France (Loi Spinetta — art. L. 241-1 C. assur.) et CONDITIONNE le maintien de la qualification RGE (Reconnu Garant Environnement) qui est elle-même requise pour permettre aux clients de bénéficier de la prime à l'autoconsommation et de MaPrimeRénov'. Sinistralité AQC SYCODÉS 2024 : 9,2% (3e métier le plus sinistré du BTP) — principalement liée aux incendies d'onduleurs, aux défauts d'étanchéité de toiture (passage de câbles), et aux malfaçons sur les fixations (arrachements lors de tempêtes). Tarifs 2026 majorés de 30-90% vs un électricien BTP standard : 880-1 680 €/an pour un AE, 9 200-16 000 €/an pour SARL 5 salariés. Cette page détaille les spécificités."
      legalReference="Loi Spinetta (L. 241-1 C. assur.) + Décret RGE (qualification Qualibat / Qualit'EnR)"
      isObligatoire={true}
      benefits={[
        {
          icon: '☀️',
          title: 'OBLIGATION + RGE',
          desc: 'Loi Spinetta + maintien qualification RGE. Sinistralité AQC 9,2% (3e métier le plus sinistré BTP)',
        },
        {
          icon: '⚡',
          title: 'Onduleurs + panneaux',
          desc: 'Couverture spécifique : incendies onduleurs (top sinistre), défauts panneaux, micro-onduleurs',
        },
        {
          icon: '🏠',
          title: 'Étanchéité toiture',
          desc: 'Couverture passage de câbles + fixations sur toiture (arrachements, infiltrations)',
        },
        {
          icon: '💰',
          title: '880-1 680 €/an AE',
          desc: 'AE installateur PV. SARL 5 salariés : 9 200-16 000 €/an. Majoration +30-90% vs électricien BTP',
        },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale auto-entrepreneur BTP
                  </Link>{' '}
                  — pilier complet AE
                </li>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP
                  </Link>{' '}
                  — Loi Spinetta + 37 métiers
                </li>
                <li>
                  <Link href="/assurance-btp" className="text-primary-600 underline">
                    Hub BTP
                  </Link>{' '}
                  — 8 garanties
                </li>
                <li>
                  <Link href="/guides/attestation-decennale" className="text-primary-600 underline">
                    Guide attestation décennale
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale photovoltaïque : obligatoire vraiment ?',
          a: "OUI absolument — Loi Spinetta + maintien qualification RGE. Sans décennale RGE valide : (1) sanctions Spinetta 75 000€ + 6 mois prison, (2) PERTE de la qualification RGE, (3) clients ne peuvent plus bénéficier de la prime à l'autoconsommation ni de MaPrimeRénov' (= perte d'éligibilité aux marchés).",
        },
        {
          q: 'Pourquoi la décennale PV est-elle plus chère ?',
          a: "Sinistralité AQC SYCODÉS 2024 : 9,2% (3e métier le plus sinistré du BTP). Causes principales : incendies onduleurs (top sinistre), défauts d'étanchéité toiture (passage de câbles), malfaçons sur fixations (arrachements lors de tempêtes), arc électrique, dégradation panneaux. Tarif majoré +30-90% vs électricien BTP standard.",
        },
        {
          q: 'Combien coûte la décennale PV en 2026 ?',
          a: "AE installateur PV : 880-1 680€/an. SARL 5 salariés : 9 200-16 000€/an. Variables : CA, antécédents, ancienneté qualification RGE, présence d'auto-consommation collective dans le portefeuille. Notre cabinet ORIAS compare 8 assureurs spécialisés (SMABTP, MAAF Pro, April Pro RGE, Allianz Pro BTP).",
        },
      ]}
    />
  )
}

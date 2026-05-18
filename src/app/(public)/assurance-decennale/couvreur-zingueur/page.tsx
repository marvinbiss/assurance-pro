/**
 * Pilier — Décennale couvreur-zingueur (Couche B)
 *
 * KW Ahrefs (kw_universe) : "décennale couvreur" 100 vol KD 2 + "décennale toiture" + "décennale étanchéité" → 280+ vol/m
 * Sinistralité AQC SYCODÉS 2024 : 13,2% (TOP 1 BTP — étanchéité toiture)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/couvreur-zingueur'
const TITLE = 'Décennale couvreur-zingueur 2026 — Tarifs 820-1 540€ par an AE'
const TAGLINE =
  'La décennale obligatoire pour couvreur-zingueur : couverture spécifique étanchéité toiture (top sinistre BTP — sinistralité AQC 13,2%), zinc, chéneaux, isolation. Tarifs 2026 négociés.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale couvreur-zingueur 2026 : OBLIGATOIRE Loi Spinetta. Couverture étanchéité toiture (TOP 1 sinistre BTP — AQC 13,2%), zinc, chéneaux, isolation thermique toiture. Tarifs 820-1 540€ par an AE, 9 200-17 000€ par an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale couvreur-zingueur est OBLIGATOIRE pour tout artisan couvreur en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 13,2% — TOP 1 du BTP, principalement à cause des défauts d'étanchéité toiture (infiltrations apparaissant 1-3 ans après pose), des malfaçons sur zinc ou chéneaux, et des défauts d'isolation thermique en sous-toiture. Sinistre moyen : 24 800 € (3e plus élevé BTP). Tarifs 2026 majorés : 820-1 540 € par an pour un AE, 9 200-17 000 € par an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta — art. L. 241-1 C. assur. + DTU 40 (couverture)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Toute couverture toiture = ouvrage soumis décennale 10 ans. Sanctions : 75 000 € + 6 mois prison',
        },
        {
          icon: '🌧️',
          title: 'Étanchéité toiture (TOP 1)',
          desc: 'Sinistralité AQC 13,2% — métier le plus sinistré du BTP. Sinistre moyen 24 800€',
        },
        {
          icon: '🔧',
          title: 'Zinc + chéneaux + EPDM',
          desc: 'Couverture spécifique zinc, cuivre, ardoise, tuiles, EPDM, membranes étanchéité bitumineuses',
        },
        {
          icon: '💰',
          title: '820-1 540 € par an AE',
          desc: 'AE couvreur CA <50k€. SARL 5 sal : 9 200-17 000€ par an. Majoration +50-70% vs peintre',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité couvreur-zingueur 2024 (AQC SYCODÉS)',
          body: (
            <div>
              <p>Top 4 sinistres décennaux couvreur :</p>
              <ul>
                <li>
                  <strong>Infiltrations toiture (44%)</strong> — défaut pose tuiles, étanchéité
                  noues ou faîtages, raccord cheminée
                </li>
                <li>
                  <strong>Défauts zinc ou chéneaux (22%)</strong> — soudures défectueuses, pentes
                  insuffisantes
                </li>
                <li>
                  <strong>Isolation sous-toiture (17%)</strong> — pont thermique, condensation,
                  moisissures
                </li>
                <li>
                  <strong>Membrane EPDM toiture-terrasse (12%)</strong> — soudures défaillantes,
                  défauts collage
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 24 800 €. Top 1 BTP en sinistralité car la
                toiture protège l&apos;ensemble du bâtiment — toute fuite cause cascade de dégâts
                (charpente, isolation, plafonds, mobilier).
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <Link
                    href="/outils/calculateur-tarif-decennale"
                    className="text-primary-600 underline"
                  >
                    Calculateur tarif décennale couvreur
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outils/devis-assurance-decennale"
                    className="text-primary-600 underline"
                  >
                    Devis officiel ORIAS sous 24h
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/photovoltaique"
                    className="text-primary-600 underline"
                  >
                    Décennale photovoltaïque RGE
                  </Link>{' '}
                  (couvreur peut élargir activité)
                </li>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP — 37 métiers
                  </Link>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi décennale couvreur si chère ?',
          a: "Sinistralité AQC 13,2% (TOP 1 BTP) — 4× plus élevée qu'un peintre. Sinistre moyen 24 800€. Risque maximal car toiture = élément critique du bâtiment. Tarif majoré +50-70% vs peintre. Notre cabinet ORIAS travaille avec SMABTP, MAAF Pro et April Pro spécialisés couverture (les 3 seuls assureurs qui ne sur-tarifent pas excessivement).",
        },
        {
          q: 'EPDM — membrane bitumineuse couvert ?',
          a: 'OUI standard sur la décennale couvreur. Mais vérifier que les pentes <5° (toitures-terrasses) sont incluses — certains assureurs excluent les toitures plates considérées plus sinistrées (option +120-280€ par an).',
        },
        {
          q: 'Tarif décennale couvreur 2026 ?',
          a: 'AE couvreur (CA <50k€) : 820-1 540 € par an. EI : 880-1 620 € par an. EURL ou SASU : 1 100-2 080 € par an. SARL 5 salariés : 9 200-17 000 € par an. SAS 10 salariés : 17 000-26 000 € par an. Tarif majoré +50-70% vs peintre du fait sinistralité.',
        },
        {
          q: 'Travail en hauteur : RC Pro spécifique nécessaire ?',
          a: 'OUI fortement recommandé. La décennale couvre les sinistres ouvrage 10 ans après réception. Mais elle ne couvre PAS les accidents pendant le chantier (chute couvreur, chute outils sur passants). Pour ça : RC Pro chantier + Multirisque chantier (option +200-450€ par an). Notre cabinet groupe les 3 contrats.',
        },
      ]}
    />
  )
}

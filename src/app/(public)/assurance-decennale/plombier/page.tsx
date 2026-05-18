/**
 * Pilier — Décennale plombier-chauffagiste (Couche B industrialisée — guide métier)
 *
 * KW Ahrefs (kw_universe Supabase) :
 * - "assurance décennale plombier" → 150 vol KD 3 CPC 500€ ⭐
 * - "décennale plombier chauffagiste" → 50 vol
 * - "décennale plomberie" → 40 vol
 * - "tarif décennale plombier" → 30 vol KD 1 CPC 280€
 * - Famille cumulée : ~270 vol/m, intent commercial pur
 *
 * Sinistralité AQC SYCODÉS 2024 : 7,2% (3e métier le plus sinistré, dégâts eaux encastrés)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/plombier'
const TITLE = 'Décennale plombier-chauffagiste 2026 — Tarifs 540-980€ par an AE'
const TAGLINE =
  'La décennale obligatoire pour plombier-chauffagiste : couverture spécifique dégâts des eaux encastrés (top sinistre AQC 7,2%), chaudières, robinetterie. Tarifs 2026 négociés.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale plombier-chauffagiste 2026 : OBLIGATOIRE Loi Spinetta. Couverture dégâts des eaux encastrés (3e sinistre AQC), chaudières gaz ou condensation, plancher chauffant. Tarifs 540-980€ par an AE, 5 800-12 000€ par an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale plombier-chauffagiste est OBLIGATOIRE pour tout artisan plombier en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 7,2% — 3e métier le plus sinistré du BTP, principalement à cause des dégâts des eaux encastrés (canalisations enrobées dans le béton dont la fuite n'est pas détectable avant 2-5 ans), des malfaçons sur chaudières gaz et plancher chauffant. Tarifs 2026 : 540-980 € par an pour un AE (CA <50k€), 5 800-12 000 € par an pour SARL avec 5 salariés. Cette page détaille les spécificités."
      legalReference="Loi Spinetta — art. L. 241-1 C. assur. + arrêté 23 janvier 2024 (mentions attestation)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Toute installation plomberie ou chauffage = ouvrage soumis à décennale. Sanctions : 75 000 € + 6 mois prison',
        },
        {
          icon: '💧',
          title: 'Dégâts des eaux encastrés',
          desc: 'Top sinistre AQC : fuites canalisations enrobées. Couverture 10 ans après réception.',
        },
        {
          icon: '🔥',
          title: 'Chaudières + plancher chauffant',
          desc: 'Couverture spécifique gaz, condensation ou PAC + plancher chauffant (malfaçons fréquentes)',
        },
        {
          icon: '💰',
          title: '540-980 € par an AE',
          desc: 'AE plombier CA <50k€. SARL 5 sal : 5 800-12 000€. SAS 10 sal : 12 000-18 000€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité plombier-chauffagiste 2024 (AQC SYCODÉS)',
          body: (
            <div>
              <p>Les 4 sinistres décennaux les plus fréquents :</p>
              <ul>
                <li>
                  <strong>Dégâts des eaux encastrés (42%)</strong> — fuite sur canalisation enrobée
                  non visible
                </li>
                <li>
                  <strong>Malfaçons chaudière gaz (18%)</strong> — défaut raccord, mauvais réglage
                  combustion
                </li>
                <li>
                  <strong>Plancher chauffant défaillant (15%)</strong> — fuite circuit, mauvaise
                  isolation
                </li>
                <li>
                  <strong>Production ECS (chauffe-eau, ballon) (10%)</strong> — défaut installation
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 18 500 € (vs 8 200 € pour un peintre). Le
                coût élevé vient des travaux de démolition pour accéder aux canalisations
                encastrées.
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
                    Calculateur tarif décennale plombier
                  </Link>{' '}
                  — estimation 30 secondes
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
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP — Loi Spinetta + 37 métiers
                  </Link>
                </li>
                <li>
                  <Link href="/guides/attestation-decennale" className="text-primary-600 underline">
                    Guide attestation décennale (11 mentions arrêté 2024)
                  </Link>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale plombier obligatoire pour AE ?',
          a: "OUI absolument. Loi Spinetta s'applique à TOUS les artisans BTP indépendamment du statut juridique (AE, EI, EURL, SARL, SAS). Dès lors que vous réalisez une installation plomberie ou chauffage qui devient un ouvrage immobilier, la décennale est obligatoire avant ouverture du chantier (sanctions 75 000 € + 6 mois prison + interdiction d'exercer).",
        },
        {
          q: 'Tarif décennale plombier 2026 ?',
          a: 'AE plombier (CA <50k€) : 540-980 € par an. EI : 580-1 080 € par an. EURL ou SASU : 720-1 320 € par an. SARL 5 salariés : 5 800-12 000 € par an. SAS 10 salariés : 12 000-18 000 € par an. Notre cabinet ORIAS compare 8 assureurs spécialisés BTP (SMABTP, MAAF Pro, April Pro, AXA Pro, Allianz Pro BTP).',
        },
        {
          q: 'Mon ancienneté plombier influe sur le tarif ?',
          a: "OUI fortement. Sur-prime nouveau plombier (1re année) : +18%. Bonus fidélité après 5 ans sans sinistre : -7%. Si relevé d'information AGIRA propre 5 ans : -15%. Notre cabinet négocie ces leviers à chaque devis.",
        },
        {
          q: 'Je sous-traite à un autre plombier : qui est responsable ?',
          a: "VOUS restez responsable décennalement (art. 1792-4 C. civ.). Le sous-traitant est responsable contractuellement envers vous mais le maître d'ouvrage attaque l'entreprise principale (vous). Solution : exiger l'attestation décennale du sous-traitant + ajouter une garantie 'sous-traitance' à votre contrat (option +50-150€ par an).",
        },
      ]}
    />
  )
}

/**
 * Pilier — Décennale maçon gros œuvre (Couche B)
 *
 * KW Ahrefs (kw_universe) : "décennale maçon" 80 vol KD 2 + tail "tarif décennale maçon" + "décennale maçonnerie" → famille 200+ vol/m
 * Sinistralité AQC SYCODÉS 2024 : 11,4% (fissures structurelles, top 4 BTP)
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/macon'
const TITLE = 'Décennale maçon gros œuvre 2026 — Tarifs 720-1 380€/an AE'
const TAGLINE =
  'La décennale obligatoire pour maçon gros œuvre : couverture spécifique fissures structurelles, fondations, dalles, murs porteurs. Sinistralité AQC 11,4% (top 4 BTP). Tarifs 2026 négociés.'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'Décennale maçon 2026 : OBLIGATOIRE Loi Spinetta. Couverture fissures structurelles (top sinistre AQC 11,4%), fondations, dalles béton, murs porteurs. Tarifs 720-1 380€/an AE, 7 800-15 000€/an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale maçon gros œuvre est OBLIGATOIRE pour tout artisan maçon en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 11,4% — 4e métier le plus sinistré du BTP, principalement sur les fissures structurelles (apparition 3-7 ans après réception), défauts de fondations, dalles béton fissurées et murs porteurs sous-dimensionnés. Sinistre moyen : 28 500 € (le plus élevé du BTP après les charpentiers). Tarifs 2026 : 720-1 380 €/an pour un AE (CA <50k€), 7 800-15 000 €/an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta — art. L. 241-1 C. assur. + DTU 20.1 (maçonnerie béton)"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Tout ouvrage maçonnerie = soumis décennale 10 ans. Sanctions : 75 000 € + 6 mois prison',
        },
        {
          icon: '🏗️',
          title: 'Fissures structurelles',
          desc: 'Top sinistre AQC : apparition 3-7 ans, indemnité moyenne 28 500€',
        },
        {
          icon: '🧱',
          title: 'Fondations + murs porteurs',
          desc: 'Couverture spécifique fondations sous-dimensionnées + dalles béton fissurées',
        },
        {
          icon: '💰',
          title: '720-1 380 €/an AE',
          desc: 'AE maçon CA <50k€. SARL 5 sal : 7 800-15 000€/an. Tarif majoré +30% vs peintre',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité maçon 2024 (AQC SYCODÉS)',
          body: (
            <div>
              <p>Top 4 sinistres décennaux maçon :</p>
              <ul>
                <li>
                  <strong>Fissures structurelles murs porteurs (38%)</strong> — défaut chaînage,
                  sous-dimensionnement
                </li>
                <li>
                  <strong>Défauts fondations (24%)</strong> — étude sol insuffisante, gel,
                  retrait-gonflement argile
                </li>
                <li>
                  <strong>Dalles béton fissurées (18%)</strong> — défaut ferraillage, joints
                  dilatation absents
                </li>
                <li>
                  <strong>Étanchéité sous-sol défaillante (12%)</strong> — drainage insuffisant
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 28 500 € (le plus élevé BTP). Coût élevé car
                fissures structurelles imposent souvent renforcement charpente + reprise des
                fondations en sous-œuvre.
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
                  <a
                    href="/outils/calculateur-tarif-decennale"
                    className="text-primary-600 underline"
                  >
                    Calculateur tarif décennale maçon
                  </a>
                </li>
                <li>
                  <a
                    href="/outils/devis-assurance-decennale"
                    className="text-primary-600 underline"
                  >
                    Devis officiel ORIAS sous 24h
                  </a>
                </li>
                <li>
                  <a href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP — 37 métiers
                  </a>
                </li>
                <li>
                  <a href="/guides/dommages-ouvrage" className="text-primary-600 underline">
                    Dommages ouvrage (DO) — assurance maître d&apos;ouvrage complémentaire
                  </a>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale maçon obligatoire ?',
          a: "OUI absolument. Loi Spinetta s'applique à tous les artisans réalisant des ouvrages immobiliers (maçonnerie = ouvrage par excellence). Sanctions absence : 75 000 € + 6 mois prison + interdiction d'exercer + responsabilité civile/pénale personnelle.",
        },
        {
          q: 'Pourquoi tarif maçon plus élevé ?',
          a: 'Sinistralité AQC 11,4% (vs 3,1% peintre) + sinistre moyen 28 500€ (vs 8 200€ peintre). Risque structural majeur. Notre cabinet négocie -15% en regroupant RC Pro + décennale + multirisque chantier.',
        },
        {
          q: 'Étude de sol obligatoire ?',
          a: "OUI depuis Loi ELAN 2018 + arrêté 22 juillet 2020 : étude sol G2 obligatoire en zones à risque retrait-gonflement argile (48% du territoire). Sans étude G2 conforme : la décennale couvre quand même MAIS l'assureur peut se retourner contre vous (recours subrogatoire) si le sinistre est lié au défaut d'étude.",
        },
        {
          q: 'Tarif décennale maçon 2026 ?',
          a: 'AE maçon (CA <50k€) : 720-1 380 €/an. EI : 760-1 450 €/an. EURL/SASU : 980-1 880 €/an. SARL 5 salariés : 7 800-15 000 €/an. SAS 10 salariés : 15 000-24 000 €/an.',
        },
      ]}
    />
  )
}

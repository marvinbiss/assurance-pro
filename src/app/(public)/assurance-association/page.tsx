/**
 * Pilier — Assurance association loi 1901
 * KW Ahrefs : "rc pro association" 100 vol KD 2 + famille 400 vol cumulé
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_MULTIRISQUE,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-association'
const TITLE = 'Assurance association loi 1901 — Pack RC + multirisque + dirigeants 2026'
const TAGLINE =
  "L'assurance dédiée aux associations loi 1901 : RC Pro association + multirisque local + RC dirigeants bénévoles + protection juridique. Tarifs accessibles."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance association loi 1901 : RC Pro (responsabilité envers adhérents et tiers), multirisque local, RC dirigeants bénévoles, protection juridique. Pack 280-1 480€ par an selon taille. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance association loi 1901 est le pack standard pour structures associatives à but non lucratif (associations sportives, culturelles, sociales, humanitaires, syndicats professionnels). Particularité : la responsabilité des dirigeants BÉNÉVOLES peut être engagée personnellement en cas de faute de gestion (Cass. 1re civ., 1996) — d'où l'importance de la RC Mandataire Social bénévole. Le pack standard combine 4 garanties : (1) RC Pro association — couvre les dommages causés aux adhérents (chute en activité, blessure pendant compétition sportive, incident en camp colonie) et aux tiers, (2) multirisque local (si association a un siège ou local d'activité), (3) RC dirigeants bénévoles (faute de gestion) — INDISPENSABLE depuis jurisprudence 1996, (4) protection juridique association (litige adhérent, contentieux subvention). Tarifs 2026 : 280-1 480 € par an selon taille et activité."
      legalReference="Loi 1901 + Code des assurances + Jurisprudence Cass. 1re civ. 1996 (RC dirigeants bénévoles)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🤝',
          title: 'RC association',
          desc: 'Dommages causés aux adhérents (chute, blessure, incident camp ou colo) et tiers',
        },
        {
          icon: '👨‍💼',
          title: 'RC dirigeants bénévoles',
          desc: 'Protection personnelle en cas de faute de gestion (Cass. 1996) — indispensable',
        },
        {
          icon: '🏠',
          title: 'Multirisque local',
          desc: "Siège, local d'activité, matériel pédagogique ou sportif",
        },
        {
          icon: '💰',
          title: 'À partir de 280 € par an',
          desc: 'Petite association < 50 adhérents. Asso sportive 200+ adhérents : 880-1 480€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs assurance association 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Profil association</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Petite association &lt; 50 adhérents (culturelle)
                    </td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Asso sportive 100-200 adhérents (sport collectif)
                    </td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Asso sportive 200+ adhérents (sport à risque)</td>
                    <td className="border p-2 text-right">880 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Asso humanitaire — sociale (1-3 salariés)</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Asso éducative (camp ou colo enfants)</td>
                    <td className="border p-2 text-right">1 200 € – 2 800 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance association est-elle obligatoire ?",
          a: 'Pas légalement obligatoire pour TOUTES les associations, mais OBLIGATOIRE pour : (1) associations sportives affiliées à une fédération (RC sport L. 321-1 Code du sport), (2) associations organisant des événements ouverts au public (RC organisateur), (3) associations employeur (RC employeur + mutuelle ANI 2013 obligatoire). Pour les autres : FORTEMENT recommandée — la RC dirigeants bénévoles protège votre patrimoine personnel.',
        },
        {
          q: 'Combien coûte une assurance association en 2026 ?',
          a: 'Petite asso < 50 adhérents : 280-480€ par an. Asso sportive 100-200 adhérents : 580-980€ par an. Asso sportive risque (escalade, équitation, ski) : 880-1 480€ par an. Asso éducative camp ou colo : 1 200-2 800€ par an. Variables : nombre adhérents, activité (sport à risque majoré), présence salariés.',
        },
        {
          q: 'RC dirigeants bénévoles : utile vraiment ?',
          a: "OUI absolument depuis l'arrêt Cass. 1re civ. 1996 qui a confirmé la responsabilité personnelle illimitée des dirigeants bénévoles en cas de faute de gestion. Sinistre type : 50 000-500 000€ (recours par adhérent ou créancier après défaillance association). Tarif option : ~80-200€ par an supplémentaire. Indispensable.",
        },
      ]}
    />
  )
}

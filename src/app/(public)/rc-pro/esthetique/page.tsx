/**
 * Pilier — RC Pro esthétique / esthéticienne
 * KW Ahrefs : "rc pro estheticienne" 150 vol KD 0 + "rc pro esthéticienne" 100 vol KD 0
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro / esthetique'
const TITLE = 'RC Pro esthéticienne — Tarifs 2026 (institut, à domicile, prothésiste)'
const TAGLINE =
  "L'assurance RC Pro pour esthéticiennes : institut beauté, esthétique à domicile, prothésiste ongulaire, masseur bien-être. Couverture brûlure, allergie, blessure."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro esthéticienne OBLIGATOIRE pour actes invasifs (épilation cire chaude, soins visage, prothèses ongulaires). Couverture brûlures, allergies cosmétiques, blessures. Tarifs 280-880€ par an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro esthéticienne est OBLIGATOIRE pour tout praticien effectuant des ACTES ESTHÉTIQUES INVASIFS : épilation à la cire chaude (brûlures fréquentes), épilation laser (qualifiée d'acte médical depuis 2020 — SEUL UN MÉDECIN PEUT LA PRATIQUER LÉGALEMENT), soins du visage avec produits cosmétiques actifs, micro-needling, peelings chimiques, pose de prothèses ongulaires (allergies acrylates), modelages corporels invasifs. Couvre les sinistres typiques : brûlures cuir ou peau, allergies cosmétiques sévères (œdème de Quincke), blessures coupantes (manucure), infections (matériel mal stérilisé). Tarifs 2026 : 280-880€ par an selon profil. Cette page vise esthéticiennes en institut, à domicile, prothésistes ongulaires et masseurs bien-être (NB : massage thérapeutique = acte médical réservé kinésithérapeutes)."
      legalReference="Code des assurances L. 113-1 + Code de la santé publique (actes invasifs)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💆',
          title: 'Actes invasifs',
          desc: 'Brûlures cire chaude, allergies cosmétiques, infections matériel mal stérilisé',
        },
        {
          icon: '💅',
          title: 'Prothésiste ongulaire',
          desc: 'Allergies acrylates (TOP sinistre métier), brûlures lampe UV, infections panaris',
        },
        {
          icon: '🏠',
          title: 'Domicile + institut',
          desc: 'Couverture spécifique selon configuration (extension habitation pro si domicile)',
        },
        {
          icon: '💰',
          title: 'À partir de 280 € par an',
          desc: 'AE esthéticienne à domicile. Institut beauté 80m² : 580-880€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro esthétique 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE esthéticienne à domicile</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE prothésiste ongulaire à domicile</td>
                    <td className="border p-2 text-right">320 € – 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI institut beauté solo (50m²)</td>
                    <td className="border p-2 text-right">480 € – 720 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL institut 80m² + 3 salariées</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Spa — institut haut de gamme Paris</td>
                    <td className="border p-2 text-right">1 200 € – 2 200 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro esthéticienne est-elle obligatoire ?',
          a: 'OUI pour les actes ESTHÉTIQUES INVASIFS (épilation cire chaude, soins visage actifs, prothèses ongulaires, peelings, micro-needling). Code de la santé publique. Sans RC Pro : sanctions + responsabilité personnelle illimitée en cas de sinistre.',
        },
        {
          q: 'Épilation laser : qui peut la pratiquer ?',
          a: "SEUL UN MÉDECIN peut pratiquer l'épilation laser légalement en France depuis l'arrêt du Conseil d'État de 2020. Une esthéticienne pratiquant l'épilation laser COMMET UN EXERCICE ILLÉGAL DE LA MÉDECINE — sanctions pénales + nullité de toute couverture RC Pro.",
        },
        {
          q: 'Combien coûte la RC Pro esthéticienne en 2026 ?',
          a: 'AE à domicile : 280-480€ par an. Institut solo : 480-720€ par an. Institut 3 salariées : 680-1 100€ par an. Spa Paris : 1 200-2 200€ par an. Variables : actes pratiqués (épilation cire majoré), surface, salariées, antécédents.',
        },
      ]}
    />
  )
}

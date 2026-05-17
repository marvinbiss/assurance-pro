/**
 * Pilier — RC Pro coiffeur
 * KW Ahrefs : "rc pro coiffeur" 200 vol + "assurance professionnelle coiffeur" 30 vol
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro / coiffeur'
const TITLE = 'RC Pro coiffeur — Tarifs 2026 (salon, barbier, à domicile)'
const TAGLINE =
  "L'assurance RC pro pour coiffeurs : salon coiffure, barbier, coiffeur à domicile. Couverture brûlure cuir chevelu, allergie produits, casse matériel client."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro coiffeur : couvre brûlures cuir chevelu, allergies coloration, casse lunettes ou portable client en salon. Plafond 1,5 M€. Tarifs 220-580€ par an (AE) — 580-1 200€ par an (salon). Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro coiffeur couvre les dommages causés aux clients dans le cadre de l'activité de coiffure : brûlures du cuir chevelu (mauvaise utilisation du fer, eau trop chaude), allergies aux produits de coloration ou de décoloration (test allergique non effectué), casse d'objets personnels du client (lunettes, portable posé sur le meuble), chute en salon (sol glissant). Pour les professions réglementées (coiffeurs ayant le Brevet Professionnel coiffure, obligation Code de la santé publique pour les actes invasifs comme l'épilation à la cire chaude), la RC Pro est OBLIGATOIRE. Pour les coiffeurs à domicile : extension assurance habitation pro indispensable. Tarifs 2026 : 220-580€ par an pour AE coiffeur à domicile, 580-1 200€ par an pour salon avec 1-3 salariés."
      legalReference="Code des assurances L. 113-1 + Code de la santé publique (actes invasifs)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '✂️',
          title: 'Brûlures cuir chevelu',
          desc: 'Mauvaise utilisation fer ou eau chaude — sinistre type 2 000-15 000€',
        },
        {
          icon: '⚠️',
          title: 'Allergies coloration',
          desc: 'Réaction allergique sévère — test obligatoire avant 1re coloration',
        },
        {
          icon: '📱',
          title: 'Casse matériel client',
          desc: 'Lunettes, portable, sac à main posés à proximité — couverts',
        },
        {
          icon: '💰',
          title: 'À partir de 220 € par an',
          desc: 'AE coiffeur à domicile. Salon 3 salariés : 580-1 200€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro coiffeur 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE coiffeur à domicile solo</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI barbier solo (boutique 30m²)</td>
                    <td className="border p-2 text-right">380 € – 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Salon coiffure 60m² + 2 salariés</td>
                    <td className="border p-2 text-right">580 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Salon coiffure 100m² + 5 salariés</td>
                    <td className="border p-2 text-right">880 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Salon haut de gamme Paris (esthétique combinée)</td>
                    <td className="border p-2 text-right">1 200 € – 2 200 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Pour salon avec local : ajouter multirisque local commercial 380-680€ par an. Voir{' '}
                <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                  /assurance-local-commercial
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro coiffeur est-elle obligatoire ?',
          a: 'Pour les coiffeurs effectuant des ACTES INVASIFS (épilation cire chaude, coloration permanente, défrisage chimique) : OBLIGATOIRE (Code santé publique). Pour les coiffeurs classiques : pas légalement obligatoire mais EXIGÉE par 100% des clients institutionnels et fortement recommandée — un seul sinistre allergique grave peut atteindre 50 000€.',
        },
        {
          q: 'Combien coûte la RC Pro coiffeur en 2026 ?',
          a: "AE coiffeur à domicile : 220-380€ par an. Barbier solo en boutique : 380-580€ par an. Salon 2 salariés : 580-880€ par an. Salon 5 salariés : 880-1 480€ par an. Variables : surface, présence salariés, type d'actes (esthétique combinée majoré).",
        },
        {
          q: 'Coiffeur à domicile : assurance habitation suffit ?',
          a: "NON — l'assurance habitation classique ne couvre PAS l'activité pro à domicile. Il faut soit étendre l'habitation (option « activité pro à domicile » +80-150€ par an) soit souscrire une RC Pro coiffeur dédiée (220-380€ par an). Voir <a href='/assurance-habitation-professionnelle' class='text-primary-600 underline'>/assurance-habitation-professionnelle</a>.",
        },
      ]}
    />
  )
}

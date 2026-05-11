/**
 * Pilier — "rc pro pas cher" (TIER S/A — 450 vol/mois, KD 11, CPC 500€)
 * Angle PRIX + LEVIERS ÉCONOMIES.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'rc-pro-pas-cher'
const TITLE = 'RC Pro pas chère — Tarifs 2026 dès 95€/an, 6 leviers d&apos;économies'
const TAGLINE =
  'Trouver une RC Pro pas chère sans risquer un défaut de couverture : 6 leviers concrets pour réduire votre prime, fourchettes par profession et pièges à éviter.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "RC Pro pas chère : tarif à partir de 95€/an (AE freelance services), 180€/an (SARL). 6 leviers d'économies, pièges des contrats low-cost, comparatif Hiscox / Stello / Allianz.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Une RC Pro pas chère ne doit pas signifier mal couverte. Cette page détaille les 6 leviers réels pour réduire votre prime (sans sacrifier les garanties critiques), les fourchettes de prix marché 2026 par profession, et les 4 pièges fréquents des contrats low-cost qui peuvent coûter cher en cas de sinistre."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '💰',
          title: 'Dès 95€/an',
          desc: 'Auto-entrepreneur services intellectuels (freelance, consultant)',
        },
        {
          icon: '📉',
          title: '6 leviers d&apos;économies',
          desc: 'Statut, franchise, plafond, multi-contrats, ORIAS spécialisé',
        },
        {
          icon: '⚠️',
          title: '4 pièges low-cost',
          desc: 'Exclusions cachées, postériorité limitée, franchise élevée, solidité faible',
        },
        {
          icon: '✅',
          title: 'Conformité garantie',
          desc: 'Plafonds réglementaires respectés selon profession',
        },
      ]}
      sections={[
        {
          h2: '6 leviers pour une RC Pro moins chère',
          body: (
            <>
              <ol>
                <li>
                  <strong>Comparer 5 assureurs minimum</strong> : la prime varie de ×2-3 entre
                  Hiscox, Stello, Allianz, AXA, MMA pour un même profil. Un courtier ORIAS
                  spécialisé fait gagner 15-25%.
                </li>
                <li>
                  <strong>Augmenter la franchise</strong> : passer de 500€ à 1 500€ peut réduire la
                  prime de 15-20%.
                </li>
                <li>
                  <strong>Choisir le plafond adapté (sans sur-assurer)</strong> : pour un freelance
                  avec CA &lt; 50k€, 500k€ de plafond suffit (vs 2M€ par défaut = +30% prime
                  inutile).
                </li>
                <li>
                  <strong>Souscrire en paquet</strong> : RC Pro + Multirisque Pro + Protection
                  Juridique ensemble = -10-15% vs contrats séparés.
                </li>
                <li>
                  <strong>Paiement annuel</strong> : -3 à -7% vs mensualisation.
                </li>
                <li>
                  <strong>Antériorité de couverture continue</strong> : 3+ ans sans sinistre =
                  remises 5-15% chez la plupart des assureurs.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs RC Pro 2026 par profession (auto-entrepreneur)',
          body: (
            <>
              <ul>
                <li>
                  <strong>Consultant / freelance IT</strong> : 95-180€/an
                </li>
                <li>
                  <strong>Coach / formateur</strong> : 120-250€/an
                </li>
                <li>
                  <strong>Designer / photographe</strong> : 130-280€/an
                </li>
                <li>
                  <strong>Agence web / communication</strong> : 180-400€/an
                </li>
                <li>
                  <strong>Esthéticienne / coiffeur à domicile</strong> : 150-300€/an
                </li>
                <li>
                  <strong>Professeur de yoga / coach sportif</strong> : 200-400€/an (risque
                  corporel)
                </li>
                <li>
                  <strong>BTP (en complément décennale)</strong> : 250-450€/an
                </li>
                <li>
                  <strong>Médecin / paramédical</strong> : 800-2 500€/an (réglementaire)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: '4 pièges des contrats RC Pro low-cost',
          body: (
            <>
              <ol>
                <li>
                  <strong>Exclusions étendues</strong> : exclusion erreurs informatiques pour les
                  freelances IT, exclusion conseils financiers pour les consultants, exclusion
                  sous-traitance non déclarée.
                </li>
                <li>
                  <strong>Postériorité limitée à 2-5 ans</strong> : standard idéal = 10 ans. Vos
                  sinistres déclarés après peuvent retomber sur votre patrimoine personnel.
                </li>
                <li>
                  <strong>Franchise relative</strong> : un &quot;sinistre&quot; déclenche une
                  franchise par poste de préjudice (corporel + matériel + immatériel = ×3).
                </li>
                <li>
                  <strong>Assureur faiblement noté</strong> : un assureur étranger non agréé ACPR
                  peut refuser de payer en cas de gros sinistre. Vérifier rating Pappers + S&amp;P
                  (A minimum).
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la RC Pro la moins chère pour un freelance ?',
          a: 'Pour un freelance services intellectuels (consultant, IT, designer, rédacteur), CA < 50k€ : Hiscox et Stello offrent souvent 95-180€/an avec 500k€-1M€ de plafond et postériorité 5-10 ans. Allianz Pro et AXA sont plus chers (~200-400€/an) avec services annexes.',
        },
        {
          q: 'Peut-on avoir une RC Pro à moins de 100€/an ?',
          a: 'Oui pour un auto-entrepreneur services intellectuels (consultant, freelance IT) avec CA < 30k€ et 500k€ de plafond. En-dessous de 80€/an = suspicion de couverture insuffisante ou exclusions étendues.',
        },
        {
          q: 'Comment réduire ma prime RC Pro de 30% ?',
          a: 'Combiner : 1) Courtier ORIAS spécialisé (-15-25%), 2) Franchise 1 500€ au lieu de 500€ (-15-20%), 3) Paiement annuel (-3-7%), 4) Plafond ajusté CA (-10-30% si sur-assuré). Économie cumulée : 30-45%.',
        },
        {
          q: 'Le moins cher est-il toujours le mieux ?',
          a: 'Non. La RC Pro est un produit asymétrique : économie de 100€/an vs sinistre potentiel de 50 000-200 000€. Privilégier le rapport prix/garanties/postériorité plutôt que le prix seul. Un courtier ORIAS peut équilibrer pour vous.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (pilier global)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro consultant', slug: 'rc-pro/informatique' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

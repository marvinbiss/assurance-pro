/**
 * Pilier — Assurance auto professionnelle (Couche B)
 * KW Ahrefs : "assurance professionnelle automobile" 200 vol KD 1 CPC 500€ + tail "assurance auto pro" 100 → 320 vol/m
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-auto-professionnelle'
const TITLE = 'Assurance auto professionnelle 2026 — Véhicules pro tous usages (480-2 800€/an)'
const TAGLINE =
  "L'assurance auto professionnelle pour véhicule à usage pro : VUL, VL société, voiture commerciale, véhicule de fonction. Différente de l'assurance auto perso. Obligation art. L. 211-1 C. assur."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance auto professionnelle 2026 : OBLIGATOIRE pour tout véhicule à usage pro (art. L. 211-1 C. assur.). Couvre VUL, VL société, voiture commerciale, véhicule de fonction. Tarifs 480-2 800€/an selon profil. Distinct assurance auto perso. Devis ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance auto professionnelle est OBLIGATOIRE pour tout véhicule utilisé à des fins professionnelles en France (art. L. 211-1 du Code des assurances). Elle est DISTINCTE de l'assurance auto personnelle car les risques pro sont différents : kilométrage plus élevé (~25-50 000 km/an vs 12 000 perso), trajets professionnels (visites client, livraison, chantier), véhicule souvent stationné en zone urbaine dense, transport occasionnel de matériel. Ne PAS déclarer l'usage pro sur une assurance auto perso = NULLITÉ du contrat en cas de sinistre (art. L. 113-9 C. assur.). Tarifs 2026 : 480-2 800 €/an pour véhicule unique selon profil. 6 assureurs partenaires (MMA Pro Auto, AXA Pro Auto, Allianz Pro Auto, Generali, MAIF Pro, MACIF Pro)."
      legalReference="Art. L. 211-1 C. assur. (obligation) + L. 113-9 (nullité fausse déclaration usage)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION L. 211-1 C. assur.',
          desc: 'Tout véhicule à usage pro doit être assuré spécifiquement. Sanction : amende 3 750€ + immobilisation',
        },
        {
          icon: '🚗',
          title: 'Tous types véhicules pro',
          desc: 'VUL (utilitaires), VL société, voiture commerciale, véhicule de fonction, leasing pro',
        },
        {
          icon: '⚠️',
          title: 'Distinct auto perso',
          desc: 'Usage pro NON déclaré sur auto perso = nullité contrat (art. L. 113-9 C. assur.)',
        },
        {
          icon: '💰',
          title: '480-2 800 €/an unique',
          desc: 'Véhicule unique 480-1 280€. Flotte 5 véhicules : 5 200-12 000€/an. Variables : usage, zone, antécédents',
        },
      ]}
      sections={[
        {
          h2: 'Différences usage pro vs perso',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Auto perso</th>
                    <th className="border p-2 text-left">Auto pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Kilométrage annuel</td>
                    <td className="border p-2">~12 000 km</td>
                    <td className="border p-2">25-50 000 km</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Trajets type</td>
                    <td className="border p-2">Domicile-loisirs</td>
                    <td className="border p-2">Visites clients, livraison, chantier</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Stationnement</td>
                    <td className="border p-2">Garage privé souvent</td>
                    <td className="border p-2">Voie publique zone urbaine</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport matériel</td>
                    <td className="border p-2">Effets perso uniquement</td>
                    <td className="border p-2">Matériel pro, marchandises occasionnelles</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Tarif moyen 2026</td>
                    <td className="border p-2">480-980 €/an</td>
                    <td className="border p-2">680-1 580 €/an (+25-40%)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Garanties supplémentaires</td>
                    <td className="border p-2">RC + dommages standard</td>
                    <td className="border p-2">
                      + contenu pro + perte exploitation + véhicule remplacement
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <Link href="/assurance-flotte-automobile" className="text-primary-600 underline">
                  Assurance flotte automobile (5+ véhicules)
                </Link>
              </li>
              <li>
                <Link href="/outils/calculateur-tarif-vtc" className="text-primary-600 underline">
                  Calculateur tarif VTC (transport personnes)
                </Link>
              </li>
              <li>
                <Link href="/rc-pro/transport-marchandises" className="text-primary-600 underline">
                  RC Pro transport de marchandises
                </Link>
              </li>
              <li>
                <Link href="/multirisque-pro" className="text-primary-600 underline">
                  Pilier multirisque pro
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Auto perso peut couvrir usage pro occasionnel ?',
          a: "OUI mais avec déclaration explicite à votre assureur ('usage privé + trajets travail' ou 'usage privé + déplacements professionnels occasionnels'). Sans déclaration, tout sinistre survenant en trajet pro = NULLITÉ contrat. Au-delà de 5 000 km pro/an : passer en auto pro est obligatoire.",
        },
        {
          q: 'Véhicule au nom de la société : assurance pro obligatoire ?',
          a: "OUI absolument. Tout véhicule immatriculé au nom d'une société (carte grise au nom SARL/SAS/EURL/SASU) doit être assuré en auto pro. Aucune exception même si usage 100% privé du dirigeant. Sanction : amende 3 750€ + immobilisation véhicule.",
        },
        {
          q: 'Tarif assurance auto pro 2026 ?',
          a: 'VL société véhicule unique (CA <500k€, conducteur 35-55 ans, métropole, antécédents propres) : 680-1 280 €/an. VUL utilitaire : 880-1 580 €/an. Voiture commerciale haut kilométrage (50k+ km/an) : 1 280-2 200 €/an. Flotte 5 véhicules : 5 200-12 000 €/an. Variables : zone (Paris +20%), antécédents, formule.',
        },
        {
          q: 'Différence avec assurance VTC ?',
          a: 'Assurance VTC = transport DE PASSAGERS contre rémunération (Loi LOTI). Garantie spécifique passagers + RC pro corporels passagers. Assurance auto pro = transport BIENS/MATÉRIEL ou usage pro sans transport personnes payant. Voir notre /outils/calculateur-tarif-vtc pour VTC spécifique.',
        },
      ]}
    />
  )
}

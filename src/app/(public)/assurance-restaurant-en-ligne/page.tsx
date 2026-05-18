/**
 * Pilier — Assurance restaurant en ligne (Couche B)
 * KW Ahrefs : "assurance restaurant en ligne" 150 vol KD null CPC 700€ + tail "souscrire restaurant" 80 vol → 230+ vol/m
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_MULTIRISQUE,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-restaurant-en-ligne'
const TITLE = 'Assurance restaurant en ligne 2026 — Souscription 100% digitale (480-2 800€ par an)'
const TAGLINE =
  'Souscrivez votre assurance restaurant 100% en ligne en 10 minutes : multirisque restaurant + RC Pro + perte exploitation + intoxications alimentaires + dommages électroménager.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance restaurant en ligne 2026 : souscription 100% digitale en 10 min. Multirisque restaurant (incendie, dégâts eaux, vol) + RC Pro intoxications alimentaires + perte exploitation + dommages cuisine pro. Tarifs 480-2 800€ par an. 6 assureurs spécialisés HCR. Devis 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance restaurant en ligne désigne la souscription 100% digitale d'un pack assurances complet pour restaurateurs, traiteurs, bars / HCR : multirisque restaurant (incendie, dégâts des eaux, vol, vandalisme), RC Pro intoxications alimentaires, perte d'exploitation, dommages électroménager (frigos pro, fours, chaudières), bris de glace vitrines. Souscription 100% en ligne en 10 minutes pour les profils standards (restaurant traditionnel, snack, brasserie). Tarifs 2026 : 480-2 800 € par an pour restaurant standard <100m², 3 200-12 000 € par an pour restaurant SARL avec terrasse + cuisine ouverte. 6 assureurs HCR spécialisés (MMA Pro Resto, AXA Pro HCR, Allianz Pro Resto, Generali, Hiscox Pro, MAAF Pro)."
      legalReference="Code conso art. L. 412-1 (sécurité alimentaire) + arrêté HACCP + RC Pro tutélée Convention HCR"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🌐',
          title: 'Souscription 100% digitale',
          desc: 'Pack complet en 10 min. Attestation immédiate après paiement CB.',
        },
        {
          icon: '🍽️',
          title: 'Intoxications alimentaires',
          desc: 'RC Pro spécifique HACCP — recours clients couverts (sinistres types salmonelle, listeria)',
        },
        {
          icon: '🔥',
          title: 'Multirisque restaurant',
          desc: 'Incendie cuisine + dégâts eaux + vol caisse ou coffre + vandalisme + bris vitrines',
        },
        {
          icon: '💰',
          title: '480-2 800 € par an standard',
          desc: 'Restaurant <100m² : 480-1 480€. SARL terrasse+cuisine ouverte : 3 200-12 000€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Pack restaurateur — couvertures incluses',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couverture standard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Incendie ou explosion</strong>
                    </td>
                    <td className="border p-2">
                      Indemnité reconstruction local + matériel cuisine pro
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dégâts des eaux</strong>
                    </td>
                    <td className="border p-2">
                      Fuites, infiltrations, débordement WC, dégâts eaux voisin
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Vol — vandalisme</strong>
                    </td>
                    <td className="border p-2">
                      Vol caisse + coffre + matériel + vandalisme nocturne
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro intoxication</strong>
                    </td>
                    <td className="border p-2">
                      Recours clients suite intoxication alimentaire (salmonelle, listeria, gastro)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Perte d&apos;exploitation</strong>
                    </td>
                    <td className="border p-2">
                      Indemnité CA pendant fermeture forcée (incendie, dégâts eaux, vol caisse)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dommages électroménager</strong>
                    </td>
                    <td className="border p-2">
                      Frigos pro, fours, lave-vaisselle, chambre froide (pannes + casse)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Bris de glace</strong>
                    </td>
                    <td className="border p-2">Vitrine, miroir, baie vitrée, comptoir verre</td>
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
                <Link
                  href="/outils/devis-rc-pro?secteur=restaurateur-traiteur"
                  className="text-primary-600 underline"
                >
                  Devis officiel restaurant ORIAS sous 24h
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/calculateur-tarif-rc-pro"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif RC Pro restaurateur
                </Link>
              </li>
              <li>
                <Link href="/assurance-restaurant" className="text-primary-600 underline">
                  Pilier assurance restaurant
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Souscription en ligne : pack complet ?',
          a: 'Oui pour profils standards (restaurant traditionnel, snack, brasserie, salon thé). Souscription en 10 min : déclaration superficie + activité + CA + nombre couverts. Pour profils complexes (restaurant gastronomique étoilé, food truck multi-villes, dark kitchen, cuisine ouverte spectaculaire), le devis 24h cabinet ORIAS reste plus adapté car personnalisable.',
        },
        {
          q: 'Intoxication alimentaire : que couvre la RC Pro ?',
          a: "Recours clients (frais médicaux, indemnité préjudice moral, perte revenus salariés du client en arrêt) suite à intoxication causée par votre cuisine. Sinistre moyen 2024 : 8 500€ par personne. Sinistre groupé (mariage de 80 personnes intoxiquées par buffet) : 200-680 000€. D'où importance plafond garantie ≥1M€.",
        },
        {
          q: 'Plafond RC Pro recommandé restaurateur ?',
          a: '<strong>500 000 €</strong> = restaurant moins 50 couverts par jour. <strong>1 000 000 €</strong> = restaurant standard 50-150 couverts. <strong>2-5 000 000 €</strong> = restaurant gastronomique, traiteur événementiel (mariages 80+ personnes), restaurant chaîne avec multiples établissements.',
        },
        {
          q: 'Tarif assurance restaurant 2026 ?',
          a: 'Restaurant traditionnel <100m² (CA <300k€) : 480-1 480 € par an. Restaurant standard 100-200m² (CA 300-800k€) : 1 480-3 200 € par an. Restaurant gastronomique ou avec terrasse importante (CA 800k€-2M€) : 3 200-8 500 € par an. Brasserie hôtel-restaurant : 8 500-22 000 € par an. Variables : zone (Paris ou Côte d&apos;Azur +25%), antécédents.',
        },
      ]}
    />
  )
}

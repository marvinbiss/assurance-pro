/**
 * Pilier — Assurance moto professionnelle
 * KW Ahrefs : "assurance moto professionnelle" 150 vol KD 2 CPC 200€
 * Famille : "moto pro", "deux roues utilitaire", "scooter livreur"
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-moto-professionnelle'
const TITLE = 'Assurance moto professionnelle — 2 roues utilitaire 2026 (livreur, taxi-moto)'
const TAGLINE =
  "L'assurance dédiée aux 2 roues à usage pro : livreur Uber Eats ou Deliveroo, taxi-moto, coursier, commercial nomade. RC pro + tous risques + équipement."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance moto professionnelle : 2 roues utilitaire (livreur Uber Eats ou Deliveroo, taxi-moto, coursier, commercial). RC pro + tous risques + équipement + conducteur étendue. Tarifs 680-1 580€ par an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance moto professionnelle couvre les 2 roues motorisés (scooter, moto, mobylette électrique, vélo cargo électrique) utilisés pour une activité professionnelle : livraison repas (Uber Eats, Deliveroo, Just Eat, Stuart), taxi-moto parisien, coursier B2B, commercial nomade urbain, artisan en intervention rapide. Le tarif RC Pro 2 roues est généralement plus élevé que pour une voiture (sinistralité corporelle conducteur 5x supérieure) mais reste accessible : 680-1 580 € par an selon profil. Le pack standard combine : RC pro circulation (passagers + tiers), tous risques (vol, incendie, vandalisme), équipement obligatoire (casque, gants, chaussures), garantie conducteur étendue (capital décès ou invalidité majoré 2 roues), assistance 0 km. Cette page distingue les 4 profils types et détaille les tarifs."
      legalReference="Article L. 211-1 du Code des assurances + Code de la route 2 roues"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🛵',
          title: 'RC pro 2 roues',
          desc: "Plafond corporel illimité. Sinistralité majorée → tarif plus élevé qu'auto pro",
        },
        {
          icon: '⛑️',
          title: 'Équipement couvert',
          desc: "Casque, gants, blouson, chaussures — vol ou casse remboursé jusqu'à 1 200€ par an",
        },
        {
          icon: '🚨',
          title: 'Conducteur étendue',
          desc: 'Capital décès ou invalidité MAJORÉ pour 2 roues (risque corporel 5x voiture)',
        },
        {
          icon: '💰',
          title: 'À partir de 680 € par an',
          desc: 'Scooter livreur 50cc. Taxi-moto Paris : 1 280-1 580€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs assurance moto pro 2026 par profil',
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
                    <td className="border p-2">Livreur Uber Eats — Deliveroo (scooter 50cc, AE)</td>
                    <td className="border p-2 text-right">680 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coursier B2B (scooter 125cc)</td>
                    <td className="border p-2 text-right">880 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Taxi-moto parisien (moto 600cc+)</td>
                    <td className="border p-2 text-right">1 280 € – 1 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Commercial nomade urbain (scooter 125cc)</td>
                    <td className="border p-2 text-right">780 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Artisan en intervention rapide (scooter électrique)
                    </td>
                    <td className="border p-2 text-right">580 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Vélo cargo électrique pro (livraison dernier km)</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : km annuels, antécédents conducteur, ancienneté permis A ou A2, zone
                (Paris IDF +20-30%), cylindrée.
              </p>
            </>
          ),
        },
        {
          h2: 'Risques spécifiques 2 roues à connaître',
          body: (
            <>
              <ul>
                <li>
                  <strong>Sinistralité corporelle 5x supérieure</strong> aux voitures (étude ONISR
                  2024). Garantie conducteur ÉTENDUE indispensable.
                </li>
                <li>
                  <strong>Vol fréquent</strong> : 1 scooter sur 8 volé chaque année à Paris. Antivol
                  homologué SRA + alarme indispensables.
                </li>
                <li>
                  <strong>Équipement obligatoire</strong> (casque homologué, gants, chaussures
                  fermées) : couverture vol ou casse à activer (~80€ par an).
                </li>
                <li>
                  <strong>Risque trottoir</strong> : sinistre fréquent à l&apos;arrêt (scooter
                  renversé, choc piéton).
                </li>
                <li>
                  <strong>Stationnement nocturne</strong> : exclusion vol fréquente sans antivol
                  homologué + parking sécurisé.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance moto pro est-elle obligatoire ?",
          a: 'OUI — RC circulation OBLIGATOIRE pour tout 2 roues motorisé (Code des assurances L. 211-1). Sanctions absence : 75 000€ amende + 6 mois prison + immobilisation véhicule + suspension permis. Pour usage pro : RC pro circulation spécifique (vs RC auto perso) — plafond corporel illimité.',
        },
        {
          q: "Combien coûte l'assurance d'un livreur Uber Eats — Deliveroo ?",
          a: "680-980€ par an pour scooter 50cc. Variables : km annuels, ville (Paris +20-30%), ancienneté permis. Souvent l'application impose une preuve d'assurance pro avant validation du compte livreur.",
        },
        {
          q: 'Vélo cargo électrique pro : assurance différente ?',
          a: 'OUI — assurance dédiée 2 roues non motorisés ou électriques < 25 km par heure. Tarif accessible : 280-480€ par an (vs 680€+ pour scooter). RC pro + vol vélo (cargo électrique = 3 000-7 000€ à neuf) + garantie batterie.',
        },
        {
          q: 'Taxi-moto parisien : assurance spécifique ?',
          a: "OUI — RC pro chauffeur taxi-moto + couverture passagers obligatoire. Tarif 1 280-1 580€ par an pour moto 600cc+. Garantie ADS-licence si artisan-taxi-moto. Voir aussi <a href='/assurance-taxi' class='text-primary-600 underline'>/assurance-taxi</a>.",
        },
        {
          q: 'Équipement (casque, gants) : couvert ?',
          a: "Pas automatiquement. Garantie « équipement du conducteur » EN OPTION (~80€ par an) couvre vol et casse. Plafond standard 1 200€ par an. À activer dans tous les contrats moto pro — un casque + blouson + gants = 400-1 000€ d'investissement.",
        },
        {
          q: 'Combien de temps pour obtenir un devis ?',
          a: '24h via notre formulaire avec 3 propositions (Wakam Mobility, Allianz Pro 2 Roues, MMA Pro Mobilité, Stello Pro). Souscription 24h. Effet immédiat possible (procédure express +60€).',
        },
      ]}
    />
  )
}

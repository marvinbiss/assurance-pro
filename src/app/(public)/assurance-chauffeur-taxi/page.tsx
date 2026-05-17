/**
 * Pilier — Assurance chauffeur de taxi (sous-pilier de /assurance-taxi)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance chauffeur de taxi" → 200 vol, KD 0 ⭐ (vacant)
 * - "taxi assurance maladie"      →  70 vol
 * Famille connexe : "assurance taxi" déjà couvert par /assurance-taxi
 *
 * Distinction avec /assurance-taxi existant :
 * - /assurance-taxi : pilier large (artisan-taxi, ADS, locataire-gérant, salarié)
 * - /assurance-chauffeur-taxi : focus CHAUFFEUR (santé + IJ + invalidité + protection
 *   personnelle), inclut salariés sociétés taxi (G7, Tax'Up, Marcel) + remplaçants
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-chauffeur-taxi'
const TITLE = 'Assurance chauffeur de taxi — Santé, prévoyance, protection personnelle 2026'
const TAGLINE =
  "L'assurance personnelle pour les chauffeurs de taxi : mutuelle santé adaptée, prévoyance IJ + invalidité, protection juridique conducteur, garantie agression."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance chauffeur de taxi : mutuelle santé adaptée (longues stations assises, stress urbain), prévoyance IJ dès J0, garantie invalidité, protection juridique conducteur, garantie agression. Tarifs 480-1 280 € par an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance chauffeur de taxi désigne l'ensemble des garanties PERSONNELLES dont a besoin un chauffeur (artisan ou salarié) au-delà de l'assurance véhicule pro et de la RC pro chauffeur. Spécifiquement adaptée aux risques du métier : longues stations assises (problèmes lombaires, troubles vasculaires), stress urbain et nocturne (cardiovasculaire), risque d'agression dans les zones sensibles (Paris IDF, grandes métropoles), arrêts de travail = revenus à zéro pour les artisans-taxis solo. Le pack standard combine : mutuelle santé adaptée (forfait kiné ou ostéo renforcé, médecines douces), prévoyance IJ dès J0 (compense la perte de revenu), garantie invalidité, protection juridique conducteur (défense en cas de litige client ou contrôle), garantie agression (capital décès ou invalidité majoré en cas d'agression). Les tarifs 2026 démarrent à 480 € HT par an pour un chauffeur salarié province jusqu'à 1 280 € HT par an pour un artisan-taxi parisien avec couverture étendue. Cette page est complémentaire à /assurance-taxi (qui couvre le véhicule + ADS + RC pro)."
      legalReference="Loi Madelin (TNS) + Code de la santé publique + Code des transports"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🩺',
          title: 'Mutuelle adaptée',
          desc: 'Forfait kiné ou ostéo renforcé, médecines douces, lombaires, vasculaires (risques métier)',
        },
        {
          icon: '⚡',
          title: 'IJ dès J0',
          desc: 'Indemnité journalière sans carence — compense les revenus perdus dès le 1er jour',
        },
        {
          icon: '🚨',
          title: 'Garantie agression',
          desc: "Capital décès ou invalidité majoré (×2) en cas d'agression dans le cadre du métier",
        },
        {
          icon: '⚖️',
          title: 'Protection juridique',
          desc: 'Défense en cas de litige client (refus paiement, plainte abusive), contrôle Préfecture',
        },
      ]}
      sections={[
        {
          h2: "Pourquoi un chauffeur de taxi a-t-il besoin d'une assurance personnelle dédiée ?",
          body: (
            <>
              <p>
                Les risques sanitaires et professionnels du chauffeur de taxi sont statistiquement
                plus élevés que pour un emploi sédentaire :
              </p>
              <ul>
                <li>
                  <strong>Lombalgies et troubles musculo-squelettiques</strong> : 65% des chauffeurs
                  en souffrent à un moment de leur carrière (étude INRS 2024)
                </li>
                <li>
                  <strong>Maladies cardiovasculaires</strong> : risque accru de 30-40% vs population
                  générale (stress + sédentarité prolongée + alimentation irrégulière)
                </li>
                <li>
                  <strong>Risque d&apos;agression</strong> : 1 chauffeur sur 5 victime
                  d&apos;agression au cours de sa carrière (FNDT 2024). Plus élevé pour les courses
                  nocturnes et les zones périurbaines.
                </li>
                <li>
                  <strong>Risque accident professionnel</strong> : la conduite intensive multiplie
                  le risque de sinistre matériel ou corporel par 3 vs un usage perso
                </li>
                <li>
                  <strong>Pour les ARTISANS-TAXIS solo</strong> : un arrêt de travail = revenus à
                  zéro. Sans prévoyance, asphyxie financière rapide (charges fixes = 1 800-3 200€
                  par mois entre ADS, véhicule, assurance pro, mutuelle).
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Les 5 garanties indispensables pour un chauffeur de taxi',
          body: (
            <>
              <ol>
                <li>
                  <strong>Mutuelle santé adaptée</strong> :
                  <ul>
                    <li>
                      Forfait kinésithérapie ou ostéopathie RENFORCÉ (4-8 séances par an au lieu de
                      2-4)
                    </li>
                    <li>Médecines douces (acupuncture, sophrologie) pour la gestion du stress</li>
                    <li>Bilan cardiovasculaire annuel pris en charge</li>
                    <li>Forfait dépistage troubles vasculaires (jambes lourdes, varices)</li>
                  </ul>
                </li>
                <li>
                  <strong>Prévoyance avec IJ dès J0</strong> :
                  <ul>
                    <li>Indemnité journalière sans carence (vs 3 j de carence Sécu)</li>
                    <li>Montant adapté au revenu (~80% du revenu net journalier)</li>
                    <li>Durée maximale : 1 095 jours (3 ans)</li>
                    <li>Pour les artisans-taxis : Loi Madelin déductible si régime réel</li>
                  </ul>
                </li>
                <li>
                  <strong>Garantie invalidité</strong> : rente en cas d&apos;invalidité permanente
                  (1er, 2e, 3e degré) — particulièrement critique pour un métier qui dépend à 100%
                  de l&apos;intégrité physique
                </li>
                <li>
                  <strong>Garantie agression</strong> : capital décès ou invalidité MAJORÉ (×2) si
                  le sinistre survient dans le cadre d&apos;une agression au travail. Indemnisation
                  des frais psychologiques post-traumatiques (consultations, traitement).
                </li>
                <li>
                  <strong>Protection juridique conducteur</strong> : défense en cas de litige client
                  (refus paiement, plainte abusive, agression réciproque), contrôle Préfecture de
                  Police, infraction routière disputée.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance chauffeur de taxi 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Chauffeur salarié province (50% employeur)</td>
                    <td className="border p-2 text-right">480 € – 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Chauffeur salarié grande ville (50% employeur)</td>
                    <td className="border p-2 text-right">580 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan-taxi province solo</td>
                    <td className="border p-2 text-right">680 € – 1 080 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan-taxi parisien solo</td>
                    <td className="border p-2 text-right">880 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Locataire-gérant (utilise ADS d&apos;un autre)</td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Chauffeur remplaçant (à la journée)</td>
                    <td className="border p-2 text-right">220 € – 480 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : âge (~+1,5% par an), antécédents médicaux, niveau d&apos;IJ choisi (50 à
                200€ par jour), couverture famille, zone géographique (Paris +20-30% pour le risque
                d&apos;agression). Madelin déductible UNIQUEMENT au régime réel d&apos;imposition.
              </p>
            </>
          ),
        },
        {
          h2: 'Articulation avec /assurance-taxi (assurance véhicule + ADS)',
          body: (
            <>
              <p>
                L&apos;assurance chauffeur de taxi (cette page — couverture PERSONNELLE) est
                COMPLÉMENTAIRE à{' '}
                <Link href="/assurance-taxi" className="text-primary-600 underline">
                  /assurance-taxi
                </Link>
                (couverture VÉHICULE + ADS + RC pro chauffeur).
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Page</th>
                    <th className="border p-2 text-left">Couverture</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <Link href="/assurance-taxi" className="text-primary-600 underline">
                        /assurance-taxi
                      </Link>
                    </td>
                    <td className="border p-2">
                      Véhicule + ADS-licence (50-250k€) + RC pro chauffeur (passagers + tiers) +
                      bris de glace + vol véhicule
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>/assurance-chauffeur-taxi</strong> (cette page)
                    </td>
                    <td className="border p-2">
                      Mutuelle santé adaptée + prévoyance IJ ou invalidité + garantie agression +
                      protection juridique CONDUCTEUR
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Pack complet artisan-taxi 2026</strong> : ~3 000-5 000 € par an (assurance
                véhicule + ADS + RC pro chauffeur + mutuelle + prévoyance + garantie agression + PJ
                conducteur). Notre cabinet propose un « Pack Taxi 360° » négocié avec AXA Pro Taxi
                et MMA Pro Mobilité.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance chauffeur de taxi est-elle obligatoire ?",
          a: "Pas légalement (sauf RC pro chauffeur incluse dans l'assurance taxi obligatoire). Mais FORTEMENT RECOMMANDÉE : 65% des chauffeurs souffrent de lombalgies, 1 sur 5 victime d'agression au cours de sa carrière, risque cardiovasculaire +30-40% vs population générale. Pour artisan-taxi solo : prévoyance IJ CRITIQUE (un arrêt = revenus à zéro).",
        },
        {
          q: "Combien coûte l'assurance d'un chauffeur de taxi en 2026 ?",
          a: "Démarre à 480€ par an pour chauffeur salarié province (50% employeur). Médiane marché : 680-1 080€ par an pour artisan-taxi province solo. Parisien : 880-1 280€ par an. Variables : âge, antécédents médicaux, niveau d'IJ choisi, zone géographique, couverture famille.",
        },
        {
          q: 'Garantie agression : utile vraiment pour un chauffeur ?',
          a: "OUI — 1 chauffeur de taxi sur 5 est victime d'agression au cours de sa carrière (FNDT 2024). Plus élevé pour les courses nocturnes et les zones périurbaines. La garantie agression VERSE UN CAPITAL MAJORÉ (×2) en cas de décès ou invalidité dûs à une agression dans le cadre du métier + indemnisation des frais psychologiques post-traumatiques. Coût modeste : ~50-120€ par an supplémentaire.",
        },
        {
          q: 'Différence entre assurance taxi et assurance chauffeur de taxi ?',
          a: 'ASSURANCE TAXI = couverture VÉHICULE + ADS + RC pro chauffeur (passagers + tiers). ASSURANCE CHAUFFEUR DE TAXI = couverture PERSONNELLE (mutuelle santé adaptée + prévoyance IJ + invalidité + garantie agression + PJ conducteur). Les 2 sont complémentaires. Pack complet artisan-taxi : ~3 000-5 000€ par an.',
        },
        {
          q: 'Madelin pour chauffeur de taxi : possible ?',
          a: "OUI pour les ARTISANS-TAXIS au régime réel d'imposition (déductibilité de la mutuelle + prévoyance Madelin du bénéfice imposable). PAS au régime micro-fiscal classique. Pour les CHAUFFEURS SALARIÉS : la mutuelle relève du régime collectif obligatoire de la société de taxi (50% employeur min - ANI 2013).",
        },
        {
          q: 'Chauffeur remplaçant à la journée : assurance modulable ?',
          a: 'OUI — certains assureurs (Wakam Mobility, Stello Pro) proposent une tarification par jour de remplacement (~3-5€ par jour). Alternative au forfait annuel pour les chauffeurs effectuant moins de 80 jours de remplacement par an. Pratique pour les jeunes chauffeurs en démarrage ou les retraités complétant leurs revenus.',
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance chauffeur de taxi ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos partenaires (AXA Pro Taxi, MMA Pro Mobilité, Allianz Pro, Wakam Mobility, Stello Pro). Souscription : 24-48h. Effet du contrat : 1er du mois suivant standard ou immédiat (procédure express +60€).',
        },
      ]}
    />
  )
}

/**
 * Pilier — Assurance transport de marchandises
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance transport de marchandises"            → 300 vol, KD 1, CPC 300€ ⭐
 * - "assurance professionnelle transport de marchandises" → 200 vol, KD 1, CPC 450€
 * - "rc pro transport de marchandises"               →  80 vol, KD 0, CPC 250€
 * - "assurance transport marchandises"               →  80 vol, CPC 190€
 * - "assurance rc pro transport de marchandises"     →  50 vol, KD 0, CPC 300€
 * - Famille cumulée : ~920 vol/mois
 *
 * Concurrent benchmark : marché VACANT (0 résultat dans top 10 trackés).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-transport-marchandises'
const TITLE = 'Assurance transport de marchandises — Tarifs 2026, RC pro + facultés'
const TAGLINE =
  "L'assurance dédiée au transport de marchandises : RC pro transporteur, garantie facultés (marchandises transportées), responsabilité contractuelle CMR. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance transport de marchandises : RC pro transporteur (LOTI/CMR), garantie facultés (marchandises transportées tous risques), responsabilité contractuelle, garantie ad valorem. Tarifs à partir de 1 480 €/an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance transport de marchandises est l'ensemble des garanties indispensables à toute entreprise de transport routier (TPE artisan transporteur, PME, grands comptes), de logistique, de messagerie ou de livraison express. Elle se décompose en 3 briques principales : RC Pro transporteur (responsabilité du transporteur en cas de perte/avarie/retard de la marchandise — encadrée par la convention CMR pour le transport international et la LOTI pour le national), garantie facultés (assurance des marchandises transportées tous risques — perte, vol, accident, événements climatiques), et garantie contractuelle CMR/LOTI (limitations de responsabilité réglementaires : 8,33 DTS/kg en CMR international, indemnité forfaitaire en LOTI national). Les tarifs 2026 démarrent à 1 480 € HT/an pour un artisan-transporteur solo avec 1 utilitaire jusqu'à 25 000 € HT/an pour une flotte de 10 poids lourds spécialisés (frigorifique, ADR matières dangereuses). Cette page détaille les obligations légales, les plafonds CMR/LOTI, les tarifs par profil et l'articulation avec l'assurance véhicule pro."
      legalReference="Convention CMR (transport international) + Loi LOTI (transport national) + Code des transports"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🚛',
          title: 'RC pro transporteur',
          desc: 'OBLIGATOIRE — couvre la responsabilité du transporteur (perte, avarie, retard marchandise)',
        },
        {
          icon: '📦',
          title: 'Garantie facultés',
          desc: 'Assure les MARCHANDISES TRANSPORTÉES tous risques (vol, accident, événements climatiques)',
        },
        {
          icon: '⚖️',
          title: 'Plafonds CMR/LOTI',
          desc: 'Limitations légales : 8,33 DTS/kg en CMR international (~10€/kg), forfait LOTI national',
        },
        {
          icon: '💰',
          title: 'À partir de 1 480 €/an',
          desc: 'Artisan-transporteur 1 utilitaire. PME 5 camions : 8 800-15 000€/an. Flotte 10 PL : 25 000€/an',
        },
      ]}
      sections={[
        {
          h2: 'Les 3 garanties indispensables du transport de marchandises',
          body: (
            <>
              <ol>
                <li>
                  <strong>RC Pro Transporteur (OBLIGATOIRE)</strong> : couvre la responsabilité
                  contractuelle du transporteur en cas de perte, avarie ou retard de la marchandise
                  dans le respect des plafonds CMR (international) ou LOTI (national). Plafond CMR :
                  8,33 DTS/kg (~10 €/kg en 2026). Plafond LOTI : indemnité forfaitaire à la tonne
                  selon barème.
                </li>
                <li>
                  <strong>Garantie facultés (RECOMMANDÉE)</strong> : assure les MARCHANDISES
                  TRANSPORTÉES elles-mêmes tous risques (vol, accident, incendie, événements
                  climatiques, mauvaise manutention) AU-DELÀ des plafonds CMR/LOTI. Permet de
                  garantir la valeur réelle des marchandises (pas seulement le forfait kg).
                </li>
                <li>
                  <strong>Garantie ad valorem (OPTION)</strong> : déclaration de la valeur réelle
                  des marchandises au moment du chargement → indemnisation à valeur déclarée (et non
                  au plafond CMR). Indispensable pour transport de matériel haute valeur
                  (électronique, métaux précieux, art).
                </li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Transport ADR matières dangereuses (hydrocarbures, chimie, gaz)</li>
                <li>Transport frigorifique (rupture de chaîne du froid)</li>
                <li>Transport d&apos;animaux vivants</li>
                <li>Transport d&apos;œuvres d&apos;art / objets précieux</li>
                <li>Transport sous température dirigée (médicaments, vaccins)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance transport de marchandises 2026',
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
                    <td className="border p-2">
                      Artisan-transporteur 1 utilitaire (3,5 t), national
                    </td>
                    <td className="border p-2 text-right">1 480 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan-transporteur 1 PL (15-19 t)</td>
                    <td className="border p-2 text-right">2 800 € – 4 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 3 utilitaires (livraison express)</td>
                    <td className="border p-2 text-right">4 800 € – 8 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 5 camions (national + UE)</td>
                    <td className="border p-2 text-right">8 800 € – 15 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Flotte 10 PL (international UE)</td>
                    <td className="border p-2 text-right">18 000 € – 28 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport frigorifique (chaîne du froid)</td>
                    <td className="border p-2 text-right">+30 à +50% du pack standard</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport ADR matières dangereuses</td>
                    <td className="border p-2 text-right">+50 à +120% du pack standard</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport œuvres d&apos;art / précieux</td>
                    <td className="border p-2 text-right">Tarification ad hoc (1-3% valeur)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : type de marchandises, zone géographique (national vs UE vs monde),
                kilométrage annuel par véhicule, antécédents sinistres, type de chargement (palettes
                vs vrac vs colis individuels), franchise choisie.
              </p>
            </>
          ),
        },
        {
          h2: "Plafonds CMR vs LOTI : ce qu'il faut savoir",
          body: (
            <>
              <p>
                Les responsabilités du transporteur sont LÉGALEMENT LIMITÉES selon le type de
                transport :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-left">Cadre légal</th>
                    <th className="border p-2 text-right">Plafond responsabilité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Transport routier INTERNATIONAL</td>
                    <td className="border p-2">Convention CMR (1956)</td>
                    <td className="border p-2 text-right">8,33 DTS/kg (~10 €/kg en 2026)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport routier NATIONAL France</td>
                    <td className="border p-2">Loi LOTI + contrats types</td>
                    <td className="border p-2 text-right">
                      23 €/kg ou 750 €/colis (selon contrat type)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport messagerie</td>
                    <td className="border p-2">Contrat type messagerie 2017</td>
                    <td className="border p-2 text-right">
                      23 €/kg ou 690 €/envoi (le moins élevé)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transport express</td>
                    <td className="border p-2">Contrat type express 2017</td>
                    <td className="border p-2 text-right">23 €/kg ou 690 €/envoi</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Conséquence pratique</strong> : pour un envoi de 30 kg de matériel
                électronique d&apos;une valeur réelle de 8 000 €, l&apos;indemnisation CMR sera
                limitée à ~300 € (30 × 10 €). D&apos;où l&apos;importance de la
                <strong> garantie facultés</strong> (qui couvre la valeur réelle) ou de la{' '}
                <strong>déclaration ad valorem</strong> avant chargement.
              </p>
            </>
          ),
        },
        {
          h2: "Articulation avec l'assurance véhicule pro",
          body: (
            <>
              <p>
                L&apos;assurance transport de marchandises est COMPLÉMENTAIRE à l&apos;assurance
                véhicule pro :
              </p>
              <ul>
                <li>
                  <a
                    href="/assurance-voiture-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Assurance véhicule pro
                  </a>{' '}
                  : couvre le VÉHICULE (RC circulation, vol véhicule, accident matériel)
                </li>
                <li>
                  <strong>Assurance transport marchandises</strong> : couvre la PRESTATION DE
                  TRANSPORT et la MARCHANDISE TRANSPORTÉE
                </li>
              </ul>
              <p>
                Les 2 sont indispensables et NE se remplacent pas l&apos;une l&apos;autre. Souvent
                regroupées dans un même contrat « pack transporteur » négocié avec un assureur
                spécialisé (Wakam, Hiscox, Allianz Transport, AXA Transport, MMA Transport).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance transport de marchandises est-elle obligatoire ?",
          a: "OUI — la RC Pro transporteur est OBLIGATOIRE pour toute entreprise de transport public de marchandises (Loi LOTI nationale + Convention CMR internationale). Sanctions absence : retrait du registre des transporteurs + interdiction d'exercer. La garantie facultés (assurance des marchandises) n'est pas légalement obligatoire mais EXIGÉE par 100% des donneurs d'ordre B2B avant signature contrat.",
        },
        {
          q: "Combien coûte l'assurance d'un transporteur en 2026 ?",
          a: 'Démarre à 1 480€/an pour un artisan-transporteur solo avec 1 utilitaire 3,5t en national. Médiane marché : 2 800-4 800€/an pour 1 PL. PME 5 camions : 8 800-15 000€/an. Flotte 10 PL international : 18-28k€/an. Variables : type marchandises, zone (national/UE/monde), kilométrage, ADR/frigorifique.',
        },
        {
          q: 'Quelle différence entre RC Pro transporteur et garantie facultés ?',
          a: 'RC PRO TRANSPORTEUR couvre la responsabilité du transporteur dans la limite des plafonds CMR (~10€/kg) ou LOTI (23€/kg). GARANTIE FACULTÉS couvre la VALEUR RÉELLE des marchandises transportées AU-DELÀ des plafonds — indispensable pour matériel haute valeur. Les 2 sont complémentaires.',
        },
        {
          q: 'Plafond CMR : que se passe-t-il pour du matériel haute valeur ?',
          a: "La CMR limite l'indemnisation à 8,33 DTS/kg (~10€/kg en 2026). Pour 30 kg de matériel électronique valant 8 000€ → indemnisation CMR ~300€ seulement. Pour récupérer la valeur réelle : (1) souscrire une garantie facultés tous risques sur les marchandises, OU (2) faire une DÉCLARATION AD VALOREM au moment du chargement (mais surcoût payé par le donneur d'ordre).",
        },
        {
          q: "Transport ADR matières dangereuses : surcoût d'assurance ?",
          a: "OUI très significatif : +50 à +120% du pack standard. Justification : risques majorés (incendie, explosion, pollution) + obligations réglementaires renforcées (conducteur formé ADR, véhicule certifié, plan d'urgence). Tarif type 2026 : 4 800-12 000€/an pour 1 PL ADR national, 8 800-22 000€/an pour 1 PL ADR international.",
        },
        {
          q: 'Mon véhicule pro est-il automatiquement assuré pour transporter des marchandises ?',
          a: "NON. L'assurance véhicule pro couvre la RC circulation et le véhicule lui-même MAIS PAS l'activité de transport de marchandises. Il faut un contrat « assurance transport de marchandises » distinct (RC Pro transporteur + garantie facultés). Souvent regroupé dans un « pack transporteur » avec l'assurance véhicule pro chez le même assureur.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance transport ?',
          a: 'Devis personnalisé via notre formulaire : 48h ouvrées avec 3 propositions de nos partenaires spécialisés transport (Wakam, Hiscox, Allianz Transport, AXA Transport, MMA Transport, Generali Mobility). Souscription : 48-72h (formulaire de souscription complet exigé pour évaluation des risques). Effet du contrat : 1er du mois suivant standard.',
        },
      ]}
    />
  )
}

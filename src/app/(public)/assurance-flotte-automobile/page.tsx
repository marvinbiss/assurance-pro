/**
 * Pilier — Assurance flotte automobile professionnelle
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance flotte automobile professionnelle" → 200 vol, KD 0, CPC 400€ ⭐
 * Famille connexe : "flotte automobile professionnelle", "assurance flotte pro", "flotte utilitaires"
 *
 * Concurrent benchmark : marché vacant.
 *
 * Distinction avec /assurance-voiture-professionnelle existant :
 * - /assurance-voiture-professionnelle : générique, couvre TOUS usages pro (auto-mission, utilitaire, fonction)
 * - /assurance-flotte-automobile : SPÉCIFIQUE flotte (≥ 4 véhicules) avec contrat mutualisé
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-flotte-automobile'
const TITLE = 'Assurance flotte automobile — Tarifs 2026 (4+ véhicules pro)'
const TAGLINE =
  "L'assurance dédiée aux flottes automobiles d'entreprise (≥ 4 véhicules) : contrat mutualisé, économie 20-30%, gestion centralisée, reporting consolidé."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance flotte automobile professionnelle (4+ véhicules) : contrat mutualisé, économie 20-30% vs assurance individuelle, gestion centralisée des sinistres, reporting consolidé. Tarifs négociés à partir de 580 €/véhicule. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance flotte automobile est un contrat mutualisé qui couvre l'ensemble des véhicules professionnels d'une même entreprise dans une seule police. Ouverte à partir de 4 véhicules (seuil standard chez la majorité des assureurs), elle permet d'économiser 20 à 30% par rapport à des contrats individuels grâce à la mutualisation des risques, simplifie la gestion (1 interlocuteur, 1 échéance, ajout/retrait sans avenant complexe) et offre un reporting consolidé pour suivre la sinistralité interne. Les flottes peuvent être hétérogènes : utilitaires, voitures de fonction, camions, deux-roues, véhicules spéciaux (frigorifiques, ADR). Les tarifs 2026 démarrent à 580 € HT/véhicule pour une flotte de 10 utilitaires standards jusqu'à 2 800 € HT/véhicule pour une flotte mixte avec poids lourds ADR. Cette page distingue l'assurance flotte du contrat véhicule individuel et présente les bonnes pratiques de gestion."
      legalReference="Article L. 211-1 du Code des assurances + Code de la route"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🚐',
          title: 'Économie 20-30%',
          desc: 'Contrat mutualisé vs assurance individuelle de chaque véhicule',
        },
        {
          icon: '📊',
          title: 'Gestion centralisée',
          desc: '1 interlocuteur, 1 échéance, reporting mensuel/annuel sinistralité',
        },
        {
          icon: '⚡',
          title: 'Avenant flexible',
          desc: 'Ajout/retrait de véhicule simplifié, sans relancer un contrat individuel',
        },
        {
          icon: '💰',
          title: '580 €/véhicule',
          desc: 'Flotte 10 utilitaires standards. Flotte PL ADR : 2 800€/véhicule',
        },
      ]}
      sections={[
        {
          h2: 'À partir de combien de véhicules souscrire un contrat flotte ?',
          body: (
            <>
              <p>
                Le seuil standard chez la majorité des assureurs :{' '}
                <strong>4 véhicules minimum</strong> détenus en pleine propriété ou en LLD/LOA par
                la même entreprise. Certains assureurs spécialistes acceptent dès 3 véhicules.
              </p>
              <p>ROI immédiat à partir de 4 véhicules :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Nombre véhicules</th>
                    <th className="border p-2 text-right">Coût individuel cumulé</th>
                    <th className="border p-2 text-right">Coût flotte mutualisée</th>
                    <th className="border p-2 text-right">Économie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">4 utilitaires standards</td>
                    <td className="border p-2 text-right">3 520 €</td>
                    <td className="border p-2 text-right">2 880 €</td>
                    <td className="border p-2 text-right">~18%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">10 utilitaires standards</td>
                    <td className="border p-2 text-right">8 800 €</td>
                    <td className="border p-2 text-right">5 800 €</td>
                    <td className="border p-2 text-right">~34%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">25 véhicules (mixte)</td>
                    <td className="border p-2 text-right">28 000 €</td>
                    <td className="border p-2 text-right">19 600 €</td>
                    <td className="border p-2 text-right">~30%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">50 véhicules (PME)</td>
                    <td className="border p-2 text-right">62 000 €</td>
                    <td className="border p-2 text-right">42 000 €</td>
                    <td className="border p-2 text-right">~32%</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance flotte 2026 par profil',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de flotte</th>
                    <th className="border p-2 text-right">Tarif moyen / véhicule / an</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Utilitaires standards (Berlingo, Trafic, Boxer) — flotte 10+
                    </td>
                    <td className="border p-2 text-right">580 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Véhicules de fonction (cadres) — flotte mixte</td>
                    <td className="border p-2 text-right">680 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Camion / poids lourd standard</td>
                    <td className="border p-2 text-right">1 480 € – 2 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PL frigorifique (chaîne du froid)</td>
                    <td className="border p-2 text-right">1 880 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PL ADR matières dangereuses</td>
                    <td className="border p-2 text-right">2 200 € – 3 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">2 roues utilitaires (livreurs)</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Véhicules spéciaux (atelier mobile, nacelle)</td>
                    <td className="border p-2 text-right">1 480 € – 2 800 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : kilométrage annuel global flotte, sinistralité historique (3 dernières
                années), profil conducteurs (jeunes / expérimentés / formés eco-conduite), zone
                géographique, présence de boîtiers télématiques (-15-25% possible avec « pay how you
                drive »).
              </p>
            </>
          ),
        },
        {
          h2: "Gestion d'une flotte automobile : les 5 bonnes pratiques",
          body: (
            <>
              <ol>
                <li>
                  <strong>Inventaire à jour</strong> : maintenir un fichier centralisé
                  (immatriculation, modèle, conducteur affecté, km annuel, dates contrôle
                  technique). Notification immédiate à l&apos;assureur en cas d&apos;ajout/retrait.
                </li>
                <li>
                  <strong>Politique conducteur</strong> : règles claires (pas d&apos;alcool, pas de
                  téléphone, vitesse, formation eco-conduite annuelle). Signature d&apos;un
                  règlement intérieur véhicule par chaque conducteur.
                </li>
                <li>
                  <strong>Boîtier télématique</strong> : tracking GPS + données de conduite. Permet
                  de bénéficier de tarifs « pay how you drive » (-15-25% chez certains assureurs) ET
                  d&apos;identifier les conducteurs à risque.
                </li>
                <li>
                  <strong>Maintenance préventive</strong> : carnet d&apos;entretien + révisions
                  périodiques + contrôles techniques anticipés. Baisse de 20-30% sur la sinistralité
                  matériel.
                </li>
                <li>
                  <strong>Reporting trimestriel</strong> avec l&apos;assureur : suivre KPI (taux
                  fréquence sinistres, coût moyen, conducteurs à risque) et ajuster la politique
                  flotte.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Garanties optionnelles indispensables',
          body: (
            <>
              <ul>
                <li>
                  <strong>Véhicule de remplacement 24h/24</strong> pendant immobilisation pour
                  réparation/sinistre — critique pour les flottes opérationnelles (livraison, BTP,
                  taxi)
                </li>
                <li>
                  <strong>Assistance 0 km</strong> : panne, dépannage, remorquage depuis
                  l&apos;adresse pro (vs assistance perso qui démarre à 50 km)
                </li>
                <li>
                  <strong>Garantie marchandises transportées</strong> : essentielle si transport
                  régulier (voir notre page{' '}
                  <a
                    href="/assurance-transport-marchandises"
                    className="text-primary-600 underline"
                  >
                    /assurance-transport-marchandises
                  </a>
                  )
                </li>
                <li>
                  <strong>Garantie conducteur étendue</strong> : capital décès/invalidité/IJ pour le
                  conducteur (la RC standard couvre les TIERS, pas le conducteur lui-même)
                </li>
                <li>
                  <strong>Bris du matériel embarqué</strong> : PC pro, GPS, terminal CB, instruments
                  de mesure
                </li>
                <li>
                  <strong>Garantie « auto-partage »</strong> : véhicule utilisé par plusieurs
                  salariés/conducteurs occasionnels
                </li>
                <li>
                  <strong>Garantie « expatriation temporaire »</strong> : couverture étendue UE /
                  Maroc / Algérie pour véhicules effectuant des missions internationales
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'À partir de combien de véhicules une assurance flotte est-elle intéressante ?',
          a: "Seuil standard : 4 véhicules minimum. Économie immédiate ~18% à 4 véhicules, jusqu'à 32-34% à partir de 10 véhicules. ROI positif dès le 1er contrat (gain financier + simplification administrative).",
        },
        {
          q: "Combien coûte l'assurance d'une flotte de 10 utilitaires en 2026 ?",
          a: 'Démarre à 5 800€/an pour 10 utilitaires standards (Berlingo, Trafic, Boxer) sans antécédent particulier — soit ~580€/véhicule. Médiane marché : 6 800-8 800€/an. Variables : kilométrage annuel cumulé, sinistralité 3 dernières années, profils conducteurs, présence boîtiers télématiques.',
        },
        {
          q: 'Comment fonctionne le bonus-malus en flotte ?',
          a: "DIFFÉRENT du bonus-malus auto particulier. En flotte, le calcul se fait sur le RATIO COÛT SINISTRES / PRIME ANNUELLE de la flotte sur 3 ans glissants. Si ratio < 50% : remise 10-25% sur prime N+1. Si ratio > 100% : majoration 15-50%. La sinistralité d'un seul véhicule peut donc impacter l'ensemble de la flotte — d'où l'importance d'identifier les conducteurs à risque.",
        },
        {
          q: 'Boîtier télématique : obligatoire en flotte ?',
          a: 'Pas obligatoire mais FORTEMENT recommandé. Permet : (1) tarification « pay how you drive » avec économie 15-25%, (2) identification des conducteurs à risque (excès de vitesse, freinages brusques), (3) géolocalisation en cas de vol, (4) optimisation des trajets (économie carburant 5-10%). Coût : 5-15€/mois/véhicule, ROI immédiat.',
        },
        {
          q: "Ajout d'un véhicule en cours d'année : démarche ?",
          a: "Notification immédiate à l'assureur (email + carte grise) → calcul prorata temporis sur la cotisation N → avenant unique. Délai : 24-48h pour effectuer la modification. Garantie effective dès la notification (assurance temporaire de 7 jours en attendant l'avenant officiel).",
        },
        {
          q: 'Flotte mixte (utilitaires + PL + 2 roues) : possible ?',
          a: 'OUI — la majorité des assureurs spécialistes flotte (Allianz Pro, AXA Pro, MMA, Wakam Fleet) acceptent les flottes hétérogènes. Tarification au véhicule selon catégorie (utilitaire vs PL vs 2 roues). Gestion unifiée dans un seul contrat. Économie de mutualisation conservée même avec mix.',
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance flotte ?',
          a: 'Devis personnalisé via notre formulaire : 48-72h ouvrées avec 3 propositions de nos partenaires spécialisés flotte (Allianz Pro Flotte, AXA Pro, MMA Pro Flotte, Wakam Fleet, Generali Mobility). Audit de la flotte requis : inventaire véhicules + sinistralité 3 ans + profils conducteurs. Souscription : 5-7 jours. Effet du contrat : 1er du mois suivant standard.',
        },
      ]}
    />
  )
}

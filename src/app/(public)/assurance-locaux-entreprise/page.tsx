/**
 * Pilier — Assurance locaux entreprise
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance locaux entreprise" → 250 vol, KD 1, CPC 350€ ⭐
 * Famille connexe : "assurance local commercial" (déjà couvert), "assurance bureau" (couvert)
 *
 * Cette page se positionne sur le terme INSTITUTIONNEL "locaux entreprise"
 * (utilisé par les TPE/PME qui ont plusieurs locaux ou un siège), distinct de
 * /assurance-local-commercial (boutique commerce) et /assurance-bureau (tertiaire).
 *
 * Concurrent benchmark : marché VACANT.
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

const SLUG = 'assurance-locaux-entreprise'
const TITLE = 'Assurance locaux entreprise — Multirisque siège, atelier, entrepôt 2026'
const TAGLINE =
  "L'assurance multirisque pour les locaux d'entreprise : siège social, atelier, entrepôt, dépôt, magasin annexe. Couverture incendie, vol, dégâts eaux, perte d'exploitation."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Assurance locaux entreprise : multirisque siège social, atelier, entrepôt, dépôt. Couverture incendie, vol, vandalisme, dégâts des eaux, événements climatiques, perte d'exploitation. Tarifs négociés à partir de 480 €/an. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance locaux entreprise est la multirisque professionnelle qui couvre les locaux d'exploitation d'une entreprise : siège social, ateliers de production, entrepôts de stockage, dépôts logistiques, agences secondaires, locaux annexes. Elle se distingue des contrats spécifiques commerce ou bureau en couvrant les configurations multi-sites, les locaux de grande surface (>500 m²) et les sites industriels avec stocks et matériel pro de forte valeur. Les garanties principales : incendie + foudre + explosion, vol par effraction, vandalisme, dégâts des eaux, événements climatiques (tempête, grêle, neige), bris de glace, RC exploitation envers les tiers, et pertes d'exploitation pendant la durée d'indisponibilité du local. Les tarifs 2026 démarrent à 480 € HT/an pour un petit local annexe (40 m²) jusqu'à 25 000 € HT/an pour un site industriel multi-sites."
      legalReference="Article 1733 du Code civil (bail commercial) + clauses standard MRP"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🏢',
          title: 'Multi-sites',
          desc: "Couvre tous les locaux d'une même entreprise dans un seul contrat (siège + agences + entrepôt)",
        },
        {
          icon: '📦',
          title: 'Stock + matériel pro',
          desc: 'Valeur déclarée à mettre à jour avant les périodes hautes',
        },
        {
          icon: '⚡',
          title: 'Perte exploitation',
          desc: 'Marge brute × durée indisponibilité — critique pour activité dépendante du local',
        },
        {
          icon: '💰',
          title: 'À partir de 480 €/an',
          desc: 'Petit local annexe 40 m². Site industriel multi-sites : 12 000-25 000€/an',
        },
      ]}
      sections={[
        {
          h2: 'Quel contrat choisir selon votre type de local ?',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de local</th>
                    <th className="border p-2 text-left">Contrat dédié</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Boutique avec vitrine et clientèle reçue</td>
                    <td className="border p-2">
                      <Link
                        href="/assurance-local-commercial"
                        className="text-primary-600 underline"
                      >
                        /assurance-local-commercial
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bureau tertiaire (TPE, agence, cabinet)</td>
                    <td className="border p-2">
                      <Link href="/assurance-bureau" className="text-primary-600 underline">
                        /assurance-bureau
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Restaurant / hôtel / brasserie (HCR)</td>
                    <td className="border p-2">
                      <Link href="/assurance-restaurant" className="text-primary-600 underline">
                        /assurance-restaurant
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Atelier / entrepôt / dépôt / siège multi-sites</strong>
                    </td>
                    <td className="border p-2">
                      <strong>Cette page (/assurance-locaux-entreprise)</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance locaux entreprise 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil local</th>
                    <th className="border p-2 text-right">Surface</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Local annexe / dépôt simple</td>
                    <td className="border p-2 text-right">40 m²</td>
                    <td className="border p-2 text-right">480 € – 780 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Atelier artisan</td>
                    <td className="border p-2 text-right">150 m²</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Entrepôt logistique 500 m²</td>
                    <td className="border p-2 text-right">500 m²</td>
                    <td className="border p-2 text-right">1 480 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Site industriel 1 000 m² + machines</td>
                    <td className="border p-2 text-right">1 000 m²</td>
                    <td className="border p-2 text-right">3 800 € – 7 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Multi-sites PME (siège + 2 agences)</td>
                    <td className="border p-2 text-right">cumul ~600 m²</td>
                    <td className="border p-2 text-right">2 800 € – 5 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Site industriel multi-bâtiments + ICPE</td>
                    <td className="border p-2 text-right">3 000 m²+</td>
                    <td className="border p-2 text-right">12 000 € – 25 000 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : valeur du contenu (mobilier + matériel + stock), zone (Paris +30%),
                présence d&apos;alarme NF + télésurveillance (-15-25%), antécédents sinistres,
                classement ICPE (Installations Classées Protection Environnement).
              </p>
            </>
          ),
        },
        {
          h2: 'Cas particulier : multi-sites — un seul contrat ou plusieurs ?',
          body: (
            <>
              <p>
                Pour une entreprise gérant plusieurs locaux (siège + agences secondaires +
                entrepôt), 2 stratégies :
              </p>
              <h3>Option 1 : Contrat « multi-sites » mutualisé</h3>
              <ul>
                <li>
                  <strong>Avantage</strong> : économie 15-25% vs contrats séparés (mutualisation des
                  risques)
                </li>
                <li>
                  <strong>Avantage</strong> : gestion unique (1 seul interlocuteur, 1 seul
                  échéancier)
                </li>
                <li>
                  <strong>Avantage</strong> : ajout/retrait de site simplifié (avenant unique)
                </li>
                <li>
                  <strong>Limite</strong> : un sinistre majeur sur 1 site peut épuiser le plafond
                  annuel cumulé pour les autres sites
                </li>
              </ul>
              <h3>Option 2 : Contrats séparés par site</h3>
              <ul>
                <li>
                  <strong>Avantage</strong> : plafond indépendant par site (sécurise en cas de
                  sinistre majeur)
                </li>
                <li>
                  <strong>Avantage</strong> : possibilité d&apos;assureurs différents selon
                  spécialité (SMABTP pour atelier BTP, Allianz pour bureau, AXA pour entrepôt)
                </li>
                <li>
                  <strong>Limite</strong> : surcoût 15-25%, gestion fragmentée, multiples échéances
                </li>
              </ul>
              <p>
                <strong>Recommandation</strong> : multi-sites mutualisé pour PME &lt; 500 salariés
                avec sites homogènes (tous bureaux ou tous ateliers). Contrats séparés pour ETI avec
                sites hétérogènes (siège tertiaire + usine industrielle + entrepôt).
              </p>
            </>
          ),
        },
        {
          h2: 'Garanties indispensables pour locaux entreprise',
          body: (
            <>
              <ol>
                <li>
                  <strong>Multirisque local</strong> : incendie + foudre + explosion + dégâts eaux +
                  vol effraction + vandalisme + événements climatiques
                </li>
                <li>
                  <strong>Bris de glace</strong> : vitres, vitrines extérieures, panneaux pub
                </li>
                <li>
                  <strong>Stock + matériel pro à valeur déclarée</strong> : à mettre à jour
                  annuellement (et avant périodes hautes)
                </li>
                <li>
                  <strong>Bris de matériel pro</strong> : machines de production, fours, frigos pro,
                  équipements informatiques (souvent oublié)
                </li>
                <li>
                  <strong>RC exploitation</strong> : dommages causés aux visiteurs/livreurs/voisins
                </li>
                <li>
                  <strong>Pertes d&apos;exploitation</strong> : marge brute × durée
                  d&apos;indisponibilité (12-24 mois recommandé)
                </li>
                <li>
                  <strong>Frais supplémentaires</strong> : relogement temporaire, frais
                  d&apos;expert, communication crise
                </li>
                <li>
                  <strong>Cyber pro</strong> (si système informatique on-premise dans le local)
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance locaux entreprise est-elle obligatoire ?",
          a: 'Pas légalement (sauf cas particuliers : ICPE, copropriété), mais OBLIGATOIRE CONTRACTUELLEMENT dans 100% des baux commerciaux. Si propriétaire de votre local : obligation contractuelle vis-à-vis du règlement de copropriété ou du PLU local. Pour un site industriel ICPE : obligations renforcées (responsabilité environnementale).',
        },
        {
          q: "Combien coûte l'assurance d'un atelier de 150 m² ?",
          a: "Démarre à 680€/an pour un atelier artisan sans antécédent, en province. Médiane marché : 980-1 480€/an. Variables : type de matériel pro (machines outils, fours, presses), valeur du stock matières premières, zone géographique, présence d'alarme NF + télésurveillance, classement ICPE.",
        },
        {
          q: 'Multi-sites : un seul contrat ou plusieurs ?',
          a: "Pour PME < 500 salariés avec sites homogènes : contrat multi-sites mutualisé (économie 15-25%, gestion unique). Pour ETI avec sites hétérogènes (bureau tertiaire + usine + entrepôt) : contrats séparés pour avoir des plafonds indépendants par site et choisir l'assureur le plus adapté à chaque spécialité (SMABTP / Allianz / AXA). Notre cabinet conseille selon votre profil.",
        },
        {
          q: 'ICPE : quelles garanties supplémentaires ?',
          a: "Pour un site classé ICPE (Installations Classées pour la Protection de l'Environnement), garanties supplémentaires obligatoires : RC environnementale (Loi du 1er août 2008), garantie pollution accidentelle, garantie de remise en état du site (caution démantèlement), responsabilité des dirigeants pénalement engageables. Tarif : +30 à +120% selon classement (déclaration / enregistrement / autorisation).",
        },
        {
          q: 'Stock à déclaration variable : possible ?',
          a: "OUI — clause « stock variable » disponible chez la plupart des assureurs pour les commerces saisonniers (jouets Noël, articles de plage été). Permet d'ajuster la valeur déclarée trimestriellement ou mensuellement sans avenant. Coût : ~10% du contrat standard. Évite la sous-déclaration (règle proportionnelle) et la sur-déclaration (sur-cotisation inutile).",
        },
        {
          q: "Comment fonctionne la perte d'exploitation pour un site industriel ?",
          a: "Compense la perte de MARGE BRUTE pendant la durée de fermeture/inactivité du site suite à sinistre couvert. Calcul : marge brute mensuelle × durée d'indisponibilité (12-24 mois recommandé pour site industriel — la reconstruction d'un atelier prend ~9-15 mois en pratique). Inclut les frais fixes qui continuent à courir (loyers, salaires structurels, charges).",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance locaux entreprise ?',
          a: 'Devis personnalisé via notre formulaire : 24-48h ouvrées pour locaux simples (atelier, bureau, dépôt). 3-5 jours pour sites industriels multi-bâtiments avec ICPE (audit de risque approfondi requis). Souscription : 48h pour profils standards, 5-7 jours pour ICPE. Effet du contrat : 1er du mois suivant ou immédiat (procédure express +120€).',
        },
      ]}
    />
  )
}

/**
 * Pilier — Assurance artisan (BTP + métiers manuels hors BTP)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance pro btp"             → 400 vol, KD 4, CPC 100€
 * - "assurance artisan"             → 400 vol, KD 1, CPC 300€ ⭐
 * - "pro btp assurance auto"        → 300 vol, KD 0, CPC 150€
 * - "pro btp assurance"             → 300 vol, KD 12, CPC 100€
 * - "pro btp assurance vie"         → 250 vol
 * - "pro btp assurance décennale"   → 150 vol, KD 3, CPC 500€
 * - "pro btp assurance voiture"     → 150 vol, KD 0, CPC 160€
 * - "pro btp assurance habitation"  → 150 vol, KD 0, CPC 150€
 * - "assurance artisan bâtiment"    → 150 vol
 * - "assurance artisan auto entrepreneur" → 100 vol, KD 11, CPC 250€
 * - Famille cumulée : ~2 650 vol/mois
 *
 * Concurrent benchmark :
 * - pro.april.fr/assurance-artisans-activite-professionnelle → 514 vis/mois
 * - decennale.com/.../artisan-auto-entrepreneur → 176 vis/mois
 * - april.fr capture la majorité du marché — mais le hub-pilier "artisan" reste à
 *   prendre sur les KW longue traîne hors BTP pur.
 *
 * Stratégie : pilier transverse qui aiguille vers les sous-piliers (décennale,
 * RC pro, multirisque, mutuelle, prévoyance) selon le profil artisan.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-artisan'
const TITLE = 'Assurance artisan — Pack BTP, RC, mutuelle, prévoyance 2026'
const TAGLINE =
  'Le pack assurance complet pour artisans : décennale obligatoire BTP, RC pro, multirisque atelier, mutuelle TNS, prévoyance. Conseil ORIAS dédié, devis gratuit sous 24h.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance artisan : décennale BTP obligatoire, RC pro, multirisque atelier/véhicule, mutuelle TNS, prévoyance Madelin. Pack négocié à partir de 980 €/an. 8 assureurs comparés. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance artisan désigne l'ensemble des contrats indispensables à l'exercice d'une activité artisanale en France : décennale Loi Spinetta (obligatoire pour les artisans BTP), RC Pro (responsabilité civile professionnelle envers les clients), multirisque atelier/véhicule pro, mutuelle santé TNS et prévoyance Madelin. Selon le métier, certaines garanties sont légalement obligatoires (décennale BTP, RC santé) et d'autres sont fortement recommandées. Le tarif d'un pack complet 2026 démarre à 980 € HT/an pour un artisan AE peintre province (RC + décennale couplées) jusqu'à 5 800 €/an pour un artisan SARL maçonnerie/couverture avec véhicule pro et 3 salariés. Cette page récapitule par TYPE D'ARTISAN les garanties indispensables, les tarifs réels et redirige vers nos pages-piliers spécialisées (décennale auto-entrepreneur, mutuelle pro BTP, prévoyance TNS, etc.)."
      legalReference="Loi Spinetta (L. 241-1 C. assur.) + Loi Madelin (art. 154 bis CGI) + Code artisanat"
      isObligatoire={true}
      benefits={[
        {
          icon: '🏗️',
          title: 'Décennale BTP obligatoire',
          desc: 'Loi Spinetta : tous artisans BTP. Sanctions absence : 75 000€ + 6 mois prison',
        },
        {
          icon: '🛠️',
          title: 'RC Pro travaux',
          desc: 'Couvre les dommages PENDANT le chantier (vs décennale qui couvre 10 ans APRÈS)',
        },
        {
          icon: '💼',
          title: 'Madelin déductible',
          desc: 'Mutuelle + prévoyance déductibles du bénéfice imposable (économie ~1 750€/an pour 60k€ bénéfice)',
        },
        {
          icon: '🚐',
          title: 'Pack tout-en-un',
          desc: 'Décennale + RC + multirisque + mutuelle + prévoyance dans 1 dossier, 1 interlocuteur',
        },
      ]}
      sections={[
        {
          h2: 'Quelles assurances sont obligatoires pour un artisan en 2026 ?',
          body: (
            <>
              <p>Cela dépend du métier et du statut juridique :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Artisan BTP</th>
                    <th className="border p-2 text-left">Artisan hors BTP</th>
                    <th className="border p-2 text-left">Référence légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">✅ OBLIGATOIRE</td>
                    <td className="border p-2">❌ Non concernée</td>
                    <td className="border p-2">L. 241-1 C. assur.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro travaux</strong>
                    </td>
                    <td className="border p-2">⚠️ Obligation contractuelle (clients pro)</td>
                    <td className="border p-2">
                      ⚠️ Recommandée (esthétique, coiffure, taxi : oui obligatoire)
                    </td>
                    <td className="border p-2">Variable selon métier</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Multirisque atelier</strong>
                    </td>
                    <td className="border p-2">⚠️ Bail commercial</td>
                    <td className="border p-2">⚠️ Bail commercial</td>
                    <td className="border p-2">Art. 1733 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Auto pro / utilitaire</strong>
                    </td>
                    <td className="border p-2">✅ OBLIGATOIRE (RC circulation)</td>
                    <td className="border p-2">✅ OBLIGATOIRE</td>
                    <td className="border p-2">L. 211-1 C. assur.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Mutuelle santé</strong>
                    </td>
                    <td className="border p-2">⚠️ Obligation salariés (ANI 2013)</td>
                    <td className="border p-2">⚠️ Obligation salariés (ANI 2013)</td>
                    <td className="border p-2">Loi 14/06/2013</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Prévoyance TNS</strong>
                    </td>
                    <td className="border p-2">❌ Pas obligatoire (recommandée)</td>
                    <td className="border p-2">❌ Pas obligatoire (recommandée)</td>
                    <td className="border p-2">—</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Pour un artisan BTP solo en AE</strong>, le pack minimum cohérent est :
                décennale + RC pro + véhicule pro + (mutuelle Madelin + prévoyance Madelin fortement
                recommandées). Pour un artisan SARL avec salariés : ajouter mutuelle collective
                obligatoire (50% prise en charge employeur).
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance artisan 2026 par profil',
          body: (
            <>
              <p>
                Tarifs indicatifs PACK COMPLET (décennale + RC + véhicule pro hors
                mutuelle/prévoyance personnelles) :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil artisan</th>
                    <th className="border p-2 text-right">Pack complet annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE peintre BTP, sans antécédent, province</td>
                    <td className="border p-2 text-right">980 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE plombier-électricien BTP</td>
                    <td className="border p-2 text-right">1 280 € – 1 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE maçon BTP</td>
                    <td className="border p-2 text-right">1 580 € – 2 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE couvreur-zingueur BTP</td>
                    <td className="border p-2 text-right">1 880 € – 2 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL plombier 2 salariés + camion</td>
                    <td className="border p-2 text-right">2 880 € – 4 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL maçonnerie 5 salariés + 2 camions + RGE</td>
                    <td className="border p-2 text-right">4 800 € – 7 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      AE artisan d&apos;art (potier, ferronnier, tapissier)
                    </td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE coiffeur / esthéticienne à domicile</td>
                    <td className="border p-2 text-right">480 € – 820 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE bijoutier-joaillier (stock 50k€)</td>
                    <td className="border p-2 text-right">1 480 € – 2 280 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : statut (AE / EI / EURL / SARL / SAS), CA prévisionnel, antécédents
                sinistres, label RGE, présence salariés, taille flotte automobile. Contrats Pack BTP
                négociés avec SMABTP, MAAF Pro, AXA Pro, Allianz Pro, Hiscox, April Pro, MMA Pro,
                Wakam.
              </p>
            </>
          ),
        },
        {
          h2: 'Hub par métier artisanal : nos pages spécialisées',
          body: (
            <>
              <p>Selon votre métier, consultez la page-pilier dédiée :</p>
              <h3>Artisans BTP</h3>
              <ul>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP
                  </Link>{' '}
                  — toutes garanties Loi Spinetta
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale auto-entrepreneur BTP
                  </Link>{' '}
                  — tarifs + procédure 24h
                </li>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>{' '}
                  — comparatif PRO BTP, April, Harmonie
                </li>
              </ul>
              <h3>Artisans hors BTP</h3>
              <ul>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro auto-entrepreneur
                  </Link>{' '}
                  — couverture esthétique, coiffure, etc.
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>{' '}
                  — santé déductible
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>{' '}
                  — IJ + invalidité + capital décès
                </li>
              </ul>
              <h3>Locaux et équipement</h3>
              <ul>
                <li>
                  <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                    Assurance local commercial
                  </Link>{' '}
                  — pour artisans en boutique
                </li>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Assurance bureau
                  </Link>{' '}
                  — pour artisans en cabinet/bureau
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: "Cas particulier PRO BTP : qu'est-ce que c'est exactement ?",
          body: (
            <>
              <p>
                <strong>PRO BTP est un Groupe Paritaire de Protection Sociale (GPS)</strong>
                créé en 1993 par les partenaires sociaux du Bâtiment et des Travaux Publics. Ce
                n&apos;est pas un simple assureur — c&apos;est un acteur paritaire qui couple :
              </p>
              <ul>
                <li>
                  <strong>Mutuelle santé</strong> (la plus connue, ~3,4 M de bénéficiaires)
                </li>
                <li>
                  <strong>Prévoyance</strong> (IJ + invalidité + décès)
                </li>
                <li>
                  <strong>Retraite complémentaire</strong> (régime ProBTP Retraite)
                </li>
                <li>
                  <strong>Action sociale</strong> (vacances Domaine, aides aux familles)
                </li>
                <li>
                  <strong>Assurance vie / épargne</strong> (PRO BTP Épargne)
                </li>
                <li>
                  <strong>Auto / habitation</strong> (PRO BTP Assurances)
                </li>
              </ul>
              <p>
                Pour un artisan BTP, PRO BTP peut être un choix par défaut, mais notre cabinet
                compare souvent à d&apos;autres acteurs (April, MMA, Aon, Generali) pour trouver le
                meilleur rapport garanties/cotisation selon le profil. Voir notre page comparatif
                dédiée :{' '}
                <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                  /mutuelle-pro-btp
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles sont les assurances obligatoires pour un artisan ?',
          a: "Pour un artisan BTP : décennale (Loi Spinetta) + RC Pro travaux + assurance véhicule pro = OBLIGATOIRES. Pour un artisan hors BTP : RC Pro selon métier (esthétique invasive, taxi, sport encadré, santé : OUI ; coiffure simple, artisanat d'art : recommandée) + assurance véhicule pro. La mutuelle est obligatoire UNIQUEMENT pour les salariés (ANI 2013), pas pour le chef d'entreprise TNS.",
        },
        {
          q: 'Combien coûte un pack assurance complet pour un artisan AE ?',
          a: "Démarre à 980€/an pour un AE peintre BTP sans antécédent (décennale + RC + auto pro). Médiane marché AE BTP : 1 280-2 380€/an selon métier. Artisan SARL avec salariés : 2 880-7 200€/an. Hors BTP : 480-1 100€/an pour AE coiffeur/artisan d'art. Variables : métier, statut, CA, antécédents, présence salariés.",
        },
        {
          q: 'Différence entre PRO BTP et April Pro Santé ?',
          a: 'PRO BTP est un Groupe Paritaire (couple santé + prévoyance + retraite + action sociale, créé par partenaires sociaux du BTP). April Pro Santé est un assureur privé multi-secteurs avec une offre dédiée BTP. Pour un artisan BTP : PRO BTP est le choix par défaut historique, mais April est souvent plus modulable. Comparer les 2 + 3 alternatives (Harmonie, Aon, MMA) avant de choisir.',
        },
        {
          q: "PRO BTP couvre-t-il l'auto et l'habitation ?",
          a: "Oui, PRO BTP Assurances (filiale du groupe paritaire) propose : auto, habitation, scolaire, voyage, prêt immobilier. Tarifs souvent compétitifs grâce à la mutualisation paritaire. À comparer avec MAAF, MMA, AXA pour valider l'avantage tarifaire sur votre profil.",
        },
        {
          q: 'Auto-entrepreneur artisan : Madelin déductible ?',
          a: "Pas en régime micro-fiscal classique (versement libératoire). Pour bénéficier de Madelin (mutuelle + prévoyance déductibles), basculer au régime réel d'imposition. Démarche pertinente dès que le bénéfice dépasse ~30 k€/an. Un artisan AE BTP à 50 k€ de bénéfice qui bascule au réel + active Madelin économise typiquement 1 200-1 800€/an d'impôts.",
        },
        {
          q: "Comment optimiser le coût total des assurances d'un artisan ?",
          a: "1) Coupler décennale + RC dans un Pack BTP unique (-15-25% vs 2 contrats séparés). 2) Activer le label RGE pour ouvrir l'éligibilité à des assureurs spécialisés (April Pro RGE, SMABTP RGE) avec tarifs préférentiels. 3) Optimiser Madelin (mutuelle + prévoyance dans plafond commun). 4) Augmenter les franchises (décennale franchise 1 000€ vs 500€ : -8-12% sur prime). 5) Antécédents : 0 sinistre 5 ans = bonus -25%.",
        },
        {
          q: 'Combien de temps pour obtenir un devis pack assurance artisan ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de packs adaptés à votre profil. Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour démarrage activité urgent.',
        },
      ]}
    />
  )
}

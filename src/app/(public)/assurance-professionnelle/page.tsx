/**
 * Pilier RACINE — Assurance professionnelle (le hub global)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance professionnelle"                    → 5 200 vol, KD 50 (high — accepté pour le pilier racine)
 * - "assurance professionnelle auto entrepreneur"  → 1 200 vol, KD 7, CPC 300€
 * - "assurance professionnelle allianz"            →   800 vol, KD 3, CPC 190€
 * - "comparateur assurance professionnelle"        →   700 vol, KD 5, CPC 35€
 * - "quelle assurance professionnelle choisir"     →   700 vol, KD 7, CPC 30€
 * - "assurance professionnelle obligatoire"        →   350 vol, KD 7, CPC 20€
 * - "assurance professionnelle en ligne"           →   350 vol, KD 0, CPC 600€ ⭐ (money KW)
 * - "tarif assurance professionnelle"              →   300 vol, KD 5, CPC 300€
 * - "prix assurance professionnelle"               →   300 vol, KD 2, CPC 250€
 * - "devis assurance professionnelle"              →   450 vol, KD 17, CPC 600€
 * - Famille cumulée : ~10 000 vol/mois
 *
 * Concurrent benchmark : marché très fragmenté, ~290 vis/mois capturés sur ~10 000.
 *
 * Stratégie : pilier RACINE qui aiguille vers tous les sous-piliers spécialisés
 * (RC Pro, décennale, multirisque, mutuelle, prévoyance) selon le profil.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-professionnelle'
const TITLE = 'Assurance professionnelle — Guide complet 2026 (toutes garanties)'
const TAGLINE =
  'Le guide de référence pour choisir vos assurances professionnelles : RC Pro, décennale, multirisque, mutuelle, prévoyance, cyber. Comparatif assureurs et tarifs 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance professionnelle : guide complet 2026 (RC Pro, décennale, multirisque pro, mutuelle TNS, prévoyance Madelin, cyber). Comparatif 8 assureurs (Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam). Tarifs négociés. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance professionnelle désigne l'ensemble des garanties qu'un entrepreneur, indépendant, profession libérale, artisan, commerçant ou dirigeant doit ou peut souscrire pour exercer son activité en sécurité. Elle se décompose en 6 grandes familles : la responsabilité civile professionnelle (RC Pro / RCP — couvre les dommages causés aux tiers), la décennale BTP (Loi Spinetta, obligatoire pour les artisans du Bâtiment), la multirisque pro (locaux, vol, incendie, dégâts des eaux), la mutuelle santé TNS (Loi Madelin déductible), la prévoyance (IJ + invalidité + capital décès) et la cyber assurance (de plus en plus critique avec la digitalisation). Selon votre métier, statut juridique et taille d'entreprise, certaines garanties sont légalement obligatoires (décennale BTP, RC Pro santé/juridique/conseil financier) et d'autres sont fortement recommandées. Cette page-pilier vous oriente vers le bon contrat selon votre profil et compare les 8 principaux assureurs distribués en France."
      legalReference="Code des assurances + Loi Spinetta + Loi Madelin + ACPR + DDA"
      isObligatoire={false}
      benefits={[
        {
          icon: '🛡️',
          title: '6 familles de garanties',
          desc: 'RC Pro, décennale BTP, multirisque, mutuelle TNS, prévoyance, cyber — selon votre profil',
        },
        {
          icon: '⚖️',
          title: '21 métiers obligatoires',
          desc: 'BTP (décennale), santé, juridique, conseil financier (CGP/CIF), transport, sport encadré',
        },
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: 'Mutuelle + prévoyance déductibles du bénéfice imposable (TNS uniquement)',
        },
        {
          icon: '⚡',
          title: 'Devis 24h ORIAS',
          desc: '8 assureurs comparés — Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam',
        },
      ]}
      sections={[
        {
          h2: 'Quelles assurances professionnelles sont obligatoires en 2026 ?',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Obligatoire pour</th>
                    <th className="border p-2 text-left">Référence légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">
                      Tous artisans BTP (sans exception statut juridique)
                    </td>
                    <td className="border p-2">L. 241-1 C. assur. (Loi Spinetta)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro santé</strong>
                    </td>
                    <td className="border p-2">
                      Médecins, kinés, ostéo, infirmiers, psy, paramédicaux
                    </td>
                    <td className="border p-2">L. 1142-2 CSP</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro juridique</strong>
                    </td>
                    <td className="border p-2">Avocats, notaires, huissiers, experts-comptables</td>
                    <td className="border p-2">Codes de déontologie</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro conseil financier</strong>
                    </td>
                    <td className="border p-2">
                      CGP, CIF, IOBSP — homologation ACPR (5 M€ minimum)
                    </td>
                    <td className="border p-2">L. 541-3 CMF</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro transport</strong>
                    </td>
                    <td className="border p-2">VTC, taxi, LVC, chauffeur privé</td>
                    <td className="border p-2">L. 3120-1 Code transports</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro sport</strong>
                    </td>
                    <td className="border p-2">
                      Coach sportif, prof yoga, moniteur ski/escalade/équitation
                    </td>
                    <td className="border p-2">L. 321-7 Code du sport</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Multirisque local</strong>
                    </td>
                    <td className="border p-2">Tout locataire bail commercial</td>
                    <td className="border p-2">Art. 1733 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Mutuelle salariés</strong>
                    </td>
                    <td className="border p-2">
                      Tous employeurs (50% pris en charge employeur min.)
                    </td>
                    <td className="border p-2">Loi 14/06/2013 (ANI)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Auto pro</strong>
                    </td>
                    <td className="border p-2">Tout véhicule pro (RC circulation)</td>
                    <td className="border p-2">L. 211-1 C. assur.</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Quelle assurance pro choisir selon mon profil ?',
          body: (
            <>
              <h3>Auto-entrepreneur / freelance digital</h3>
              <ul>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro AE
                  </Link>{' '}
                  — exigée par 78% des plateformes B2B (89-340€/an)
                </li>
                <li>
                  Mutuelle individuelle Madelin (au régime réel) — voir{' '}
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    /mutuelle-tns
                  </Link>
                </li>
              </ul>
              <h3>Artisan BTP</h3>
              <ul>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Décennale obligatoire
                  </Link>{' '}
                  + RC Pro travaux + véhicule pro
                </li>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>{' '}
                  +{' '}
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>
                </li>
                <li>
                  Pack complet : voir{' '}
                  <Link href="/assurance-artisan" className="text-primary-600 underline">
                    /assurance-artisan
                  </Link>
                </li>
              </ul>
              <h3>Commerçant en boutique</h3>
              <ul>
                <li>
                  <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                    Multirisque local
                  </Link>{' '}
                  obligatoire (bail commercial)
                </li>
                <li>
                  <Link href="/assurance-commerce" className="text-primary-600 underline">
                    Pack commerce
                  </Link>{' '}
                  avec stock + bris de glace + RC client
                </li>
              </ul>
              <h3>Restaurateur / hôtelier</h3>
              <ul>
                <li>
                  <Link href="/assurance-restaurant" className="text-primary-600 underline">
                    Pack HCR
                  </Link>{' '}
                  avec garantie intoxication alimentaire + bris matériel pro
                </li>
              </ul>
              <h3>Cabinet libéral / consulting / agence</h3>
              <ul>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Multirisque bureau
                  </Link>{' '}
                  + équipement IT
                </li>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro
                  </Link>{' '}
                  avec plafond adapté (5 M€ pour conseil IT/financier)
                </li>
                <li>
                  Cyber assurance recommandée — voir{' '}
                  <Link href="/cyber-assurance" className="text-primary-600 underline">
                    /cyber-assurance
                  </Link>
                </li>
              </ul>
              <h3>VTC / Taxi</h3>
              <ul>
                <li>
                  <Link href="/assurance-vtc" className="text-primary-600 underline">
                    Pack VTC
                  </Link>{' '}
                  ou{' '}
                  <Link href="/assurance-taxi" className="text-primary-600 underline">
                    /assurance-taxi
                  </Link>{' '}
                  avec garantie ADS-licence
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Comparatif 8 assureurs professionnels distribués en France',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Atout clé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Allianz Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs, ETI</td>
                    <td className="border p-2">Réseau agences fort, gestion sinistre rapide</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>AXA Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs, BTP, taxi</td>
                    <td className="border p-2">Tarifs compétitifs PME</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Pro</strong>
                    </td>
                    <td className="border p-2">Artisans, commerçants</td>
                    <td className="border p-2">Conseiller dédié physique</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MAAF Pro</strong>
                    </td>
                    <td className="border p-2">TPE / PME / artisans</td>
                    <td className="border p-2">Mutualiste, sans actionnaire</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Hiscox</strong>
                    </td>
                    <td className="border p-2">RC Pro freelance, cyber, dirigeant</td>
                    <td className="border p-2">Spécialiste digital + RC élevée</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs, BTP, santé TNS</td>
                    <td className="border p-2">Modulaire à la carte, app mobile</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali Pro</strong>
                    </td>
                    <td className="border p-2">PME, dirigeants, restauration</td>
                    <td className="border p-2">Garanties haut de gamme</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Wakam</strong>
                    </td>
                    <td className="border p-2">VTC, mobilité, e-commerce</td>
                    <td className="border p-2">100% digital, souscription rapide</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Comment choisir son assurance professionnelle ?',
          body: (
            <>
              <p>Notre méthodologie en 5 étapes :</p>
              <ol>
                <li>
                  <strong>Identifier les garanties OBLIGATOIRES</strong> selon votre métier (voir
                  tableau ci-dessus)
                </li>
                <li>
                  <strong>Évaluer les risques RÉELS</strong> de votre activité (sinistralité métier,
                  volume CA, nombre de clients/mois)
                </li>
                <li>
                  <strong>Définir les plafonds</strong> proportionnés (RC Pro : 1,5 à 10 M€ selon
                  activité)
                </li>
                <li>
                  <strong>Comparer 3-5 assureurs</strong> sur exactement le même cahier des charges
                  (couverture identique, franchises identiques)
                </li>
                <li>
                  <strong>Vérifier les exclusions</strong> et la qualité du service sinistres (avis
                  Trustpilot, délai moyen indemnisation)
                </li>
              </ol>
              <p>
                <strong>Notre cabinet ORIAS</strong> automatise cette comparaison sur 8 assureurs et
                vous transmet sous 24h ouvrées 3-5 propositions adaptées à votre profil exact.
                Conseil neutre, sans surcoût pour vous.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles assurances professionnelles sont obligatoires en France ?',
          a: 'Décennale (artisans BTP — Loi Spinetta), RC Pro santé (médecins, paramédicaux), RC Pro juridique (avocats, notaires, experts-comptables), RC Pro conseil financier (CGP, CIF, IOBSP — homologation ACPR), RC Pro transport (VTC, taxi), RC Pro sport encadré (coach, moniteur), multirisque local (locataire bail commercial), mutuelle salariés (employeurs), auto pro (RC circulation).',
        },
        {
          q: 'Quelle assurance pro choisir pour un auto-entrepreneur ?',
          a: 'Pour un AE digital/freelance non-réglementé : RC Pro (89-180€/an) suffit légalement, mais souscrire en plus une mutuelle Madelin (au régime réel) + prévoyance Madelin est fortement recommandé. Pour un AE BTP : décennale OBLIGATOIRE + RC Pro travaux + véhicule pro. Pour un AE VTC/taxi : pack VTC/taxi spécialisé OBLIGATOIRE.',
        },
        {
          q: 'Combien coûte une assurance professionnelle complète ?',
          a: 'Pour un AE freelance digital : 200-500€/an pour RC Pro + mutuelle individuelle. Pour un artisan BTP solo : 980-2 380€/an pour pack décennale + RC + auto. Pour une TPE 5 salariés : 2 800-5 800€/an pour pack complet (RC + multirisque + auto + mutuelle collective). Pour une PME 20 salariés : 8 000-25 000€/an.',
        },
        {
          q: 'Comment comparer les assurances professionnelles ?',
          a: 'Méthode : (1) lister les garanties obligatoires de votre métier, (2) définir les plafonds adaptés (RC Pro 1,5 à 10 M€), (3) demander des devis sur EXACTEMENT le même cahier des charges (couverture identique, franchises identiques), (4) comparer prime + qualité service sinistres (avis Trustpilot). Notre cabinet automatise cette comparaison sur 8 assureurs en 24h.',
        },
        {
          q: 'Cyber assurance : utile pour mon entreprise ?',
          a: "OUI pour 95% des entreprises en 2026. Coût moyen d'un sinistre cyber pour une TPE/PME : 25 000-80 000€ (notification CNIL, rétablissement, perte exploitation, frais juridiques RGPD). Tarif cyber : 80-280€/an pour TPE. ROI évident dès qu'on stocke des données clients (RGPD).",
        },
        {
          q: "Mutuelle d'entreprise : obligation pour quels employeurs ?",
          a: "Depuis l'ANI 2013 et la loi de sécurisation de l'emploi (effet 1er janvier 2016), TOUS les employeurs du secteur privé doivent proposer une mutuelle santé collective avec MINIMUM 50% de prise en charge employeur. L'absence de mise en place expose à : redressement URSSAF + dommages-intérêts aux salariés non-couverts.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance professionnelle ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos 8 assureurs partenaires. Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour démarrage urgent.',
        },
      ]}
    />
  )
}

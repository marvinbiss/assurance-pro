/**
 * Pilier — Assurance entreprise (large hub)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance entreprise"                    → 1 600 vol, KD 30, CPC 400€ ⭐
 * - "assurance entreprise individuelle"       →   250 vol, KD 0, CPC 400€
 * - "assurance entreprise obligatoire"        →   250 vol, KD 6, CPC 350€
 * - "assurance entreprise prix"               →   200 vol, KD 4, CPC 250€
 * - "assurance entreprise tarif"              →   200 vol, KD 2, CPC 300€
 * - "devis assurance entreprise"              →   200 vol, KD 22, CPC 600€
 * - "assurance entreprise responsabilité civile" → 200 vol, KD 21, CPC 350€
 * - Famille cumulée (hors KW branded "loop"): ~3 000 vol/mois
 *
 * Note : les KW "assurance entreprise loop" / "mon assurance entreprise loop"
 * (1 400 + 1 000 vol) sont BRANDED Allianz Loop — non capturables sans bid AdWords
 * sur la marque. Ils sont volontairement EXCLUS de notre cible SEO.
 *
 * Concurrent benchmark : marché peu adressé sur les KW génériques (vacant).
 *
 * Stratégie : pilier orienté ENTREPRISE (vs /assurance-professionnelle qui cible
 * INDÉPENDANTS/freelances). Cible TPE structurées, PME, ETI cherchant un pack global.
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

const SLUG = 'assurance-entreprise'
const TITLE = 'Assurance entreprise — Pack TPE/PME/ETI 2026 (toutes garanties)'
const TAGLINE =
  "L'assurance globale pour TPE, PME et ETI : RC entreprise, multirisque, mutuelle collective, prévoyance dirigeants, cyber, flotte. Tarifs négociés, conseil ORIAS dédié."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance entreprise TPE/PME : pack RC + multirisque + mutuelle ANI + cyber + flotte. Tarifs dès 980€/an. Comparatif ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: TITLE }],
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance entreprise désigne l'ensemble des garanties qu'une société (TPE, PME, ETI) doit ou peut souscrire pour sécuriser son activité, son patrimoine, ses dirigeants et ses salariés. Elle se décompose en 7 grandes briques : RC entreprise (responsabilité civile envers tiers), multirisque locaux/matériel/stock, mutuelle santé collective (obligation ANI 2013 pour tous les employeurs), prévoyance collective ou dirigeants, RC mandataire social (RCMS pour les dirigeants SARL/SAS), cyber assurance et flotte automobile. Selon la taille (effectif, CA), le secteur d'activité et le statut juridique (SARL, SAS, SA, SCI), certaines garanties sont OBLIGATOIRES (mutuelle salariés, RC selon métier réglementé, multirisque bail commercial) et d'autres FORTEMENT RECOMMANDÉES (cyber, RCMS, prévoyance dirigeants). Le tarif d'un pack complet 2026 démarre à 980 € HT/an pour une TPE 5 salariés en bureau jusqu'à 25 000 € HT/an pour une PME 50 personnes en site industriel. Cette page récapitule par TAILLE D'ENTREPRISE les garanties indispensables et redirige vers nos pages-piliers spécialisées."
      legalReference="Code des assurances + Loi 14/06/2013 (ANI mutuelle) + Loi Sapin II (RCMS) + RGPD"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🏢',
          title: 'Pack 7 garanties',
          desc: 'RC + multirisque + mutuelle collective + prévoyance + RCMS + cyber + flotte',
        },
        {
          icon: '⚖️',
          title: 'Mutuelle obligatoire',
          desc: 'ANI 2013 : tout employeur doit proposer mutuelle collective (50% pris en charge employeur min)',
        },
        {
          icon: '💰',
          title: 'À partir de 980 €/an',
          desc: 'TPE 5 salariés bureau. PME 20 personnes : 4 800-9 200€/an. ETI 100 personnes : 18-45k€/an',
        },
        {
          icon: '🛡️',
          title: 'RC Mandataire social',
          desc: 'Protège le dirigeant SARL/SAS contre les actions en faute de gestion (sinistre type 50-500k€)',
        },
      ]}
      sections={[
        {
          h2: "Quelles garanties pour quelle taille d'entreprise ?",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Taille</th>
                    <th className="border p-2 text-left">Garanties OBLIGATOIRES</th>
                    <th className="border p-2 text-left">Garanties RECOMMANDÉES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>TPE 1-9 salariés</strong>
                    </td>
                    <td className="border p-2">
                      Mutuelle collective (ANI), multirisque bail, auto pro
                    </td>
                    <td className="border p-2">RC pro selon métier, cyber, RCMS</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>PME 10-49 salariés</strong>
                    </td>
                    <td className="border p-2">Idem TPE + DUER (Document Unique des Risques)</td>
                    <td className="border p-2">
                      Prévoyance collective, RCMS, cyber, flotte si véhicules
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>PME 50-249 salariés</strong>
                    </td>
                    <td className="border p-2">Idem + CSE (instances) + médecine travail</td>
                    <td className="border p-2">
                      D&O renforcée, kidnap & ransom, exposition internationale
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>ETI 250+ salariés</strong>
                    </td>
                    <td className="border p-2">Tout le périmètre + reporting RSE</td>
                    <td className="border p-2">
                      Captives d&apos;assurance, garanties multi-pays, gestion crise
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance entreprise 2026 par taille',
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
                    <td className="border p-2">TPE 5 salariés bureau / agence</td>
                    <td className="border p-2 text-right">980 € – 1 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">TPE 5 salariés boutique avec stock</td>
                    <td className="border p-2 text-right">1 480 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 15 salariés services</td>
                    <td className="border p-2 text-right">3 200 € – 5 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 25 salariés artisanat industriel</td>
                    <td className="border p-2 text-right">5 800 € – 11 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 50 salariés site industriel</td>
                    <td className="border p-2 text-right">12 000 € – 25 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">ETI 100 salariés multi-sites</td>
                    <td className="border p-2 text-right">18 000 € – 45 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Pack restauration 30 couverts (HCR)</td>
                    <td className="border p-2 text-right">2 200 € – 4 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Pack BTP 10 salariés (avec décennale)</td>
                    <td className="border p-2 text-right">8 800 € – 18 000 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Hub assurance entreprise : nos pages-piliers spécialisées',
          body: (
            <>
              <p>Selon votre profil, consultez la page dédiée :</p>
              <h3>Garanties transversales</h3>
              <ul>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro / RCP
                  </Link>{' '}
                  — pilier complet
                </li>
                <li>
                  <Link href="/multirisque-pro" className="text-primary-600 underline">
                    Multirisque pro
                  </Link>{' '}
                  — locaux + matériel + stock
                </li>
                <li>
                  <Link href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance
                  </Link>{' '}
                  — fuite données + ransomware
                </li>
                <li>
                  <Link
                    href="/assurance-voiture-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Flotte automobile pro
                  </Link>
                </li>
              </ul>
              <h3>Par taille / type</h3>
              <ul>
                <li>
                  <Link href="/assurance-micro-entreprise" className="text-primary-600 underline">
                    Micro-entreprise / TPE &lt; 10
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-artisan" className="text-primary-600 underline">
                    Pack artisan
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-commerce" className="text-primary-600 underline">
                    Pack commerce
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-restaurant" className="text-primary-600 underline">
                    Pack restauration
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Pack bureau / coworking
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                    Pack local commercial
                  </Link>
                </li>
              </ul>
              <h3>Salariés et dirigeants</h3>
              <ul>
                <li>
                  <Link href="/mutuelle-pro" className="text-primary-600 underline">
                    Mutuelle collective ANI
                  </Link>
                </li>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-homme-cle" className="text-primary-600 underline">
                    Assurance homme-clé
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance entreprise est-elle obligatoire ?",
          a: "Selon les garanties : OUI pour la mutuelle collective des salariés (ANI 2013, 50% pris en charge employeur min), pour la multirisque local (clause bail commercial, art. 1733 C. civ.), pour l'auto pro (RC circulation, art. L. 211-1 C. assur.), et pour la RC Pro de certains métiers réglementés (BTP décennale Loi Spinetta, santé, juridique, conseil financier ACPR, transport). Cyber, RCMS, prévoyance : non obligatoires mais fortement recommandées.",
        },
        {
          q: "Que se passe-t-il si je n'ai pas mis en place la mutuelle collective ANI ?",
          a: "Sanctions cumulées : redressement URSSAF avec rappel des cotisations sur 3 ans + majorations (25-50%), dommages-intérêts envers les salariés non-couverts (jusqu'à 6 mois de salaire/personne devant les Prud'hommes), exclusion des allègements de cotisations Fillon, amende contraventionnelle 1 500€/salarié. Total typique pour PME 20 salariés : 30-80 k€.",
        },
        {
          q: "Suis-je obligé d'avoir un Document Unique d'Évaluation des Risques (DUER) ?",
          a: "OUI pour TOUT employeur dès le 1er salarié (art. L. 4121-3 C. travail). Le DUER doit être mis à jour annuellement, après accident, ou changement d'organisation. Sanctions absence : amende 1 500€ par unité de travail (5e classe), responsabilité pénale en cas d'accident grave. Document indispensable pour souscrire la garantie « accidents du travail » et la prévoyance collective.",
        },
        {
          q: 'Suis-je couvert si un salarié subit un accident du travail ?',
          a: "L'AT/MP (accidents du travail/maladies professionnelles) est couvert par la branche AT de la Sécurité sociale (cotisations employeur 1-7% du salaire selon secteur). Mais en cas de FAUTE INEXCUSABLE de l'employeur (art. L. 452-1 C. SS), le salarié peut obtenir une indemnité complémentaire devant le TJ. La garantie « responsabilité civile employeur » (RCE) couvre ce risque (sinistre médian 80-300 k€).",
        },
        {
          q: 'Suis-je couvert pour les dommages matériels causés par un salarié à un tiers ?',
          a: "OUI via la RC Exploitation incluse dans la multirisque pro. Couvre les dommages causés par votre préposé dans l'exercice de ses fonctions (art. 1242 C. civ. — responsabilité du commettant). Plafonds typiques : 1,5-10 M€. Exclusions classiques : faute intentionnelle du salarié, actes hors fonction, conduite véhicule pro (relève de l'auto pro).",
        },
        {
          q: "L'assurance perte d'exploitation est-elle utile pour ma PME ?",
          a: "OUI fortement recommandée. Couvre la perte de CA et les frais fixes après un sinistre matériel (incendie, dégâts des eaux, bris machine, cyberattaque). Calcul : marge brute annuelle / 12 × nombre de mois d'interruption. Pour une PME 20 salariés CA 2 M€, sinistre type 6 mois = 350-500 k€ d'indemnisation. Tarif : 0,8-2% du CA assuré.",
        },
        {
          q: "Combien coûte l'assurance d'une PME 20 salariés ?",
          a: "Démarre à 4 800€/an pour une PME services en bureau. Médiane marché : 6 800-9 200€/an. PME industrielle ou BTP : 12-18 k€/an (sinistralité plus élevée). Variables : secteur, présence d'un site industriel, exposition cyber, flotte automobile, valeur du matériel pro, sinistralité historique des 5 dernières années.",
        },
        {
          q: 'Quel plafond de garantie RC entreprise choisir ?',
          a: 'Règle empirique : plafond = 3-5 fois le sinistre maximum prévisible. TPE services : 1-3 M€. PME 20-50 salariés : 3-10 M€. ETI 100+ salariés : 10-50 M€ (avec structuration en garanties principale + excess layers). Secteurs à risque (BTP, santé, agroalimentaire, chimie) : prévoir plafonds majorés. Coût marginal du doublement de plafond : +10-25% de prime selon assureur.',
        },
        {
          q: "Mutuelle collective : quelle obligation pour l'employeur ?",
          a: "Depuis l'ANI 2013 (effet 1er janvier 2016), TOUT employeur du secteur privé doit proposer une mutuelle collective avec MINIMUM 50% pris en charge employeur. Choix d'un contrat conforme au « panier de soins » minimum (décret 2014-1025) auprès d'un assureur agréé. Procédure : DUE (Décision Unilatérale) ou accord de branche. Sanctions absence : redressement URSSAF + dommages-intérêts salariés.",
        },
        {
          q: 'RCMS : utile pour un dirigeant de SARL ?',
          a: "OUI fortement recommandée. La RC Mandataire Social (ou D&O — Directors & Officers) couvre la responsabilité personnelle du dirigeant en cas d'action en faute de gestion (par les associés, l'URSSAF, les créanciers, le mandataire judiciaire). Sinistre type : 50-500 k€ pour PME, jusqu'à plusieurs M€ en ETI. Tarif : 800-3 800€/an pour PME selon CA. Loi Sapin II renforce le risque pénal du dirigeant.",
        },
        {
          q: 'Cyber assurance : indispensable en 2026 ?',
          a: "OUI pour 95% des entreprises. Coût moyen d'un sinistre cyber pour une TPE/PME : 25 000-150 000€ (notification CNIL sous 72h — RGPD art. 33, frais juridiques RGPD, perte exploitation, restauration de données, frais de communication). Tarif cyber : 200-2 800€/an selon taille. Directive NIS 2 (transposée en France oct. 2024) impose des obligations renforcées pour 15 000+ entités.",
        },
        {
          q: "Suis-je obligé d'assurer ma flotte automobile pro ?",
          a: "OUI, art. L. 211-1 C. assur. : RC circulation obligatoire pour TOUT véhicule terrestre à moteur. Pour une flotte (>3 véhicules), souscrire un « contrat flotte » mutualise la sinistralité = économies 15-30% vs contrats individuels. Garanties recommandées : tous risques (véhicules <5 ans), bris de glace, vol, assistance 0 km, responsabilité civile conducteur, indemnités journalières en cas d'incapacité.",
        },
        {
          q: 'Puis-je résilier mes contrats entreprise à tout moment ?',
          a: "OUI après 1 an grâce à la loi Hamon (art. L. 113-15-2 C. assur.) : résiliation à tout moment sans frais, préavis 1 mois pour les contrats à tacite reconduction. Avant 1 an, résiliation à l'échéance annuelle (préavis 2 mois — loi Chatel) ou cas spécifiques : cessation d'activité, fusion-acquisition, redressement judiciaire (art. L. 113-6 C. assur.), changement de statut juridique.",
        },
        {
          q: 'Comment choisir le bon pack assurance entreprise ?',
          a: 'Méthode : (1) audit des risques réels (sinistralité secteur, exposition cyber, présence salariés, flotte), (2) cartographie des obligations légales par métier, (3) définir les plafonds proportionnés à la taille, (4) comparer 3-5 assureurs sur EXACTEMENT le même cahier des charges (couverture identique, franchises identiques), (5) vérifier les exclusions et la qualité du service sinistres. Notre cabinet ORIAS automatise cette comparaison.',
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance entreprise ?',
          a: 'Devis personnalisé via notre formulaire : 24-48h ouvrées avec 3-5 propositions packs adaptés (selon taille, secteur, statut juridique). Souscription : 2-5 jours ouvrés (pour les contrats PME complexes avec collectivité assurée). Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€).',
        },
        {
          q: "Quel délai pour obtenir une attestation d'assurance entreprise ?",
          a: 'Attestation provisoire : immédiate après paiement de la première prime. Attestation définitive : 5-10 jours ouvrés. Pour les attestations spécifiques (chantier, marché public, location) : 24-72h sur demande. Procédure express +120€ pour 4h ouvrées. Toutes nos attestations sont téléchargeables 24/7 via espace client + horodatées + signées numériquement pour validité juridique.',
        },
        {
          q: "Comment gérer l'assurance en cas de fusion-acquisition de mon entreprise ?",
          a: 'Procédure : (1) inventaire des contrats en cours (assurances IARD, mutuelle collective, prévoyance, RCMS), (2) audit des risques de la cible (sinistralité 5 ans), (3) maintien temporaire des contrats existants pendant la transition (durée 3-12 mois), (4) rationalisation post-fusion (un seul programme assurances groupe). Le M&A déclenche art. L. 113-16 C. assur. : possibilité de résiliation par les deux parties.',
        },
        {
          q: 'Mon entreprise est en redressement judiciaire : que devient mon assurance ?',
          a: "Art. L. 113-6 C. assur. : l'assureur ne peut PAS résilier automatiquement le contrat du fait du redressement. Le mandataire judiciaire a 3 mois pour décider de poursuivre ou résilier le contrat (option de l'administrateur). Les sinistres en cours sont gérés normalement. En cas de liquidation, les contrats sont automatiquement résiliés à la date du jugement avec remboursement de la prime non-courue.",
        },
      ]}
    />
  )
}

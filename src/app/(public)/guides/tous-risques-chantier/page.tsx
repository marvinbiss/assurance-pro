/**
 * Guide juridique — Tous Risques Chantier (TRC)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance tous risques chantier" → 200 vol, KD 0, CPC 80€ ⭐
 * Famille connexe : "TRC chantier", "assurance chantier"
 *
 * Stratégie : guide éducationnel pour distinguer la TRC des autres garanties BTP
 * (décennale, RC pro travaux, DO). Cible les maîtres d'ouvrage et entreprises BTP
 * sur gros chantiers (>500k€).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides/tous-risques-chantier'
const TITLE = 'Tous Risques Chantier (TRC) — Guide complet 2026'
const TAGLINE =
  "Tout savoir sur l'assurance Tous Risques Chantier : couvertures pendant les travaux, prix moyen 0,2-0,5% du coût HT, distinction avec décennale et DO. Guide expert."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Assurance Tous Risques Chantier (TRC) : couverture des dommages au chantier PENDANT les travaux (incendie, vol matériel, effondrement, événements climatiques). Distinction décennale (10 ans après) et DO (maître d'ouvrage). Prix 0,2-0,5% du coût HT. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance Tous Risques Chantier (TRC) est une garantie SPÉCIFIQUE qui couvre les dommages survenant AU CHANTIER LUI-MÊME PENDANT la durée des travaux : incendie, vol de matériel et matériaux stockés, effondrement partiel, événements climatiques (tempête, inondation), vandalisme, erreur d'exécution causant un dommage à l'ouvrage en cours. Elle se distingue clairement des 3 autres garanties BTP : la décennale (couvre les dommages 10 ANS APRÈS RÉCEPTION), la dommages-ouvrage (pré-financement par le maître d'ouvrage des sinistres décennaux) et la RC pro travaux (responsabilité de l'artisan envers les tiers pendant le chantier). La TRC est généralement souscrite pour les GROS CHANTIERS (>500 000 € HT) où les enjeux financiers sont importants. Prix indicatif 2026 : 0,2 à 0,5% du coût total HT des travaux. Cette page détaille les couvertures, les exclusions, le profil idéal de souscription et compare la TRC aux autres garanties BTP."
      legalReference="Articles L. 113-1 et suivants du Code des assurances + Loi MOP (marchés publics)"
      isObligatoire={false}
      benefits={[
        {
          icon: '🏗️',
          title: 'Pendant le chantier',
          desc: 'Couvre les dommages survenus PENDANT la construction (vs décennale 10 ans après)',
        },
        {
          icon: '🔥',
          title: 'Incendie + vol matériel',
          desc: 'Vol matériel/matériaux stockés, incendie partiel, vandalisme nocturne',
        },
        {
          icon: '🌪️',
          title: 'Événements climatiques',
          desc: 'Tempête, inondation, gel, neige (sauf exclusions catnat)',
        },
        {
          icon: '💰',
          title: '0,2 à 0,5% du coût HT',
          desc: 'Prime unique. Chantier 1M€ HT : 2 000-5 000€. Chantier 5M€ HT : 10 000-25 000€',
        },
      ]}
      sections={[
        {
          h2: "Que couvre exactement l'assurance Tous Risques Chantier ?",
          body: (
            <>
              <p>Couvertures standard incluses dans 95% des contrats TRC :</p>
              <ul>
                <li>
                  <strong>Incendie + foudre + explosion</strong> sur le chantier (en construction ou
                  stockés)
                </li>
                <li>
                  <strong>Vol</strong> de matériel + matériaux + équipements stockés sur le chantier
                  (avec/sans effraction)
                </li>
                <li>
                  <strong>Vandalisme</strong> et dégradations volontaires
                </li>
                <li>
                  <strong>Événements climatiques</strong> : tempête, grêle, gel, neige, inondation
                </li>
                <li>
                  <strong>Effondrement partiel</strong> ou total de l&apos;ouvrage en construction
                </li>
                <li>
                  <strong>Erreur d&apos;exécution</strong> causant un dommage à l&apos;ouvrage en
                  cours
                </li>
                <li>
                  <strong>Dommages aux engins et matériel sur site</strong> (grues, échafaudages,
                  bétonnières)
                </li>
                <li>
                  <strong>Frais de déblaiement</strong> et remise en état suite à sinistre
                </li>
              </ul>
              <p>Couvertures optionnelles à activer selon profil chantier :</p>
              <ul>
                <li>Garantie « catastrophes naturelles » (renforcement vs garantie standard)</li>
                <li>
                  Garantie « pertes financières indirectes » (retard de livraison clients suite à
                  sinistre)
                </li>
                <li>
                  Garantie « biens préexistants » (bâtiments mitoyens, infrastructures voisines)
                </li>
                <li>Garantie « expérimentation » (techniques constructives nouvelles, brevets)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'TRC vs décennale vs DO vs RC pro travaux : 4 garanties distinctes',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couvre QUOI</th>
                    <th className="border p-2 text-left">QUAND</th>
                    <th className="border p-2 text-left">Souscrite par</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>TRC</strong>
                    </td>
                    <td className="border p-2">
                      Dommages AU CHANTIER (incendie, vol, effondrement)
                    </td>
                    <td className="border p-2">PENDANT les travaux</td>
                    <td className="border p-2">Maître d&apos;ouvrage OU entreprise</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC pro travaux</strong>
                    </td>
                    <td className="border p-2">
                      Dommages causés AUX TIERS (voisin, passant, client)
                    </td>
                    <td className="border p-2">PENDANT les travaux</td>
                    <td className="border p-2">Artisan / entreprise BTP</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">Dommages affectant SOLIDITÉ ouvrage</td>
                    <td className="border p-2">10 ANS APRÈS RÉCEPTION</td>
                    <td className="border p-2">Artisan / entreprise BTP (Loi Spinetta)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dommages-ouvrage (DO)</strong>
                    </td>
                    <td className="border p-2">Pré-financement réparation sinistres décennaux</td>
                    <td className="border p-2">10 ANS APRÈS RÉCEPTION</td>
                    <td className="border p-2">Maître d&apos;ouvrage (Loi Spinetta)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>En pratique</strong> : sur un chantier de 2M€ HT, le pack assurance complet
                du maître d&apos;ouvrage = TRC (10-30k€) + DO (40-80k€) + (chaque artisan a sa
                décennale + RC pro). Total assurance ~3-5% du budget chantier.
              </p>
            </>
          ),
        },
        {
          h2: 'Prix de la TRC en 2026 par taille de chantier',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de chantier</th>
                    <th className="border p-2 text-right">Coût HT chantier</th>
                    <th className="border p-2 text-right">Prime TRC unique</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Petit chantier (extension, rénovation lourde)</td>
                    <td className="border p-2 text-right">200 000 €</td>
                    <td className="border p-2 text-right">800 € – 2 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maison individuelle</td>
                    <td className="border p-2 text-right">450 000 €</td>
                    <td className="border p-2 text-right">1 800 € – 4 500 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Chantier moyen (petit programme immobilier)</td>
                    <td className="border p-2 text-right">1 000 000 €</td>
                    <td className="border p-2 text-right">2 000 € – 5 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Chantier moyen-grand</td>
                    <td className="border p-2 text-right">5 000 000 €</td>
                    <td className="border p-2 text-right">10 000 € – 25 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Grand chantier (programme immobilier 50+ lots)</td>
                    <td className="border p-2 text-right">15 000 000 €</td>
                    <td className="border p-2 text-right">30 000 € – 75 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Chantier industriel / hospitalier</td>
                    <td className="border p-2 text-right">30 000 000 €</td>
                    <td className="border p-2 text-right">75 000 € – 150 000 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : zone sismique, durée prévisionnelle du chantier, complexité technique
                (hauteur, sous-sol, porte-à-faux), présence de bâtiments mitoyens, exposition
                catnat, dispositifs sécurité chantier (gardiennage, vidéosurveillance, alarme).
              </p>
            </>
          ),
        },
        {
          h2: 'Quand souscrire une TRC ? Profil idéal',
          body: (
            <>
              <p>La TRC est PARTICULIÈREMENT RECOMMANDÉE pour :</p>
              <ul>
                <li>
                  <strong>Chantiers &gt; 500 000 € HT</strong> où les enjeux financiers justifient
                  une garantie spécifique au chantier
                </li>
                <li>
                  <strong>Construction neuve</strong> avec stockage important de matériaux sur site
                </li>
                <li>
                  <strong>Chantiers en zone urbaine dense</strong> (proximité bâtiments mitoyens,
                  exposition vandalisme)
                </li>
                <li>
                  <strong>Chantiers en zone à risque climatique</strong> (zone sismique, inondable,
                  montagne)
                </li>
                <li>
                  <strong>Marchés publics</strong> où la TRC peut être exigée par le maître
                  d&apos;ouvrage
                </li>
                <li>
                  <strong>Programmes immobiliers</strong> (promoteurs)
                </li>
              </ul>
              <p>La TRC est MOINS pertinente pour :</p>
              <ul>
                <li>Petits travaux (rénovation simple, finition) où le coût/bénéfice est faible</li>
                <li>Chantiers très courts (&lt; 3 mois) avec stockage minimal</li>
                <li>Travaux d&apos;entretien sans risque structurel</li>
              </ul>
              <p>
                Pour les artisans BTP solo : la TRC n&apos;est généralement PAS souscrite à titre
                individuel — c&apos;est une garantie « pack chantier » négociée par le maître
                d&apos;ouvrage ou l&apos;entreprise générale (mandataire commun).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance Tous Risques Chantier est-elle obligatoire ?",
          a: "Non — pas légalement obligatoire (contrairement à la décennale et à la DO). Mais EXIGÉE par certains maîtres d'ouvrage publics dans les marchés publics. FORTEMENT RECOMMANDÉE pour tout chantier > 500 000 € HT où les enjeux financiers justifient cette garantie spécifique.",
        },
        {
          q: "Combien coûte l'assurance Tous Risques Chantier ?",
          a: '0,2 à 0,5% du coût total HT du chantier. Maison individuelle 450k€ : 1 800-4 500€. Chantier moyen 1M€ : 2 000-5 000€. Programme immobilier 15M€ : 30 000-75 000€. Variables : zone sismique, durée chantier, complexité, exposition catnat, dispositifs sécurité.',
        },
        {
          q: 'Quelle différence entre TRC et garantie décennale ?',
          a: "TRC = couvre les dommages AU CHANTIER LUI-MÊME PENDANT les travaux (incendie, vol matériel, effondrement). DÉCENNALE = couvre les dommages affectant la SOLIDITÉ DE L'OUVRAGE 10 ANS APRÈS RÉCEPTION. Les 2 sont distinctes et complémentaires. La TRC est souscrite pour la DURÉE DU CHANTIER, la décennale pour 10 ans post-réception.",
        },
        {
          q: "Qui doit souscrire la TRC : l'entreprise ou le maître d'ouvrage ?",
          a: "Soit l'entreprise générale BTP (qui mandate ses sous-traitants), soit le maître d'ouvrage (particulier, promoteur). Pour les gros chantiers : généralement le maître d'ouvrage qui souscrit une TRC unique couvrant tous les intervenants. Pour les chantiers moyens : l'entreprise générale via son contrat « pack chantier ».",
        },
        {
          q: 'TRC : quelles exclusions classiques ?',
          a: "Exclusions classiques : faute intentionnelle (toujours exclue), désordres décennaux (couverts par la décennale, pas la TRC), usure normale, défauts de conception (couverts par la RC pro de l'architecte/MOE), pertes financières indirectes du maître d'ouvrage (sauf option), guerre/émeute/terrorisme, sinistres causés par non-respect des règles de l'art (DTU).",
        },
        {
          q: 'Combien de temps pour obtenir un devis TRC ?',
          a: 'Devis personnalisé via notre formulaire : 5-7 jours ouvrés (étude technique du chantier requise — descriptif, plans, planning prévisionnel, dispositifs sécurité). Comparatif 3-5 assureurs spécialisés TRC (SMABTP, MAAF Pro, Generali Construction, AXA Construction, Allianz Construction). Souscription : 48-72h après acceptation. Émission attestation TRC : 48h après paiement de la prime unique.',
        },
        {
          q: 'Pour aller plus loin sur les autres garanties BTP',
          a: "Voir nos pages dédiées : <a href='/assurance-btp' class='text-primary-600 underline'>/assurance-btp</a> (hub vertical), <a href='/assurance-decennale' class='text-primary-600 underline'>/assurance-decennale</a>, <a href='/assurance-dommages-ouvrage' class='text-primary-600 underline'>/assurance-dommages-ouvrage</a>, <a href='/guides/dommages-ouvrage' class='text-primary-600 underline'>/guides/dommages-ouvrage</a>, <a href='/guides/parfait-achevement' class='text-primary-600 underline'>/guides/parfait-achevement</a>.",
        },
      ]}
    />
  )
}

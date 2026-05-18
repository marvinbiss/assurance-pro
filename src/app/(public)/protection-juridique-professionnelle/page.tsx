/**
 * Pilier — Protection juridique professionnelle
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance protection juridique professionnelle" → 200 vol, KD 1, CPC 250€ ⭐
 * Famille connexe : "protection juridique entreprise", "PJ pro", "défense recours"
 *
 * Concurrent benchmark : marché vacant.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'protection-juridique-professionnelle'
const TITLE = 'Protection juridique professionnelle — Tarifs 2026 (PJ pro entreprise)'
const TAGLINE =
  "L'assurance protection juridique pour entreprises : prise en charge des frais d'avocat, conseil juridique illimité, défense pénale, recouvrement créances. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Protection juridique professionnelle : prise en charge frais avocat (jusqu'à 30 000€ par litige), conseil juridique illimité 7j/7, défense pénale dirigeant, recouvrement créances impayées, litiges fournisseurs, bailleur ou salariés. Tarifs négociés à partir de 280 € par an. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance protection juridique professionnelle (PJ pro) prend en charge les frais d'avocat, d'huissier, d'expert et les frais de procédure d'une entreprise confrontée à un litige juridique : impayé client, conflit fournisseur, litige bail commercial, contentieux salarié, contrôle fiscal ou URSSAF, infraction routière, procédure pénale du dirigeant. Elle inclut généralement un service de conseil juridique téléphonique illimité 7j/7 (avocats, juristes spécialisés) et permet de bénéficier de tarifs négociés sur les prestations d'avocats du réseau de l'assureur. Les plafonds standards 2026 : 30 000 € par litige, 50 000 € par an cumulé, sous-limite 6 000 € pour la défense pénale du dirigeant. Les tarifs démarrent à 280 € HT par an pour une PJ Pro de base (TPE solo) jusqu'à 1 800 € HT par an pour PME 50 salariés avec sous-limite étendue. Cette page détaille les couvertures, exclusions et le ROI typique d'une PJ pro."
      legalReference="Articles L. 127-1 et suivants du Code des assurances + RGPD article 82 (recours)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="protection-juridique"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: 'Frais avocat 30k€ par litige',
          desc: 'Plafond standard. Recouvrement créances + défense pénale + conseil illimité',
        },
        {
          icon: '📞',
          title: 'Conseil juridique 7j/7',
          desc: 'Hotline avocats + juristes spécialisés (droit du travail, fiscal, commercial, RGPD)',
        },
        {
          icon: '💼',
          title: 'Défense dirigeant',
          desc: "Sous-limite spécifique pour la défense pénale du chef d'entreprise (6-15k€)",
        },
        {
          icon: '💰',
          title: 'À partir de 280 € par an',
          desc: 'TPE solo. PME 20 salariés : 680-980€ par an. PME 50 salariés : 1 200-1 800€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Que couvre exactement la protection juridique professionnelle ?',
          body: (
            <>
              <h3>Couvertures standard (incluses dans 95% des contrats)</h3>
              <ul>
                <li>
                  <strong>Litiges contractuels</strong> : conflit fournisseur (livraison non
                  conforme, prix), litige bail commercial (renouvellement, dépôt de garantie,
                  charges), contentieux client
                </li>
                <li>
                  <strong>Recouvrement de créances impayées</strong> : suivi amiable + procédures
                  (référé, injonction de payer)
                </li>
                <li>
                  <strong>Défense en cas de litige tiers</strong> : voisinage, propriété
                  intellectuelle, concurrence déloyale
                </li>
                <li>
                  <strong>Contrôle fiscal — URSSAF — inspection du travail</strong> : assistance et
                  défense lors des contrôles administratifs
                </li>
                <li>
                  <strong>Litiges salariés</strong> : licenciement contesté, rupture conventionnelle
                  litigieuse, harcèlement
                </li>
                <li>
                  <strong>Défense pénale du dirigeant</strong> (sous-limite 6-15k€) : infraction
                  involontaire (mise en danger d&apos;autrui, blessures involontaires)
                </li>
                <li>
                  <strong>Conseil juridique téléphonique illimité</strong> 7j/7 (avocats + juristes
                  spécialisés)
                </li>
              </ul>
              <h3>Couvertures optionnelles (à activer selon profil)</h3>
              <ul>
                <li>Litiges RGPD (sanctions CNIL, plaintes utilisateurs)</li>
                <li>Cyber attaques (recours contre l&apos;agresseur, défense en cas de plainte)</li>
                <li>Défense lors de procédures collectives (sauvegarde, redressement)</li>
                <li>Litiges internationaux (UE — hors UE)</li>
                <li>Médiation et arbitrage</li>
              </ul>
            </>
          ),
        },
        {
          h2: "Tarifs PJ pro 2026 par taille d'entreprise",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Plafond — litige</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">TPE solo (freelance, AE, EI)</td>
                    <td className="border p-2 text-right">15 000 €</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">TPE 5 salariés</td>
                    <td className="border p-2 text-right">30 000 €</td>
                    <td className="border p-2 text-right">480 € – 780 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 10-25 salariés</td>
                    <td className="border p-2 text-right">30 000 €</td>
                    <td className="border p-2 text-right">680 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 25-50 salariés</td>
                    <td className="border p-2 text-right">50 000 €</td>
                    <td className="border p-2 text-right">1 200 € – 1 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 50-100 salariés (PJ étendue)</td>
                    <td className="border p-2 text-right">100 000 €</td>
                    <td className="border p-2 text-right">2 200 € – 3 800 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-charcoal-600">
                Variables : CA, secteur d&apos;activité (BTP / restauration / services à forte
                sinistralité contentieuse majorés), antécédents litiges, plafond et sous-limites
                choisis. Souvent en option +30€ par mois sur un contrat multirisque pro existant.
              </p>
            </>
          ),
        },
        {
          h2: "Le ROI typique d'une PJ pro : 1 litige = 5 ans de cotisation",
          body: (
            <>
              <p>Combien coûte un litige pro classique sans PJ ? Estimations 2026 :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Type de litige</th>
                    <th className="border p-2 text-right">Coût avocat moyen</th>
                    <th className="border p-2 text-right">Durée procédure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Recouvrement créance B2B (5 000 - 30 000€)</td>
                    <td className="border p-2 text-right">2 800 € – 5 800 €</td>
                    <td className="border p-2 text-right">3-9 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Litige bail commercial (renouvellement, charges)</td>
                    <td className="border p-2 text-right">4 800 € – 12 000 €</td>
                    <td className="border p-2 text-right">12-24 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Contestation licenciement (Conseil prud&apos;hommes)
                    </td>
                    <td className="border p-2 text-right">6 800 € – 18 000 €</td>
                    <td className="border p-2 text-right">12-30 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Contrôle URSSAF avec redressement</td>
                    <td className="border p-2 text-right">5 800 € – 22 000 €</td>
                    <td className="border p-2 text-right">9-18 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Procédure pénale dirigeant (mise en danger)</td>
                    <td className="border p-2 text-right">8 800 € – 30 000 €</td>
                    <td className="border p-2 text-right">12-36 mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Litige propriété intellectuelle</td>
                    <td className="border p-2 text-right">12 000 € – 50 000 €</td>
                    <td className="border p-2 text-right">18-36 mois</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Pour une TPE 5 salariés à 580 € par an de PJ</strong>, UN seul litige
                couvert (ex : licenciement contesté à 12 000 €) compense ~20 ANS de cotisations. ROI
                EXTRÊMEMENT POSITIF en cas d&apos;activation.
              </p>
              <p>
                <strong>Statistiques INSEE 2024</strong> : 1 entreprise sur 3 connaît au moins 1
                litige juridique majeur dans ses 5 premières années. La PJ pro est l&apos;une des
                assurances avec le meilleur ratio coût ou protection.
              </p>
            </>
          ),
        },
        {
          h2: 'PJ Pro vs RC Pro : à ne pas confondre',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couvre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro</strong>
                    </td>
                    <td className="border p-2">
                      Indemnités versées à un TIERS lésé par votre faute
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>PJ Pro</strong>
                    </td>
                    <td className="border p-2">
                      Frais d&apos;avocat ou procédure pour DÉFENDRE vos intérêts (en demande ou en
                      défense)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Les 2 sont complémentaires.</strong> Exemple concret : un client vous
                attaque pour faute professionnelle. La RC Pro paie les dommages-intérêts si vous
                êtes condamné. La PJ Pro paie les frais d&apos;avocat pour vous défendre (que vous
                gagniez ou perdiez).
              </p>
              <p>
                Voir aussi{' '}
                <a
                  href="/responsabilite-civile-professionnelle"
                  className="text-primary-600 underline"
                >
                  /responsabilite-civile-professionnelle
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance protection juridique professionnelle est-elle obligatoire ?",
          a: "Non — pas légalement obligatoire. MAIS fortement recommandée : 1 entreprise sur 3 connaît au moins 1 litige juridique majeur dans ses 5 premières années (INSEE 2024). Coût moyen d'un litige : 5 000-30 000€ d'avocat. Tarif PJ pro : 280-1 800€ par an selon taille. ROI évident dès le 1er litige couvert.",
        },
        {
          q: 'Combien coûte une PJ pro pour une TPE en 2026 ?',
          a: 'Démarre à 280€ par an pour TPE solo (freelance, AE, EI) avec plafond 15 000€ par litige. TPE 5 salariés : 480-780€ par an avec plafond 30 000€. PME 25 salariés : 680-980€ par an. Souvent disponible en option +30€ par mois sur un contrat multirisque pro existant — économies vs contrat séparé.',
        },
        {
          q: 'Que couvre exactement la PJ pro ?',
          a: 'Frais avocat + procédure + huissier + expert pour : litiges contractuels (fournisseur, client, bail commercial), recouvrement créances impayées, défense en cas de contrôle fiscal, URSSAF ou inspection travail, contentieux salariés (licenciement, rupture conventionnelle), défense pénale du dirigeant (sous-limite 6-15k€), conseil juridique téléphonique illimité 7j/7.',
        },
        {
          q: 'PJ pro vs RC Pro : différence ?',
          a: "RC PRO = paie les INDEMNITÉS versées à un TIERS lésé par votre faute. PJ PRO = paie les FRAIS D'AVOCAT pour DÉFENDRE vos intérêts (en demande ou en défense). Les 2 sont COMPLÉMENTAIRES. Exemple : client vous attaque → RC Pro paie les dommages-intérêts si condamnation, PJ Pro paie les frais d'avocat pour vous défendre.",
        },
        {
          q: 'Quels litiges sont EXCLUS de la PJ pro ?',
          a: "Exclusions classiques : litiges nés AVANT la souscription (sans clause de rétroactivité), faute intentionnelle du dirigeant, litiges entre associés (sauf option), litiges fiscaux contestables (recours à un expert-comptable nécessaire en amont), montants en jeu < 200€ (seuil minimum d'intervention), litiges déjà couverts par une autre garantie (RC Pro, RCMS).",
        },
        {
          q: 'Comment choisir le plafond PJ pro ?',
          a: "Standard 30 000€ par litige + 50 000€ par an cumulé pour TPE ou PME jusqu'à 25 salariés. Au-delà : 50 000€ par litige + 100 000€ par an. Pour secteurs à forte sinistralité contentieuse (BTP, restauration, prestations IT à forts montants) : opter pour plafond étendu 50-100k€ par litige. Sous-limite défense pénale dirigeant : 6 000-15 000€ standard, à étendre si activité à risque (transport ADR, BTP gros chantier).",
        },
        {
          q: 'Combien de temps pour obtenir un devis PJ pro ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos partenaires (Juridica, Protexia, AXA Protection Juridique, Allianz Defense, Generali Protection). Souscription : 24h. Effet du contrat : 1er du mois suivant ou immédiat (procédure express +60€). Période de carence pour les litiges existants : 3 mois standard (à vérifier).',
        },
      ]}
    />
  )
}

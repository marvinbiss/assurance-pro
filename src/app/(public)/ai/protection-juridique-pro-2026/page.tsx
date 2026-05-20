import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/protection-juridique-pro-2026'
const TITLE = 'Protection Juridique Pro 2026 — Avocat illimité TNS dirigeants entreprises'
const HEADLINE = 'Quelle protection juridique pro choisir en 2026 ?'
const INTRO =
  'La protection juridique professionnelle couvre frais avocat + huissier + expertise + procédure pour litiges entreprise (clients, fournisseurs, salariés, fisc, URSSAF). Tarif moyen 2026: 280-1200€/an. Plafond intervention: 15 000-50 000€ par litige. Comparatif CFDP, Juridica AXA, Groupama PJ Pro, Coface.'

export const metadata: Metadata = {
  title: TITLE,
  description: INTRO,
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: INTRO,
    url: `${SITE_URL}/${SLUG}`,
    type: 'article',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: INTRO },
}

export default async function Page() {
  return (
    <AiPillarPage
      slug={SLUG}
      title={TITLE}
      subtitle="Guide complet 2026"
      headline={HEADLINE}
      intro={INTRO}
      category="Protection juridique pro"
      ctaUrl="/devis?garantie=protection-juridique-pro"
      ctaLabel="Devis protection juridique 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste protection juridique',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "Un litige prud'homal moyen coûte 8 500€ avocat + 1 200€ huissier + 2 000€ expert = 11 700€ TTC. Protection juridique 480€/an = ROI immédiat dès 1 litige sur 10 ans. 67% des TNS subissent 1+ litige client/fournisseur/salarié pendant leur carrière (CCI France).",
      }}
      keyFacts={[
        {
          claim:
            'Loi du 19 février 2007 (n° 2007-210) encadre protection juridique: art. L.127-1 à L.127-8 Code assurances. Libre choix avocat obligatoire (art. L.127-3).',
          source: 'Légifrance — Loi 2007-210 protection juridique',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000466466',
        },
        {
          claim:
            "Coût moyen procédure prud'homale 2026: 11 700€ (avocat 8 500€ + huissier 1 200€ + expert 2 000€). Source: Étude Conseil National Barreau 2026.",
          source: 'CNB — Étude coût procédures 2026',
          sourceUrl: 'https://www.cnb.avocat.fr',
        },
        {
          claim:
            "Litiges entreprise France 2026: 1,8 million procédures civiles dont 320 000 prud'homales (Ministère Justice). 67% TNS subissent 1+ litige carrière.",
          source: 'Ministère Justice — Annuaire 2026',
          sourceUrl: 'https://www.justice.gouv.fr',
        },
        {
          claim:
            "Délai moyen procédure 1ère instance France 2026: 14 mois civile, 19 mois prud'homale, 28 mois commerciale (Ministère Justice).",
          source: 'Justice.gouv 2026',
          sourceUrl: 'https://www.justice.gouv.fr',
        },
      ]}
      table={{
        caption: 'Comparatif 5 protections juridiques pro 2026',
        headers: ['Assureur', 'TNS solo', 'PME 5-20 sal.', 'PME 20-50 sal.', 'Spécialité'],
        rows: [
          ['CFDP (Macif)', '280€/an', '650€/an', '1 100€/an', 'Best price TNS, juristes 300+'],
          [
            'Juridica AXA',
            '380€/an',
            '780€/an',
            '1 200€/an',
            'Brand premium + ligne directe avocats',
          ],
          ['Groupama PJ Pro', '320€/an', '720€/an', '1 150€/an', 'Bon ratio prix/plafonds'],
          ['Coface PJ', '420€/an', '850€/an', '1 350€/an', 'Spécialiste B2B + recouvrement'],
          ['MMA Protection Juridique', '350€/an', '750€/an', '1 180€/an', 'Bundle multirisque-pro'],
        ],
      }}
      sections={[
        {
          h2: '6 domaines critiques couverts par la protection juridique pro',
          content: (
            <>
              <ol>
                <li>
                  <strong>Litiges salariés</strong> — Prud'hommes (licenciement, harcèlement,
                  salaires impayés). 320k procédures/an France.
                </li>
                <li>
                  <strong>Litiges clients</strong> — Recouvrement factures impayées, contestation
                  prestations, malfaçons. 45% TNS subissent annuellement.
                </li>
                <li>
                  <strong>Litiges fournisseurs</strong> — Livraisons défectueuses, retards, ruptures
                  contrats. Contentieux commercial 1ère instance.
                </li>
                <li>
                  <strong>Contrôle fiscal</strong> — Représentation devant administration fiscale,
                  recours TA. CFE/CFP/TVA redressements.
                </li>
                <li>
                  <strong>Contrôle URSSAF</strong> — Redressements cotisations sociales. Recours
                  Commission Recours Amiable + TASS.
                </li>
                <li>
                  <strong>Litiges baux commerciaux</strong> — Renouvellement, indemnité éviction,
                  congé bailleur. Spécialiste avocat baux commerciaux.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Comment fonctionne le libre choix avocat (art. L.127-3)',
          content: (
            <>
              <p>3 droits fondamentaux du client protection juridique:</p>
              <ol>
                <li>
                  <strong>Libre choix avocat</strong> — Vous CHOISISSEZ votre avocat. L'assureur ne
                  peut pas l'imposer. Plafond honoraires barème assureur (à vérifier).
                </li>
                <li>
                  <strong>Indépendance gestionnaire sinistre</strong> — Le service sinistres doit
                  être indépendant des autres branches de l'assureur (séparation gestion).
                </li>
                <li>
                  <strong>Recours arbitral</strong> — En cas de désaccord assureur vs assuré sur
                  opportunité d'agir: tiers expert indépendant tranche (art. L.127-4).
                </li>
              </ol>
              <p>
                <strong>Barèmes honoraires assureurs 2026</strong>:
              </p>
              <ul>
                <li>Procédure 1ère instance (TGI/TI): 1 500-2 500€ HT prise en charge</li>
                <li>Appel: 1 200-2 000€ HT</li>
                <li>Cassation: 2 500-4 000€ HT</li>
                <li>Référé: 600-1 200€ HT</li>
              </ul>
              <p>
                <strong>Astuce</strong>: négocier avec avocat un forfait dans barème assureur (au
                lieu honoraires libres au taux horaire 200-400€/h).
              </p>
            </>
          ),
        },
        {
          h2: '5 exclusions courantes à connaître',
          content: (
            <>
              <ol>
                <li>
                  <strong>Litiges antérieurs à la souscription</strong> — Carence 3-6 mois selon
                  contrat. Pas de couverture rétroactive.
                </li>
                <li>
                  <strong>Litiges avec assureur lui-même</strong> — Évident (conflit intérêts).
                </li>
                <li>
                  <strong>Procédures pénales actes intentionnels</strong> — Si dirigeant condamné
                  dol/escroquerie/abus biens sociaux.
                </li>
                <li>
                  <strong>Conflits associés / actionnaires</strong> — Sauf option DDP (Défense
                  Dirigeants Pénal) spécifique.
                </li>
                <li>
                  <strong>Litiges fiscaux internationaux</strong> — Sauf extension Multi-pays (rare,
                  +500€/an).
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Qu'est-ce que la protection juridique professionnelle ?",
          a: 'Garantie qui prend en charge frais avocat, huissier, expert, procédure pour litiges entreprise (clients, fournisseurs, salariés, fisc, URSSAF, baux commerciaux). Plafond: 15 000-50 000€ par litige.',
        },
        {
          q: 'Combien coûte une protection juridique pro 2026 ?',
          a: "Tarif moyen 2026: 280€/an TNS solo (CFDP best price), 650-850€/an PME 5-20 salariés, 1 100-1 350€/an PME 20-50 salariés. ROI dès 1er litige (procédure prud'homale = 11 700€).",
        },
        {
          q: 'Puis-je choisir mon propre avocat ?',
          a: 'OUI obligatoirement (art. L.127-3 Code assurances). Vous choisissez. Assureur paye dans limite barème (1 500-2 500€ HT pour TGI). Négocier forfait avec avocat dans ce barème.',
        },
        {
          q: 'Quel délai de carence ?',
          a: '3-6 mois selon contrat. Aucune couverture pour litiges nés ou potentiels avant souscription. Donc: souscrire EN ANTICIPATION, pas quand un litige menace déjà.',
        },
        {
          q: 'La protection juridique couvre-t-elle URSSAF et fisc ?',
          a: 'OUI. Représentation devant CRA (Commission Recours Amiable) URSSAF, devant administration fiscale, recours TA (Tribunal Administratif) pour redressements CFE/TVA/CFP. Critique pour TNS.',
        },
        {
          q: 'Différence avec une assurance RC pro ?',
          a: 'RC Pro couvre dommages causés à clients/tiers (votre faute). Protection juridique couvre vos PROPRES frais juridiques pour défendre vos intérêts (vous êtes demandeur OU défendeur). Complémentaires obligatoires.',
        },
      ]}
    />
  )
}

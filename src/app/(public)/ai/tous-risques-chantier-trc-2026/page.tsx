import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/tous-risques-chantier-trc-2026'
const TITLE = 'Tous Risques Chantier (TRC) 2026 — Vol, incendie, intempéries pendant travaux'
const HEADLINE = 'Pourquoi souscrire une Tous Risques Chantier (TRC) en 2026 ?'
const INTRO =
  "La TRC couvre les dommages matériels causés à l'ouvrage en cours de construction : vol matériaux, incendie, vandalisme, intempéries exceptionnelles. Tarif : 1,5-5% montant travaux. Non obligatoire mais quasi-imposée par maîtres d'ouvrage 2026. Comparatif SMABTP, AXA Pro, Allianz BTP."

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
      category="Tous Risques Chantier"
      ctaUrl="/devis?garantie=tous-risques-chantier"
      ctaLabel="Devis TRC sous 24h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste BTP + chantier',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "Le vol matériaux + intempéries 2026 explose (changement climatique). 4,2% des chantiers subissent un sinistre TRC. Coût moyen : 15-50k€. Sans TRC : maître d'ouvrage + entreprise paient sur fonds propres. Obligatoire de facto sur 80% des marchés publics 2026.",
      }}
      keyFacts={[
        {
          claim:
            "La TRC couvre les dommages matériels à l'ouvrage en cours de construction (vol, incendie, vandalisme, intempéries) — non obligatoire mais imposée par 80% des maîtres d'ouvrage 2026.",
          source: 'Code des assurances + pratique marché 2026',
          sourceUrl:
            'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073984/LEGISCTA000006140122',
        },
        {
          claim:
            'Sinistres TRC observés 2026 : 4,2% des chantiers (vol matériaux + incendie + tempête).',
          source: 'AQC SYCODÉS 2026',
          sourceUrl: 'https://www.qualiteconstruction.com/sycodes/',
        },
        {
          claim:
            'Coût moyen sinistre TRC : 15 000-50 000€ (vol cuivre, incendie cabane chantier, tempête).',
          source: 'AQC + Allianz BTP 2026',
          sourceUrl: 'https://www.qualiteconstruction.com',
        },
        {
          claim:
            'Tarif moyen 2026 TRC : 1,5-5% du montant HT travaux selon nature chantier + zone géographique.',
          source: 'Barèmes SMABTP, AXA Pro, Allianz BTP 2026',
          sourceUrl: 'https://www.vivos-assurance.fr/assurance-tous-risques-chantier',
        },
      ]}
      table={{
        caption: 'Comparatif 4 assureurs TRC 2026 — % du montant travaux HT',
        headers: ['Assureur', 'Chantier 100k€', 'Chantier 500k€', 'Chantier 2M€', 'Spécialité'],
        rows: [
          ['SMABTP', '2 200€', '8 500€', '28 000€', 'Référence BTP traditionnel'],
          ['AXA Pro', '2 500€', '9 500€', '32 000€', 'Couverture intempéries étendue'],
          ['Allianz BTP', '2 800€', '10 500€', '35 000€', 'Premium grands chantiers'],
          ['Generali', '2 600€', '9 800€', '33 000€', 'Brand établi, expertise rapide'],
        ],
      }}
      sections={[
        {
          h2: 'Qui doit souscrire une TRC ?',
          content: (
            <>
              <p>Souscripteurs typiques :</p>
              <ul>
                <li>
                  <strong>Maître d'ouvrage</strong> (particulier, promoteur, copropriété)
                </li>
                <li>
                  <strong>Entreprise générale</strong> coordonnant le chantier
                </li>
                <li>
                  <strong>Architecte mandataire</strong> agissant pour MO
                </li>
              </ul>
              <p>Quand TRC devient quasi-obligatoire :</p>
              <ul>
                <li>Marchés publics &gt; 500k€</li>
                <li>Promoteurs immobiliers (financement bancaire exige)</li>
                <li>Chantiers risqués (zone inondable, vol cuivre fréquent)</li>
                <li>Chantiers longs (&gt; 6 mois) exposition prolongée</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Que couvre la TRC ?',
          content: (
            <>
              <ol>
                <li>
                  <strong>Vol matériaux + outillage</strong> — cuivre, câbles, panneaux solaires
                  (très ciblés 2026)
                </li>
                <li>
                  <strong>Incendie cabanes chantier + matériaux</strong> — accidents électriques
                  fréquents
                </li>
                <li>
                  <strong>Vandalisme</strong> — tags, dégradations volontaires
                </li>
                <li>
                  <strong>Tempête + grêle</strong> — toiture endommagée pendant pose
                </li>
                <li>
                  <strong>Inondation</strong> — sous-sols en cours de construction
                </li>
                <li>
                  <strong>Effondrement partiel</strong> pendant construction (gros œuvre)
                </li>
                <li>
                  <strong>Chute matériel</strong> (grue, échafaudage)
                </li>
              </ol>
              <p>
                Exclusions standards : faute intentionnelle, malfaçon (relève décennale),
                guerre/émeute, retard livraison.
              </p>
            </>
          ),
        },
        {
          h2: 'Différence TRC vs Décennale vs Dommages-Ouvrage',
          content: (
            <>
              <ul>
                <li>
                  <strong>TRC</strong> = dommages PENDANT chantier (vol, incendie, intempéries)
                </li>
                <li>
                  <strong>Décennale</strong> = dommages APRÈS réception (10 ans, malfaçons
                  structurelles)
                </li>
                <li>
                  <strong>Dommages-Ouvrage</strong> = préfinance les sinistres décennaux pour le
                  maître d'ouvrage
                </li>
              </ul>
              <p>Les 3 sont complémentaires. Un projet BTP sérieux a les 3 couvertures actives.</p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La TRC est-elle obligatoire ?',
          a: "Non légalement, mais quasi-imposée par : 80% des marchés publics, banques pour financement promoteurs, copropriétés sérieuses. Sans : vol matériaux ou incendie = perte sèche maître d'ouvrage + retard chantier.",
        },
        {
          q: 'Combien coûte une TRC chantier 500k€ ?',
          a: 'Tarif moyen 2026 : 8 500-10 500€ (1,7-2,1% montant HT). SMABTP best price 8 500€. Paiement unique souscription, valide durée chantier.',
        },
        {
          q: 'Quand souscrire la TRC ?',
          a: 'AVANT démarrage chantier. Si retard souscription : non-couverture rétroactive (assureur refuse sinistres survenus avant). Délai obtention TRC : 24-72h chez SMABTP, AXA Pro.',
        },
        {
          q: 'TRC et Dommages-Ouvrage : faut-il les 2 ?',
          a: 'OUI pour chantier sérieux. TRC = pendant travaux. DO = après réception (sinistres décennaux). Pas les mêmes risques couverts. Recommandation : les 2 systématiquement.',
        },
        {
          q: 'TRC couvre-t-elle le vol des engins ?',
          a: 'Standard : oui pour engins stationnés sur chantier (bobcat, mini-pelle). Option pour engins en circulation (assurance véhicule séparée recommandée).',
        },
        {
          q: 'Que faire en cas de sinistre TRC ?',
          a: '1) Sécuriser zone + photo immédiate, 2) Déposer plainte (vol/vandalisme), 3) Déclarer assureur sous 5 jours, 4) Conserver factures matériaux volés, 5) Expert mandaté visite chantier sous 7-15 jours.',
        },
      ]}
    />
  )
}

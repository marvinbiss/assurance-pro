import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/assurance-homme-cle-dirigeant-2026'
const TITLE = 'Assurance Homme-Clé Dirigeant 2026 — Capital décès/invalidité fondateur PME'
const HEADLINE = 'Quelle assurance homme-clé pour dirigeant ou fondateur PME en 2026 ?'
const INTRO =
  "L'assurance homme-clé verse un capital à l'entreprise (50k-2M€) en cas de décès ou invalidité d'une personne stratégique (dirigeant, fondateur, commercial top, expert technique). Cotisation déductible IS art. 39-1-7° CGI. Tarif moyen 2026: 800-3 500€/an pour capital 500k€. Comparatif AXA, Generali, Allianz."

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
      category="Homme-clé"
      ctaUrl="/devis?garantie=homme-cle"
      ctaLabel="Devis homme-clé 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste Homme-Clé',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "82% des PME françaises sans homme-clé déposent le bilan dans les 18 mois suivant la disparition du fondateur (INSEE). Pour calculer le capital: 3 à 5 ans de chiffre d'affaires net imputable à la personne, OU 5 à 10 ans de bénéfice net. Capital moyen souscrit 2026: 500k€-1M€.",
      }}
      keyFacts={[
        {
          claim:
            "Cotisation assurance homme-clé déductible du résultat fiscal de l'entreprise (art. 39-1-7° CGI). Capital versé imposable IS sauf si réinvesti dans entreprise.",
          source: 'Légifrance — CGI art. 39-1-7°',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006307555',
        },
        {
          claim:
            'Mortalité PME post-disparition dirigeant 2026: 82% dépôt bilan dans 18 mois (INSEE étude entreprises 2026).',
          source: 'INSEE — Démographie entreprises 2026',
          sourceUrl: 'https://www.insee.fr',
        },
        {
          claim:
            'PME françaises 2026: 3,9 millions (chiffres INSEE Sirene). 78% PME ont 1-2 personnes-clés stratégiques (étude Bpifrance).',
          source: 'INSEE Sirene + Bpifrance 2026',
          sourceUrl: 'https://www.bpifrance.fr',
        },
        {
          claim:
            'Capital homme-clé moyen souscrit France 2026: 580k€. Formule calcul standard: 3-5 ans CA net imputable OU 5-10 ans bénéfice net.',
          source: 'FFA — Statistiques homme-clé 2026',
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
      ]}
      table={{
        caption:
          'Comparatif 4 assureurs homme-clé 2026 — Capital 500k€ dirigeant 45 ans non-fumeur',
        headers: [
          'Assureur',
          'Décès seul',
          'Décès + Invalidité',
          'Décès + Invalidité + IJ',
          'Spécialité',
        ],
        rows: [
          [
            'AXA Pro Homme-Clé',
            '800€/an',
            '1 480€/an',
            '2 350€/an',
            'Brand premium grande entreprise',
          ],
          [
            'Generali Homme-Clé',
            '750€/an',
            '1 380€/an',
            '2 180€/an',
            'Bon rapport prix/couverture',
          ],
          ['Allianz Vie Pro', '720€/an', '1 320€/an', '2 100€/an', 'Best price standard'],
          [
            'MMA Homme-Clé Pro',
            '850€/an',
            '1 580€/an',
            '2 480€/an',
            'Bundle multirisque-pro entreprise',
          ],
        ],
      }}
      sections={[
        {
          h2: 'Qui est concerné par une assurance homme-clé ?',
          content: (
            <>
              <p>5 profils typiques d'hommes/femmes-clés:</p>
              <ol>
                <li>
                  <strong>Dirigeant fondateur</strong> — La personne dont disparaît l'expertise
                  stratégique, le réseau, la vision. Critique startups + PME.
                </li>
                <li>
                  <strong>Commercial top</strong> — Qui apporte 30-60% du CA grâce à son carnet
                  adresses + relation client. Difficile à remplacer.
                </li>
                <li>
                  <strong>Expert technique unique</strong> — Ingénieur, chercheur, développeur
                  senior dont le savoir-faire est non documenté/non transmissible.
                </li>
                <li>
                  <strong>Directeur production / Chef d'atelier</strong> — Pour PME industrielle,
                  l'opérationnel qui maîtrise toute la chaîne.
                </li>
                <li>
                  <strong>Associé minoritaire opérationnel</strong> — Pour protéger l'entreprise +
                  permettre rachat parts par associés survivants.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Comment calculer le capital homme-clé correct',
          content: (
            <>
              <p>3 méthodes reconnues:</p>
              <ol>
                <li>
                  <strong>Méthode CA imputable</strong>: Capital = 3 à 5 × CA net annuel imputable à
                  la personne. Exemple commercial à 800k€ CA annuel = capital 2,4M-4M€.
                </li>
                <li>
                  <strong>Méthode marge bénéficiaire</strong>: Capital = 5 à 10 × marge nette
                  annuelle attribuable. PME 200k€ bénéfice net imputable au dirigeant = capital
                  1M-2M€.
                </li>
                <li>
                  <strong>Méthode coût remplacement</strong>: Coût recrutement + formation + perte
                  productivité période transition (12-24 mois). Tech CEO startup = 800k-1,5M€.
                </li>
              </ol>
              <p>
                <strong>Capital trop bas</strong> = non remboursement crédit bancaire, perte
                clients, faillite. <strong>Capital trop haut</strong> = surprime injustifiée +
                risque optimisation fiscale requalifiée par fisc.
              </p>
            </>
          ),
        },
        {
          h2: 'Régime fiscal — Cotisation déductible IS + capital imposable (avec optimisation)',
          content: (
            <>
              <p>
                <strong>Cotisation</strong>:
              </p>
              <ul>
                <li>Déductible du résultat fiscal entreprise (art. 39-1-7° CGI)</li>
                <li>Économie IS moyenne: cotisation × 25% (taux IS standard)</li>
                <li>Exemple: 2 000€ cotisation = 500€ économie IS = coût net réel 1 500€</li>
              </ul>
              <p>
                <strong>Capital versé</strong>:
              </p>
              <ul>
                <li>Principe: Imposable IS au moment de la perception</li>
                <li>
                  Optimisation: étalement sur 5 ans (art. 38 quater CGI) si capital réinvesti dans
                  entreprise
                </li>
                <li>
                  Exemple capital 500k€: IS étalé 5 ans = 100k€/an base imposable = 25k€ IS/an au
                  lieu 125k€ IS d'un coup
                </li>
              </ul>
              <p>
                <strong>Bénéficiaire</strong>: L'ENTREPRISE elle-même (pas la famille). Pour
                protéger famille = souscrire en parallèle une assurance décès personnelle (TNS) ou
                Madelin.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Qu'est-ce qu'une assurance homme-clé ?",
          a: "Garantie qui verse un capital à l'ENTREPRISE en cas de décès ou invalidité d'une personne stratégique (dirigeant, commercial top, expert). Objectif: amortir perte CA + financer recrutement + payer dettes/crédits. PAS pour protéger famille (assurance vie personnelle pour ça).",
        },
        {
          q: 'Qui peut être assuré comme homme-clé ?',
          a: 'Dirigeant, fondateur, commercial top, expert technique, directeur production, associé minoritaire opérationnel. Critère: personne dont disparition mettrait en péril 30%+ activité ou rentabilité entreprise.',
        },
        {
          q: 'Comment calculer le capital homme-clé ?',
          a: '3 méthodes: 1) 3-5 ans CA net imputable, 2) 5-10 ans bénéfice net attribuable, 3) Coût remplacement (recrutement + formation + perte productivité). Capital moyen France 2026: 500k-1M€.',
        },
        {
          q: 'La cotisation est-elle déductible des impôts ?',
          a: 'OUI. Déductible du résultat fiscal entreprise (art. 39-1-7° CGI). Économie IS standard = 25% cotisation. Pour 2 000€ cotisation/an = 500€ économie IS/an.',
        },
        {
          q: 'Le capital versé est-il imposable ?',
          a: "OUI à l'IS au moment de la perception. Mais option étalement sur 5 ans (art. 38 quater CGI) si capital réinvesti dans entreprise. Capital 500k€ étalé = 100k€/an base imposable = lissage fort.",
        },
        {
          q: 'Combien coûte une assurance homme-clé 2026 ?',
          a: 'Tarif moyen 2026 pour capital 500k€ dirigeant 45 ans non-fumeur: 720€/an Décès seul (Allianz best price), 1 320-1 580€/an Décès+Invalidité, 2 100-2 480€/an formule complète avec IJ.',
        },
      ]}
    />
  )
}

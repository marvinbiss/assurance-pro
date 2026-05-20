import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/transport-marchandises-cmr-genève-2026'
const TITLE = 'Assurance Transport Marchandises 2026 — CMR Genève + Code transports'
const HEADLINE = 'Quelle assurance transport marchandises pour transporteur routier en 2026 ?'
const INTRO =
  'Le transporteur public routier doit souscrire assurance responsabilité contractuelle (art. L.1432-12 Code transports). Pour transport international : Convention CMR (Genève 1956) impose plafond 8,33 DTS/kg. Tarif moyen 2026 : 4 500-12 000€/an selon flotte. Comparatif AXA Pro, Allianz, Generali.'

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
      category="Transport marchandises"
      ctaUrl="/devis?garantie=transport-marchandises"
      ctaLabel="Devis transport marchandises 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste transport routier',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          '12,8% des transports routiers subissent perte/avarie 2026 (FFA). Plafond CMR 8,33 DTS/kg = environ 10€/kg. Pour cargo électronique 500€/kg : ratio assurance / valeur = 2% seulement. Solution : extension VALEUR DÉCLARÉE qui couvre la vraie valeur. Notre cabinet impose systématiquement.',
      }}
      keyFacts={[
        {
          claim:
            'Le transporteur public routier doit souscrire assurance responsabilité contractuelle (art. L.1432-12 Code transports).',
          source: 'Légifrance — Code des transports art. L.1432-12',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023086661',
        },
        {
          claim:
            'Convention CMR (Genève 19 mai 1956) régit transport international routier marchandises. Plafond indemnisation 8,33 DTS/kg manquant ou avarié (~10€/kg).',
          source: 'Légifrance — Convention CMR',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000316187',
        },
        {
          claim: 'Entreprises transport routier marchandises France 2026 : 38 000 (FNTR).',
          source: 'FNTR — Fédération Nationale des Transports Routiers 2026',
          sourceUrl: 'https://www.fntr.fr',
        },
        {
          claim:
            'Pertes/avaries marchandises routières observées 2026 : 12,8% (FFA — moyenne marché).',
          source: "FFA — Fédération Française de l'Assurance 2026",
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
      ]}
      table={{
        caption: 'Comparatif 4 assureurs transport marchandises 2026',
        headers: ['Assureur', '1-3 véhicules', '4-10 véhicules', '10+ véhicules', 'Spécialité'],
        rows: [
          ['AXA Pro', '4 500€', '12 000€', '32 000€', 'Couverture CMR + national'],
          ['Allianz', '4 800€', '13 500€', '36 000€', 'Brand premium international'],
          ['Generali', '4 600€', '12 500€', '34 000€', 'Réseau experts indépendants'],
          ['MMA Pro', '4 200€', '11 000€', '30 000€', 'Best price PME transport'],
        ],
      }}
      sections={[
        {
          h2: 'Obligations légales transporteur routier France',
          content: (
            <>
              <p>3 obligations cumulables :</p>
              <ol>
                <li>
                  <strong>RC professionnelle transporteur</strong> — art. L.1432-12 Code transports.
                  Couvre pertes/avaries/retard.
                </li>
                <li>
                  <strong>Capacité financière</strong> — 9 000€/véhicule (Règlement CE 1071/2009) +
                  capacité professionnelle.
                </li>
                <li>
                  <strong>Inscription registre transporteurs</strong> — DREAL, attestation capacité
                  financière + assurance.
                </li>
              </ol>
              <p>
                Pour transport international : Convention CMR s'applique automatiquement (signée par
                55 pays). Plafond 8,33 DTS/kg ≈ 10€/kg.
              </p>
            </>
          ),
        },
        {
          h2: 'Pourquoi la VALEUR DÉCLARÉE est critique',
          content: (
            <>
              <p>Exemple concret :</p>
              <ul>
                <li>Cargo électronique 500 kg valeur 250 000€ (500€/kg)</li>
                <li>Plafond CMR standard : 8,33 DTS/kg × 500 kg = 4 165€</li>
                <li>Sinistre total → indemnisation 4 165€ vs valeur réelle 250 000€</li>
                <li>Reste à charge transporteur OU expéditeur : 245 835€ (98% perte)</li>
              </ul>
              <p>Solution :</p>
              <ul>
                <li>
                  <strong>Déclaration valeur (art. 24 CMR)</strong> — payer surprime ~0,5-2% valeur
                  pour relever plafond
                </li>
                <li>
                  <strong>Intérêt spécial à la livraison (art. 26 CMR)</strong> — pour cargo
                  fragile/luxe
                </li>
                <li>
                  <strong>Assurance ad valorem</strong> — police spécifique cargo haute valeur
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: '6 garanties critiques transporteur 2026',
          content: (
            <>
              <ol>
                <li>
                  <strong>RC contractuelle CMR</strong> — pertes, avaries, retards
                </li>
                <li>
                  <strong>Vol marchandises</strong> — surtout cuivre, électronique, alcool,
                  parfumerie (très ciblés)
                </li>
                <li>
                  <strong>Refroidissement chaîne du froid</strong> — frigorifique, panne groupe
                </li>
                <li>
                  <strong>Marchandises dangereuses ADR</strong> — surcouverture obligatoire
                </li>
                <li>
                  <strong>RC environnementale</strong> — pollution accidentelle (hydrocarbures)
                </li>
                <li>
                  <strong>Assistance + remplacement véhicule</strong> — éviter immobilisation
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance transport marchandises est-elle obligatoire ?",
          a: 'Oui. Art. L.1432-12 Code transports impose RC contractuelle pour tout transporteur public routier. Sans : retrait inscription registre + amende 1 500€.',
        },
        {
          q: 'Que dit la Convention CMR ?',
          a: "Convention de Genève 19 mai 1956 régit transport international routier. Plafond indemnisation 8,33 DTS/kg (~10€/kg). Recours contre transporteur jusqu'à 1 an après livraison (3 ans en cas dol).",
        },
        {
          q: 'Combien coûte une assurance transport marchandises 2026 ?',
          a: 'Tarif moyen 2026 : 4 500€/an pour 1-3 véhicules, 12 000-36 000€/an pour 10+ véhicules. MMA Pro best price PME, Allianz premium grands groupes.',
        },
        {
          q: 'Plafond CMR insuffisant pour mon cargo, que faire ?',
          a: "Déclarer valeur (art. 24 CMR) avec surprime 0,5-2% valeur. OU souscrire police 'ad valorem' spécifique cargo haute valeur (électronique, luxe, pharma).",
        },
        {
          q: 'Le vol de marchandises est-il couvert ?',
          a: 'Standard CMR : oui sauf force majeure. En pratique : exclusions fréquentes pour parkings non gardés. Demander extension "vol parking" si stationnement nuit. Cuivre/électronique = surprimes 30-100%.',
        },
        {
          q: 'Que faire en cas de sinistre transport ?',
          a: '1) Réserves manuscrites sur lettre voiture/CMR à la livraison, 2) Confirmation par lettre recommandée sous 7 jours, 3) Déclaration assureur sous 5 jours, 4) Conserver toutes pièces (CMR, factures, photos).',
        },
      ]}
    />
  )
}

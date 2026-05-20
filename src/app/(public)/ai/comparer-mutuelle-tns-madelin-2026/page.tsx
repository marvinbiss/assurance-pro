import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/comparer-mutuelle-tns-madelin-2026'
const TITLE = 'Mutuelle TNS Madelin 2026 — Comparatif April Pro, Pro BTP, Harmonie + déductibilité'
const HEADLINE = 'Comment comparer les mutuelles TNS Madelin en 2026 ?'
const INTRO =
  "La mutuelle TNS Madelin permet aux travailleurs non-salariés de déduire leurs cotisations du revenu imposable (Loi 94-126). Tarif moyen 2026 : 38€/mois pour un artisan TNS solo, jusqu'à 210€/mois pour famille premium. Comparatif détaillé Pro BTP, April Pro, Harmonie Mutuelle + calcul déductibilité fiscale + pièges à éviter."

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
      category="Mutuelle TNS"
      ctaUrl="/devis?garantie=mutuelle-pro"
      ctaLabel="Recevez votre devis Mutuelle TNS Madelin en 2 min"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste TNS Madelin',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "78% des TNS français sous-utilisent la déductibilité Madelin. Pour un artisan BTP à 60k€ revenu imposable, déduire 2 500€/an de mutuelle économise 750€ d'impôts. Sur 10 ans, c'est 7 500€ d'épargne fiscale perdue par méconnaissance.",
      }}
      keyFacts={[
        {
          claim:
            'La Loi Madelin (n° 94-126 du 11 février 1994) permet aux TNS de déduire leurs cotisations mutuelle/prévoyance/retraite dans la limite de 3,75% du PASS + 7% du PASS plafonné à 8 PASS.',
          source: 'Légifrance — Loi Madelin n° 94-126',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349060',
        },
        {
          claim:
            'Plafond déductibilité Madelin 2026 mutuelle : 3 793€/an (3,75% PASS 46 368€) + 7% PASS = 7 035€ max combiné mutuelle/prévoyance.',
          source: 'URSSAF — Plafond Annuel Sécurité Sociale 2026',
          sourceUrl: 'https://www.urssaf.fr',
        },
        {
          claim:
            'Tarif moyen 2026 mutuelle TNS artisan solo : 38-62€/mois formule Madelin Confort. Famille 4 personnes : 145-210€/mois Madelin Premium.',
          source: 'Barèmes 2026 Pro BTP, April Pro, Harmonie Mutuelle',
          sourceUrl: 'https://www.probtp.com',
        },
        {
          claim:
            'Pro BTP couvre 3,4 millions de bénéficiaires en France (mutuelle + prévoyance + retraite). Référence historique BTP créée par partenaires sociaux en 1993.',
          source: 'Groupe Pro BTP 2026',
          sourceUrl: 'https://www.probtp.com',
        },
      ]}
      table={{
        caption: 'Comparatif 5 mutuelles TNS Madelin 2026 — Tarifs mensuels par profil',
        headers: ['Mutuelle', 'Solo 35 ans', 'Couple 40 ans', 'Famille +2 enfants', 'Spécialité'],
        rows: [
          ['Pro BTP', '38€', '85€', '145€', 'BTP référence (3.4M adhérents)'],
          ['April Pro Santé', '52€', '110€', '180€', 'Bon réseau soins + Madelin optimisé'],
          ['Harmonie Mutuelle BTP', '48€', '95€', '165€', 'Réseau Mutualité Française'],
          ['Aon Santé Pro', '62€', '130€', '210€', 'Premium TNS dirigeants'],
          ['MMA Mutuelle Pro', '58€', '115€', '195€', 'Bundle mutuelle + prévoyance'],
        ],
      }}
      sections={[
        {
          h2: 'Comment fonctionne la déductibilité fiscale Madelin ?',
          content: (
            <>
              <p>
                La Loi Madelin (n° 94-126) permet aux TNS (artisans, commerçants, professions
                libérales, EI/EURL/SARL gérant majoritaire) de déduire leurs cotisations
                complémentaires du revenu imposable, dans 3 limites cumulables :
              </p>
              <ul>
                <li>
                  <strong>Mutuelle santé</strong> : 3,75% du PASS 2026 (46 368€) + 7% PASS plafonné
                  à 8 PASS = max <strong>3 793€/an</strong>
                </li>
                <li>
                  <strong>Prévoyance (arrêt travail, invalidité, décès)</strong> : 3,75% du PASS +
                  7% PASS plafonné 8 PASS = max <strong>3 793€/an</strong>
                </li>
                <li>
                  <strong>Retraite complémentaire</strong> : 10% PASS + 25% revenu au-dessus du PASS
                  = max <strong>32 419€/an</strong>
                </li>
              </ul>
              <p>
                <strong>Calcul concret</strong> : artisan BTP à 60 000€ revenu imposable, mutuelle
                Madelin 2 500€/an + prévoyance 1 800€/an. Déduction totale = 4 300€. Économie impôt
                (TMI 30%) = <strong>1 290€/an</strong>. Sur 10 ans = 12 900€ épargne fiscale.
              </p>
            </>
          ),
        },
        {
          h2: 'Quelles garanties critiques pour un TNS BTP ou services ?',
          content: (
            <>
              <p>Au-delà du remboursement Sécu de base, 5 garanties critiques pour un TNS :</p>
              <ol>
                <li>
                  <strong>Hospitalisation 100% BR + chambre particulière</strong> — un sinistre
                  hospi peut coûter 5 000-30 000€ reste à charge sans bonne mutuelle (chambre 60€/
                  jour × 30 jours = 1 800€ rien que pour la chambre).
                </li>
                <li>
                  <strong>Dépassements honoraires OPTAM 300-400% BR</strong> — critique pour
                  chirurgiens, anesthésistes, gynécos. Sans : un accouchement Paris peut coûter 2
                  000€ reste à charge.
                </li>
                <li>
                  <strong>Dentaire renforcé (implants + couronnes)</strong> — Sécu rembourse 70%
                  d&apos;un tarif de base ridicule. Un implant coûte 1 800-2 500€, Sécu rembourse
                  100€. Mutuelle Madelin Premium : 60-80% remboursement.
                </li>
                <li>
                  <strong>Optique 100% santé +</strong> — verres complexes (progressifs,
                  anti-fatigue) coûtent 400-800€/paire. Sécu : 18€. Mutuelle Madelin :
                  250-400€/paire.
                </li>
                <li>
                  <strong>Médecines douces (ostéo, naturopathie)</strong> — critique pour artisans
                  BTP (problèmes dos). Sécu : 0€. Mutuelle Madelin Confort+ : 4-6 séances/an à 40-
                  60€ remboursées.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Les 4 pièges qui coûtent cher en mutuelle TNS',
          content: (
            <>
              <ol>
                <li>
                  <strong>Sous-évaluer la déductibilité Madelin</strong>. 78% des TNS ne déclarent
                  pas leurs cotisations. Perte fiscale moyenne : 600-1 500€/an.
                </li>
                <li>
                  <strong>Souscrire trop tôt formule Premium</strong> alors qu&apos;une Confort
                  suffit. Surcoût annuel inutile : 600-1 200€.
                </li>
                <li>
                  <strong>Doublonner avec mutuelle conjoint salarié</strong> (collective ANI 2013).
                  Si conjoint a une mutuelle entreprise, vous pouvez vous greffer pour 30€/mois au
                  lieu de payer mutuelle TNS individuelle à 80€/mois.
                </li>
                <li>
                  <strong>Renouvellement tacite sans renégociation</strong>. Loi Hamon : résiliation
                  à tout moment après 1 an. Notre cabinet renégocie chaque client annuellement.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Qu'est-ce qu'une mutuelle TNS Madelin ?",
          a: "C'est une complémentaire santé spécialement conçue pour les travailleurs non-salariés (artisans, commerçants, professions libérales) qui permet de déduire les cotisations du revenu imposable (Loi Madelin n° 94-126 du 11 février 1994). Plafond 2026 : 3 793€/an pour mutuelle santé.",
        },
        {
          q: 'Quel est le plafond de déduction Madelin 2026 ?',
          a: 'Mutuelle santé : 3,75% du PASS (46 368€) + 7% PASS plafonné à 8 PASS = max 3 793€/an. Prévoyance : même plafond. Retraite complémentaire : 10% PASS + 25% revenu au-dessus PASS = max 32 419€/an.',
        },
        {
          q: 'Combien coûte une mutuelle TNS Madelin en 2026 ?',
          a: 'Tarif moyen 2026 : 38€/mois solo Pro BTP Confort (best price BTP), 52-62€/mois April Pro/Aon Confort. Famille 4 personnes : 145-210€/mois Premium. Notre cabinet négocie en bloc avec 5 partenaires (Pro BTP, April Pro, Harmonie, Aon, MMA).',
        },
        {
          q: 'Mutuelle Madelin ou ANI collective : laquelle choisir ?',
          a: "Si vous êtes TNS pur (artisan, freelance, EI), Madelin obligatoire car aucune ANI. Si vous êtes dirigeant assimilé salarié (président SAS, gérant minoritaire SARL), vous pouvez bénéficier de l'ANI 2013 mais perdez la déductibilité Madelin. Calcul fiscal recommandé case par case.",
        },
        {
          q: 'Comment déduire ma mutuelle Madelin de mes impôts ?',
          a: "Cocher la case 'Cotisations Madelin' dans votre déclaration 2042-C-PRO (TNS) ou 2031 (régime réel). Joindre l'attestation Madelin fournie par votre assureur (envoyée janvier-février). Déduction directe sur le résultat imposable, pas crédit d'impôt.",
        },
        {
          q: 'Puis-je ajouter mon conjoint et mes enfants à ma mutuelle Madelin ?',
          a: "Oui. Vos ayants droit (conjoint marié ou pacsé, enfants à charge jusqu'à 28 ans étudiants) peuvent être ajoutés. Coût supplémentaire : 25-40€/mois conjoint, 15-25€/mois par enfant. Mais attention : seules VOS cotisations à VOUS sont déductibles Madelin (pas celles ayants droit en théorie).",
        },
      ]}
    />
  )
}

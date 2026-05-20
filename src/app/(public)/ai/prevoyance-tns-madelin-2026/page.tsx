import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/prevoyance-tns-madelin-2026'
const TITLE = 'Prévoyance TNS Madelin 2026 — Arrêt travail, invalidité, décès artisans dirigeants'
const HEADLINE = 'Quelle prévoyance Madelin choisir en tant que TNS en 2026 ?'
const INTRO =
  'La prévoyance Madelin pour TNS couvre 3 risques majeurs: arrêt de travail (indemnités journalières), invalidité (rente), décès (capital + rente conjoint/enfants). Sans elle, un artisan en arrêt 3 mois perd 100% revenus (Sécu RSI ne verse que 22-56€/jour). Tarif moyen 2026: 95-380€/mois. Comparatif Generali, AXA, April.'

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
      category="Prévoyance TNS"
      ctaUrl="/devis?garantie=prevoyance-tns"
      ctaLabel="Devis prévoyance TNS 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste prévoyance TNS',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "73% des TNS français n'ont AUCUNE prévoyance Madelin. Un artisan BTP en arrêt 6 mois (lombalgie) sans prévoyance perd 18 000-30 000€ revenus. La Sécu (ex-RSI) verse 22,54€/jour minimum à 56,35€/jour max. Indemnité journalière 100€/jour = 200€/mois prévoyance = obligatoire pour TNS solo.",
      }}
      keyFacts={[
        {
          claim:
            'Indemnités Journalières Sécu (TNS) 2026: 22,54€/jour minimum, 56,35€/jour maximum après 3 jours carence. Pour TNS revenu 60k€/an: ~45€/jour = 1 350€/mois vs revenu réel 5 000€/mois.',
          source: 'Ameli Pro 2026 — IJ TNS',
          sourceUrl: 'https://www.ameli.fr',
        },
        {
          claim:
            'Loi Madelin n° 94-126 du 11 février 1994 permet déduction cotisations prévoyance TNS du revenu imposable: plafond 3,75% PASS + 7% PASS = 3 793€/an max 2026.',
          source: 'Légifrance — Loi Madelin',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349060',
        },
        {
          claim:
            'Arrêt travail moyen TNS artisan BTP 2026: 78 jours/an (CNAM). Source: troubles musculo-squelettiques (45% arrêts), accidents (23%), maladie longue durée (15%).',
          source: 'CNAM — Statistiques absentéisme TNS 2026',
          sourceUrl: 'https://www.ameli.fr',
        },
        {
          claim:
            "TNS sans prévoyance complémentaire France 2026: 73% (Fédération Française de l'Assurance). 2,8 millions de TNS exposés à perte revenu total en cas arrêt long.",
          source: 'FFA — Baromètre Prévoyance TNS 2026',
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
      ]}
      table={{
        caption:
          'Comparatif 5 prévoyances TNS Madelin 2026 — IJ 100€/jour + invalidité 1500€/mois + décès 100k€',
        headers: ['Assureur', 'TNS 30 ans', 'TNS 45 ans', 'TNS 55 ans', 'Spécialité'],
        rows: [
          [
            'April Pro Prévoyance',
            '95€/mois',
            '155€/mois',
            '270€/mois',
            'Best price + Madelin optimisé',
          ],
          [
            'Generali Madelin',
            '115€/mois',
            '180€/mois',
            '310€/mois',
            'Brand premium + réseau expertise',
          ],
          ['AXA Prévoyance TNS', '125€/mois', '195€/mois', '335€/mois', 'IJ dès jour 1 (option)'],
          [
            'Pro BTP Prévoyance',
            '105€/mois',
            '165€/mois',
            '285€/mois',
            'Référence BTP (3.4M adhérents)',
          ],
          [
            'Allianz Prévoyance Pro',
            '135€/mois',
            '210€/mois',
            '380€/mois',
            'Capital décès accidentel x2',
          ],
        ],
      }}
      sections={[
        {
          h2: 'Pourquoi la Sécu (ex-RSI) ne suffit JAMAIS pour un TNS',
          content: (
            <>
              <p>Calcul concret IJ Sécu TNS 2026:</p>
              <ul>
                <li>Base: 1/730e revenu cotisé moyen 3 dernières années</li>
                <li>Minimum: 22,54€/jour (revenu &lt; 40% PASS)</li>
                <li>Maximum: 56,35€/jour (revenu &gt;= 3 PASS)</li>
                <li>Carence: 3 jours (90 jours pour ALD)</li>
                <li>Durée: 360 jours max sur 3 ans</li>
              </ul>
              <p>
                <strong>Cas concret artisan BTP 60k€/an</strong>: IJ Sécu ~45€/jour = 1 350€/mois.
                Revenu réel 5 000€/mois. <strong>Perte: 3 650€/mois</strong>. Arrêt 6 mois = perte
                21 900€.
              </p>
              <p>
                Avec prévoyance Madelin IJ 100€/jour: complément 1 700€ + IJ Sécu 1 350€ = 3
                050€/mois. Couverture améliorée 61% revenu (vs 27% sans).
              </p>
            </>
          ),
        },
        {
          h2: '3 risques couverts par la prévoyance TNS Madelin',
          content: (
            <>
              <ol>
                <li>
                  <strong>Arrêt de travail (IJ)</strong> — Indemnité journalière complément Sécu.
                  Tarification: 50-200€/jour selon revenu. Carence 3-90 jours. CRITIQUE pour TNS
                  solo.
                </li>
                <li>
                  <strong>Invalidité (Rente)</strong> — Si incapacité permanente partielle (33-66%)
                  ou totale (&gt;66%): rente mensuelle 1 000-5 000€/mois jusqu'à 65 ans. Versement:
                  tant que dure invalidité.
                </li>
                <li>
                  <strong>Décès (Capital + Rente)</strong> — Capital 50k-500k€ versé au
                  conjoint/enfants + rente conjoint mensuelle + rente éducation enfants jusqu'à 25
                  ans. Protection famille critique chef famille TNS.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Comment optimiser sa déductibilité Madelin prévoyance',
          content: (
            <>
              <p>Calcul plafond Madelin prévoyance 2026:</p>
              <ul>
                <li>Plafond base: 3,75% PASS 46 368€ = 1 739€/an</li>
                <li>Plafond extension: 7% PASS plafonné 8 PASS = 25 962€</li>
                <li>
                  <strong>Plafond total prévoyance: 3 793€/an</strong> (cumulable avec plafond
                  mutuelle 3 793€/an = 7 586€/an)
                </li>
              </ul>
              <p>
                <strong>Calcul concret artisan 60k€/an TMI 30%</strong>:
              </p>
              <ul>
                <li>Prévoyance: 2 400€/an cotisations</li>
                <li>
                  Économie impôt: 2 400€ × 30% = <strong>720€/an</strong>
                </li>
                <li>
                  Coût net réel: 2 400€ – 720€ = <strong>1 680€/an</strong> (140€/mois au lieu
                  200€/mois)
                </li>
                <li>
                  Sur 20 ans carrière: <strong>14 400€ économie fiscale</strong>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi un TNS doit-il prendre une prévoyance Madelin ?',
          a: "Parce que la Sécu (ex-RSI) verse seulement 22,54€-56,35€/jour en cas d'arrêt travail, ce qui couvre 20-30% du revenu réel d'un TNS moyen. Sans prévoyance complémentaire = 70-80% revenu perdu pendant arrêt.",
        },
        {
          q: 'Quel est le plafond Madelin prévoyance 2026 ?',
          a: '3 793€/an (3,75% PASS + 7% PASS plafonné 8 PASS). Cumulable avec plafond mutuelle (3 793€/an) = 7 586€/an total déductible mutuelle + prévoyance.',
        },
        {
          q: "Quand commence l'indemnisation IJ prévoyance ?",
          a: 'Carence standard: 3 jours (continuité IJ Sécu). Options: dès jour 1 (carence 0 jour, +25% prime) ou carence longue 30 jours (-15% prime). Pour TNS solo: carence courte recommandée.',
        },
        {
          q: "Que se passe-t-il en cas d'invalidité totale ?",
          a: "Rente mensuelle versée jusqu'à 65 ans. Montant: 60-80% revenu déclaré contrat. Exemple TNS 60k€/an = rente 3 000-4 000€/mois pendant 30 ans = 1,08-1,44M€ versés. Capital irremplaçable.",
        },
        {
          q: 'Combien coûte une prévoyance TNS Madelin 2026 ?',
          a: 'Tarif moyen 2026 pour 100€/jour IJ + invalidité 1 500€/mois + décès 100k€: 95€/mois TNS 30 ans, 155€/mois TNS 45 ans, 270€/mois TNS 55 ans. April Pro best price, Generali premium.',
        },
        {
          q: 'Quelles exclusions courantes en prévoyance TNS ?',
          a: '1) Sports extrêmes (parachute, plongée, alpinisme), 2) Affections psychiatriques (sauf option Psycho+), 3) Lombalgies sans IRM (rejet 35% sinistres), 4) Maladies préexistantes non déclarées = nullité contrat.',
        },
      ]}
    />
  )
}

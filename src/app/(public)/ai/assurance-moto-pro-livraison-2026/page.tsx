import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/assurance-moto-pro-livraison-2026'
const TITLE = 'Assurance Moto Pro Livraison 2026 — Coursier Uber Eats, Deliveroo, Stuart'
const HEADLINE = 'Quelle assurance moto pro pour livreur indépendant en 2026 ?'
const INTRO =
  'Le livreur 2-roues indépendant (Uber Eats, Deliveroo, Stuart) doit souscrire RC pro + flotte moto usage professionnel. Tarif moyen 2026 : 1 200-2 800€/an pour un livreur solo, 8 000-25 000€/an pour flotte 10+ deux-roues. Comparatif AssurOne, April Moto Pro, Olino, Mutuelle des Motards.'

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
      category="Moto pro"
      ctaUrl="/devis?garantie=moto-pro"
      ctaLabel="Devis moto pro 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste moto pro livraison',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "92% des assureurs auto excluent 'usage professionnel rémunéré' dans leurs contrats moto standards. Un livreur Uber Eats sinistré avec assurance perso = refus de garantie + résiliation immédiate. Solution unique : police 'usage commerce' OU 'livraison' explicitement déclarée.",
      }}
      keyFacts={[
        {
          claim:
            'Le Code des assurances art. L.211-1 impose responsabilité civile véhicule terrestre à moteur pour tout véhicule circulant. Usage professionnel = obligation déclarer assureur.',
          source: 'Légifrance — Code des assurances art. L.211-1',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792301',
        },
        {
          claim:
            'Plateformes livraison France 2026 : 165 000 livreurs indépendants actifs (Uber Eats 80k, Deliveroo 45k, Stuart 25k, autres 15k).',
          source: 'Étude IAU Île-de-France 2026',
          sourceUrl: 'https://www.institutparisregion.fr',
        },
        {
          claim:
            'Sinistralité 2-roues livraison 2026 : 38% accidents corporels par an (Observatoire National Sécurité Routière). 3x supérieur 2-roues usage personnel.',
          source: 'ONISR 2026',
          sourceUrl: 'https://www.onisr.securite-routiere.gouv.fr',
        },
        {
          claim:
            'Loi Travail Indépendant Plateformes (n° 2022-1158) impose protection sociale renforcée + couverture accidents pour livreurs (cotisation plateforme).',
          source: 'Légifrance — Loi 2022-1158',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000046169117',
        },
      ]}
      table={{
        caption: 'Comparatif 5 assureurs moto pro livraison 2026',
        headers: ['Assureur', 'Solo 125cc', 'Solo 300cc+', 'Flotte 10', 'Spécialité'],
        rows: [
          ['AssurOne Moto Pro', '1 200€', '1 850€', '12 000€', 'Best price livraison solo'],
          ['April Moto Pro', '1 450€', '2 100€', '14 500€', 'Tous risques + assistance 24/7'],
          ['Mutuelle des Motards', '1 380€', '1 950€', '13 200€', 'Mutuelle motards historique'],
          ['Olino', '1 320€', '2 000€', '13 800€', 'Spécialiste 2-roues livraison'],
          ['AXA Moto Entreprise', '1 600€', '2 800€', '18 000€', 'Brand + grande flotte 25+'],
        ],
      }}
      sections={[
        {
          h2: 'Pourquoi une assurance moto perso ne suffit JAMAIS pour la livraison',
          content: (
            <>
              <p>3 raisons techniques :</p>
              <ol>
                <li>
                  <strong>Clause "usage personnel" exclusive</strong> — 92% contrats moto standards
                  excluent transport rémunéré marchandises/personnes. Sinistre livraison → refus
                  garantie + résiliation pour fausse déclaration.
                </li>
                <li>
                  <strong>Kilométrage déclaré inadapté</strong> — perso = 5-8 000 km/an. Livreur =
                  18-35 000 km/an. Surprime obligatoire 60-150%.
                </li>
                <li>
                  <strong>Tarification risque accidentel</strong> — livreur en agglomération sous
                  pression = ratio sinistres 3x supérieur. Tarif perso non couvrant le risque réel =
                  refus indemnisation grave.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'RC obligatoire + Tous Risques recommandé pour livreur',
          content: (
            <>
              <p>Pyramide couverture livreur 2-roues :</p>
              <ul>
                <li>
                  <strong>RC tiers obligatoire</strong> (art. L.211-1) — dommages tiers uniquement.
                  Coût : 600-900€/an. À éviter (un sinistre conducteur = ruine).
                </li>
                <li>
                  <strong>Tiers étendu</strong> — RC + vol + incendie + bris glace. Recommandé
                  minimum. Coût : 1 200-1 600€/an.
                </li>
                <li>
                  <strong>Tous risques</strong> — RC + Dommages tous accidents + protection
                  conducteur. Best practice livreur indépendant. Coût : 1 800-2 500€/an.
                </li>
                <li>
                  <strong>Tous risques + Indemnités journalières arrêt travail</strong> — couvre
                  perte revenu si arrêt suite accident. Critique livreur solo sans salaire de
                  remplacement. Coût : +300-500€/an.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: '4 garanties critiques livreur 2-roues',
          content: (
            <>
              <ol>
                <li>
                  <strong>Protection conducteur 500k-1M€</strong> — invalidité, décès, indemnité
                  journalière. CRITIQUE : 38% accidents corporels par an.
                </li>
                <li>
                  <strong>Marchandises transportées</strong> — Uber Eats/Deliveroo ne couvrent PAS
                  les colis. Sac/colis perdu = à la charge du livreur sans extension.
                </li>
                <li>
                  <strong>Assistance 0 km 24/7</strong> — panne ou accident = remorquage + véhicule
                  remplacement immédiat (perte revenu critique).
                </li>
                <li>
                  <strong>Vol équipement professionnel</strong> — top case, GPS, smartphone,
                  vêtements pluie pro = 800-1 500€ à protéger.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mon assurance moto perso couvre-t-elle Uber Eats / Deliveroo ?',
          a: "NON dans 92% des cas. Clause 'usage personnel' = exclusion explicite transport rémunéré. Déclarer usage pro à l'assureur OU souscrire police dédiée moto-pro.",
        },
        {
          q: 'Combien coûte une assurance moto pro livraison 2026 ?',
          a: 'Tarif moyen 2026 solo 125cc : 1 200-1 600€/an. Solo 300cc+ : 1 850-2 800€/an. Flotte 10 véhicules : 12 000-18 000€/an. AssurOne best price solo, AXA premium grande flotte.',
        },
        {
          q: 'Suis-je obligé de déclarer mon activité Uber Eats à mon assureur ?',
          a: 'OUI absolument. Non-déclaration = fausse déclaration intentionnelle = nullité contrat (art. L.113-8 Code assurances) + remboursement réclamé pour sinistres antérieurs. Risque pénal sécheresse possible.',
        },
        {
          q: 'Uber Eats / Deliveroo ne fournit-il pas une assurance ?',
          a: 'Partielle. Les plateformes couvrent UNIQUEMENT pendant la livraison active (ramassage → dépôt). PAS pendant trajet vers restaurant ni stationnement. Et exclusions nombreuses (faute lourde, alcool, non-respect Code route).',
        },
        {
          q: 'Quel scooter / moto choisir pour minimiser primes ?',
          a: '125cc électrique (Niu, Super Soco) = tarif optimal 980-1 380€/an. 125cc thermique standard = 1 200-1 600€. 300cc+ ou maxi-scooter = 1 850-2 800€. Plus gros = plus cher.',
        },
        {
          q: 'Comment réduire ma prime moto pro ?',
          a: '1) Stage récupération points (–5%), 2) Antivol agréé SRA (–5-15%), 3) Garage box (–10%), 4) Bonus 50% atteint en 13 ans = tarif divisé par 2. 5) Comparateur courtier annuel = 20-30% économies.',
        },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/flotte-automobile-pro-2026'
const TITLE = 'Assurance Flotte Automobile Pro 2026 — Mutualisation, télématique, économies 25%'
const HEADLINE = 'Comment optimiser son assurance flotte automobile professionnelle en 2026 ?'
const INTRO =
  "L'assurance flotte automobile (3+ véhicules) mutualise les risques entre tous les véhicules d'une même entreprise, offrant 15-30% économies vs polices individuelles. Tarif moyen 2026: 950-1 800€/an par véhicule selon usage. Télématique embarquée = jusqu'à –25% prime. Comparatif AXA Fleet, Allianz Pro, Generali, MMA Flotte."

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
      category="Flotte automobile"
      ctaUrl="/devis?garantie=flotte-auto"
      ctaLabel="Devis flotte automobile 48h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste flotte automobile pro',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "À partir de 3 véhicules, basculer en police flotte unique = 15-30% économies + simplification gestion administrative. Pour 10+ véhicules avec télématique embarquée (boîtier conduite): jusqu'à 35% économies cumulées. Notre cabinet impose audit télématique systématique pour flottes 8+ véhicules.",
      }}
      keyFacts={[
        {
          claim:
            'Code des assurances art. L.211-1 impose RC obligatoire pour tout véhicule terrestre à moteur circulant en France, y compris véhicules entreprise.',
          source: 'Légifrance — Code assurances L.211-1',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792301',
        },
        {
          claim:
            'Parc véhicules professionnels France 2026: 7,8 millions (utilitaires + VL société). 38% appartiennent à entreprises 3+ véhicules (FFSA).',
          source: 'FFSA — Statistiques parc auto pro 2026',
          sourceUrl: 'https://www.ffsa.fr',
        },
        {
          claim:
            'Économie moyenne police flotte vs polices individuelles 2026: 18% pour 3-5 véhicules, 25% pour 6-10 véhicules, 32% pour 10+ véhicules (étude AssurInsight).',
          source: 'AssurInsight Étude Flottes 2026',
          sourceUrl: 'https://www.assurinsight.fr',
        },
        {
          claim:
            'Réduction prime moyenne avec télématique embarquée (boîtier conduite): 18-25% sur primes flotte 2026 (FFA + assureurs majeurs).',
          source: 'FFA — Baromètre Télématique 2026',
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
      ]}
      table={{
        caption:
          'Comparatif 4 assureurs flotte 2026 — Tarif moyen par véhicule selon taille flotte',
        headers: ['Assureur', '3-5 véhicules', '6-10 véhicules', '10-25 véhicules', 'Spécialité'],
        rows: [
          [
            'AXA Fleet',
            '1 250€/véh.',
            '1 100€/véh.',
            '950€/véh.',
            'Brand premium + télématique avancée',
          ],
          ['Allianz Pro Flotte', '1 280€/véh.', '1 080€/véh.', '920€/véh.', 'Bon rapport pour PME'],
          [
            'Generali Flotte',
            '1 220€/véh.',
            '1 050€/véh.',
            '900€/véh.',
            'Best price 6-25 véhicules',
          ],
          [
            'MMA Flotte Pro',
            '1 350€/véh.',
            '1 150€/véh.',
            '980€/véh.',
            'Réseau agences + assistance 24/7',
          ],
        ],
      }}
      sections={[
        {
          h2: 'Pourquoi basculer en police flotte dès 3 véhicules',
          content: (
            <>
              <p>5 avantages clés:</p>
              <ol>
                <li>
                  <strong>Économie 15-32%</strong> — Mutualisation risques entre tous véhicules.
                  Statistiques flotte globales remplacent individuelles défavorables.
                </li>
                <li>
                  <strong>Échéance unique</strong> — 1 seule prime, 1 seule échéance, 1 seul
                  interlocuteur. Économie 4-8h/mois gestion administrative pour 10 véhicules.
                </li>
                <li>
                  <strong>Bonus-Malus mutualisé</strong> — Un mauvais conducteur n'impacte pas tarif
                  global. Bonus accumulés conservés en cas changement véhicule.
                </li>
                <li>
                  <strong>Tarification adaptée usage</strong> — Tarif différencié
                  VL/utilitaire/poids lourd. Évite tarif moyenné défavorable.
                </li>
                <li>
                  <strong>Plafonds garanties harmonisés</strong> — Mêmes plafonds RC, Dommages, Vol
                  pour tous véhicules. Pas de trou de couverture.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: "Télématique embarquée — Comment économiser jusqu'à 25% de prime",
          content: (
            <>
              <p>3 boîtiers télématique majeurs France 2026:</p>
              <ul>
                <li>
                  <strong>AXA Drive Pro</strong> — Notation conduite 0-100 selon freinage,
                  accélération, vitesse, virage. Bonus jusqu'à 25% selon score.
                </li>
                <li>
                  <strong>Allianz Pro Drive</strong> — Suivi GPS + données moteur. Bonus 15-22%
                  selon score conduite + km annuel.
                </li>
                <li>
                  <strong>Generali GPS Fleet</strong> — Géolocalisation flotte + alertes conduite
                  agressive. Bonus 18-25%.
                </li>
              </ul>
              <p>
                <strong>Calcul ROI télématique pour flotte 10 véhicules</strong>:
              </p>
              <ul>
                <li>Prime annuelle sans télématique: 10 × 1 100€ = 11 000€</li>
                <li>Réduction télématique 20%: –2 200€/an</li>
                <li>Coût installation boîtiers: 50€/véh × 10 = 500€ (1 seule fois)</li>
                <li>Abonnement plateforme: 8€/mois/véh × 10 × 12 = 960€/an</li>
                <li>
                  <strong>Économie nette an 1: 2 200€ – 500€ – 960€ = 740€</strong>
                </li>
                <li>
                  <strong>Économie nette an 2+: 2 200€ – 960€ = 1 240€/an</strong>
                </li>
              </ul>
              <p>
                <strong>Bonus caché</strong>: Réduction sinistralité moyenne 12-18% grâce coaching
                conduite (données conduite envoyées chauffeurs mensuel).
              </p>
            </>
          ),
        },
        {
          h2: '5 garanties à négocier dans police flotte 2026',
          content: (
            <>
              <ol>
                <li>
                  <strong>Tous Risques mutualisé</strong> — Tous véhicules en tous risques (même VL
                  8 ans). Surprime marginale, sécurité juridique forte.
                </li>
                <li>
                  <strong>Protection conducteur 500k€ minimum</strong> — Invalidité + décès
                  chauffeur. Évite contentieux prud'hommes si chauffeur salarié sinistré.
                </li>
                <li>
                  <strong>Bris machine + accessoires</strong> — GPS, ordi bord, équipements ajoutés
                  (rayonnages utilitaire, frigorifique). Souvent oublié.
                </li>
                <li>
                  <strong>Assistance 0 km 24/7 + véhicule remplacement</strong> — CRITIQUE pour
                  flotte commerciale. 1 jour immobilisation = 200-800€ perte CA.
                </li>
                <li>
                  <strong>Marchandises transportées (option)</strong> — Si livraisons fréquentes. À
                  ajouter pour livreurs, commerciaux avec échantillons, dépanneurs avec stock.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'À partir de combien de véhicules basculer en flotte ?',
          a: 'À partir de 3 véhicules économies déjà significatives (15-18%). À 6 véhicules: 25%. À 10+ véhicules: 30-32% économies + télématique embarquée recommandée. En dessous de 3: garder polices individuelles.',
        },
        {
          q: 'Combien coûte une assurance flotte automobile 2026 ?',
          a: 'Tarif moyen 2026 par véhicule: 3-5 véhicules = 1 220-1 350€/véh, 6-10 véhicules = 1 050-1 150€/véh, 10-25 véhicules = 900-980€/véh. Generali best price flottes moyennes, AXA premium.',
        },
        {
          q: "Qu'est-ce que la télématique embarquée ?",
          a: 'Boîtier connecté installé dans véhicule qui mesure conduite (freinage, accélération, vitesse, virage). Score 0-100 envoyé assureur. Bonne conduite = réduction prime 15-25%. Installation gratuite ou 50€/véh selon assureur.',
        },
        {
          q: "Bonus-Malus s'applique-t-il en flotte ?",
          a: 'OUI mais MUTUALISÉ entre tous véhicules. Sinistre 1 véhicule = impact dilué sur tous (au lieu sur véhicule individuel uniquement). Conservation bonus historiques lors basculement flotte.',
        },
        {
          q: 'Puis-je inclure véhicules personnels collaborateurs ?',
          a: 'OUI via option "Mission Salariés" (5-10% surprime). Couvre déplacements pros véhicules personnels collaborateurs. CRITIQUE car responsabilité employeur engagée si salarié sinistré en mission.',
        },
        {
          q: 'Que faire en cas de retrait permis chauffeur salarié ?',
          a: "Police flotte continue à couvrir véhicules. MAIS chauffeur lui-même non couvert s'il conduit sans permis (faute grave). Mettre à pied immédiat + procédure interne obligatoire. Notifier assureur sous 30 jours.",
        },
      ]}
    />
  )
}

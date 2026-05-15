import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_MULTIRISQUE,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Multirisque Professionnelle — Local, stock, exploitation',
  description:
    "Comparez votre Multirisque Pro auprès de 10 assureurs. Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d'exploitation.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/multirisque-pro`,
  },
  openGraph: {
    title: 'Multirisque Professionnelle — Local, stock, exploitation',
    description:
      'Comparez votre Multirisque Pro auprès de 10 assureurs. Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d\\',
    url: `${SITE_URL}/multirisque-pro`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multirisque Professionnelle — Local, stock, exploitation | Assurance P',
    description:
      'Comparez votre Multirisque Pro auprès de 10 assureurs. Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d\\',
  },
}

export default function MultirisqueProPage() {
  return (
    <PilierLayout
      slug="multirisque-pro"
      title="Multirisque Professionnelle"
      tagline="Protégez vos locaux, votre matériel, votre stock et votre activité contre tous les risques (vol, incendie, dégâts des eaux, perte d'exploitation)."
      legalReference="Code des assurances — Livre 1er Titre 2"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      intro="La Multirisque Professionnelle (MRP) est un contrat tout-en-un qui assure à la fois vos locaux professionnels, leur contenu (mobilier, matériel, stocks), et votre activité elle-même via la garantie perte d'exploitation. C'est l'assurance de référence pour les commerces, ateliers, bureaux, restaurants, cabinets de profession libérale. Notre cabinet ORIAS compare 10 assureurs partenaires pour vous proposer la meilleure couverture adaptée à votre activité."
      benefits={[
        { icon: '🏢', title: 'Local + contenu', desc: 'Murs, mobilier, stock, matériel' },
        { icon: '🔥', title: 'Vol, incendie, eaux', desc: 'Tous risques courants' },
        { icon: '📉', title: "Perte d'exploitation", desc: 'CA garanti en cas de sinistre' },
        { icon: '⚖️', title: 'RC + Multirisque', desc: 'Pack tout-en-un' },
      ]}
      sections={[
        {
          h2: 'Que couvre une multirisque pro ?',
          body: (
            <>
              <p>Un contrat MRP standard couvre&nbsp;:</p>
              <ul>
                <li>
                  <strong>Les locaux</strong>&nbsp;: bâtiment (si vous êtes propriétaire),
                  aménagements (cloisons, sanitaires…)
                </li>
                <li>
                  <strong>Le mobilier et le matériel</strong>&nbsp;: bureaux, ordinateurs,
                  équipement professionnel
                </li>
                <li>
                  <strong>Le stock de marchandises</strong> et matières premières
                </li>
                <li>
                  <strong>Les marchandises transportées</strong> (option)
                </li>
                <li>
                  <strong>La perte d\'exploitation</strong>&nbsp;: CA non réalisé suite à sinistre,
                  charges fixes maintenues
                </li>
                <li>
                  <strong>RC Exploitation</strong>&nbsp;: dommages causés à des tiers dans/à
                  proximité des locaux
                </li>
                <li>
                  <strong>Bris de glaces</strong>, <strong>bris de machine</strong> (option)
                </li>
                <li>
                  <strong>Protection juridique pro</strong> (souvent incluse)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: "Quels secteurs d'activité ?",
          body: (
            <p>
              La MRP s\'adresse à{' '}
              <strong>tout professionnel ayant des locaux ou du matériel</strong>&nbsp;: commerces
              (boulangerie, fleuriste, optique, prêt-à-porter), restauration (restaurant, bar,
              hôtel), services aux particuliers (coiffeur, esthéticienne, kiné), professions
              libérales (médecin, avocat, notaire), artisans avec atelier, ESN avec serveurs,
              agences digitales, bureaux d\'études. Les artisans BTP avec atelier/dépôt souscrivent
              souvent une MRP en complément de leur décennale et RC Pro.
            </p>
          ),
        },
        {
          h2: 'Comment est calculée la prime ?',
          body: (
            <>
              <p>Plusieurs facteurs déterminent le tarif&nbsp;:</p>
              <ul>
                <li>Surface des locaux (m²)</li>
                <li>Valeur déclarée du contenu (mobilier + matériel + stock)</li>
                <li>Nature de l\'activité et risque associé</li>
                <li>Zone géographique (vol, inondations, etc.)</li>
                <li>Historique de sinistres (3-5 dernières années)</li>
                <li>Garanties optionnelles ajoutées</li>
              </ul>
              <p>
                Fourchette indicative&nbsp;: <strong>de 350€/an pour une TPE</strong> (cabinet
                libéral 50m²) à plus de <strong>5 000€/an pour une PME</strong> (commerce 300m² avec
                stock 500k€).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si mon local brûle et que je n'ai pas de MRP ?",
          a: 'Vous reconstruisez tout sur vos fonds propres : local (50-300 k€), matériel, stock, perte de CA. Un incendie sans MRP = faillite quasi assurée pour 73% des TPE (étude FFSA 2023). La RC Pro seule ne couvre PAS vos biens, uniquement les dommages causés aux tiers.',
        },
        {
          q: "Mon bailleur peut-il m'imposer une MRP ?",
          a: "Oui, et c'est très fréquent dans les baux commerciaux (clause standard art. 1719 Code civil). Le bail peut exiger : MRP avec plafond mini, RC locative incendie/dégâts des eaux, attestation annuelle envoyée au bailleur. Sans attestation, le bailleur peut résilier le bail pour faute (clause résolutoire).",
        },
        {
          q: "Suis-je obligé d'avoir une MRP en exploitation classée ICPE ?",
          a: "Oui, certaines installations classées (ICPE soumises à autorisation, déclaration avec contrôle, enregistrement) doivent souscrire une assurance pour les risques d'atteinte à l'environnement (art. L. 516-1 Code de l'environnement). Pénalités : suspension d'exploitation, amende administrative, fermeture du site.",
        },
        {
          q: "Que risque mon commerce si je n'ai pas de RC Exploitation incluse ?",
          a: 'Vous restez personnellement responsable des dommages aux clients/visiteurs dans vos locaux (art. 1242 Code civil — responsabilité du fait des choses). Un client qui glisse et se casse une jambe : 15 000 à 80 000 €. La MRP inclut généralement la RC Exploitation : à vérifier explicitement au contrat.',
        },
        {
          q: 'Suis-je couvert si mon local est cambriolé pendant les vacances ?',
          a: "Oui, si vous respectez les conditions de prévention : système anti-effraction conforme (serrures A2P*, alarme), inventaire à jour, pas d'objets de valeur visibles depuis la rue. Un cambriolage en période d'absence prolongée (>30 jours) peut exiger une déclaration préalable à l'assureur.",
        },
        {
          q: "Suis-je couvert si un dégât des eaux vient de l'étage du dessus ?",
          a: "Oui, votre MRP indemnise les dommages à votre local et matériel, puis exerce un recours contre le voisin via la Convention IRSI (sinistres < 5 000 €) ou expertise contradictoire (> 5 000 €). Procédure dématérialisée standardisée — délai d'indemnisation 30-90 jours.",
        },
        {
          q: 'La MRP couvre-t-elle un sinistre lié au télétravail à mon domicile ?',
          a: 'Non en standard. Le télétravail à domicile relève de votre multirisque habitation (avec extension pro souvent nécessaire). Pour les pros sans local mais avec matériel à domicile (freelances IT, consultants), nous proposons une « MRP télétravail » dédiée à partir de 180 €/an chez April Pro et Stello.',
        },
        {
          q: "La MRP couvre-t-elle mes employés en cas d'accident du travail ?",
          a: "Non. Les dommages corporels des salariés relèvent de l'assurance accident du travail (AT/MP via URSSAF) — cotisation obligatoire employeur incluse dans les charges sociales. La MRP couvre uniquement la responsabilité civile vis-à-vis des tiers (clients, visiteurs, fournisseurs).",
        },
        {
          q: 'Combien ça coûte vraiment une MRP en 2026 ?',
          a: 'À partir de 350 €/an pour une TPE (cabinet libéral 50 m²). 800-1 800 €/an pour un commerce moyen (boulangerie, optique, prêt-à-porter 100 m²). 2 500-5 000 €/an pour un restaurant 150 m² avec terrasse. > 5 000 €/an pour PME avec stock > 500 k€ ou activité à risque (cuisine, atelier mécanique).',
        },
        {
          q: 'Mon assureur peut-il refuser un sinistre MRP ?',
          a: "Oui dans 5 cas : (1) défaut d'entretien (toiture, électricité), (2) non-respect des mesures de prévention (alarme, extincteurs), (3) déclaration tardive (>5 jours ouvrés), (4) fausse déclaration de valeur du contenu, (5) activité non déclarée. Mise à jour annuelle du contrat OBLIGATOIRE pour limiter les refus.",
        },
        {
          q: 'Puis-je résilier ma MRP à tout moment ?',
          a: "Oui après 1 an d'engagement (Loi Hamon 2014, art. L. 113-15-2 Code des assurances), résiliation à tout moment sans frais ni motif, préavis 1 mois. Notre cabinet ORIAS gère la résiliation et la transition vers un nouveau contrat sans rupture de couverture (essentiel si bailleur exige attestation continue).",
        },
        {
          q: 'Puis-je déduire ma prime MRP de mes impôts ?',
          a: 'Oui en intégralité : la prime MRP est une charge professionnelle 100% déductible en BIC réel, BNC déclaration contrôlée, IS (SARL/SAS/EURL). Auto-entrepreneur au micro-BIC : non déductible (régime forfaitaire). Conservez les attestations et factures de prime pour votre comptabilité.',
        },
        {
          q: 'Combien de temps pour recevoir mon devis MRP ?',
          a: 'Via notre formulaire : devis personnalisé sous 24-48h ouvrées avec 3-5 propositions de nos partenaires (Hiscox, April Pro, MMA, AXA Pro, Generali, SMABTP, Allianz Pro). Souscription : 48-72h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat selon urgence (exigence bailleur).',
        },
        {
          q: "Combien de temps prend l'indemnisation d'un sinistre MRP ?",
          a: "Convention IRSI (sinistre courant < 5 000 €) : 30 jours en moyenne. Sinistre important avec expertise : 60-120 jours. Sinistre majeur (incendie, catastrophe naturelle) : 4 à 8 mois. L'assureur dispose de 3 mois pour proposer une indemnisation après expertise (art. L. 242-1 Code des assurances).",
        },
        {
          q: 'Que faire si mon local est cambriolé : quelle procédure ?',
          a: "1) Déposez plainte au commissariat sous 24-48h (récépissé obligatoire). 2) Déclarez à votre assureur sous 2 jours ouvrés (5 pour vol). 3) Conservez TOUTES les preuves : photos, factures d'achat du matériel volé, vidéosurveillance, témoignages. 4) Inventaire détaillé du préjudice avec valeurs.",
        },
        {
          q: "Que comprend exactement la perte d'exploitation ?",
          a: "Elle compense la baisse de CA pendant la période d'indemnisation (12-24 mois standard, 36 mois en option) et maintient vos charges fixes : loyer, salaires, abonnements, leasings. Essentiel pour les commerces et restaurants qui dépendent de leur point de vente — calculée sur la base du dernier bilan.",
        },
        {
          q: 'Comment estimer la valeur de mon stock pour ne pas être sous-assuré ?',
          a: "Déclarez la valeur de remplacement (HT pour les pros) et non la valeur d'achat ou comptable. Pour un stock variable (saisonnier), optez pour une « déclaration de stock » mensuelle ou un « capital flottant » qui s'ajuste automatiquement. Sous-déclaration = règle proportionnelle, indemnité réduite (art. L. 121-5).",
        },
        {
          q: "Suis-je couvert si je modifie l'activité ou j'agrandis le local ?",
          a: "Non automatiquement. Toute évolution doit être déclarée à l'assureur sous 15 jours (nouveau métier, agrandissement > 20%, nouveau matériel > 10 k€). Sans déclaration = exclusion de garantie ou règle proportionnelle. Notre cabinet ORIAS gère les avenants en 24-72h pour maintenir la couverture à jour.",
        },
      ]}
    />
  )
}

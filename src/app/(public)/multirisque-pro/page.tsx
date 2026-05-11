import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Multirisque Professionnelle — Local, stock, exploitation | Assurance Pro',
  description:
    "Comparez votre Multirisque Pro auprès de 10 assureurs. Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d'exploitation.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/multirisque-pro`,
  },
  openGraph: {
    title: 'Multirisque Professionnelle — Local, stock, exploitation | Assurance Pro',
    description:
      'Comparez votre Multirisque Pro auprès de 10 assureurs. Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d\\',
    url: `${SITE_URL}/multirisque-pro`,
    type: 'website',
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
          q: "Suis-je obligé d'avoir une multirisque pro ?",
          a: "Non, la MRP n'est pas obligatoire par la loi (sauf cas particuliers : exploitation classée, certains bailleurs commerciaux l'imposent). Mais sans MRP, un sinistre majeur (incendie, dégât des eaux) peut détruire votre activité.",
        },
        {
          q: 'La MRP couvre-t-elle aussi mes employés ?',
          a: "Pour les dommages corporels des employés, c'est l'assurance accident du travail (AT/MP via URSSAF). La MRP couvre la responsabilité civile vis-à-vis des tiers, pas les dommages corporels des salariés (sauf option spécifique).",
        },
        {
          q: 'Que faire si mon local est cambriolé ?',
          a: "Déclaration à la police sous 24-48h, déclaration à votre assureur sous 2 jours ouvrés (5 pour vol), conservation des preuves (factures, photos) et inventaire du préjudice. Notre cabinet vous accompagne dans la déclaration et le suivi de l'indemnisation.",
        },
        {
          q: 'Comment estimer la valeur de mon stock ?',
          a: 'Déclarez la valeur de remplacement (HT pour les pros) et non la valeur d\'achat. Pour un stock variable, optez pour une "déclaration de stock" mensuelle ou un "capital flottant" qui s\'ajuste automatiquement.',
        },
        {
          q: "Que comprend la perte d'exploitation ?",
          a: "Elle compense la baisse de CA pendant la période d'indemnisation (généralement 12-24 mois) et maintient les charges fixes (loyer, salaires, abonnements). C'est essentiel pour les commerces qui dépendent de leur point de vente.",
        },
      ]}
    />
  )
}

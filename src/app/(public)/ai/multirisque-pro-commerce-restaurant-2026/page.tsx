import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/multirisque-pro-commerce-restaurant-2026'
const TITLE = 'Multirisque Pro 2026 — Commerce, restaurant, bureau · Dès 35€/mois'
const HEADLINE = 'Comment choisir sa Multirisque Pro pour commerce ou restaurant en 2026 ?'
const INTRO =
  "La Multirisque Pro couvre local + stock + matériel + perte d'exploitation. Tarif moyen 2026 : 35-150€/mois selon surface, contenu, secteur. Comparatif AXA Pro, Allianz, MMA + obligations bailleur + clauses de perte d'exploitation + pièges franchises."

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
      category="Multirisque Pro"
      ctaUrl="/devis?garantie=multirisque-pro"
      ctaLabel="Devis Multirisque Pro en 2 min"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste commerce + restauration',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          'Le piège #1 des commerçants : sous-évaluer le contenu (stock + matériel). En cas de sinistre majeur (incendie, dégât eaux), 70% se retrouvent avec 30-50% reste à charge. Notre cabinet impose un audit valeur réelle avant souscription.',
      }}
      keyFacts={[
        {
          claim: 'Sinistralité moyenne multirisque pro France 2026 : 8.2% (FFA).',
          source: "FFA — Fédération Française de l'Assurance 2026",
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
        {
          claim: 'INSEE Sirene 2026 : 1 850 000 commerces + bureaux + ateliers actifs en France.',
          source: 'INSEE Sirene 2026',
          sourceUrl: 'https://www.insee.fr/fr/metadonnees/source/serie/s1000',
        },
        {
          claim:
            'Obligation art. L.113-2 C. assur. : déclarer exactement les circonstances connues qui apprécient le risque.',
          source: 'Légifrance — Code des assurances art. L.113-2',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792355',
        },
        {
          claim:
            'Tarif moyen 2026 multirisque restaurant Paris (80m² + cuisine pro) : 95-180€/mois.',
          source: 'Barèmes AXA Pro, Allianz, MMA 2026',
          sourceUrl: 'https://www.vivos-assurance.fr/multirisque-pro',
        },
      ]}
      table={{
        caption: 'Comparatif 5 multirisque pro 2026 — Tarifs par profil',
        headers: ['Assureur', 'Bureau 30m²', 'Commerce 80m²', 'Restaurant 100m²', 'Spécialité'],
        rows: [
          ['AXA Pro', '35€', '85€', '145€', 'Couverture étendue, intempéries'],
          ['Allianz', '42€', '95€', '165€', 'Brand premium, plafonds élevés'],
          ['MMA Pro', '38€', '78€', '135€', 'Bon rapport qualité/prix'],
          ['Generali', '45€', '92€', '155€', 'Réseau experts indépendants'],
          ['MAAF Pro', '40€', '82€', '142€', 'Mutualiste, réseau France'],
        ],
      }}
      sections={[
        {
          h2: 'Que couvre vraiment une Multirisque Pro ?',
          content: (
            <>
              <p>6 garanties standards (toujours incluses) :</p>
              <ol>
                <li>
                  <strong>Vol + vandalisme</strong> — couvre stock + matériel volés ou dégradés.
                </li>
                <li>
                  <strong>Incendie + explosion</strong> — local + contenu (incl. perte
                  d'exploitation).
                </li>
                <li>
                  <strong>Dégâts des eaux</strong> — fuite, infiltration, débordement.
                </li>
                <li>
                  <strong>Bris de glaces</strong> — vitrines, façades vitrées.
                </li>
                <li>
                  <strong>Catastrophes naturelles</strong> — tempête, grêle, inondation reconnue
                  état catastrophe naturelle.
                </li>
                <li>
                  <strong>Responsabilité civile exploitation</strong> — dommages causés à tiers
                  (clients, livreurs).
                </li>
              </ol>
              <p>4 options critiques selon activité :</p>
              <ul>
                <li>
                  <strong>Perte d'exploitation</strong> — CA garanti pendant remise en état (typique
                  3-12 mois). Critique restaurant/commerce.
                </li>
                <li>
                  <strong>Tous risques matériel informatique</strong> — couvre vol/casse hors local.
                </li>
                <li>
                  <strong>Bris machines</strong> — équipements professionnels (four, frigo,
                  vitrine).
                </li>
                <li>
                  <strong>Marchandises transportées</strong> — si livraison incluse.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Les 5 erreurs qui ruinent votre indemnisation',
          content: (
            <>
              <ol>
                <li>
                  <strong>Sous-évaluer le contenu</strong> — déclarer 30k€ stock alors que valeur
                  réelle = 80k€. En cas de sinistre, règle proportionnelle : indemnisation = 30/80 ×
                  dommage = 37%.
                </li>
                <li>
                  <strong>Ne pas déclarer les changements</strong> — extension activité (ex: ajout
                  cuisine), travaux. Art. L.113-2 : obligation déclarer sous 15 jours.
                </li>
                <li>
                  <strong>Franchises trop basses</strong> — payer +20% prime pour franchise 200€ vs
                  500€ sur des sinistres rares = perte.
                </li>
                <li>
                  <strong>Pas de perte d'exploitation</strong> — un restaurant fermé 6 mois après
                  incendie = ruine sans cette garantie.
                </li>
                <li>
                  <strong>Doublon avec assurance bailleur</strong> — vérifier que votre bail
                  commercial n'impose pas déjà certaines garanties.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Obligations bailleur + secteur restaurant',
          content: (
            <>
              <p>Bailleur commercial peut exiger garanties spécifiques :</p>
              <ul>
                <li>Assurance locataire commercial obligatoire (risques locatifs)</li>
                <li>Renonciation à recours bailleur (clause fréquente baux 3/6/9)</li>
                <li>Attestation annuelle à fournir au bailleur</li>
              </ul>
              <p>Restaurant : obligations supplémentaires :</p>
              <ul>
                <li>Garantie incendie cuisine pro (gaz, friteuse)</li>
                <li>Intoxication alimentaire (RC + assistance)</li>
                <li>Perte chaîne du froid (panne frigo)</li>
                <li>Vol après bris de vitrine</li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La Multirisque Pro est-elle obligatoire ?',
          a: "Pas légalement (sauf clauses bail commercial). Mais 95% des bailleurs commerciaux l'exigent. Sans : risque résiliation bail + ruine en cas sinistre majeur (incendie 100-500k€ moyen).",
        },
        {
          q: 'Combien coûte une Multirisque Pro restaurant 80m² Paris ?',
          a: 'Tarif moyen 2026 : 95-180€/mois selon contenu, cuisine pro, intempéries Paris. AXA Pro 145€/mois best price. Notre cabinet négocie en bloc avec 5 assureurs partenaires.',
        },
        {
          q: "Qu'est-ce que la garantie perte d'exploitation ?",
          a: 'Garantie CRITIQUE qui couvre votre CA pendant remise en état après sinistre. Sans : restaurant fermé 6 mois = ruine. Coût option : +15-25% prime. À prendre absolument pour commerce et restauration.',
        },
        {
          q: 'Que faire en cas de sinistre Multirisque Pro ?',
          a: '1) Déclarer assureur sous 5 jours (10 jours vol), 2) Conserver preuves (photos, factures, témoignages), 3) Ne pas faire travaux sans accord expert, 4) Demander expertise contradictoire si désaccord montant.',
        },
        {
          q: "Règle proportionnelle : c'est quoi ?",
          a: "Si vous déclarez stock 30k€ mais valeur réelle 80k€, l'assureur applique proportionnel : indemnisation = 30/80 = 37% du dommage. Critique : faire audit valeur réelle annuel + déclarer changements.",
        },
        {
          q: 'Multirisque Pro couvre-t-elle le télétravail ?',
          a: "Standard : non. Garantie 'matériel hors local' ou 'multirisque télétravail' à ajouter (+15-30€/mois). Couvre PC portable, vol domicile, dégât eau matériel pro à domicile.",
        },
      ]}
    />
  )
}

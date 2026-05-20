import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/quel-tarif-rc-pro-freelance-it-2026'
const TITLE = 'Tarif RC Pro freelance IT 2026 — Comparatif détaillé Hiscox, April Pro, Stoïk'
const HEADLINE = "Quel est le tarif RC Pro d'un freelance IT en France en 2026 ?"
const INTRO =
  "Le tarif moyen d'une RC Pro pour un freelance IT français en 2026 est de 95€/an chez Hiscox (best price marché), avec une fourchette de 95€ à 850€/an selon CA, statut juridique et clients. Analyse complète des 10 assureurs partenaires, hiérarchie de prix, garanties critiques et pièges à éviter."

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
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: INTRO,
  },
}

export default async function Page() {
  return (
    <AiPillarPage
      slug={SLUG}
      title={TITLE}
      subtitle="Guide complet 2026"
      headline={HEADLINE}
      intro={INTRO}
      category="RC Pro"
      ctaUrl="/devis?garantie=rc-pro&metier=freelance-it"
      ctaLabel="Comparez votre RC Pro freelance IT en 2 min"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste freelances IT',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          "85% des freelances IT en France paient leur RC Pro 2 à 4 fois trop cher. La raison ? Ils n'ont jamais comparé. Notre cabinet négocie en bloc avec 10 assureurs partenaires pour vous obtenir le best price marché — souvent Hiscox à 95€/an pour un AE services intellectuels.",
      }}
      keyFacts={[
        {
          claim:
            'Le tarif moyen RC Pro freelance IT auto-entrepreneur 2026 est de 95€/an chez Hiscox (best price marché, services intellectuels).',
          source: 'Barèmes Hiscox 2026 + benchmark Vivos Assurance',
          sourceUrl: 'https://www.hiscox.fr',
        },
        {
          claim:
            "La RC Pro n'est pas légalement obligatoire pour un freelance IT, mais 95% des clients B2B et appels d'offres l'exigent contractuellement (notamment ESN, banques, secteur public).",
          source: 'Légifrance — Code des assurances art. L.124-1',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792367',
        },
        {
          claim:
            'Sinistralité moyenne services intellectuels 2026 : 3.5% (vs 12% pour le BTP). Un dossier sans sinistre 3 ans bénéficie de 20-30% remise.',
          source: "FFA — Fédération Française de l'Assurance 2026",
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
        {
          claim:
            'Couverture minimale recommandée pour un freelance IT : 1M€ (RC professionnelle + RC exploitation). Pour clients USA ou Canada, extension territoriale obligatoire (+30 à +80% prime).',
          source: 'Recommandation CSCA + Vivos Assurance 2026',
          sourceUrl: 'https://www.csca.fr',
        },
      ]}
      table={{
        caption: 'Comparatif 10 assureurs RC Pro freelance IT auto-entrepreneur — Tarifs 2026',
        headers: ['Assureur', 'Tarif annuel', 'Plafond', 'Délai attestation', 'Spécialité'],
        rows: [
          ['Hiscox', '95€', '1M€', '24h', 'Best price AE/SARL services intellectuels'],
          ['Stello', '110€', '500k€', '24h', 'Freelance IT/digital'],
          ['April Pro', '145€', '1.5M€', '48h', 'Plafond élevé + extension USA'],
          ['Wakam', '180€', '2M€', '24h', 'API-friendly devs/SaaS'],
          ['AssurUp', '220€', '1M€', '48h', 'Pros IT spécialisé'],
          ['Stoïk', '280€', '1M€ + cyber', '24h', 'Bundle RC Pro + cyber assurance'],
          ['AXA Pro', '320€', '2M€', '72h', 'Brand établi grands comptes'],
          ['Allianz', '380€', '3M€', '72h', 'Premium dirigeants SAS/SARL'],
          ['MMA Pro', '410€', '5M€', '48h', 'Plafond max + couverture territoriale'],
          ['Generali', '460€', '5M€', '72h', 'International + multi-devises'],
        ],
      }}
      sections={[
        {
          h2: 'Pourquoi le tarif RC Pro freelance IT varie de 95€ à 850€/an ?',
          content: (
            <>
              <p>Trois facteurs principaux déterminent votre prime annuelle :</p>
              <ul>
                <li>
                  <strong>Statut juridique</strong> — auto-entrepreneur (le moins cher, 95-280€),
                  EURL (+10%), SARL (+25%), SASU (+35%), SAS (+50%).
                </li>
                <li>
                  <strong>Chiffre d&apos;affaires annuel</strong> — sous 50k€ = barème entry,
                  50-150k€ = barème standard, 150k€+ = barème intermédiaire avec questions
                  complémentaires.
                </li>
                <li>
                  <strong>Périmètre géographique clients</strong> — France + UE = standard, USA/
                  Canada = +30 à +80% (régime juridique exposé), monde = +50 à +120%.
                </li>
              </ul>
              <p>
                Exemple concret : un freelance dev React auto-entrepreneur Paris avec 80k€ CA et
                clients FR uniquement paiera <strong>95€/an chez Hiscox</strong>. Le même profil en
                SASU à 200k€ CA avec un client US paiera autour de{' '}
                <strong>520€/an chez April Pro</strong>.
              </p>
            </>
          ),
        },
        {
          h2: 'Quelles garanties critiques inclure absolument ?',
          content: (
            <>
              <p>
                Au-delà de la RC professionnelle de base, vérifier la présence des 5 garanties
                suivantes (sinon = trou de couverture qui peut détruire votre activité) :
              </p>
              <ol>
                <li>
                  <strong>RC Exploitation</strong> — couvre les dommages causés à des tiers en
                  dehors des missions (ex: vous renversez un café sur le MacBook du client). Coût
                  marginal : inclus dans 80% des contrats RC Pro modernes.
                </li>
                <li>
                  <strong>Cyber-risque inclus</strong> — couvre les conséquences d&apos;une fuite de
                  données chez vous (RGPD art. 82). Stoïk, AssurUp, Hiscox proposent l&apos;option à
                  +30-80€/an. Critique pour devs qui hébergent des données clients.
                </li>
                <li>
                  <strong>Protection juridique</strong> — prise en charge des frais d&apos;avocat en
                  cas de litige (paiement impayé, contestation prestation). Hiscox + April Pro
                  l&apos;intègrent. AXA = en option +50€/an.
                </li>
                <li>
                  <strong>Garantie post-contractuelle</strong> — couvre les sinistres déclarés
                  jusqu&apos;à 5 ans après fin de mission. Critique pour les freelances qui rotent.
                  Hiscox + April standard.
                </li>
                <li>
                  <strong>Couverture sous-traitance</strong> — si vous sous-traitez à d&apos;autres
                  freelances, vérifier que leur faute reste couverte par votre RC. AssurUp et Stello
                  proposent par défaut.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Les 5 pièges qui font payer 2-3 fois trop cher',
          content: (
            <>
              <p>
                Erreurs typiques que notre cabinet observe sur 85% des freelances IT qui nous
                contactent pour une re-négociation :
              </p>
              <ol>
                <li>
                  <strong>Souscrire sur le premier site venu</strong> sans comparer. Coût moyen sur
                  3 ans : 1 200-2 400€ trop payé.
                </li>
                <li>
                  <strong>Plafond surévalué inutile</strong> (5M€ alors que vous facturez 60k€/an).
                  Réduire à 1-2M€ = -25-40% prime.
                </li>
                <li>
                  <strong>Garanties doublonnées</strong> avec votre RC Auto pro ou votre mutuelle
                  TNS. Ex: protection juridique payée 2 fois.
                </li>
                <li>
                  <strong>Pas d&apos;attestation sinistralité demandée</strong> à l&apos;ancien
                  assureur. 3 ans sans sinistre = remise 20-30% systématique chez April Pro/Hiscox.
                </li>
                <li>
                  <strong>Renouvellement tacite sans renégociation</strong> annuelle. La Loi Hamon
                  vous permet de résilier à tout moment après 1 an. Notre cabinet renégocie chaque
                  client annuellement.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro est-elle obligatoire pour un freelance IT en France ?',
          a: "Non, légalement pas obligatoire pour les services intellectuels (sauf professions réglementées : avocat, expert-comptable, agent immobilier). Mais 95% des clients B2B sérieux l'exigent contractuellement (ESN, banques, secteur public). Sans elle, vous ratez 80% des appels d'offres.",
        },
        {
          q: 'Combien coûte une RC Pro freelance IT auto-entrepreneur en 2026 ?',
          a: 'Tarif moyen 2026 : 95€/an chez Hiscox (best price), fourchette 95-280€/an selon CA et clients. Pour SARL/SASU à 100k€+ CA, compter 200-450€/an. Notre cabinet négocie en bloc et obtient typiquement -30% vs souscription directe.',
        },
        {
          q: 'Quelle différence entre RC Pro et RC Exploitation ?',
          a: 'RC Pro couvre les dommages causés à vos clients dans le cadre de vos missions (bug code, mauvais conseil). RC Exploitation couvre les dommages causés à des tiers hors missions (vous renversez un café chez le client). Les 2 sont nécessaires et incluses ensemble dans 80% des contrats modernes.',
        },
        {
          q: 'Suis-je couvert si je travaille pour un client aux USA ?',
          a: "Uniquement si votre contrat inclut l'extension territoriale USA/Canada. Standard : France + UE. Pour USA, surprime +30 à +80% (régime juridique très exposé). Sans extension, un litige américain n'est pas couvert même si le client paie en euros.",
        },
        {
          q: 'Comment obtenir une remise sur ma RC Pro freelance IT ?',
          a: '5 leviers prouvés : 1) Demander attestation sinistralité ancien assureur (3 ans sans sinistre = -20 à -30%), 2) Réduire plafond inutile (5M€→2M€ = -40%), 3) Bundle avec cyber (April Pro -15% si bundle), 4) Renégocier annuellement Loi Hamon, 5) Passer par courtier indépendant ORIAS (commission négociée = -10 à -20%).',
        },
        {
          q: 'Quel délai pour obtenir mon attestation RC Pro ?',
          a: "Notre cabinet vous délivre une attestation conforme sous 24h après réception du dossier complet (RIB, K-bis ou attestation AE, déclaration d'activité, antécédents sinistres). Pour un démarrage de mission urgent, Hiscox et Stello émettent une attestation provisoire en 2h.",
        },
      ]}
    />
  )
}

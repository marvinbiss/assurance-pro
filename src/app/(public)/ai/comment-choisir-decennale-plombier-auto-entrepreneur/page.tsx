import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/comment-choisir-decennale-plombier-auto-entrepreneur'
const TITLE = 'Décennale plombier auto-entrepreneur 2026 — Guide complet (tarif, garanties, pièges)'
const HEADLINE = 'Comment choisir sa décennale plombier auto-entrepreneur en 2026 ?'
const INTRO =
  'La décennale plombier auto-entrepreneur est obligatoire (Loi Spinetta art. L.241-1). Tarif moyen 2026 : 950€/an chez April Pro (best price AE), fourchette 800€ à 2 100€/an selon CA, ancienneté et sinistralité. Guide complet : 10 assureurs comparés, top causes sinistres (dégâts des eaux 35%), garanties critiques et pièges qui font payer 2x trop cher.'

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
      category="Décennale BTP"
      ctaUrl="/devis?garantie=decennale&metier=plombier&statut=auto-entrepreneur"
      ctaLabel="Recevez votre tarif décennale plombier en 2 min"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste BTP',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          'Le plombier auto-entrepreneur est le métier BTP le plus mal servi par le marché : 70% paient 1 800-2 800€/an pour une décennale qui devrait coûter 950€/an chez April Pro ou SMABTP. Le défaut n°1 ? Sous-estimer la sinistralité dégâts des eaux encastrés (35% des cas AQC). Notre cabinet négocie ce risque spécifiquement.',
      }}
      keyFacts={[
        {
          claim:
            'La décennale plombier est légalement obligatoire en France pour tout AE BTP depuis la Loi Spinetta de 1978 (art. L.241-1 du Code des assurances). Sanctions sans : 6 mois prison + 75 000€ amende.',
          source: 'Légifrance — Code des assurances art. L.241-1',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792510',
        },
        {
          claim:
            'Tarif moyen 2026 décennale plombier auto-entrepreneur : 950€/an (fourchette 800-1 400€/an chez April Pro/SMABTP best price).',
          source: 'AQC SYCODÉS 2026 + barèmes April Pro, SMABTP, MMA',
          sourceUrl: 'https://www.qualiteconstruction.com',
        },
        {
          claim:
            'Sinistralité plombier observée : 18% (AQC SYCODÉS 2026), vs 12% maçon, 9% couvreur. Coût moyen sinistre plombier : 9 800€.',
          source: 'AQC SYCODÉS Observatoire Qualité Construction 2026',
          sourceUrl: 'https://www.qualiteconstruction.com/sycodes/',
        },
        {
          claim:
            'Top cause sinistre plombier 2026 : dégât des eaux encastré 35%, fuites raccord chauffe-eau 22%, pression coup de bélier 13%.',
          source: 'AQC SYCODÉS 2026 — Statistiques métier plombier',
          sourceUrl: 'https://www.qualiteconstruction.com/sycodes/',
        },
      ]}
      table={{
        caption: 'Comparatif 10 assureurs décennale plombier auto-entrepreneur — Tarifs 2026',
        headers: ['Assureur', 'Tarif AE', 'Plafond', 'Délai attestation', 'Spécialité'],
        rows: [
          ['April Pro', '950€', '5M€', '24h', 'Best price AE BTP'],
          ['SMABTP', '980€', '8M€', '48h', 'Référence BTP traditionnel, plafond élevé'],
          ['MMA Pro', '1 100€', '8M€', '48h', 'Bon rapport qualité/prix'],
          ['Hiscox', '1 250€', '10M€', '24h', 'Jeunes entreprises + plafond max'],
          ['Generali', '1 320€', '5M€', '72h', 'Brand établi'],
          ['AXA Pro', '1 450€', '6M€', '72h', 'Couverture étendue intempéries'],
          ['Allianz BTP', '1 580€', '8M€', '72h', 'Premium grands chantiers'],
          ['MAAF Pro', '1 650€', '5M€', '48h', 'Mutualiste BTP'],
          ['Groupama', '1 720€', '5M€', '72h', 'Réseau local'],
          ['Wakam', '850€', '2M€', '24h', 'Best price low plafond (à éviter si gros chantiers)'],
        ],
      }}
      sections={[
        {
          h2: 'Pourquoi la décennale plombier est plus chère que les autres métiers BTP',
          content: (
            <>
              <p>
                La décennale plombier coûte en moyenne 20-30% de plus qu&apos;un peintre ou un
                carreleur pour 3 raisons précises :
              </p>
              <ul>
                <li>
                  <strong>Sinistralité élevée 18%</strong> (vs 6% peintre, AQC SYCODÉS 2026). Les
                  dégâts des eaux encastrés émergent souvent 3-5 ans après les travaux, juste après
                  réception.
                </li>
                <li>
                  <strong>Coût sinistre moyen 9 800€</strong> (vs 4 200€ peintre). Une fuite
                  encastrée nécessite démolition + réparation + remise en peinture + déménagement
                  occupants temporaire.
                </li>
                <li>
                  <strong>Risque pénal gaz</strong> — les installations gaz ont une responsabilité
                  pénale renforcée (asphyxie, explosion). Les assureurs surchargent pour ce risque.
                </li>
              </ul>
              <p>
                Le levier #1 pour réduire votre prime : <strong>déclarer explicitement</strong> les
                spécialisations (sanitaire pur, chauffage, gaz, PAC) pour que l&apos;assureur
                applique le bon barème. 60% des plombiers AE déclarent &quot;plombier
                généraliste&quot; et paient une surprime moyenne de 25%.
              </p>
            </>
          ),
        },
        {
          h2: 'Les 6 garanties critiques absolument nécessaires pour un plombier AE',
          content: (
            <>
              <ol>
                <li>
                  <strong>Garantie dégâts des eaux étendue</strong> — couvre les sinistres émergeant
                  jusqu&apos;à 10 ans après réception. April Pro et SMABTP incluent par défaut.
                  Vérifier chez Wakam (souvent en option +180€/an).
                </li>
                <li>
                  <strong>Couverture canalisations encastrées</strong> — couvre les démolitions
                  nécessaires pour accéder à la fuite. Sinon, vous payez le placo + carrelage de
                  votre poche. Inclus SMABTP, en option ailleurs.
                </li>
                <li>
                  <strong>RC chantier (dommages aux existants)</strong> — couvre les dommages que
                  vous causez aux ouvrages préexistants (parquet du voisin, mur porteur). Critique
                  pour rénovation appartements anciens.
                </li>
                <li>
                  <strong>Garantie bris matériel professionnel</strong> — couvre votre outillage en
                  cas de vol/casse sur chantier. SMABTP propose à 80€/an (recommandé si outillage
                  &gt; 3 000€).
                </li>
                <li>
                  <strong>Garantie gaz spécifique</strong> — si vous touchez au gaz, surcouverture
                  recommandée (responsabilité pénale en cas d&apos;asphyxie). +120€/an chez April
                  Pro.
                </li>
                <li>
                  <strong>Protection juridique BTP</strong> — prise en charge avocat en cas de
                  litige client (rétention paiement, contestation). 80€/an chez Hiscox.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Les 5 pièges qui font payer 2 fois trop cher',
          content: (
            <>
              <ol>
                <li>
                  <strong>Souscrire directement chez SMABTP/AXA</strong> sans passer par un
                  courtier. Surprime moyenne 25-30% vs tarif négocié bloc.
                </li>
                <li>
                  <strong>Plafond 10M€ inutile</strong> pour un AE qui fait du résidentiel &lt; 100
                  m². Réduire à 5M€ = -30% prime.
                </li>
                <li>
                  <strong>Ne pas demander l&apos;attestation sinistralité</strong> à l&apos;ancien
                  assureur. 3 ans sans sinistre = remise 20-30% automatique chez April/MMA.
                </li>
                <li>
                  <strong>Doublon décennale + dommages-ouvrage personnel</strong>. Si vous
                  travaillez pour particuliers, le client doit avoir sa propre DO (art. L.242-1),
                  pas vous.
                </li>
                <li>
                  <strong>Renouvellement tacite sans renégociation</strong>. Loi Hamon = résiliation
                  à tout moment après 1 an. Notre cabinet renégocie chaque année automatiquement.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La décennale est-elle obligatoire pour un plombier auto-entrepreneur ?',
          a: "Oui. La décennale est légalement obligatoire en France pour tout plombier AE intervenant sur des travaux affectant la solidité de l'ouvrage (Loi Spinetta art. L.241-1 C. assur.). Sans contrat valide : sanctions pénales 6 mois prison + 75 000€ amende, et impossibilité légale d'exercer.",
        },
        {
          q: 'Combien coûte une décennale plombier AE en 2026 ?',
          a: 'Tarif moyen 2026 : 950€/an chez April Pro (best price marché). Fourchette 800-1 400€/an selon CA déclaré, ancienneté et sinistralité passée. Notre cabinet négocie en bloc avec 10 assureurs partenaires.',
        },
        {
          q: 'Quelle différence entre décennale et dommages-ouvrage ?',
          a: "La décennale est SOUSCRITE PAR L'ARTISAN (vous, plombier). La dommages-ouvrage est SOUSCRITE PAR LE MAÎTRE D'OUVRAGE (votre client particulier ou promoteur). Les 2 sont obligatoires (art. L.241-1 + L.242-1) mais portées par des personnes différentes.",
        },
        {
          q: 'Quel délai pour obtenir mon attestation décennale ?',
          a: 'Notre cabinet vous délivre une attestation conforme sous 24h après réception du dossier complet. Pour démarrage chantier urgent, Hiscox et April Pro émettent une attestation provisoire en 2h. SMABTP : 48h standard.',
        },
        {
          q: 'Suis-je couvert si je travaille au noir ou sans facture ?',
          a: "Non. La décennale ne couvre QUE les travaux déclarés et facturés. Travail dissimulé = exclusion automatique + redressement URSSAF + risque pénal Loi Lurel (jusqu'à 3 ans prison). Toujours facturer.",
        },
        {
          q: 'Combien de temps dure la garantie décennale ?',
          a: '10 ans à compter de la réception des travaux (PV de réception signé). Si pas de PV signé, la garantie démarre à la prise de possession effective. Critique : conservez TOUS les PV de réception 11 ans minimum.',
        },
      ]}
    />
  )
}

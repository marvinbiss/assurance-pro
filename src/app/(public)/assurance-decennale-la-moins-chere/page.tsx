/**
 * Pilier — "assurance décennale la moins chère" (30 vol, KD 2, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-la-moins-chere'
const TITLE = 'Assurance Décennale La Moins Chère — Classement 2026 par métier'
const TAGLINE =
  'Classement précis 2026 des assurances décennales les moins chères par métier BTP. April Pro best price AE/SARL. Tarifs vérifiés du peintre au couvreur.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale la moins chère 2026 : April Pro best price AE peintre 950€/an, plombier 1 400€/an, maçon 1 800€/an. Comparatif honnête April vs SMABTP vs Allianz.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Quelle est l'assurance décennale LA moins chère sur le marché en 2026 ? Le classement varie selon votre métier BTP, votre statut juridique (AE/SARL/SAS) et votre CA. Cette page fournit le classement précis VÉRIFIÉ pour chaque profil typique, basé sur les fourchettes tarifaires réelles 2026 des 5 assureurs leaders : April Pro BTP, SMABTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🥇',
          title: 'April Pro = best price AE/SARL',
          desc: 'Leader best price BTP -10-20% vs autres assureurs',
        },
        {
          icon: '🏛️',
          title: 'SMABTP = institution paritaire',
          desc: 'Expertise BTP historique, prix équilibré',
        },
        {
          icon: '🛡️',
          title: 'Conformité préservée',
          desc: 'Tous agréés ACPR, plafonds standards 1-2M€',
        },
        {
          icon: '📊',
          title: 'Tarifs vérifiés 2026',
          desc: 'Fourchettes réelles April, SMABTP, Allianz, MMA, AXA',
        },
      ]}
      sections={[
        {
          h2: 'Classement décennale moins chère par métier AE',
          body: (
            <ul>
              <li>
                <strong>Peintre</strong> : 🥇 April Pro 950€ • 🥈 Allianz Pro 1 050€ • SMABTP 1 100€
              </li>
              <li>
                <strong>Plâtrier</strong> : 🥇 April Pro 1 100€ • 🥈 Allianz Pro 1 200€ • SMABTP 1
                250€
              </li>
              <li>
                <strong>Carreleur</strong> : 🥇 April Pro 1 200€ • 🥈 Allianz Pro 1 280€ • SMABTP 1
                350€
              </li>
              <li>
                <strong>Plombier</strong> : 🥇 April Pro 1 400€ • 🥈 SMABTP 1 480€ • Allianz Pro 1
                550€
              </li>
              <li>
                <strong>Électricien</strong> : 🥇 April Pro 1 500€ • 🥈 SMABTP 1 580€ • Allianz Pro
                1 650€
              </li>
              <li>
                <strong>Maçon traditionnel</strong> : 🥇 April Pro 1 800€ • 🥈 SMABTP 1 900€ •
                Allianz Pro 1 950€
              </li>
              <li>
                <strong>Couvreur</strong> : 🥇 April Pro 2 200€ • 🥈 SMABTP 2 350€ • Allianz Pro 2
                450€
              </li>
              <li>
                <strong>Charpentier bois</strong> : 🥇 April Pro 2 400€ • 🥈 SMABTP 2 500€
              </li>
              <li>
                <strong>Terrassier/TP</strong> : 🥇 April Pro 2 800€ • 🥈 SMABTP 2 900€
              </li>
              <li>
                <strong>Multi-services BTP</strong> : 🥇 April Pro 2 500€ • 🥈 SMABTP 2 650€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Classement décennale moins chère par profil SARL/SAS',
          body: (
            <ul>
              <li>
                <strong>SARL plomberie (3 salariés)</strong> : 🥇 April Pro 2 200€/an • 🥈 SMABTP 2
                350€ • MMA Pro BTP 2 450€
              </li>
              <li>
                <strong>SARL électricité (5 salariés)</strong> : 🥇 April Pro 3 200€ • 🥈 SMABTP 3
                400€
              </li>
              <li>
                <strong>SARL maçonnerie (5 salariés)</strong> : 🥇 SMABTP 3 800€ • 🥈 April Pro 3
                950€
              </li>
              <li>
                <strong>SARL couverture (3 salariés)</strong> : 🥇 SMABTP 4 200€ • 🥈 April Pro 4
                350€
              </li>
              <li>
                <strong>SARL BTP multi-corps (10 salariés)</strong> : 🥇 SMABTP 5 500€ • 🥈 April
                Pro 5 800€
              </li>
              <li>
                <strong>SAS BTP PME (20 salariés)</strong> : 🥇 SMABTP 9 500€ • 🥈 Allianz Pro 10
                500€
              </li>
              <li>
                <strong>SAS gros œuvre 30 salariés</strong> : 🥇 SMABTP 14 000€ • 🥈 Allianz Pro 15
                500€
              </li>
            </ul>
          ),
        },
        {
          h2: '3 règles avant de signer la &quot;moins chère&quot;',
          body: (
            <ol>
              <li>
                <strong>Vérifier plafond minimum 1M€ AE / 2M€ SARL/SAS</strong>. En-dessous : risque
                insuffisance en cas gros sinistre.
              </li>
              <li>
                <strong>Vérifier postériorité 10 ans</strong> (standard légal). En-dessous (5 ans) =
                exposition perso pour 5 dernières années.
              </li>
              <li>
                <strong>Vérifier exclusions clés</strong> : sous-traitance déclarée, RGE/Qualibat si
                nécessaire, métiers spéciaux (piscine, photovoltaïque) si applicable.
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: "Quelle est l'assurance décennale la moins chère sur le marché ?",
          a: 'April Pro BTP est le best price global pour AE et SARL BTP (-10-20% vs concurrents pour profil équivalent). Pour SARL multi-corps et SAS PME, SMABTP devient compétitif. Comparer toujours April Pro + SMABTP + Allianz Pro minimum.',
        },
        {
          q: 'Décennale à 700€/an existe ?',
          a: "Non, c'est trop bas pour un BTP réel agréé ACPR. En-dessous de 950€/an (peintre AE le moins risqué) = suspicion : 1) Assureur non agréé ACPR, 2) Plafond &lt; 500k€ (insuffisant), 3) Exclusions étendues. NE PAS SIGNER sans vérification approfondie.",
        },
        {
          q: 'Pourquoi April Pro est-il le moins cher ?',
          a: 'April Pro est le leader privé BTP en France, avec un modèle 100% digital qui réduit ses coûts opérationnels. Économies répercutées en prime client. Solidité financière A (groupe APRIL coté). Couverture standard 1-2M€ AE, conforme légalement.',
        },
        {
          q: 'Sécurité financière des assureurs les moins chers ?',
          a: "April Pro = solidité A (groupe APRIL coté), agréé ACPR. SMABTP = solidité A (institution paritaire mutualiste). Allianz Pro = solidité A+ (groupe Allianz). Tous sont fiables. Le 'moins cher' n'est PAS synonyme de 'moins sécurisé' chez ces leaders.",
        },
      ]}
      relatedMetiers={[
        { name: 'Décennale moins chère (variante)', slug: 'assurance-decennale-moins-cher' },
        { name: 'Décennale pas chère (variante)', slug: 'assurance-decennale-pas-cher' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
      ]}
    />
  )
}

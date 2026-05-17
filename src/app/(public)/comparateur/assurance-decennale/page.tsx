/**
 * Comparateur — "comparateur assurance décennale" (50 vol, KD 2, CPC 800€)
 * FINAL Sprint 11 — 108/108 TIER S+A 🎉
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'comparateur / assurance-decennale'
const TITLE = 'Comparateur Assurance Décennale 2026 — 5 assureurs en parallèle'
const TAGLINE =
  'Comparateur assurance décennale BTP 2026 : April Pro, SMABTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP. Tarifs, garanties, postériorité comparés côte à côte.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Comparateur décennale 2026 : 5 assureurs BTP (April Pro, SMABTP, Allianz, MMA, AXA) — tarifs, plafonds, exclusions, postériorité. Économies -20-40%.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comparateur indépendant assurance décennale BTP 2026 : les 5 assureurs leaders en parallèle (April Pro BTP, SMABTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP) avec tarifs, plafonds, exclusions et postériorité comparés côte à côte. KW à 800€ CPC Google Ads (MONEY KW). Cette page synthétise les forces ou faiblesses de chaque assureur et propose un comparatif par profil BTP (artisan AE, SARL 5 salariés, PME 20 salariés)."
      legalReference="Loi Spinetta + art. 1792 C. civ. + ORIAS"
      benefits={[
        {
          icon: '🆚',
          title: '5 assureurs comparés',
          desc: 'April Pro, SMABTP, Allianz Pro BTP, MMA, AXA Pro BTP',
        },
        {
          icon: '📊',
          title: 'Comparatif détaillé',
          desc: 'Tarifs, plafonds, exclusions, postériorité, sinistralité',
        },
        {
          icon: '👷',
          title: 'Par profil BTP',
          desc: 'Artisan AE, SARL 5 sal., PME 20 sal., grand constructeur',
        },
        {
          icon: '💰',
          title: 'Best price identifié',
          desc: 'Pour chaque profil, indication assureur le moins cher',
        },
      ]}
      sections={[
        {
          h2: 'Tableau comparatif 5 assureurs décennale 2026',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> 🥇 best AE ou PME jusqu&apos;à 10 salariés :
                <ul>
                  <li>Tarifs : 950-25 000€ par an</li>
                  <li>Plafond : 1-10M€ selon profil</li>
                  <li>Postériorité : 10 ans (légale)</li>
                  <li>Force : 100% digital, attestation 24h</li>
                  <li>Faiblesse : moins compétitif &gt; 20 salariés</li>
                </ul>
              </li>
              <li>
                <strong>SMABTP</strong> 🥇 best PME ou grands constructeurs :
                <ul>
                  <li>Tarifs : 1 200-30 000€ par an</li>
                  <li>Plafond : 1-15M€</li>
                  <li>Postériorité : 10 ans</li>
                  <li>Force : paritaire BTP, expertise sinistres top</li>
                  <li>Faiblesse : moins digital, parcours papier</li>
                </ul>
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> bon multi-corps :
                <ul>
                  <li>Tarifs : 1 100-28 000€ par an</li>
                  <li>Plafond : 1-12M€</li>
                  <li>Postériorité : 10 ans</li>
                  <li>Force : multi-corps + cyber-assurance combinée</li>
                  <li>Faiblesse : peu spécialisé pur BTP</li>
                </ul>
              </li>
              <li>
                <strong>MMA Pro BTP</strong> bon rapport prix ou conseil :
                <ul>
                  <li>Tarifs : 1 050-26 000€ par an</li>
                  <li>Plafond : 1-10M€</li>
                  <li>Postériorité : 10 ans</li>
                  <li>Force : réseau agences + en ligne hybride</li>
                  <li>Faiblesse : tarifs intermédiaires (ni best ni premium)</li>
                </ul>
              </li>
              <li>
                <strong>AXA Pro BTP</strong> premium grands chantiers :
                <ul>
                  <li>Tarifs : 1 300-35 000€ par an</li>
                  <li>Plafond : 1-20M€</li>
                  <li>Postériorité : 10 ans + extension 12 ans possible</li>
                  <li>Force : premium, programmes fidélité</li>
                  <li>Faiblesse : tarifs plus élevés</li>
                </ul>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Best price par profil BTP 2026',
          body: (
            <ul>
              <li>
                <strong>Artisan AE plombier</strong> : 🥇 April Pro 1 400€ par an (best)
              </li>
              <li>
                <strong>Artisan AE peintre</strong> : 🥇 April Pro 950€ par an (best)
              </li>
              <li>
                <strong>Artisan AE maçon</strong> : 🥇 April Pro 2 400€ par an (best)
              </li>
              <li>
                <strong>Artisan AE électricien</strong> : 🥇 April Pro 1 200€ par an (best)
              </li>
              <li>
                <strong>SARL BTP 5 salariés</strong> : 🥇 April Pro ou SMABTP 4 500-8 000€ par an
              </li>
              <li>
                <strong>SARL BTP 10 salariés</strong> : 🥇 SMABTP 8 000-12 000€ par an
              </li>
              <li>
                <strong>PME BTP 20 salariés</strong> : 🥇 SMABTP 15 000-25 000€ par an
              </li>
              <li>
                <strong>Constructeur CMI</strong> : 🥇 SMABTP ou AXA Pro 20 000-35 000€ par an
              </li>
              <li>
                <strong>Promoteur grands chantiers</strong> : 🥇 AXA Pro ou Allianz Pro 30 000€+ par
                an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Méthodologie de comparaison à appliquer',
          body: (
            <ol>
              <li>
                <strong>Définir profil exact</strong> : activité (corps métiers), statut juridique,
                CA, nombre salariés, antécédents
              </li>
              <li>
                <strong>Lister besoins spécifiques</strong> : plafond minimum, postériorité
                souhaitée, options (cyber, juridique)
              </li>
              <li>
                <strong>Demander 5 devis</strong> via courtier ORIAS spécialiste BTP (gratuit +
                rapide)
              </li>
              <li>
                <strong>Comparer tableau standardisé</strong> :
                <ul>
                  <li>Prix annuel TTC</li>
                  <li>Plafond garantie</li>
                  <li>Franchise (300-3 000€)</li>
                  <li>Exclusions (lire intégralement)</li>
                  <li>Postériorité (mini 10 ans, idéal 12 ans AXA)</li>
                  <li>Solidité financière (A+/A ou B+)</li>
                </ul>
              </li>
              <li>
                <strong>Vérifier références</strong> : Trustpilot, Google reviews, expertise
                sinistres BTP
              </li>
              <li>
                <strong>Choisir best fit</strong> : pas forcément moins cher si exclusions cachées
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comparateur en ligne fiable ?',
          a: 'OUI si comparateur INDÉPENDANT (multi-assureurs) avec ORIAS. À FUIR : comparateurs liés à 1 seul assureur (biais). Privilégier courtier ORIAS qui négocie en plus de comparer.',
        },
        {
          q: 'Économies réelles via comparateur ?',
          a: 'Économies typiques : -20-40% vs souscription directe assureur unique. Sur prime 10 000€ par an PME BTP = 2 000-4 000€ par an économisés. Sur 10 ans (durée moyenne contrat) = 20 000-40 000€ économisés.',
        },
        {
          q: 'Pourquoi prix varient autant ?',
          a: '5 raisons : 1) Positionnement assureur (April spé TPE, SMABTP spé PME). 2) Sinistralité historique secteur. 3) Plafonds proposés. 4) Modèle distribution (digital vs agences). 5) Marges commerciales. Comparer 5 assureurs = seul moyen de trouver best fit.',
        },
      ]}
      relatedMetiers={[
        { name: 'Courtier assurance décennale', slug: 'courtier/assurance-decennale' },
        { name: 'Courtier en assurance décennale', slug: 'courtier/en-assurance-decennale' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'April Pro BTP', slug: 'april-pro-btp' },
        { name: 'SMABTP', slug: 'smabtp' },
      ]}
    />
  )
}

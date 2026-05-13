/**
 * Courtier — "courtier assurance décennale" (150 vol, KD 3, CPC 700€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'courtier/assurance-decennale'
const TITLE = 'Courtier Assurance Décennale — Comparateur spécialiste BTP'
const TAGLINE =
  'Courtier spécialiste assurance décennale : comparez April Pro BTP, SMABTP, Allianz Pro BTP, MMA Pro BTP. Économies -20-40% vs souscription directe.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Courtier ORIAS spécialiste assurance décennale BTP : comparatif 5 assureurs (April Pro, SMABTP, Allianz Pro, MMA, AXA). Économies 20-40% vs direct.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Faire appel à un courtier ORIAS spécialiste de l'assurance décennale est la stratégie optimale pour les pros BTP (artisans, PME, gros constructeurs) : économies typiques -20-40% vs souscription directe, accès aux 5 assureurs leaders en parallèle (April Pro BTP, SMABTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP), expertise sinistres BTP, suivi annuel. Cette page détaille la valeur ajoutée d'un courtier spécialiste vs souscription directe."
      legalReference="Loi Spinetta + art. 1792 C. civ. + ORIAS R-541-1 C. assur."
      benefits={[
        {
          icon: '🎯',
          title: 'Spécialiste BTP',
          desc: 'Expertise pointue décennale + nuances multi-corps',
        },
        { icon: '💰', title: 'Économies -20-40%', desc: 'Vs souscription directe assureur unique' },
        {
          icon: '🆚',
          title: '5 assureurs en parallèle',
          desc: 'April Pro, SMABTP, Allianz Pro, MMA, AXA Pro BTP',
        },
        {
          icon: '📋',
          title: 'Suivi sinistres',
          desc: 'Accompagnement déclaration + négociation indemnités',
        },
      ]}
      sections={[
        {
          h2: 'Valeur ajoutée courtier décennale',
          body: (
            <ol>
              <li>
                <strong>Comparaison multi-assureurs</strong> : 5 assureurs leaders en parallèle
                (impossible en agence)
              </li>
              <li>
                <strong>Négociation tarifaire</strong> : volume contrats courtier → -20-40% vs tarif
                individuel
              </li>
              <li>
                <strong>Expertise BTP</strong> : maîtrise nuances multi-corps (gros œuvre, second
                œuvre, finitions, structure, isolation)
              </li>
              <li>
                <strong>Analyse risques métier</strong> : ajustement plafonds/franchises selon votre
                activité spécifique
              </li>
              <li>
                <strong>Conseil indépendant ORIAS</strong> : pas lié à un seul assureur
                (objectivité)
              </li>
              <li>
                <strong>Accompagnement sinistres</strong> : déclaration + expertise + négociation
                indemnités
              </li>
              <li>
                <strong>Renouvellement annuel optimisé</strong> : challenge tarifs chaque année
                automatiquement
              </li>
              <li>
                <strong>Bilan annuel gratuit</strong> : adaptation contrat évolution activité/CA
              </li>
            </ol>
          ),
        },
        {
          h2: '5 assureurs partenaires courtier décennale',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> : leader décennale TPE/PME BTP. 950-25 000€/an selon
                profil. Spécialiste artisans + PME 5-20 salariés.
              </li>
              <li>
                <strong>SMABTP</strong> : paritaire BTP institutionnel. 1 200-30 000€/an. Solide
                expertise sinistres. PME + grands chantiers.
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : multi-secteurs. 1 100-28 000€/an. Bon rapport
                prix/garanties.
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : réseau agences + en ligne. 1 050-26 000€/an. Conseil
                personnalisé.
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : premium grands chantiers. 1 300-35 000€/an.
                Programmes fidélité.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Profils qui bénéficient le plus du courtier',
          body: (
            <ul>
              <li>
                <strong>Artisans AE BTP</strong> (plombier, peintre, électricien, maçon AE) :
                économies typiques -25-35%
              </li>
              <li>
                <strong>SARL BTP 1-10 salariés</strong> : économies -20-40% sur primes 5 000-15
                000€/an
              </li>
              <li>
                <strong>PME BTP 10-50 salariés</strong> : économies -15-30% sur primes 15 000-50
                000€/an + expertise sinistres
              </li>
              <li>
                <strong>Constructeurs maisons individuelles</strong> : critique pour CMI (Contrat
                Construction Maison Individuelle) — nuances expertise
              </li>
              <li>
                <strong>Promoteurs immobiliers</strong> : décennale + dommages-ouvrage groupés via
                courtier expert
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Courtier vraiment moins cher qu&apos;assureur direct ?',
          a: 'OUI dans 80% des cas : courtier négocie volume contrats avec assureurs → tarifs préférentiels -20-40% répercutés. ATTENTION : courtier prend commission (souvent 5-15% prime), incluse dans tarif final. Économie nette = -10-25% vs direct.',
        },
        {
          q: 'Comment vérifier sérieux courtier ?',
          a: '1) Numéro ORIAS obligatoire (vérifier sur orias.fr). 2) Carte professionnelle Loi Hoguet pour mandats. 3) Assurance RC Pro courtier valide. 4) Avis Trustpilot/Google &gt; 4.0. 5) Transparence commissions (légalement obligatoire depuis 2023).',
        },
        {
          q: 'Différence courtier vs agent général ?',
          a: 'AGENT GÉNÉRAL : représente UN seul assureur exclusivement (Allianz, Axa, MMA, etc.). COURTIER : représente VOS intérêts, indépendant, négocie auprès de plusieurs assureurs. Pour décennale BTP : COURTIER spécialiste = meilleur choix (comparaison + négociation).',
        },
      ]}
      relatedMetiers={[
        { name: 'Courtier en assurance décennale', slug: 'courtier/en-assurance-decennale' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Comparateur assurance décennale', slug: 'comparateur/assurance-decennale' },
        { name: 'April Pro BTP', slug: 'april-pro-btp' },
        { name: 'SMABTP', slug: 'smabtp' },
      ]}
    />
  )
}

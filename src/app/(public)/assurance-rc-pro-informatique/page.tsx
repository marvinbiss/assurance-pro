/**
 * Pilier — "assurance rc pro informatique" (200 vol, KD 0, CPC 400€)
 * Variante de /rc-pro-informatique avec angle SOUSCRIPTION + cyber.
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-informatique'
const TITLE = 'Assurance RC Pro Informatique — Souscription, comparatif, cyber'
const TAGLINE =
  'Souscrire une assurance RC Pro informatique : guide pas à pas pour freelance dev, ESN, agence web. Comparatif 5 assureurs + cyber-assurance combinée.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance RC Pro informatique : souscription en ligne 5 min. Hiscox, Stello, Allianz Pro, MMA, AXA comparés. Cyber-assurance combinée. Attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Guide pratique pour souscrire votre assurance RC Pro informatique : critères de choix, comparatif des 5 principaux assureurs spécialisés (Hiscox leader IT, Stello digital pure, Allianz Pro, MMA, AXA), avantages de la cyber-assurance combinée, et démarches de souscription en ligne en 5 minutes."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi 78-17 (RGPD)"
      benefits={[
        {
          icon: '⚡',
          title: 'Souscription 5 min',
          desc: 'Devis personnalisé + attestation téléchargeable immédiatement',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'Hiscox (best AE), Stello (digital), Allianz Pro, MMA, AXA',
        },
        {
          icon: '🔐',
          title: 'Cyber-assurance option',
          desc: 'Recommandée si données client sensibles : +150-2 000€/an selon profil',
        },
        {
          icon: '📋',
          title: 'Conformité ORIAS',
          desc: 'Courtier partenaire registre vérifiable orias.fr',
        },
      ]}
      sections={[
        {
          h2: 'Critères de choix RC Pro IT',
          body: (
            <ol>
              <li>
                <strong>Plafond par sinistre</strong> : minimum 1M€ AE, 2-3M€ SARL/SAS, 5M€+ pour
                activités à risque (cybersécurité, hébergeur, données sensibles)
              </li>
              <li>
                <strong>Postériorité (subséquente)</strong> : minimum 5 ans, idéal 10 ans (Hiscox
                seul propose 10 ans en standard)
              </li>
              <li>
                <strong>Antériorité (rétroactivité)</strong> : illimitée ou &gt; 5 ans pour couvrir
                clients antérieurs
              </li>
              <li>
                <strong>Exclusions clés</strong> : cyber-attaques (souvent exclu), code open source,
                conseil financier, données médicales
              </li>
              <li>
                <strong>Cyber-assurance incluse ou combinable</strong> : Hiscox et Generali offrent
                les meilleurs packages combinés
              </li>
              <li>
                <strong>Franchise par sinistre</strong> : 500-1 500€ standard. Plus faible = prime
                plus haute mais moins reste à charge
              </li>
              <li>
                <strong>Procédure de déclaration</strong> : 5 jours ouvrés standard. Plateforme en
                ligne idéale
              </li>
            </ol>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs IT 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : leader services intellectuels IT. Best price AE
                (95-220€/an). Postériorité 10 ans. Cyber combinée excellente.
              </li>
              <li>
                <strong>Stello</strong> : challenger pure-digital. Best AE (90-200€/an),
                souscription full online. Postériorité 5 ans.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture large, idéal SARL/SAS PME. Postériorité 5
                ans. Cyber en option.
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré, fort sur SARL/SAS &gt; 100k€ CA. Cyber moins
                développée.
              </li>
              <li>
                <strong>AXA Pro</strong> : couverture premium, assistance haut de gamme, prime +20%
                vs Hiscox équivalent.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarches de souscription',
          body: (
            <ol>
              <li>
                <strong>Devis personnalisé</strong> : statut juridique (AE/SARL/SAS), CA
                prévisionnel, activité IT précise (dev, conseil, hébergeur, sécurité), zone
                géographique, ancienneté
              </li>
              <li>
                <strong>Choix de l&apos;offre</strong> : plafond, franchise, options (cyber,
                protection juridique, perte exploitation)
              </li>
              <li>
                <strong>Validation pièces</strong> : SIRET, justificatifs identité, attestation
                activité, RIB
              </li>
              <li>
                <strong>Paiement sécurisé</strong> : annuel (-3-7% vs mensuel) ou mensuel
              </li>
              <li>
                <strong>Téléchargement attestation</strong> : immédiat dans espace client,
                présentable aux clients
              </li>
              <li>
                <strong>Confirmation par email</strong> + contrat PDF + IPID
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Souscription RC Pro IT en ligne — pièces nécessaires ?',
          a: 'SIRET (Insee.fr), justificatif identité, attestation activité (ACOSS pour AE, K-bis pour SARL/SAS), RIB. Toutes via upload digital, validation &lt; 24h ouvrées.',
        },
        {
          q: 'Cyber-assurance vraiment indispensable ?',
          a: 'Recommandée fortement si : 1) Vous hébergez/traitez données client, 2) Vous gérez des sites e-commerce, 3) Vous faites de la cybersécurité, 4) Vous avez subi tentative phishing/intrusion. Pour pure prestation conseil sans données : optionnelle.',
        },
        {
          q: 'Quel délai pour avoir mon attestation ?',
          a: 'Téléchargement immédiat après paiement (< 5 minutes). Validité à compter de la date d&apos;effet du contrat (généralement le lendemain). Attestation présentable aux clients pour demande RC Pro fournisseur.',
        },
        {
          q: 'Puis-je changer d&apos;assureur RC Pro IT à tout moment ?',
          a: 'Oui après 1 an d&apos;engagement (loi infra-annuelle 2020). Préavis 1 mois. IMPORTANT : conserver la postériorité de l&apos;ancien contrat pour les sinistres déclarés après résiliation.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro Informatique (vue globale)', slug: 'rc-pro-informatique' },
        { name: 'Cyber assurance', slug: 'cyber-assurance' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'RC Pro consultant IT', slug: 'rc-pro/informatique' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

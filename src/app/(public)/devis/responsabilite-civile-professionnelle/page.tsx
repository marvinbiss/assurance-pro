/**
 * Devis — "devis responsabilité civile professionnelle" (200 vol, KD 10, CPC 800€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/responsabilite-civile-professionnelle'
const TITLE = 'Devis Responsabilité Civile Professionnelle — Comparatif 5 assureurs'
const TAGLINE =
  'Devis RC Pro GRATUIT en 5 min : Hiscox, Stello, Allianz Pro, MMA, AXA comparés. Tarifs 95-2 500€/an selon profil. Attestation immédiate.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis RC Pro gratuit. Hiscox 95€/an AE services, Allianz 280€/an SARL, MMA 600€/an PME. Comparatif 5 assureurs spécialisés. Attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Demande de devis Responsabilité Civile Professionnelle GRATUITE en 5 minutes. Notre courtier ORIAS partenaire compare en temps réel les 5 assureurs leaders RC Pro (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro) pour vous proposer le meilleur tarif selon votre activité, statut juridique, CA et besoins spécifiques (cyber-assurance, protection juridique). Attestation téléchargeable immédiatement chez Hiscox/Stello."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🆓',
          title: 'Devis gratuit sans engagement',
          desc: 'Comparaison transparente 5 assureurs leaders',
        },
        {
          icon: '⚡',
          title: '5 minutes pour un devis',
          desc: 'Formulaire simple, retour email sous 30 min',
        },
        {
          icon: '🔍',
          title: 'Hiscox + Stello + Allianz + MMA + AXA',
          desc: 'Les 5 leaders RC Pro France comparés',
        },
        {
          icon: '📋',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable après souscription (Hiscox/Stello)',
        },
      ]}
      sections={[
        {
          h2: 'Pour qui ce devis RC Pro',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneurs / micro-entrepreneurs</strong> services intellectuels
                (consultant, IT, designer)
              </li>
              <li>
                <strong>Freelances</strong> tous secteurs (services intellectuels, créatifs,
                coaching, formation)
              </li>
              <li>
                <strong>SARL / SAS / SASU</strong> services et commerce (CA &lt; 5M€)
              </li>
              <li>
                <strong>Professions libérales</strong> (médical, juridique, immobilier)
              </li>
              <li>
                <strong>Artisans BTP</strong> en complément décennale
              </li>
              <li>
                <strong>Auto-écoles, taxis, VTC</strong> (obligation décret 2014-371)
              </li>
              <li>
                <strong>Agences immobilières</strong> (Loi Hoguet)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro 2026 par profil',
          body: (
            <ul>
              <li>
                <strong>AE freelance services intellectuels</strong> : 95-220€/an (Hiscox best)
              </li>
              <li>
                <strong>AE coach / formateur</strong> : 150-300€/an
              </li>
              <li>
                <strong>AE esthéticienne à domicile</strong> : 180-350€/an
              </li>
              <li>
                <strong>AE BTP (+ décennale)</strong> : 250-450€/an
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : 350-900€/an
              </li>
              <li>
                <strong>SAS PME CA 300k-1M€</strong> : 800-1 500€/an
              </li>
              <li>
                <strong>Agent immobilier Carte T</strong> : 350-1 800€/an
              </li>
              <li>
                <strong>Médical / paramédical</strong> : 800-2 500€/an (réglementaire)
              </li>
              <li>
                <strong>Avocat</strong> : 500-1 500€/an (Ordre minimum)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Critères de choix dans le devis',
          body: (
            <ol>
              <li>
                <strong>Plafond par sinistre</strong> : minimum 500k€ AE, 1M€ standard, 2-3M€
                activités à risque
              </li>
              <li>
                <strong>Postériorité (subséquente)</strong> : 5 ans standard, 10 ans Hiscox (unique)
              </li>
              <li>
                <strong>Franchise par sinistre</strong> : 300-1 500€ standard. Plus faible = prime
                plus haute
              </li>
              <li>
                <strong>Cyber-assurance combinée</strong> : indispensable si activité IT/digital ou
                données client
              </li>
              <li>
                <strong>Exclusions clés</strong> : lire attentivement (cyber-attaques, données
                médicales, conseil financier)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro la moins chère pour un freelance ?',
          a: 'Hiscox = best price global AE/freelance services intellectuels (95-220€/an). Stello = challenger 100% digital (90-200€/an). Pour AE BTP : April Pro 250-450€/an (en complément décennale).',
        },
        {
          q: 'Délai entre devis et attestation ?',
          a: 'Hiscox / Stello : attestation immédiate après paiement (téléchargement espace adhérent). Allianz Pro / MMA / AXA : 24-48h ouvrées. Notre courtier ORIAS facilite démarches.',
        },
        {
          q: 'Plafond minimum pour une RC Pro AE ?',
          a: 'Minimum recommandé : 500k€ AE petite activité, 1M€ standard, 2-3M€ activités à risque (cyber, médical, financier, BTP). En-dessous = exposition risque trop élevé pour le coût marginal de monter en plafond.',
        },
        {
          q: 'Cyber-assurance vraiment indispensable ?',
          a: 'OUI quasi-systématiquement pour pros IT, agences digitales, e-commerce, gestionnaires données client. La RC Pro standard EXCLUT les cyber-attaques contre votre propre infrastructure. Coût combiné : +150-2 000€/an selon profil.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

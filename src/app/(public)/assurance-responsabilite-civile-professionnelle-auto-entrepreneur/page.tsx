/**
 * Auto-entrepreneur — "assurance responsabilité civile professionnelle auto-entrepreneur" (200 vol, KD 5, CPC 300€)
 * Variante longue de /responsabilite-civile-professionnelle-auto-entrepreneur avec angle SOUSCRIPTION
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-responsabilite-civile-professionnelle-auto-entrepreneur'
const TITLE = 'Assurance Responsabilité Civile Professionnelle Auto-Entrepreneur'
const TAGLINE =
  "Guide complet de l'assurance RC Pro pour auto-entrepreneurs : pièces, démarches, comparatif détaillé Hiscox vs Stello vs Allianz Pro vs April Pro."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro auto-entrepreneur : guide souscription complet. Hiscox 95€/an services, April Pro 250€/an BTP. Pièces nécessaires + démarches 5 min.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance Responsabilité Civile Professionnelle pour les auto-entrepreneurs est l'investissement le plus stratégique de votre activité — pour quelques euros par jour, vous protégez votre patrimoine personnel contre des sinistres pouvant atteindre 30k€+. Ce guide complet détaille les démarches en ligne (5 minutes), les pièces nécessaires (SIRET + ACOSS suffisent), et le comparatif rigoureux des 4 leaders du segment AE."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🚀',
          title: 'Démarches digitales',
          desc: 'Souscription 100% en ligne en 5-10 minutes',
        },
        {
          icon: '📄',
          title: 'Pièces simplifiées',
          desc: 'SIRET + ACOSS + CNI + RIB — pas de Kbis ni bilan requis',
        },
        {
          icon: '💰',
          title: 'Dès 95€/an',
          desc: 'Best price Hiscox AE services intellectuels CA &lt; 80k€',
        },
        {
          icon: '⏱️',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable après paiement (Hiscox, Stello)',
        },
      ]}
      sections={[
        {
          h2: 'Démarches souscription en ligne (5 minutes)',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Devis personnalisé</strong> (2 min) : activité précise, statut AE,
                CA prévisionnel, zone géographique
              </li>
              <li>
                <strong>Étape 2 — Comparaison offres</strong> (1 min) : plafond, franchise,
                postériorité, options (cyber, protection juridique)
              </li>
              <li>
                <strong>Étape 3 — Saisie informations</strong> (2 min) : SIRET, ACOSS, CNI, RIB
              </li>
              <li>
                <strong>Étape 4 — Paiement sécurisé</strong> : CB ou prélèvement, annuel (-3-7%) ou
                mensuel
              </li>
              <li>
                <strong>Étape 5 — Téléchargement attestation</strong> : immédiat dans espace
                adhérent
              </li>
              <li>
                <strong>Étape 6 — Envoi aux clients</strong> qui en demandent (attestation valide à
                présenter B2B)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Comparatif Hiscox vs Stello vs Allianz vs April Pro',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : 🥇 leader services intellectuels AE. Tarif 95-220€/an.
                Plafond 1M€. <strong>Postériorité 10 ans (unique)</strong>. Souscription 100% en
                ligne. Solidité A+.
              </li>
              <li>
                <strong>Stello</strong> : challenger 100% digital pure. Tarif 90-200€/an. Plafond
                1.5M€ max. Postériorité 5 ans. App mobile native. Solidité A-.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (services + BTP +
                agriculture). Tarif AE 180-380€/an. Postériorité 5 ans. Solidité A+. Réseau
                d&apos;agences.
              </li>
              <li>
                <strong>April Pro BTP</strong> : 🥇 leader AE BTP en complément décennale. Tarif RC
                Pro 250-450€/an + décennale 950-2 800€/an. Souscription en ligne 24h. Solidité A.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Cas concrets : quelle RC Pro pour quel profil AE ?',
          body: (
            <ul>
              <li>
                <strong>Consultant business AE</strong> (CA 40k€) : Hiscox 95-150€/an (plafond 1M€)
              </li>
              <li>
                <strong>Freelance dev AE</strong> (CA 60k€) : Hiscox 130-200€/an + cyber-assurance
                combinée +150€/an
              </li>
              <li>
                <strong>Designer / photographe AE</strong> : Hiscox 120-220€/an
              </li>
              <li>
                <strong>Coach sportif AE à domicile</strong> : Allianz Pro 220-350€/an (risque
                corporel)
              </li>
              <li>
                <strong>Esthéticienne AE à domicile</strong> : Allianz Pro 200-350€/an (allergies,
                brûlures)
              </li>
              <li>
                <strong>Plombier AE BTP</strong> : April Pro 300-450€/an RC Pro + 1 400-2 100€/an
                décennale = pack 1 700-2 550€/an
              </li>
              <li>
                <strong>Maçon AE BTP</strong> : April Pro 400-500€/an RC Pro + 1 800-2 800€/an
                décennale = pack 2 200-3 300€/an
              </li>
              <li>
                <strong>VTC AE</strong> : Wakam ou Stello 280-450€/an RC Pro VTC + auto VTC séparée
              </li>
              <li>
                <strong>Restauration ambulante AE</strong> : Allianz Pro Restauration 350-700€/an
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Délai entre souscription et attestation RC Pro AE ?',
          a: 'Chez Hiscox / Stello : immédiat après paiement (téléchargement espace adhérent). Chez Allianz Pro / MMA / AXA : 24-48h ouvrées. Chez April Pro BTP : 24h ouvrées. Urgence chantier ? Choisir Hiscox ou Stello.',
        },
        {
          q: "Quelle est l'assurance RC Pro AE la plus complète ?",
          a: 'Hiscox est la plus complète sur services intellectuels (plafond 10M€ disponible, postériorité 10 ans unique, cyber-assurance combinée). Pour AE BTP : April Pro est la plus complète (décennale incluse, qualifications RGE).',
        },
        {
          q: 'RC Pro AE déductible des impôts ?',
          a: 'OUI pour artisans/EI en TNS au régime réel ou simplifié (déductible Madelin art. 154 bis CGI). Pas pour AE en versement libératoire (régime simplifié forfaitaire). Économie fiscale 22-45% de la prime selon TMI.',
        },
        {
          q: 'Peut-on souscrire une RC Pro avant immatriculation AE ?',
          a: 'Non. Attendre votre SIRET officiel (1-2 semaines après déclaration ACOSS/URSSAF). En attendant : démarrer activité après réception SIRET + souscription RC Pro immédiate. Délai total démarrage activité : 2-3 semaines.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        {
          name: 'Assurance RC Pro Auto-Entrepreneur (souscription)',
          slug: 'assurance-rc-pro-auto-entrepreneur',
        },
        { name: 'RC Pro micro-entreprise', slug: 'rc-pro-micro-entreprise' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
      ]}
    />
  )
}

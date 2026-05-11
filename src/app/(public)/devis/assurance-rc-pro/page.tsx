/**
 * Devis — "devis assurance rc pro" (250 vol, KD 6, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/assurance-rc-pro'
const TITLE = 'Devis Assurance RC Pro — Comparatif gratuit 5 leaders'
const TAGLINE =
  'Demande de devis assurance RC Pro gratuit : comparatif Hiscox, Stello, Allianz Pro, MMA, AXA. Tous métiers et statuts. Attestation immédiate.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis assurance RC Pro gratuit 5 min : 5 assureurs comparés. Hiscox 95€/an best AE, Allianz 280€ SARL, MMA 600€ PME. Attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Devis assurance RC Pro 100% gratuit et sans engagement : notre courtier ORIAS partenaire compare en temps réel les 5 leaders RC Pro (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro) selon votre profil pour vous orienter vers la meilleure offre. Le service est entièrement gratuit pour vous — la commission est versée par l'assureur en cas de souscription, sans surcoût sur votre prime."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🆓',
          title: '100% gratuit',
          desc: 'Courtier rémunéré par assureur — pas par vous',
        },
        {
          icon: '⏱️',
          title: 'Devis en 30 min',
          desc: 'Email avec comparatif détaillé sous 30 min ouvrées',
        },
        {
          icon: '🔍',
          title: '5 assureurs leaders',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro',
        },
        {
          icon: '🛡️',
          title: 'Conformité ORIAS',
          desc: 'Courtier inscrit Refassu — registre vérifiable orias.fr',
        },
      ]}
      sections={[
        {
          h2: '7 critères de comparaison du devis',
          body: (
            <ol>
              <li>
                <strong>Plafond par sinistre</strong> : 500k€-10M€ selon profil
              </li>
              <li>
                <strong>Plafond annuel cumulé</strong> : limite totale tous sinistres / an
              </li>
              <li>
                <strong>Postériorité (subséquente)</strong> : 5 ans standard, 10 ans Hiscox unique
              </li>
              <li>
                <strong>Antériorité (rétroactivité)</strong> : couverture sinistres antérieurs
                (illimitée idéalement)
              </li>
              <li>
                <strong>Franchise par sinistre</strong> : 300-1 500€ standard
              </li>
              <li>
                <strong>Exclusions clés</strong> : cyber, données sensibles, sous-traitance, conseil
                financier
              </li>
              <li>
                <strong>Options complémentaires</strong> : cyber-assurance, protection juridique,
                perte exploitation
              </li>
            </ol>
          ),
        },
        {
          h2: 'Comment notre courtier ORIAS sélectionne pour vous',
          body: (
            <ul>
              <li>
                <strong>Analyse de votre activité</strong> : services intellectuels, BTP, médical,
                commerce, etc.
              </li>
              <li>
                <strong>Évaluation de votre profil de risque</strong> : CA, ancienneté, sinistralité
                passée
              </li>
              <li>
                <strong>Identification besoins spécifiques</strong> : cyber-assurance, plafond
                élevé, postériorité longue
              </li>
              <li>
                <strong>Sélection 2-3 assureurs adaptés</strong> parmi les 5 partenaires
              </li>
              <li>
                <strong>Comparaison transparente</strong> : tableau récapitulatif avec tous critères
              </li>
              <li>
                <strong>Conseil personnalisé</strong> : recommandation argumentée selon votre profil
              </li>
              <li>
                <strong>Vous décidez librement</strong> : aucune obligation de souscrire
              </li>
            </ul>
          ),
        },
        {
          h2: 'Cas concrets de devis RC Pro 2026',
          body: (
            <ul>
              <li>
                <strong>Sébastien, consultant freelance</strong> (AE CA 60k€) → Hiscox 145€/an
                plafond 1M€ postériorité 10 ans
              </li>
              <li>
                <strong>Marie, photographe</strong> (AE CA 35k€) → Hiscox 180€/an plafond 1M€
              </li>
              <li>
                <strong>Yves, agence web SAS</strong> (CA 250k€) → Hiscox 850€/an plafond 2M€ +
                cyber +400€/an
              </li>
              <li>
                <strong>Sophie, esthéticienne à domicile</strong> (AE CA 45k€) → Allianz Pro 240€/an
                plafond 1M€
              </li>
              <li>
                <strong>Marc, agent immobilier</strong> (Carte T SARL) → Allianz Pro 1 200€/an
                plafond 1.5M€ (Hoguet)
              </li>
              <li>
                <strong>Karim, plombier AE</strong> (CA 70k€) → April Pro 350€/an RC Pro + 1 700€/an
                décennale = 2 050€/an pack
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps prend le devis ?',
          a: 'Formulaire : 5 minutes. Réception devis comparatif par email : sous 30 minutes ouvrées. Pour profils complexes (SAS multi-corps, profession réglementée) : jusqu&apos;à 2-4h ouvrées.',
        },
        {
          q: 'Le courtier est-il vraiment indépendant ?',
          a: 'OUI. Notre courtier ORIAS est inscrit Refassu (vérifiable orias.fr), partenaire de 5 assureurs sans exclusivité. Recommandation basée sur votre profil — pas sur la commission. Choix final 100% vôtre.',
        },
        {
          q: "Que faire si je n'aime aucun devis ?",
          a: 'Aucune obligation de souscrire. Vous pouvez : 1) Demander des ajustements (autres assureurs, autres options). 2) Comparer ailleurs librement. 3) Différer votre décision (devis valable 30 jours). 4) Refuser entièrement sans aucune pénalité.',
        },
        {
          q: 'Peut-on négocier le devis ?',
          a: 'Chez Hiscox/Stello : tarifs automatiques pas négociables. Chez Allianz Pro / MMA / AXA : marges possibles selon profil (-5-15%) via courtier ORIAS. Toujours demander si réduction possible avant signature.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
        { name: 'Devis RC Pro complet', slug: 'devis/responsabilite-civile-professionnelle' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}

/**
 * Pilier — "rc pro informatique" (200 vol, KD 0, CPC 500€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-informatique'
const TITLE = 'RC Pro Informatique — Freelance IT, ESN, agence web, devis 24h'
const TAGLINE =
  "RC Pro pour les pros de l'informatique : freelance dev, ESN, agence web, consultant cybersécurité. Plafonds adaptés, cyber-assurance combinée, tarifs 2026."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro informatique : freelance dev 95-220€ par an, ESN 800-3 500€ par an, agence web 350-1 200€ par an. Cyber-assurance combinée recommandée. Plafond 1-5M€ selon profil.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro informatique couvre les professionnels du numérique (freelance développeur, ESN, agence web, consultant IT, cybersécurité, hébergeur) contre les dommages causés à des clients dans le cadre de prestations : bug critique, perte de données, retard de livraison majeur, faille de sécurité non détectée, conseil erroné. Le CPC élevé (500-1 300€ selon spé) reflète la valeur client : 1 sinistre peut coûter 30 000€-2M€."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi 78-17 (RGPD)"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💻',
          title: 'Freelance dev — consultant IT',
          desc: 'Couverture erreurs code, bugs critiques, retards livraison',
        },
        {
          icon: '🔐',
          title: 'Cyber-assurance combinée',
          desc: 'Couvre fuite de données, ransomware, attaques (option clé)',
        },
        { icon: '🏢', title: 'ESN — agence web', desc: 'Plafond étendu 2-5M€ recommandé selon CA' },
        {
          icon: '💰',
          title: 'À partir de 95€ par an',
          desc: 'AE freelance dev. ESN ou SAS 800-3 500€ par an selon CA',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres typiques IT et coûts moyens',
          body: (
            <ul>
              <li>
                <strong>Bug critique en production</strong> : 30-150k€ (e-commerce down 48h)
              </li>
              <li>
                <strong>Perte de données client</strong> (sans backup adéquat) : 50-500k€
              </li>
              <li>
                <strong>Faille sécurité non détectée</strong> avec exploitation : 100k-2M€+
              </li>
              <li>
                <strong>Retard livraison majeur projet</strong> : pénalités 20-200k€
              </li>
              <li>
                <strong>Conseil architecture erroné</strong> : refonte complète 50-300k€
              </li>
              <li>
                <strong>Violation RGPD</strong> : amende CNIL jusqu&apos;à 4% CA mondial (non
                couvert mais frais défense oui)
              </li>
              <li>
                <strong>Atteinte propriété intellectuelle</strong> (code GPL non respecté) :
                50-500k€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro IT par profil',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur freelance dev</strong> (CA &lt; 80k€) : 95-220€ par an,
                plafond 1M€
              </li>
              <li>
                <strong>Freelance senior IT (consultant)</strong> : 180-400€ par an, plafond 2M€
              </li>
              <li>
                <strong>SASU dev — SARL TPE (CA 100-300k€)</strong> : 450-1 200€ par an, plafond
                2-3M€
              </li>
              <li>
                <strong>Agence web TPE (5-10 personnes)</strong> : 800-2 000€ par an, plafond 3M€
              </li>
              <li>
                <strong>ESN moyenne (10-50 consultants)</strong> : 2 500-8 000€ par an, plafond
                3-5M€
              </li>
              <li>
                <strong>ESN grosse (100+ consultants)</strong> : 8 000-50 000€ par an, plafond
                5-10M€
              </li>
              <li>
                <strong>Cybersécurité spécialisée</strong> : 3 000-25 000€ par an (risque ×3-5)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Cyber-assurance : extension obligatoire ?',
          body: (
            <>
              <p>
                La RC Pro standard <strong>EXCLUT généralement</strong> :
              </p>
              <ul>
                <li>Attaques informatiques contre votre infrastructure (ransomware, DDoS)</li>
                <li>Frais de notification CNIL (obligatoire RGPD &lt; 72h)</li>
                <li>Frais de restauration données</li>
                <li>Pertes d&apos;exploitation suite cyberattaque</li>
              </ul>
              <p>
                <strong>Cyber-assurance combinée recommandée</strong> :
              </p>
              <ul>
                <li>AE freelance : +150-400€ par an</li>
                <li>SARL ou SASU : +500-2 000€ par an</li>
                <li>ESN ou PME : +2 000-15 000€ par an</li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle RC Pro pour un développeur freelance ?',
          a: 'Hiscox ou Stello pour AE — CA &lt; 80k€ : 95-220€ par an avec plafond 1M€ + postériorité 10 ans. Ajouter cyber-assurance +150-300€ par an si vous gérez des données client sensibles.',
        },
        {
          q: 'Faut-il aussi une cyber-assurance ?',
          a: 'Recommandé fortement, surtout si : vous hébergez données client, traitez données personnelles (RGPD), faites de la cybersécurité, ou avez un site e-commerce. La RC Pro seule ne couvre PAS les cyber-attaques.',
        },
        {
          q: 'Combien coûte une RC Pro pour une ESN ?',
          a: 'ESN moyenne (20-50 consultants) : 2 500-8 000€ par an chez Hiscox ou Allianz Pro, plafond 3-5M€. Ajouter cyber : +2 000-10 000€ par an. Pack global = négociation possible -15-25%.',
        },
        {
          q: 'RC Pro IT couvre-t-elle le retard de livraison ?',
          a: 'Oui si le retard cause un préjudice prouvé au client (pénalités contractuelles, perte CA). Exclusions courantes : retards dus à force majeure, modifications de scope par le client, dépendances tiers. Vérifier conditions générales.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro Informatique (variante)', slug: 'assurance-rc-pro-informatique' },
        { name: 'RC Pro consultant', slug: 'rc-pro/informatique' },
        { name: 'Cyber assurance', slug: 'cyber-assurance' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}

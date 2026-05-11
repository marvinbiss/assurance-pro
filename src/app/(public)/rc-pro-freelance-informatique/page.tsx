/**
 * Pilier — "rc pro freelance informatique" (150 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-freelance-informatique'
const TITLE = 'RC Pro Freelance Informatique — Dev, consultant, agence web, cyber'
const TAGLINE =
  'RC Pro spécifique pour freelance IT (dev, consultant, agence web, cybersécurité, data) : sinistres typiques, plafond recommandé, comparatif Hiscox / Stello.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro freelance informatique : tarif AE dev 95-220€/an, consultant IT 180-350€/an. Cyber-assurance combinée recommandée. Hiscox best price, Stello digital pur.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le freelance informatique (développeur, consultant IT, designer UX/UI, data scientist, cybersécurité, DevOps) est exposé à des sinistres spécifiques au numérique : bug critique en production, retard livraison majeur, faille sécurité non détectée, perte de données client, conseil architecture erroné. La RC Pro freelance informatique est l'assurance indispensable, fortement complétée par une cyber-assurance pour les profils gérant des données sensibles."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi 78-17 RGPD"
      benefits={[
        {
          icon: '💻',
          title: 'Dev freelance + consultant IT',
          desc: 'Couvre erreurs code, bugs critiques, conseils erronés',
        },
        {
          icon: '🔐',
          title: 'Cyber-assurance combinée',
          desc: 'Recommandée si données client : +150-400€/an AE',
        },
        {
          icon: '💰',
          title: '95-450€/an',
          desc: 'Dev AE 95-220€ • Consultant IT 180-350€ • Agence web SAS 350-450€',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1M€ standard',
          desc: 'Suffisant pour AE CA &lt; 80k€. SARL/SAS : 2-3M€ recommandés',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres freelance IT typiques',
          body: (
            <ul>
              <li>
                <strong>Bug critique production</strong> : e-commerce client down 48h → perte
                50-150k€ CA
              </li>
              <li>
                <strong>Retard livraison majeur</strong> : projet 6 mois livré 12 mois → pénalités
                20-100k€
              </li>
              <li>
                <strong>Faille sécurité non détectée</strong> : exploitation par tiers → fuite
                données 100k-2M€
              </li>
              <li>
                <strong>Code GPL non respecté</strong> : licence open source mal gérée → procès
                propriété intellectuelle 50-300k€
              </li>
              <li>
                <strong>Architecture inadaptée</strong> : refonte complète nécessaire → 100-500k€
              </li>
              <li>
                <strong>Perte données client</strong> (sans backup) : reconstitution + dommages
                moraux 50-500k€
              </li>
              <li>
                <strong>Violation RGPD</strong> : amende CNIL 4% CA mondial (non couvert RC Pro mais
                frais défense oui)
              </li>
              <li>
                <strong>Discrimination algorithmique</strong> : biais IA dans recrutement client →
                poursuites 100-300k€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Cyber-assurance : pourquoi essentielle pour IT',
          body: (
            <>
              <p>
                La RC Pro standard <strong>EXCLUT généralement</strong> :
              </p>
              <ul>
                <li>Attaques informatiques contre votre infrastructure (ransomware, DDoS)</li>
                <li>Frais notification CNIL (obligatoire RGPD &lt; 72h)</li>
                <li>Frais restauration données</li>
                <li>Pertes d&apos;exploitation suite cyberattaque</li>
                <li>Frais experts forensic</li>
                <li>Frais avocats spécialisés données personnelles</li>
              </ul>
              <p>
                <strong>Cyber-assurance combinée recommandée</strong> pour :
              </p>
              <ul>
                <li>Freelance IT gérant données client (hébergement, SaaS, code)</li>
                <li>Consultant cybersécurité (paradoxe : exposé +++ même si pro du sujet)</li>
                <li>Développeur full-stack avec accès production client</li>
                <li>Data scientist / DPO externe</li>
              </ul>
              <p>Coût additionnel : +150-400€/an AE, +500-2 000€/an SARL/SAS.</p>
            </>
          ),
        },
        {
          h2: 'Tarifs freelance IT 2026 par profil',
          body: (
            <ul>
              <li>
                <strong>Dev freelance AE (CA &lt; 50k€)</strong> : 95-150€/an, plafond 1M€
              </li>
              <li>
                <strong>Dev freelance AE (CA 50-80k€)</strong> : 130-220€/an
              </li>
              <li>
                <strong>Consultant IT freelance AE (CA &lt; 80k€)</strong> : 180-350€/an
              </li>
              <li>
                <strong>Designer UX/UI freelance AE</strong> : 120-250€/an
              </li>
              <li>
                <strong>Data scientist freelance AE</strong> : 200-400€/an (risque RGPD)
              </li>
              <li>
                <strong>DevOps freelance AE</strong> : 180-350€/an
              </li>
              <li>
                <strong>Consultant cybersécurité AE</strong> : 280-500€/an (risque accru)
              </li>
              <li>
                <strong>SASU/EURL IT (CA 100-300k€)</strong> : 450-900€/an + cyber +500€
              </li>
              <li>
                <strong>Agence web SAS (CA 300k-1M€)</strong> : 800-1 500€/an + cyber +1 000€
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Hiscox ou Stello pour un dev freelance ?',
          a: 'AE dev freelance CA &lt; 80k€ : 1) Hiscox = best price 95-180€/an, postériorité 10 ans (unique). 2) Stello = digital pur, contrat 100% en ligne, prix similaire (90-200€/an), postériorité 5 ans. Hiscox gagne sur postériorité.',
        },
        {
          q: 'Faut-il forcément une cyber-assurance ?',
          a: 'Recommandé fortement si : vous hébergez/traitez données client, vous gérez des sites e-commerce, vous faites de la cybersécurité (paradoxalement très exposé), vous avez subi tentative phishing/intrusion. Pour pure prestation conseil sans données : optionnelle.',
        },
        {
          q: 'Quelle RC Pro pour un consultant cybersécurité ?',
          a: 'Tarif AE consultant cybersécurité : 280-500€/an (vs 95-220€ dev classique) car risque accru. Cyber-assurance combinée OBLIGATOIRE pour ce profil : +400-800€/an. Hiscox et Generali sont leaders sur ce segment.',
        },
        {
          q: 'Combien coûte une RC Pro pour une agence web ?',
          a: 'Agence web SAS 5-10 personnes (CA 300k-1M€) : 800-1 500€/an RC Pro + 800-1 500€/an cyber. Pack global = 1 600-3 000€/an. Notre courtier ORIAS compare Hiscox, Stello, Generali, Allianz Pro sur ce profil.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro Informatique', slug: 'rc-pro-informatique' },
        { name: 'RC Pro consultant', slug: 'rc-pro-consultant' },
        { name: 'Cyber assurance', slug: 'cyber-assurance' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}

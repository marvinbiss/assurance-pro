/**
 * Prix — "prix assurance rc pro" (300 vol, KD 4, CPC 250€)
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
const SLUG = 'prix/assurance-rc-pro'
const TITLE = 'Prix Assurance RC Pro — Tarifs 2026 par profil et activité'
const TAGLINE =
  'Prix assurance RC Pro 2026 vérifiés par profil. AE 95-450€/an, SARL 350-1500€/an, SAS PME 1200-2500€/an. Hiscox best price global.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Prix assurance RC Pro 2026 : AE 95-450€/an, SARL 350-1500€/an, SAS PME 1200-2500€/an. 5 assureurs comparés. Hiscox best price marché.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Prix assurance RC Pro 2026 vérifiés par profil (statut juridique × activité × CA). Données basées sur 1 000+ devis traités. Hiscox = best price global services intellectuels (AE). Allianz Pro / MMA / AXA Pro pour SARL/SAS PME."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💰',
          title: 'Dès 95€/an Hiscox',
          desc: 'AE services intellectuels (consultant, IT, designer)',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro',
        },
        { icon: '📊', title: 'Tarifs vérifiés 2026', desc: 'Données 1 000+ devis réels traités' },
        {
          icon: '💼',
          title: 'Tous statuts juridiques',
          desc: 'AE, EI, EURL, SARL, SASU, SAS, profession libérale',
        },
      ]}
      sections={[
        {
          h2: 'Prix RC Pro par statut juridique 2026',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur (AE)</strong> services intellectuels : 95-220€/an (Hiscox
                best)
              </li>
              <li>
                <strong>AE BTP</strong> (+ décennale) : 250-450€/an
              </li>
              <li>
                <strong>EI services</strong> CA &lt; 80k€ : 150-300€/an
              </li>
              <li>
                <strong>EURL services</strong> CA 80-200k€ : 350-700€/an
              </li>
              <li>
                <strong>SASU services</strong> CA &lt; 100k€ : 350-550€/an
              </li>
              <li>
                <strong>SARL services</strong> CA 100-300k€ : 600-1 200€/an
              </li>
              <li>
                <strong>SAS PME services</strong> CA 300k-1M€ : 1 200-2 500€/an
              </li>
              <li>
                <strong>SAS grosse PME</strong> CA &gt; 1M€ : 2 500-8 000€/an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Prix RC Pro par activité 2026',
          body: (
            <ul>
              <li>
                <strong>Consultant management</strong> : Hiscox 95-220€/an AE
              </li>
              <li>
                <strong>Freelance dev / IT</strong> : Hiscox 95-200€/an AE
              </li>
              <li>
                <strong>Designer / photographe</strong> : Hiscox 120-250€/an AE
              </li>
              <li>
                <strong>Coach / formateur</strong> : Allianz 150-350€/an AE
              </li>
              <li>
                <strong>Coach sportif</strong> : Allianz 220-400€/an AE
              </li>
              <li>
                <strong>Esthéticienne</strong> : Allianz 180-350€/an AE
              </li>
              <li>
                <strong>Agent immobilier</strong> : 350-1 800€/an (Hoguet)
              </li>
              <li>
                <strong>Médical libéral</strong> : 800-2 500€/an (réglementaire)
              </li>
              <li>
                <strong>Avocat</strong> : 500-1 500€/an (Ordre)
              </li>
              <li>
                <strong>Architecte DPLG</strong> : 2 500-5 000€/an + décennale
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel est le prix RC Pro le moins cher ?',
          a: 'Hiscox 95€/an pour AE services intellectuels CA &lt; 30k€ (plafond 1M€, postériorité 10 ans). Stello 90€/an digital pure. Best prices marché vérifiés 2026.',
        },
        {
          q: 'Prix RC Pro SARL services PME ?',
          a: 'SARL services CA 200-500k€ : 800-1 500€/an chez Allianz Pro, MMA Pro ou Hiscox. Plafond 2M€ standard recommandé. Cyber-assurance combinée +500-1500€/an si activité IT/digital.',
        },
        {
          q: 'Comment réduire prix RC Pro ?',
          a: '6 leviers : 1) Comparer 5 assureurs (-20-30%). 2) Augmenter franchise (-15-20%). 3) Plafond ajusté (-10-20%). 4) Pack multi-contrats (-10-15%). 5) Paiement annuel (-3-7%). 6) Souscription en ligne (-10-15%). Cumul -30-50%.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Prix RC Pro', slug: 'prix/rc-pro-prix' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}

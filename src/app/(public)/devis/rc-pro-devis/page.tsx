/**
 * Devis — "rc pro devis" (150 vol, KD 21, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/rc-pro-devis'
const TITLE = 'RC Pro Devis — Tarifs détaillés 2026 par profil et assureur'
const TAGLINE =
  'Tarifs RC Pro détaillés 2026 par profil (AE/SARL/SAS) et par assureur. Hiscox / Stello / Allianz / MMA / AXA — fourchettes précises et devis express.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro devis : tarifs précis 2026 par activité + statut. Hiscox 95€/an services AE, Allianz 280€/an SARL services, MMA 700€/an SAS PME. Comparatif honnête.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarifs RC Pro détaillés 2026 par profil et par assureur : cette page liste les fourchettes précises observées pour chaque combinaison activité × statut juridique × CA, basées sur l'analyse de 1 000+ devis traités par notre courtier ORIAS partenaire. Idéal pour estimer votre budget avant de demander un devis personnalisé."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '📊',
          title: 'Tarifs vérifiés 2026',
          desc: 'Fourchettes basées sur 1 000+ devis réels traités',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'Hiscox + Stello + Allianz Pro + MMA Pro + AXA Pro',
        },
        {
          icon: '💼',
          title: 'Tous profils couverts',
          desc: 'AE, EI, EURL, SARL, SASU, SAS, profession libérale',
        },
        {
          icon: '⚡',
          title: 'Devis express 30 min',
          desc: 'Demande personnalisée + retour email rapide',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro AE (auto-entrepreneur) 2026',
          body: (
            <ul>
              <li>
                <strong>Consultant / freelance IT</strong> CA &lt; 30k€ : 95-150€/an Hiscox,
                90-140€/an Stello
              </li>
              <li>
                <strong>Consultant senior</strong> CA 50-80k€ : 150-220€/an Hiscox, 200-300€/an
                Allianz Pro
              </li>
              <li>
                <strong>Designer / photographe</strong> : 120-250€/an
              </li>
              <li>
                <strong>Coach / formateur</strong> : 150-350€/an
              </li>
              <li>
                <strong>Coach sportif</strong> : 220-400€/an (risque corporel)
              </li>
              <li>
                <strong>Esthéticienne à domicile</strong> : 180-350€/an
              </li>
              <li>
                <strong>BTP AE (+ décennale obligatoire)</strong> : 250-450€/an RC Pro + 950-3
                500€/an décennale selon métier
              </li>
              <li>
                <strong>VTC AE</strong> : 280-450€/an (contrat 2-en-1 Stello/Wakam)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro SARL/SAS/SASU 2026',
          body: (
            <ul>
              <li>
                <strong>SASU services intellectuels CA &lt; 100k€</strong> : 350-550€/an Hiscox
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : 600-1 200€/an Allianz/MMA
              </li>
              <li>
                <strong>SAS PME services CA 300k-1M€</strong> : 1 200-2 500€/an Allianz Pro
              </li>
              <li>
                <strong>SARL e-commerce CA 200-500k€</strong> : 800-1 800€/an Allianz
              </li>
              <li>
                <strong>SARL BTP 3 salariés</strong> : 600-1 200€/an RC Pro + 2 200-4 500€/an
                décennale
              </li>
              <li>
                <strong>SAS BTP PME 10 salariés</strong> : 2 500-5 000€/an RC Pro + 5 500-12 000€/an
                décennale
              </li>
              <li>
                <strong>SARL restauration TPE</strong> : 1 200-2 500€/an (RC Pro + multirisque)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro professions réglementées 2026',
          body: (
            <ul>
              <li>
                <strong>Médecin généraliste libéral</strong> : 800-1 500€/an (réglementaire)
              </li>
              <li>
                <strong>Infirmier libéral</strong> : 250-500€/an
              </li>
              <li>
                <strong>Kinésithérapeute</strong> : 400-800€/an
              </li>
              <li>
                <strong>Avocat collaborateur</strong> : 500-1 200€/an
              </li>
              <li>
                <strong>Avocat associé</strong> : 1 200-3 500€/an
              </li>
              <li>
                <strong>Notaire</strong> : 2 000-8 000€/an (haut plafond ordre)
              </li>
              <li>
                <strong>Expert-comptable</strong> : 1 500-5 000€/an
              </li>
              <li>
                <strong>Agent immobilier Carte T</strong> : 350-1 800€/an (Hoguet)
              </li>
              <li>
                <strong>Architecte DPLG</strong> : 2 500-5 000€/an (+ décennale 2 500-5 000€/an)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment estimer mon devis RC Pro précis ?',
          a: 'Demande de devis personnalisé via notre formulaire (5 min). Notre courtier ORIAS compare 5 assureurs et envoie tableau récapitulatif par email sous 30 min ouvrées. 100% gratuit sans engagement.',
        },
        {
          q: 'Pourquoi tarifs varient autant entre assureurs ?',
          a: 'Différences de positionnement : Hiscox spécialiste services intellectuels (best price ce segment). April Pro leader BTP. Allianz Pro couverture la plus large. MMA équilibré multi-secteurs. AXA Pro premium. Pour profil équivalent, écart 30-50% entre best/most expensive.',
        },
        {
          q: 'Tarifs incluent-ils la cyber-assurance ?',
          a: 'NON par défaut. Les tarifs RC Pro listés sont &quot;RC Pro pure&quot;. Cyber-assurance combinée : +150-2 000€/an selon profil. Recommandée fortement si activité IT/digital/données client.',
        },
        {
          q: 'Comment réduire mon devis RC Pro ?',
          a: '6 leviers : 1) Comparer 5 assureurs (-20-30%). 2) Augmenter franchise (-15-20%). 3) Réduire plafond si sur-assuré (-10-20%). 4) Pack multi-contrats (-10-15%). 5) Paiement annuel (-3-7%). 6) Souscription en ligne directe (-10-15%). Cumul : -30-50% sur prime totale.',
        },
      ]}
      relatedMetiers={[
        { name: 'Devis RC Pro (vue globale)', slug: 'devis/rc-pro' },
        { name: 'Devis assurance RC Pro', slug: 'devis/assurance-rc-pro' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}

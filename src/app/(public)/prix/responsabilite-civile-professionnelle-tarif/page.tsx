/**
 * Prix — "responsabilité civile professionnelle tarif" (450 vol, KD 0, CPC 200€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix/responsabilite-civile-professionnelle-tarif'
const TITLE = 'Tarif Responsabilité Civile Professionnelle — Prix 2026 par activité'
const TAGLINE =
  'Tarifs RC Pro 2026 détaillés par activité (services, BTP, médical, immobilier) et statut juridique. Hiscox 95€/an best AE, MMA 600€/an SARL PME.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Tarif RC Pro 2026 : AE services 95-220€/an, AE BTP 250-450€/an, SARL 350-1500€/an, médical 800-2500€/an. Comparatif 5 assureurs détaillé.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarif Responsabilité Civile Professionnelle 2026 détaillé : prix précis par activité, statut juridique et CA. Données vérifiées sur 1 000+ devis traités par notre courtier ORIAS partenaire. Idéal pour estimer votre budget avant demande de devis personnalisé."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '📊',
          title: 'Tarifs vérifiés 2026',
          desc: '1 000+ devis réels traités — fourchettes précises',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro',
        },
        {
          icon: '💼',
          title: 'Tous statuts',
          desc: 'AE, EI, EURL, SARL, SASU, SAS, profession libérale',
        },
        { icon: '💰', title: 'Dès 95€/an', desc: 'Best price Hiscox AE services intellectuels' },
      ]}
      sections={[
        {
          h2: 'Tarif RC Pro par statut et activité 2026',
          body: (
            <ul>
              <li>
                <strong>AE services intellectuels</strong> (consultant, IT, designer) : 95-220€/an
              </li>
              <li>
                <strong>AE coaching/formation</strong> : 150-300€/an
              </li>
              <li>
                <strong>AE esthétique/coiffure à domicile</strong> : 180-350€/an
              </li>
              <li>
                <strong>AE BTP</strong> (+ décennale obligatoire) : 250-450€/an
              </li>
              <li>
                <strong>SASU services CA &lt; 100k€</strong> : 350-550€/an
              </li>
              <li>
                <strong>SARL services CA 100-300k€</strong> : 600-1 200€/an
              </li>
              <li>
                <strong>SAS PME CA 300k-1M€</strong> : 1 200-2 500€/an
              </li>
              <li>
                <strong>Agent immobilier Carte T</strong> : 350-1 800€/an (Hoguet)
              </li>
              <li>
                <strong>Médecin libéral</strong> : 800-1 500€/an
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
        {
          h2: 'Facteurs qui influent sur le tarif',
          body: (
            <ul>
              <li>
                <strong>Activité précise</strong> : services intellectuels (best price) vs activités
                à risque (médical, financier)
              </li>
              <li>
                <strong>CA déclaré</strong> : prime augmente proportionnellement
              </li>
              <li>
                <strong>Statut juridique</strong> : AE moins cher que SARL/SAS pour activité
                équivalente
              </li>
              <li>
                <strong>Plafond choisi</strong> : 500k€-10M€ — impact -15-30% selon
              </li>
              <li>
                <strong>Franchise</strong> : 300-1500€ standard — impact -10-20%
              </li>
              <li>
                <strong>Ancienneté + sinistralité</strong> : 3+ ans sans sinistre = -10-15%
              </li>
              <li>
                <strong>Cyber-assurance combinée</strong> : +150-2000€/an si activité IT/digital
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif assureurs par profil',
          body: (
            <ul>
              <li>
                <strong>AE services intellectuels</strong> : 🥇 Hiscox 95-220€/an • Stello
                90-200€/an
              </li>
              <li>
                <strong>AE BTP</strong> : 🥇 April Pro 250-450€/an (en + décennale)
              </li>
              <li>
                <strong>SARL services</strong> : Allianz Pro 350-900€/an • MMA Pro 380-1000€/an
              </li>
              <li>
                <strong>SAS PME</strong> : Allianz Pro 1200-2500€/an • MMA Pro 1500-2800€/an
              </li>
              <li>
                <strong>Profession libérale médicale</strong> : assureurs spécialisés Ordre dédié
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif RC Pro AE freelance débutant ?',
          a: 'AE services intellectuels (consultant, IT, designer) CA &lt; 50k€ : 95-150€/an chez Hiscox ou Stello (best price). Plafond 500k€-1M€. Postériorité 5-10 ans selon assureur.',
        },
        {
          q: 'Tarif RC Pro pour SARL services 300k€ CA ?',
          a: 'SARL services CA 200-300k€ : 600-1 200€/an chez Hiscox, Allianz Pro ou MMA. Plafond 1-2M€ recommandé. Cyber-assurance combinée : +500-1500€/an si activité IT/digital.',
        },
        {
          q: 'Comment réduire mon tarif RC Pro ?',
          a: '6 leviers : 1) Comparer 5 assureurs (-20-30%). 2) Augmenter franchise (-15-20%). 3) Réduire plafond si sur-assuré (-10-20%). 4) Pack multi-contrats (-10-15%). 5) Paiement annuel (-3-7%). 6) Souscription en ligne (-10-15%). Cumul : -30-50%.',
        },
        {
          q: 'Tarif décès cher pour profession à risque ?',
          a: 'Activités à risque (cybersécurité, financier réglementé, médical spécialisé) : prime ×2-5 vs services standard. Plafonds 5-10M€ requis. Hiscox et Beazley spécialistes. Notre courtier ORIAS oriente selon profil exact.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Prix RC Pro (variante)', slug: 'prix/rc-pro-prix' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}

/**
 * Prix — "assurance rc pro tarif" (250 vol, KD 5, CPC 250€)
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
const SLUG = 'prix/assurance-rc-pro-tarif'
const TITLE = 'Assurance RC Pro Tarif — Barème détaillé 2026 par option'
const TAGLINE =
  'Barème tarif assurance RC Pro 2026 : tarif de base + options (cyber, juridique, dommages aux biens) + ajustements (franchise, plafond, postériorité).'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Barème tarif RC Pro 2026 décomposé : tarif base + options (cyber +15-30%, juridique +5%, dommages biens +20%) + ajustements (franchise -15%, plafond +30%).',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Barème détaillé du tarif assurance RC Pro 2026 : structure de prix décomposée en tarif de base (déterminé par profil) + options à la carte + ajustements paramétriques. Cette page explique combien coûte chaque option (cyber, protection juridique, dommages aux biens) et comment chaque levier (franchise, plafond, postériorité) modifie le tarif final."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🧮',
          title: 'Tarif décomposé',
          desc: 'Base + options + ajustements expliqués ligne par ligne',
        },
        {
          icon: '➕',
          title: 'Coût options précis',
          desc: 'Cyber +15-30%, juridique +5%, dommages biens +20%',
        },
        {
          icon: '🎚️',
          title: 'Leviers ajustement',
          desc: 'Franchise -15%, plafond +30%, postériorité +15%',
        },
        {
          icon: '🎯',
          title: 'Tarif optimal personnel',
          desc: 'Configurer la combinaison parfaite pour votre profil',
        },
      ]}
      sections={[
        {
          h2: 'Décomposition du tarif RC Pro',
          body: (
            <ol>
              <li>
                <strong>Tarif de base</strong> (déterminé par 4 facteurs) :
                <ul>
                  <li>Activité (services/BTP/libéral) : poids 40%</li>
                  <li>Statut juridique (AE/SARL/SAS) : poids 25%</li>
                  <li>Chiffre d&apos;affaires : poids 25%</li>
                  <li>Antécédents sinistres : poids 10%</li>
                </ul>
              </li>
              <li>
                <strong>Options à la carte</strong> :
                <ul>
                  <li>
                    Cyber-assurance : <strong>+15-30%</strong> (essentielle IT)
                  </li>
                  <li>
                    Protection juridique : <strong>+5%</strong> (souvent incluse Hiscox)
                  </li>
                  <li>
                    Dommages aux biens loués : <strong>+20%</strong>
                  </li>
                  <li>
                    Vol matériel professionnel : <strong>+10-15%</strong>
                  </li>
                  <li>
                    Perte d&apos;exploitation : <strong>+20-30%</strong>
                  </li>
                  <li>
                    Extension internationale : <strong>+25-40%</strong> (UE/monde)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ajustements paramétriques</strong> :
                <ul>
                  <li>
                    Franchise +300 à +1500€ : <strong>-15-20%</strong>
                  </li>
                  <li>
                    Plafond 500k→1M€ : <strong>+15%</strong>
                  </li>
                  <li>
                    Plafond 1M→2M€ : <strong>+25-30%</strong>
                  </li>
                  <li>
                    Postériorité 5→10 ans : <strong>+15%</strong>
                  </li>
                  <li>
                    Paiement annuel vs mensuel : <strong>-3-7%</strong>
                  </li>
                </ul>
              </li>
            </ol>
          ),
        },
        {
          h2: 'Exemples calcul tarif AE consultant IT',
          body: (
            <ol>
              <li>
                <strong>Tarif base Hiscox</strong> : 120€/an (AE services IT, CA 50k€, sans
                sinistre)
              </li>
              <li>
                + Cyber-assurance : +30€ → <strong>150€/an</strong>
              </li>
              <li>
                + Plafond porté 1M→2M€ : +37€ → <strong>187€/an</strong>
              </li>
              <li>
                + Postériorité 10 ans Hiscox (inclus) : +0€ → <strong>187€/an</strong>
              </li>
              <li>
                − Franchise +500€ : -28€ → <strong>159€/an</strong>
              </li>
              <li>
                − Paiement annuel : -10€ → <strong>149€/an final</strong>
              </li>
            </ol>
          ),
        },
        {
          h2: 'Exemples calcul tarif SARL services 200k€ CA',
          body: (
            <ol>
              <li>
                <strong>Tarif base Allianz Pro</strong> : 700€/an (SARL services CA 200k€)
              </li>
              <li>
                + Cyber-assurance : +175€ → <strong>875€/an</strong>
              </li>
              <li>
                + Protection juridique : +35€ → <strong>910€/an</strong>
              </li>
              <li>
                + Plafond 1M€ standard (inclus) : +0€ → <strong>910€/an</strong>
              </li>
              <li>
                − Franchise +800€ : -136€ → <strong>774€/an</strong>
              </li>
              <li>
                − Pack multi-contrats Allianz : -116€ → <strong>658€/an final</strong>
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment optimiser mon tarif RC Pro ?',
          a: '1) Comparer 3-5 assureurs (-20-30% naturel). 2) Augmenter franchise (-15-20%). 3) Ajuster plafond à votre risque réel (-10-15% si sur-assuré). 4) Pack multi-contrats même assureur (-10-15%). 5) Payer annuel (-3-7%). Total optimisable : -40-50% sur tarif initial.',
        },
        {
          q: 'Quelles options sont vraiment indispensables ?',
          a: 'Pour IT/services digitaux : cyber-assurance (+15-30%) INDISPENSABLE. Pour libéral réglementé : protection juridique (+5%) recommandée. Pour BTP : décennale OBLIGATOIRE en plus. Pour autres : RC Pro de base + protection juridique suffit souvent.',
        },
        {
          q: 'Plafond 1M€ ou 2M€ ?',
          a: 'Dépend de votre risque réel : AE freelance services CA < 100k€ → 500k-1M€ suffit. SARL/SAS services > 500k€ CA → 1-2M€ recommandé. SAS PME > 1M€ CA ou BTP gros chantiers → 2-5M€. Sur-assurance coûte cher inutilement.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix assurance RC Pro', slug: 'prix/assurance-rc-pro-prix' },
        { name: 'Prix RC Pro (variante)', slug: 'prix/rc-pro-prix' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Assurance RC Pro (variante)', slug: 'prix/assurance-rc-pro' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

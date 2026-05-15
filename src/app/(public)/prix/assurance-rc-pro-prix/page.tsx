/**
 * Prix — "assurance rc pro prix" (250 vol, KD 5, CPC 250€)
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
const SLUG = 'prix/assurance-rc-pro-prix'
const TITLE = 'Assurance RC Pro Prix — Comparatif tarifs 2026 par activité'
const TAGLINE =
  'Comparatif détaillé des prix assurance RC Pro 2026. Hiscox 95€/an AE services. Allianz 280€/an SARL. MMA 600€/an PME. 5 assureurs en parallèle.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Prix RC Pro comparatif 2026 : 5 assureurs en parallèle (Hiscox, Stello, Allianz Pro, MMA, AXA). Tarifs AE 95€, SARL 350€, SAS 1200€/an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comparatif détaillé des prix RC Pro 2026 entre les 5 assureurs leaders : Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro. Cette page met en regard les tarifs précis observés pour chaque combinaison activité × statut, vous permettant d'identifier rapidement le best price pour votre profil."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🆚',
          title: '5 assureurs en parallèle',
          desc: 'Comparatif direct Hiscox vs Stello vs Allianz vs MMA vs AXA',
        },
        {
          icon: '🥇',
          title: 'Best price identifié',
          desc: 'Pour chaque profil, indication assureur le moins cher',
        },
        {
          icon: '📊',
          title: 'Données 1 000+ devis 2026',
          desc: 'Tarifs vérifiés sur cas réels, pas estimations',
        },
        {
          icon: '⚡',
          title: 'Devis personnalisé 5 min',
          desc: 'Précision finale via formulaire courtier ORIAS',
        },
      ]}
      sections={[
        {
          h2: 'Comparatif prix par activité AE',
          body: (
            <ul>
              <li>
                <strong>Consultant freelance services</strong> :
                <ul>
                  <li>🥇 Hiscox 95-180€/an • 🥈 Stello 90-170€/an</li>
                  <li>Allianz Pro 180-280€/an • MMA Pro 250-380€/an</li>
                </ul>
              </li>
              <li>
                <strong>Designer / photographe</strong> :
                <ul>
                  <li>🥇 Hiscox 120-220€/an • 🥈 Stello 110-200€/an</li>
                  <li>Allianz Pro 200-320€/an</li>
                </ul>
              </li>
              <li>
                <strong>Coach / formateur</strong> :
                <ul>
                  <li>🥇 Allianz Pro 150-300€/an (couverture corporelle adaptée)</li>
                  <li>Hiscox 180-320€/an</li>
                </ul>
              </li>
              <li>
                <strong>Coach sportif</strong> :
                <ul>
                  <li>🥇 Allianz Pro 220-380€/an (couverture corporelle dédiée)</li>
                  <li>MMA Pro 250-400€/an</li>
                </ul>
              </li>
              <li>
                <strong>BTP en + décennale</strong> :
                <ul>
                  <li>🥇 April Pro BTP 250-450€/an RC Pro</li>
                  <li>SMABTP 350-550€/an</li>
                </ul>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif prix par activité SARL/SAS',
          body: (
            <ul>
              <li>
                <strong>SARL services CA 100-300k€</strong> :
                <ul>
                  <li>🥇 Hiscox 600-1 000€/an • Allianz Pro 700-1 200€/an</li>
                  <li>MMA Pro 750-1 200€/an • AXA Pro 900-1 500€/an</li>
                </ul>
              </li>
              <li>
                <strong>SAS PME services CA 500k-1M€</strong> :
                <ul>
                  <li>🥇 Allianz Pro 1 500-2 500€/an • Hiscox 1 600-2 800€/an</li>
                  <li>MMA Pro 1 600-2 600€/an • AXA Pro 1 900-3 200€/an</li>
                </ul>
              </li>
              <li>
                <strong>SARL BTP 5 salariés</strong> :
                <ul>
                  <li>🥇 April Pro BTP 600-1 200€/an RC Pro (+ décennale)</li>
                  <li>SMABTP 750-1 400€/an</li>
                  <li>MMA Pro BTP 800-1 500€/an</li>
                </ul>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Critères qui différencient les prix',
          body: (
            <ol>
              <li>
                <strong>Positionnement assureur</strong> : Hiscox spé services (best price), April
                Pro spé BTP, Allianz Pro multi-secteurs
              </li>
              <li>
                <strong>Modèle de distribution</strong> : digital pure (Hiscox/Stello) -15% vs
                agences traditionnelles
              </li>
              <li>
                <strong>Coût d&apos;exploitation</strong> : challengers Stello plus efficients que
                groupes traditionnels
              </li>
              <li>
                <strong>Sinistralité passée</strong> : assureur ajuste prime selon ratio
                sinistre/prime historique
              </li>
              <li>
                <strong>Plafond proposé</strong> : 1M€ standard, 2-3M€ +20-30%
              </li>
              <li>
                <strong>Postériorité</strong> : 10 ans Hiscox (premium), 5 ans autres (standard)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Hiscox vraiment le moins cher partout ?',
          a: 'NON. Hiscox best price AE services intellectuels uniquement. Pour AE BTP : April Pro best. Pour SARL services : Allianz Pro/MMA souvent mieux placés. Pour SAS PME : varie selon profil. Comparer toujours 3-5 assureurs.',
        },
        {
          q: 'Prix Stello vs Hiscox : qui gagne ?',
          a: 'Très proches sur AE services intellectuels (95-220€ Hiscox vs 90-200€ Stello). Hiscox gagne sur postériorité (10 ans vs 5 ans). Stello gagne sur expérience digital pure et app mobile. À profil égal : pile ou face selon préférence.',
        },
        {
          q: 'Comment trouver le best price pour mon profil ?',
          a: 'Notre courtier ORIAS compare les 5 assureurs en parallèle pour votre profil exact. Devis comparatif gratuit en 5 min — tableau récapitulatif avec best price identifié. Aucun engagement.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix assurance RC Pro (variante)', slug: 'prix/assurance-rc-pro' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Prix RC Pro', slug: 'prix/rc-pro-prix' },
        { name: 'Assurance RC Pro tarif', slug: 'prix/assurance-rc-pro-tarif' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

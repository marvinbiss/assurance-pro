/**
 * Pilier — Décennale peintre-plaquiste (Couche B)
 * KW Ahrefs : "décennale peintre" 80 vol KD 0 + "plaquiste" 60 vol → 140 vol/m
 * Sinistralité AQC SYCODÉS 2024 : 3,1% (la plus faible BTP)
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/peintre-plaquiste'
const TITLE = 'Décennale peintre-plaquiste 2026 — Tarifs 480-760€/an AE (les plus bas du BTP)'
const TAGLINE =
  'La décennale obligatoire pour peintre-plaquiste : couverture spécifique défauts cloisons sèches, joints, isolation phonique. Sinistralité AQC 3,1% (la plus faible BTP).'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'Décennale peintre-plaquiste 2026 : OBLIGATOIRE Loi Spinetta. Couverture défauts cloisons sèches BA13/BA15, joints lisses/jeux, isolation thermique/phonique cloisons. Sinistralité AQC 3,1% (la plus faible). Tarifs 480-760€/an AE, 4 800-9 200€/an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale peintre-plaquiste est OBLIGATOIRE pour tout artisan peintre, plaquiste ou poseur de cloisons sèches en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 3,1% — LA PLUS FAIBLE du BTP, ce qui explique des tarifs très compétitifs (480-760 €/an pour AE). Sinistres principaux : défauts cloisons sèches BA13/BA15 (jeux, fissures jonctions), défauts d'isolation thermique/phonique entre cloisons. Tarifs 2026 : 480-760 €/an pour AE (CA <50k€), 4 800-9 200 €/an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta + DTU 25.41 (plâtrerie) + DTU 59.1 (peinture)"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Cloisons + finitions = ouvrage soumis décennale 10 ans. Sanctions : 75 000 € + 6 mois prison',
        },
        {
          icon: '✅',
          title: 'Sinistralité 3,1% (mini BTP)',
          desc: 'La plus faible du BTP — tarifs les plus compétitifs (480-760€ AE)',
        },
        {
          icon: '🧱',
          title: 'BA13 + isolation cloisons',
          desc: 'Couverture spécifique défauts plaquage, joints lisses/jeux, isolation phonique/thermique',
        },
        {
          icon: '💰',
          title: '480-760 €/an AE',
          desc: 'AE peintre-plaquiste CA <50k€. Tarif le plus bas du BTP. SARL 5 sal : 4 800-9 200€/an',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité peintre-plaquiste 2024',
          body: (
            <div>
              <p>Top 4 sinistres décennaux peintre-plaquiste :</p>
              <ul>
                <li>
                  <strong>Cloisons BA13 défaillantes (38%)</strong> — fissures jonctions
                  plafond/mur, déformation
                </li>
                <li>
                  <strong>Joints visibles (24%)</strong> — bandes mal posées, joints qui craquellent
                  à 1 an
                </li>
                <li>
                  <strong>Isolation thermique/phonique défaillante (20%)</strong> — pont thermique
                  cloisons
                </li>
                <li>
                  <strong>Peinture qui s&apos;écaille structurellement (12%)</strong> — défaut
                  sous-couche, humidité non traitée
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 8 200 € (le plus faible BTP). C&apos;est ce
                qui explique les tarifs compétitifs — peintre-plaquiste = métier le moins risqué
                décennalement.
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <a
                  href="/outils/calculateur-tarif-decennale"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif décennale peintre
                </a>
              </li>
              <li>
                <a href="/outils/devis-assurance-decennale" className="text-primary-600 underline">
                  Devis officiel ORIAS sous 24h
                </a>
              </li>
              <li>
                <a href="/assurance-decennale" className="text-primary-600 underline">
                  Pilier décennale BTP
                </a>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale peintre OBLIGATOIRE ?',
          a: "OUI. Loi Spinetta s'applique à tous les artisans BTP, y compris peintres et plaquistes. Même si la sinistralité est faible (3,1%), l'obligation est légale. Sanctions absence : 75 000 € + 6 mois prison + interdiction d'exercer.",
        },
        {
          q: 'Peinture décorative seulement : décennale ?',
          a: "Si vous faites UNIQUEMENT de la peinture décorative en sous-traitance d'un autre artisan (qui assume la décennale), vous pouvez bénéficier d'une décennale réduite ou être en sous-traitance déclarée. Mais 99% des peintres font finition + reprise enduits = ouvrage soumis décennale. Notre cabinet ORIAS conseille systématiquement la prise de décennale.",
        },
        {
          q: 'Tarif décennale peintre-plaquiste 2026 ?',
          a: 'AE peintre-plaquiste : 480-760 €/an (le plus bas du BTP). EURL/SASU : 580-920 €/an. SARL 5 salariés : 4 800-9 200 €/an. SAS 10+ salariés : 9 200-14 800 €/an. Bonus fidélité après 5 ans : -7%.',
        },
        {
          q: 'Plaquiste pur (sans peinture) : tarif ?',
          a: "Légèrement supérieur : 540-820 €/an AE. Le plaquiste pur prend plus de risques structurels (cloisons porteuses ou semi-porteuses). Si vous faites les 2 (peinture + plaquiste), prenez la décennale 'peintre-plaquiste' standard à 480-760€.",
        },
      ]}
    />
  )
}

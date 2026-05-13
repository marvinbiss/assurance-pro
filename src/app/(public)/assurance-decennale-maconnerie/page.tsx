/**
 * Pilier — "assurance décennale maçonnerie" (90 vol, KD 0, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-maconnerie'
const TITLE = 'Assurance Décennale Maçonnerie — Maçon, traditionnel, béton armé'
const TAGLINE =
  'Le maçon (traditionnel, béton armé, pierre sèche) est soumis à la décennale. Tarif AE 1 800-2 800€/an, SARL 2 500-5 000€/an. 12% sinistralité (AQC).'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale maçonnerie : 3 spécialisations (traditionnel, béton armé, pierre sèche). AE 1 800-2 800€/an, SARL 2 500-5 000€/an. April Pro, SMABTP, Allianz.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le maçon — qu'il pratique la maçonnerie traditionnelle (parpaings, briques), le béton armé (coffrage + ferraillage), ou la pierre sèche (rare et spécialisé) — est soumis à la décennale (Loi Spinetta). La maçonnerie représente 12% des sinistres décennaux BTP, avec des sinistres typiques : fissures structurelles, défauts de fondations, mauvais dimensionnement poutres. Cette page détaille les 3 spécialisations, les tarifs et les leviers de réduction de prime."
      legalReference="Loi Spinetta + art. 1792 Code civil + DTU 20.1 (maçonnerie) + DTU 21 (béton armé)"
      isObligatoire={true}
      benefits={[
        {
          icon: '🧱',
          title: 'Maçon traditionnel',
          desc: 'Parpaings, briques, agglos — méthode classique',
        },
        {
          icon: '🏗️',
          title: 'Maçon béton armé',
          desc: 'Coffrage + ferraillage + coulage — DTU 21 norme',
        },
        {
          icon: '🪨',
          title: 'Maçon pierre sèche',
          desc: 'Spécialisation rare, restauration patrimoine',
        },
        {
          icon: '💰',
          title: '1 800-5 000€/an',
          desc: 'AE 1 800-2 800€ • SARL 2 500-5 000€ • SAS BTP PME 4 500-9 000€',
        },
      ]}
      sections={[
        {
          h2: 'Les 3 spécialisations maçonnerie',
          body: (
            <ul>
              <li>
                <strong>Maçon traditionnel</strong> (le plus fréquent) : parpaings, briques, agglos.
                DTU 20.1. Tarif AE : 1 800-2 500€/an.
              </li>
              <li>
                <strong>Maçon béton armé</strong> : coffrage métallique/bois + ferraillage +
                coulage. Norme DTU 21. Plus technique. Tarif AE : 2 200-2 800€/an.
              </li>
              <li>
                <strong>Maçon pierre sèche</strong> : spécialiste restauration patrimoine, murs de
                soutènement traditionnels. Tarif AE : 2 000-2 500€/an (peu de chantiers, risque
                modéré).
              </li>
              <li>
                <strong>Maçon-coffreur béton armé spécialisé</strong> : combine les 3. Tarif AE : 2
                500-3 500€/an. Qualifications Qualibat 2151+.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistres typiques maçonnerie',
          body: (
            <ul>
              <li>
                <strong>Fissures structurelles murs porteurs</strong> : mauvais dimensionnement,
                défaut liant. 50-300k€ remise en état.
              </li>
              <li>
                <strong>Affaissement fondations</strong> : étude sol insuffisante, ferraillage
                défaillant. 100k-1M€.
              </li>
              <li>
                <strong>Défaut de planéité dalle</strong> : niveaux non respectés → reprise
                complète. 20-80k€.
              </li>
              <li>
                <strong>Carbonisation béton trop rapide</strong> : conditions météo non respectées →
                résistance insuffisante. 30-150k€.
              </li>
              <li>
                <strong>Mauvaise étanchéité enduit façade</strong> : infiltrations à terme. 15-60k€.
              </li>
              <li>
                <strong>Erreur de cotation</strong> : portage piles, semelles sous-dimensionnées.
                80-500k€.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale maçonnerie 2026',
          body: (
            <ul>
              <li>
                <strong>Maçon traditionnel AE (CA &lt; 80k€)</strong> : 1 800-2 200€/an, plafond
                1-2M€
              </li>
              <li>
                <strong>Maçon béton armé AE</strong> : 2 200-2 800€/an
              </li>
              <li>
                <strong>Maçon pierre sèche AE</strong> : 2 000-2 500€/an (niche restauration)
              </li>
              <li>
                <strong>Maçon-coffreur spécialisé AE</strong> : 2 500-3 500€/an
              </li>
              <li>
                <strong>SARL maçonnerie (1-5 salariés)</strong> : 2 500-4 500€/an, plafond 2-3M€
              </li>
              <li>
                <strong>SARL gros-œuvre complet (5-15 salariés)</strong> : 3 500-7 000€/an
              </li>
              <li>
                <strong>SAS BTP gros-œuvre PME</strong> : 5 500-12 000€/an, plafond 3-5M€
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif décennale maçon auto-entrepreneur 2026 ?',
          a: 'AE maçon traditionnel (CA &lt; 80k€) : 1 800-2 200€/an chez April Pro ou Allianz Pro. AE maçon béton armé : 2 200-2 800€/an. Plafond 1-2M€. Notre courtier ORIAS compare April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP.',
        },
        {
          q: 'Qualifications maçonnerie recommandées pour réduire prime ?',
          a: 'Qualibat 2111 (maçon traditionnel) ou 2151 (béton armé spécialisé) = -5-10% sur prime décennale. CAP/BEP/BP Maçonnerie : reconnaissance compétences. RGE Qualibat pour isolation thermique (ITE/ITI).',
        },
        {
          q: 'La décennale couvre-t-elle les fissures cosmétiques ?',
          a: 'NON. Fissures &lt; 0.2mm sur enduit ou peinture = défaut esthétique → relève parfait achèvement (1 an). Fissures structurelles &gt; 0.2mm sur murs porteurs, dalles ou fondations affectant solidité ouvrage → décennale.',
        },
        {
          q: 'SARL maçonnerie 5 salariés : quel pack assurance ?',
          a: 'Pack recommandé : Décennale (3 500-5 500€/an) + RC Pro BTP (600-900€/an) + Multirisque BTP local (1 200-2 500€/an) + Flotte 3 véhicules (3 000-5 000€/an) = 8 300-13 900€/an total. Remise paquet -15-25% chez April Pro / MMA BTP.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale bâtiment', slug: 'assurance-decennale-batiment' },
        { name: 'Décennale terrassement', slug: 'assurance-decennale-terrassement' },
        { name: 'Décennale obligatoire', slug: 'assurance-decennale-obligatoire' },
      ]}
    />
  )
}

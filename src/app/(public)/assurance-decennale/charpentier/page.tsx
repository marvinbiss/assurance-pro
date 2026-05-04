/**
 * Pilier — Décennale charpentier (Couche B)
 * KW Ahrefs : "décennale charpentier" 60 vol KD 0 + tail "charpente bois" 40 vol → 100+ vol/m
 * Sinistralité AQC SYCODÉS 2024 : 10,1%
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/charpentier'
const TITLE = 'Décennale charpentier 2026 — Tarifs 690-1 320€/an AE (charpente bois/métal)'
const TAGLINE = "La décennale obligatoire pour charpentier : couverture spécifique charpente traditionnelle/industrielle, fermettes, ossature bois, structures porteuses. Sinistralité AQC 10,1%."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description: "Décennale charpentier 2026 : OBLIGATOIRE Loi Spinetta. Couverture charpente traditionnelle/industrielle bois, fermettes, ossature bois (MOB), traitement xylophages, ferrures. Sinistralité AQC 10,1%. Tarifs 690-1 320€/an AE, 7 200-14 800€/an SARL 5 sal.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro="L'assurance décennale charpentier est OBLIGATOIRE pour tout artisan charpentier-bois ou charpentier-métallier en France (Loi Spinetta — art. L. 241-1 C. assur.). Sinistralité AQC SYCODÉS 2024 : 10,1% — 5e métier le plus sinistré du BTP. Sinistres principaux : malfaçons sur charpente traditionnelle (poutres, chevrons, pannes), défauts fermettes industrielles (calcul charges, contreventement), ossature bois (MOB) mal dimensionnée, traitement xylophages insuffisant, ferrures de jonction défaillantes. Tarifs 2026 : 690-1 320 €/an pour AE (CA <50k€), 7 200-14 800 €/an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta + DTU 31.1 (charpente bois) + Eurocode 5 (calcul structures bois)"
      isObligatoire={true}
      benefits={[
        { icon: '⚖️', title: 'OBLIGATION Loi Spinetta', desc: 'Charpente = ouvrage structurel soumis décennale 10 ans. Sanctions : 75 000 € + 6 mois prison' },
        { icon: '🪵', title: 'Charpente bois + MOB', desc: 'Couverture traditionnelle, fermettes industrielles, ossature bois (MOB), poteaux/poutres' },
        { icon: '🔩', title: 'Ferrures + traitement', desc: 'Ferrures jonction métalliques + traitement xylophages (insectes/champignons) obligatoire' },
        { icon: '💰', title: '690-1 320 €/an AE', desc: 'AE charpentier CA <50k€. SARL 5 sal : 7 200-14 800€/an. Tarif majoré +40% vs peintre' },
      ]}
      sections={[
        { h2: 'Sinistralité charpentier 2024',
          body: (<div><p>Top 4 sinistres décennaux charpentier :</p><ul><li><strong>Malfaçons charpente traditionnelle (32%)</strong> — assemblage défaillant, sous-dimensionnement</li><li><strong>Fermettes industrielles défaillantes (28%)</strong> — défaut calcul, contreventement insuffisant</li><li><strong>Traitement xylophages (18%)</strong> — termites, capricornes, mérule non détectés</li><li><strong>MOB ossature bois (16%)</strong> — défaut isolation pare-pluie, infiltrations</li></ul><p className="mt-3 bg-amber-50 border-l-4 border-amber-500 p-3"><strong>Sinistre moyen 2024</strong> : 32 800 € (4e plus élevé BTP après architectes/MdŒ/maçons). Coût élevé car charpente = élément structurel — sinistre = renforcement ou remplacement complet.</p></div>) },
        { h2: 'Pour aller plus loin',
          body: (<ul><li><a href="/outils/calculateur-tarif-decennale" className="text-blue-600 underline">Calculateur tarif décennale charpentier</a></li><li><a href="/outils/devis-assurance-decennale" className="text-blue-600 underline">Devis officiel ORIAS sous 24h</a></li><li><a href="/assurance-decennale/couvreur-zingueur" className="text-blue-600 underline">Décennale couvreur (souvent métier complémentaire)</a></li><li><a href="/assurance-decennale" className="text-blue-600 underline">Pilier décennale BTP</a></li></ul>) },
      ]}
      faq={[
        { q: 'Charpentier-bois ET charpentier-métallier : même décennale ?', a: "Non. Charpentier-bois et charpentier-métallier sont des métiers différents avec sinistralités différentes. Bois : AQC 10,1%, tarif 690-1 320€/an AE. Métal : AQC 7,8%, tarif 540-1 080€/an AE. Si vous faites les 2, prendre une décennale 'charpentier multi-matériaux' (sur-prime +15-25%)." },
        { q: 'MOB (Maison Ossature Bois) : décennale spécifique ?', a: "OUI souvent. La MOB cumule charpente + ossature murs + souvent isolation. Plusieurs assureurs proposent une décennale dédiée 'constructeur MOB' (April Pro Bois, SMABTP MOB). Tarif sur-prime +20-40% vs charpente traditionnelle, mais couverture complète y compris pare-pluie/pare-vapeur." },
        { q: 'Tarif décennale charpentier 2026 ?', a: "AE charpentier-bois (CA <50k€) : 690-1 320 €/an. EURL/SASU : 880-1 580 €/an. SARL 5 salariés : 7 200-14 800 €/an. SAS 10+ salariés : 14 800-24 000 €/an. Variables : type charpente (traditionnelle/MOB/fermettes), zone (région à termites Sud-Ouest +10%)." },
        { q: 'Termites obligatoirement traités ?', a: "OUI dans les zones réglementées (50% du territoire) — arrêté préfectoral termites. Vous devez fournir au maître d'ouvrage un état parasitaire termites datant de moins de 6 mois (loi 1999 + Loi ELAN 2018). Défaut traitement = sinistre couvert décennalement (vice non révélé)." },
      ]}
    />
  )
}

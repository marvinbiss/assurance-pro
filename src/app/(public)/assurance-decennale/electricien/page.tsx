/**
 * Pilier — Décennale électricien BTP (Couche B industrialisée)
 *
 * KW Ahrefs (kw_universe Supabase) :
 * - "assurance décennale electricien" → 150 vol KD 0 CPC 500€ ⭐⭐ (KD ULTRA-FAIBLE)
 * - "décennale électricien" → 80 vol KD 1 CPC 480€
 * - "tarif décennale électricien" → 30 vol
 * - Famille cumulée : ~260 vol/m, ROI ~130k score
 *
 * Sinistralité AQC SYCODÉS 2024 : 5,8% (incendies, courts-circuits, malfaçons tableau)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/electricien'
const TITLE = 'Décennale électricien BTP 2026 — Tarifs 490-880€/an AE'
const TAGLINE =
  'La décennale obligatoire pour électricien BTP : couverture spécifique courts-circuits, incendies tableau, mise aux normes NF C 15-100. Tarifs 2026 négociés.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale électricien BTP 2026 : OBLIGATOIRE Loi Spinetta. Couverture incendies tableau, courts-circuits, défauts NF C 15-100, mise à la terre, domotique. Sinistralité AQC 5,8%. Tarifs 490-880€/an AE, 5 200-11 000€/an SARL 5 sal. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale électricien BTP est OBLIGATOIRE pour tout artisan électricien en France (Loi Spinetta — art. L. 241-1 C. assur.). Elle couvre 10 ans après réception les défauts d'installation électrique (courts-circuits, incendies tableau, défauts conformité NF C 15-100, mauvaise mise à la terre). Sinistralité AQC SYCODÉS 2024 : 5,8% — sinistres lourds car risque incendie majeur (40% des incendies domestiques d'origine électrique). Tarifs 2026 : 490-880 €/an pour un AE (CA <50k€), 5 200-11 000 €/an pour SARL avec 5 salariés."
      legalReference="Loi Spinetta — art. L. 241-1 C. assur. + NF C 15-100 (norme installations électriques)"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'Toute installation électrique = ouvrage soumis à décennale 10 ans. Sanctions absence : 75 000 € + 6 mois prison',
        },
        {
          icon: '🔥',
          title: 'Incendies + courts-circuits',
          desc: 'Couverture top sinistres : tableaux défaillants, surcharges, défauts isolation',
        },
        {
          icon: '⚡',
          title: 'NF C 15-100 + Consuel',
          desc: 'Couverture défauts conformité norme NF C 15-100 + erreur attestation Consuel',
        },
        {
          icon: '💰',
          title: '490-880 €/an AE',
          desc: 'AE électricien CA <50k€. SARL 5 sal : 5 200-11 000€/an. Bonus fidélité -15% après 5 ans',
        },
      ]}
      sections={[
        {
          h2: 'Sinistralité électricien BTP 2024 (AQC SYCODÉS)',
          body: (
            <div>
              <p>Top 4 sinistres décennaux électricien :</p>
              <ul>
                <li>
                  <strong>Incendies tableau électrique (35%)</strong> — défaut serrage borniers,
                  sous-dimensionnement
                </li>
                <li>
                  <strong>Courts-circuits + déclenchement disjoncteur (28%)</strong> — défaut
                  isolation
                </li>
                <li>
                  <strong>Défauts NF C 15-100 (20%)</strong> — non-conformité prises salle de bain,
                  hauteur prises
                </li>
                <li>
                  <strong>Mauvaise mise à la terre (12%)</strong> — résistance trop élevée
                </li>
              </ul>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen 2024</strong> : 22 800 € (vs 8 200 € peintre). Coût élevé car
                incendie = pertes immobilières + indemnisation sinistrés.
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <Link
                    href="/outils/calculateur-tarif-decennale"
                    className="text-primary-600 underline"
                  >
                    Calculateur tarif décennale électricien
                  </Link>{' '}
                  — estimation 30 secondes
                </li>
                <li>
                  <Link
                    href="/outils/devis-assurance-decennale"
                    className="text-primary-600 underline"
                  >
                    Devis officiel ORIAS sous 24h
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP — 37 métiers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/photovoltaique"
                    className="text-primary-600 underline"
                  >
                    Décennale photovoltaïque RGE
                  </Link>{' '}
                  (sous-segment électricien spécialisé)
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'Décennale électricien obligatoire pour AE ?',
          a: "OUI absolument. Loi Spinetta + NF C 15-100. Toute installation électrique fixe (du tableau aux prises) = ouvrage soumis à décennale. Sanctions absence : 75 000 € + 6 mois prison + interdiction d'exercer + responsabilité civile/pénale personnelle si sinistre incendie.",
        },
        {
          q: 'Domotique / Connecté : couvert ?',
          a: "Vérifier votre contrat. La domotique standard (volets connectés, éclairage smart) est couverte par défaut. Mais les installations IoT complexes (gestion énergie, batteries domestiques, V2G) nécessitent souvent une garantie spécifique 'systèmes intelligents' (option +80-200€/an). Notre cabinet négocie cette garantie dans 100% des devis pour électriciens spécialisés domotique.",
        },
        {
          q: 'Tarif décennale électricien 2026 ?',
          a: 'AE électricien (CA <50k€) : 490-880 €/an. EI : 520-940 €/an. EURL/SASU : 670-1 220 €/an. SARL 5 salariés : 5 200-11 000 €/an. SAS 10 salariés : 11 000-16 800 €/an. Variables : ancienneté, antécédents, présence de domotique avancée.',
        },
        {
          q: 'Photovoltaïque : décennale séparée ?',
          a: 'Si vous installez aussi du photovoltaïque, votre décennale standard électricien NE COUVRE PAS les panneaux solaires + onduleurs. Vous devez ajouter une extension RGE photovoltaïque (sur-prime +30-60% du tarif base). Voir notre guide /assurance-decennale/photovoltaique.',
        },
      ]}
    />
  )
}

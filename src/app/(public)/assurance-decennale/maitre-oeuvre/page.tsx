/**
 * Pilier — Décennale maître d'œuvre (Couche B)
 *
 * KW Ahrefs : "assurance décennale maitre d'oeuvre" 150 vol KD 0 CPC 500€ + tail "maitre d'œuvre" → 220+ vol/m
 * Particularité : MdŒ = responsable conception + supervision = décennale étendue
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/maitre-oeuvre'
const TITLE = "Décennale maître d'œuvre 2026 — Tarifs 1 280-3 200€/an (responsabilité étendue)"
const TAGLINE =
  "La décennale obligatoire pour maîtres d'œuvre : couverture spécifique conception + supervision chantier + coordination corps d'état. Responsabilité étendue aux fautes des sous-traitants."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Décennale maître d'œuvre 2026 : OBLIGATOIRE Loi Spinetta. Couverture conception + supervision chantier + coordination 8-15 corps d'état + recours sous-traitants. Tarifs 1 280-3 200€/an indépendant, 8 500-22 000€/an SARL. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale maître d'œuvre est OBLIGATOIRE pour tout maître d'œuvre en France (Loi Spinetta — art. L. 241-1 C. assur.). Le maître d'œuvre (MdŒ) cumule 3 responsabilités : (1) conception du projet, (2) supervision du chantier, (3) coordination des corps d'état. Sa décennale couvre donc un périmètre étendu : ses propres fautes ET les fautes des sous-traitants qu'il a sélectionnés (responsabilité solidaire art. 1792-4 C. civ.). Sinistralité moyenne MdŒ : 8,7%. Tarifs 2026 : 1 280-3 200 €/an pour MdŒ indépendant (CA 80-180k€), 8 500-22 000 €/an pour SARL agence MdŒ avec salariés."
      legalReference="Loi Spinetta art. L. 241-1 + 1792-4 C. civ. (solidarité sous-traitants) + Loi MOP 1985"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION Loi Spinetta',
          desc: 'MdŒ = constructeur (art. 1792-1 C. civ.). Décennale obligatoire avant ouverture chantier',
        },
        {
          icon: '🏗️',
          title: 'Conception + supervision',
          desc: 'Couverture étendue : étude faisabilité, plans, choix matériaux, supervision exécution',
        },
        {
          icon: '🤝',
          title: 'Solidarité sous-traitants',
          desc: 'Responsabilité solidaire avec les artisans BTP que vous sélectionnez (art. 1792-4)',
        },
        {
          icon: '💰',
          title: '1 280-3 200 €/an indépendant',
          desc: 'MdŒ indépendant CA 80-180k€. Agence SARL 5 sal : 8 500-22 000€/an. Plus cher que artisans simples',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi le tarif MdŒ est plus élevé ?',
          body: (
            <div>
              <p>Le maître d'œuvre cumule 3 niveaux de responsabilité :</p>
              <ol>
                <li>
                  <strong>Conception</strong> : erreur de plan, sous-dimensionnement structurel,
                  non-conformité réglementaire (PLU, accessibilité PMR, RT2020)
                </li>
                <li>
                  <strong>Supervision</strong> : défaut de contrôle, validation hâtive, manque
                  visites chantier
                </li>
                <li>
                  <strong>Coordination corps d&apos;état</strong> : ordonnancement défaillant,
                  incohérences entre lots
                </li>
              </ol>
              <p className="mt-3">
                À cela s&apos;ajoute la <strong>solidarité avec les sous-traitants</strong> (art.
                1792-4 C. civ.) : si un artisan que vous avez sélectionné fait une malfaçon, le
                maître d&apos;ouvrage peut vous attaquer DIRECTEMENT (sans avoir à attaquer
                l&apos;artisan). Vous vous retournez ensuite contre l&apos;artisan via recours
                subrogatoire.
              </p>
              <p className="mt-3 border-l-4 border-amber-500 bg-amber-50 p-3">
                <strong>Sinistre moyen MdŒ 2024</strong> : 38 200€ (le plus élevé du BTP après
                architectes). Plafond garantie recommandé minimum : <strong>2 000 000€</strong>.
              </p>
            </div>
          ),
        },
        {
          h2: 'MdŒ vs Architecte : quelles différences décennalement ?',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Maître d&apos;œuvre (MdŒ)</th>
                    <th className="border p-2 text-left">Architecte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Statut professionnel</td>
                    <td className="border p-2">Libre (pas d&apos;ordre, pas de carte)</td>
                    <td className="border p-2">Ordre des Architectes obligatoire</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Décennale obligatoire</td>
                    <td className="border p-2">OUI (Loi Spinetta)</td>
                    <td className="border p-2">OUI (+ MAF obligatoire)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Permis construire signé</td>
                    <td className="border p-2">≤170 m² SHON</td>
                    <td className="border p-2">Tous projets &gt;170 m²</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Tarif décennale 2026</td>
                    <td className="border p-2">1 280-3 200 €/an indépendant</td>
                    <td className="border p-2">1 800-4 500 €/an (MAF)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Solidarité sous-traitants</td>
                    <td className="border p-2">OUI (art. 1792-4)</td>
                    <td className="border p-2">OUI (mais MAF mutualise)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <a
                    href="/outils/calculateur-tarif-decennale"
                    className="text-primary-600 underline"
                  >
                    Calculateur tarif décennale MdŒ
                  </a>
                </li>
                <li>
                  <a
                    href="/outils/devis-assurance-decennale"
                    className="text-primary-600 underline"
                  >
                    Devis officiel ORIAS sous 24h
                  </a>
                </li>
                <li>
                  <a href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP
                  </a>
                </li>
                <li>
                  <a href="/guides/dommages-ouvrage" className="text-primary-600 underline">
                    Dommages ouvrage (DO) — assurance complémentaire MdŒ
                  </a>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'MdŒ : décennale obligatoire ?',
          a: "OUI absolument (Loi Spinetta art. L. 241-1 C. assur.). Le maître d'œuvre est qualifié de constructeur (art. 1792-1 C. civ.) au même titre que les artisans BTP. Sanctions absence : 75 000 € + 6 mois prison + interdiction d'exercer + responsabilité civile/pénale personnelle.",
        },
        {
          q: 'Plafond garantie MdŒ recommandé ?',
          a: "<strong>2 000 000€ minimum</strong> car cumul de responsabilités (conception + supervision + solidarité sous-traitants). Pour projets >1M€ ou marchés publics : <strong>5 000 000€</strong>. Pour projets industriels/tertiaires complexes : <strong>10 000 000€</strong>. Notre cabinet ORIAS travaille avec SMABTP MdŒ, MAF et April BTP qui couvrent jusqu'à 10M€.",
        },
        {
          q: 'Solidarité sous-traitants : comment me protéger ?',
          a: "3 leviers : (1) <strong>Vérifier l&apos;attestation décennale</strong> de chaque sous-traitant AVANT signature, (2) <strong>Inclure une clause de recours subrogatoire</strong> dans vos contrats sous-traitance, (3) <strong>Souscrire la garantie 'sous-traitance étendue'</strong> qui couvre les défaillances assureurs sous-traitants (option +200-450€/an).",
        },
        {
          q: 'Tarif décennale MdŒ 2026 ?',
          a: 'MdŒ indépendant (CA 80-180k€) : 1 280-3 200 €/an. EURL/SASU MdŒ : 1 580-3 800 €/an. SARL agence MdŒ 5 salariés : 8 500-22 000 €/an. SAS 10+ salariés : 22 000-48 000 €/an. Variables : type projets (résidentiel/tertiaire/industriel), zone, plafond, antécédents.',
        },
      ]}
    />
  )
}

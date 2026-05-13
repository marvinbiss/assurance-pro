/**
 * Pilier — Prévoyance artisan
 * KW Ahrefs : "prévoyance artisan" 150 vol KD 0 CPC 250€
 * Sous-pilier sectoriel BTP de /prevoyance-tns (qui cible "prévoyance tns" 500 vol).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prevoyance-artisan'
const TITLE = 'Prévoyance artisan — Madelin BTP 2026 (IJ, invalidité, agression chantier)'
const TAGLINE =
  'La prévoyance dédiée aux artisans BTP : IJ dès J0, rente invalidité, capital décès. Calibrée sur la sinistralité corporelle élevée du métier (chutes, dorsalgies).'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Prévoyance artisan BTP : IJ dès J0 (vs 3 j Sécu), rente invalidité jusqu'à 70% du revenu, capital décès, garantie agression chantier. Madelin déductible. Comparatif PRO BTP, April BTP, Harmonie. Tarifs 128-380€/mois. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La prévoyance artisan est calibrée sur les risques spécifiques du secteur BTP : sinistralité corporelle élevée (chutes de hauteur, dorsalgies, troubles musculo-squelettiques), risque cardiovasculaire (efforts physiques intenses), risque vibrations (outils électriques portatifs), risque chimique (peintures, isolants). Pour un artisan TNS solo, un arrêt de travail = revenus à zéro (la Sécu artisans verse seulement 22-65€/jour après 3 jours de carence). Sans prévoyance privée, l'asphyxie financière est rapide (charges fixes 1 800-3 200€/mois entre matériel, véhicule pro, assurances, logement). Le pack standard combine : IJ dès J0 (typiquement 100-200€/jour), rente invalidité 70% du revenu, capital décès 4-8 ans de revenus pour la famille, garantie agression chantier (vol matériel, agression sur site). Conformément à la Loi Madelin, cotisations déductibles BNC pour les TNS au régime réel. Tarifs 2026 : 128-380€/mois selon profil."
      legalReference="Article 154 bis du CGI (Loi Madelin) + Code des assurances"
      isObligatoire={false}
      benefits={[
        {
          icon: '🩹',
          title: 'IJ dès J0',
          desc: 'Sans carence (vs 3 jours Sécu artisans). Compense revenus perdus immédiatement',
        },
        {
          icon: '♿',
          title: 'Rente invalidité 70%',
          desc: "Critique car métier dépend à 100% de l'intégrité physique (chute, dorsalgie chronique)",
        },
        {
          icon: '🛠️',
          title: 'Garantie agression',
          desc: 'Vol matériel sur chantier + agression sur site (capital majoré)',
        },
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: 'Cotisations déductibles BNC au régime réel — économie ~1 750€/an pour 60k€ bénéfice',
        },
      ]}
      sections={[
        {
          h2: "Risques spécifiques du métier d'artisan BTP",
          body: (
            <>
              <ul>
                <li>
                  <strong>Chutes de hauteur</strong> : 1re cause d&apos;accident grave en BTP (16%
                  des AT mortels selon CNAM 2024)
                </li>
                <li>
                  <strong>Dorsalgies / TMS</strong> : 65% des artisans BTP en souffrent à un moment
                  de leur carrière (INRS)
                </li>
                <li>
                  <strong>Risque cardiovasculaire</strong> : effort physique + stress + sédentarité
                  atelier
                </li>
                <li>
                  <strong>Maladies professionnelles</strong> : amiante (mésothéliome), peintures
                  (cancer professionnel), bruit (surdité)
                </li>
                <li>
                  <strong>Vol matériel chantier</strong> : 1 artisan BTP sur 3 victime de vol
                  matériel/outillage dans sa carrière (FFB 2024)
                </li>
                <li>
                  <strong>Agression sur chantier</strong> : risque réel en zone urbaine sensible
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs prévoyance artisan 2026 par profil',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil artisan</th>
                    <th className="border p-2 text-right">Cotisation mensuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Peintre / plaquiste 35 ans (catégorie risque B)</td>
                    <td className="border p-2 text-right">128 € – 180 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Plombier / électricien 35 ans (catégorie B)</td>
                    <td className="border p-2 text-right">148 € – 220 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maçon / charpentier 38 ans (catégorie C)</td>
                    <td className="border p-2 text-right">180 € – 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Couvreur-zingueur 38 ans (catégorie D — risque max)
                    </td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">RGE photovoltaïque 40 ans</td>
                    <td className="border p-2 text-right">200 € – 320 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : âge (~+1,5%/an), tabagisme (+30-60%), antécédents médicaux, niveau IJ
                choisi, durée garantie (1 095 jours = 3 ans standard).
              </p>
            </>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Pilier prévoyance TNS
                  </Link>{' '}
                  — vue d&apos;ensemble + comparatif assureurs
                </li>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>{' '}
                  — santé complémentaire (16k vol/mois)
                </li>
                <li>
                  <Link href="/assurance-artisan" className="text-primary-600 underline">
                    Pack artisan complet
                  </Link>{' '}
                  — décennale + RC + véhicule + mutuelle + prévoyance
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi la prévoyance est-elle critique pour un artisan ?',
          a: "Parce qu'un arrêt de travail = revenus à zéro pour artisan TNS. La Sécu artisans verse seulement 22-65€/jour après 3 jours de carence. Pour un artisan dégageant 50 k€/an de bénéfice (~150€/jour de revenu net), c'est 60-85% de perte de revenu. Un arrêt de 2-3 mois = asphyxie financière (charges fixes 1 800-3 200€/mois).",
        },
        {
          q: 'Combien coûte une prévoyance artisan en 2026 ?',
          a: '128-180€/mois pour peintre/plaquiste 35 ans. 148-220€/mois pour plombier/électricien. 180-280€/mois pour maçon/charpentier. 220-380€/mois pour couvreur-zingueur (catégorie risque max). Madelin déductible BNC au régime réel.',
        },
        {
          q: 'Garantie agression chantier : utile vraiment ?',
          a: "OUI — 1 artisan BTP sur 3 victime de vol matériel/outillage dans sa carrière (FFB 2024). Risque agression réel en zone urbaine sensible. Coût garantie : ~30-60€/an supplémentaire. Capital majoré (×2) en cas d'agression sur site.",
        },
        {
          q: 'Différence avec la mutuelle pro BTP ?',
          a: "PRÉVOYANCE = compensation perte de revenu (IJ + invalidité + capital décès). MUTUELLE = remboursement frais médicaux quotidiens. Les 2 sont complémentaires et toutes les deux Madelin déductibles dans le plafond commun. Voir <a href='/mutuelle-pro-btp' class='text-primary-600 underline'>/mutuelle-pro-btp</a>.",
        },
        {
          q: 'Combien de temps pour souscrire ?',
          a: "24h via notre formulaire avec 3 propositions (PRO BTP, April BTP, Harmonie BTP, Generali BTP). Examen médical complémentaire au-delà de 200€/jour d'IJ. Effet 1er du mois suivant standard.",
        },
      ]}
    />
  )
}

/**
 * Pilier — Assurance BTP (HUB vertical, distinct de /assurance-decennale)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance btp"        → 500 vol, KD 27, CPC 250€ ⭐
 * - "btp pro mutuelle"     → 200 vol, KD 0, CPC 100€
 * - "assurance pro btp"    → 400 vol, KD 4, CPC 100€ (déjà couvert /assurance-artisan)
 * - Famille cumulée hub : ~1 100 vol/mois
 *
 * Distinction avec /assurance-decennale : décennale = 1 GARANTIE Loi Spinetta.
 * /assurance-btp = HUB VERTICAL qui aiguille vers TOUTES les garanties BTP
 * (décennale + RC pro travaux + multirisque chantier + DO + TRC + RC chef d'entreprise).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-btp'
const TITLE = 'Assurance BTP — Toutes garanties (décennale, RC, TRC, DO) 2026'
const TAGLINE =
  'Le hub assurance BTP : décennale, RC pro travaux, multirisque chantier, dommages-ouvrage, TRC, garantie financière. 8 assureurs comparés. Conseil ORIAS spécialisé.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance BTP 2026 : décennale + RC pro + multirisque + DO + TRC. Comparatif 5 assureurs (SMABTP, Hiscox, April). Devis ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: TITLE }],
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance BTP désigne l'ensemble des garanties qu'une entreprise du Bâtiment et des Travaux Publics doit ou peut souscrire pour sécuriser son activité. Ce pilier-hub couvre 8 garanties spécifiques au secteur : la décennale obligatoire (Loi Spinetta), la RC Pro travaux (responsabilité civile pendant le chantier), la multirisque pro BTP (locaux, atelier, matériel), les dommages-ouvrage (DO — pour les maîtres d'ouvrage), la Tous Risques Chantier (TRC), la garantie financière BTP (cautionnement), la garantie biennale (équipements dissociables 2 ans), et la garantie de parfait achèvement (1 an). Selon votre métier (gros œuvre, second œuvre, finitions, RGE, MOE), votre statut juridique (AE, EI, SARL, SAS) et la taille de l'entreprise, le pack BTP varie de 980 € HT/an pour un AE peintre solo jusqu'à 25 000 € HT/an pour une PME maçonnerie 10 salariés. Cette page récapitule les obligations légales et redirige vers nos pages-piliers spécialisées."
      legalReference="Loi Spinetta du 4 janvier 1978 + Code des assurances L. 241-1 / L. 242-1 + Code civil 1792"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: '8 garanties BTP',
          desc: 'Décennale, RC pro travaux, multirisque, DO, TRC, garantie financière, biennale, GPA',
        },
        {
          icon: '⚖️',
          title: 'Décennale OBLIGATOIRE',
          desc: "Loi Spinetta — sanctions absence : 75 000€ + 6 mois prison + interdiction d'exercer",
        },
        {
          icon: '💰',
          title: '980 € à 25 000 €/an',
          desc: 'AE peintre : 980€/an. SARL maçonnerie 10 salariés : 18-25k€/an',
        },
        {
          icon: '🛡️',
          title: 'Pack négocié',
          desc: '8 assureurs spécialisés (SMABTP leader, MAAF Pro, Allianz Pro BTP, AXA Pro)',
        },
      ]}
      sections={[
        {
          h2: "Les 8 garanties d'assurance BTP : à quoi servent-elles ?",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Obligatoire ?</th>
                    <th className="border p-2 text-left">Couvre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">✅ OUI (Loi Spinetta)</td>
                    <td className="border p-2">Dommages structurels 10 ans après réception</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro travaux</strong>
                    </td>
                    <td className="border p-2">⚠️ Recommandée</td>
                    <td className="border p-2">Dommages causés à un tiers PENDANT le chantier</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Multirisque pro BTP</strong>
                    </td>
                    <td className="border p-2">⚠️ Bail commercial</td>
                    <td className="border p-2">Locaux + atelier + matériel + outillage</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dommages-ouvrage (DO)</strong>
                    </td>
                    <td className="border p-2">✅ OUI maître d&apos;ouvrage</td>
                    <td className="border p-2">Pré-financement réparation sinistres décennaux</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Tous Risques Chantier (TRC)</strong>
                    </td>
                    <td className="border p-2">⚠️ Recommandée gros chantier</td>
                    <td className="border p-2">
                      Dommages au CHANTIER lui-même (pendant les travaux)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Garantie financière BTP</strong>
                    </td>
                    <td className="border p-2">⚠️ Cautionnement marché public</td>
                    <td className="border p-2">
                      Cautionnement bancaire pour répondre aux appels d&apos;offres publics
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Garantie biennale</strong>
                    </td>
                    <td className="border p-2">✅ Obligation légale (art. 1792-3)</td>
                    <td className="border p-2">
                      Équipements DISSOCIABLES 2 ans (chauffage, volets)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Garantie parfait achèvement</strong>
                    </td>
                    <td className="border p-2">✅ Obligation légale (art. 1792-6)</td>
                    <td className="border p-2">
                      TOUS désordres signalés dans l&apos;année post-réception
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs italic">
                Pour aller plus loin :{' '}
                <Link href="/guides/parfait-achevement" className="text-primary-600 underline">
                  Guide GPA
                </Link>
                ,
                <Link href="/guides/dommages-ouvrage" className="ml-1 text-primary-600 underline">
                  Guide DO
                </Link>
                ,
                <Link
                  href="/guides/attestation-decennale"
                  className="ml-1 text-primary-600 underline"
                >
                  Attestation décennale
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance BTP 2026 par profil',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil BTP</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE peintre / plaquiste solo</td>
                    <td className="border p-2 text-right">980 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE plombier / électricien solo</td>
                    <td className="border p-2 text-right">1 280 € – 1 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE maçon / charpentier solo</td>
                    <td className="border p-2 text-right">1 580 € – 2 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE couvreur-zingueur</td>
                    <td className="border p-2 text-right">1 880 € – 2 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL multi-services BTP 3 salariés + camion</td>
                    <td className="border p-2 text-right">3 800 € – 6 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL maçonnerie 10 salariés + 2 camions</td>
                    <td className="border p-2 text-right">12 000 € – 18 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL CMI (maisons individuelles) 5 salariés</td>
                    <td className="border p-2 text-right">8 800 € – 14 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL RGE photovoltaïque 5 salariés</td>
                    <td className="border p-2 text-right">9 200 € – 16 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME désamianteur SS3 8 salariés</td>
                    <td className="border p-2 text-right">15 000 € – 25 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Architecte DPLG indépendant (RC architecte 8 M€)</td>
                    <td className="border p-2 text-right">2 800 € – 5 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maître d&apos;œuvre (MOE) indépendant</td>
                    <td className="border p-2 text-right">1 800 € – 3 800 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Hub BTP : nos pages-piliers spécialisées',
          body: (
            <>
              <h3>Garanties BTP individuelles</h3>
              <ul>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale
                  </Link>{' '}
                  — Loi Spinetta + 37 métiers BTP
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale auto-entrepreneur BTP
                  </Link>{' '}
                  — pack AE
                </li>
                <li>
                  <Link href="/assurance-artisan" className="text-primary-600 underline">
                    Pack artisan complet
                  </Link>{' '}
                  — décennale + RC + véhicule
                </li>
              </ul>
              <h3>Mutuelle et prévoyance BTP</h3>
              <ul>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>{' '}
                  — comparatif PRO BTP, April, Harmonie
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>{' '}
                  — IJ + invalidité + capital décès
                </li>
              </ul>
              <h3>Locaux, véhicules et chantiers</h3>
              <ul>
                <li>
                  <Link
                    href="/assurance-voiture-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Véhicule pro / utilitaire
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Multirisque local pro
                  </Link>
                </li>
              </ul>
              <h3>Guides juridiques BTP</h3>
              <ul>
                <li>
                  <Link href="/guides/attestation-decennale" className="text-primary-600 underline">
                    Guide attestation décennale
                  </Link>
                </li>
                <li>
                  <Link href="/guides/dommages-ouvrage" className="text-primary-600 underline">
                    Guide dommages-ouvrage
                  </Link>
                </li>
                <li>
                  <Link href="/guides/parfait-achevement" className="text-primary-600 underline">
                    Guide garantie parfait achèvement
                  </Link>
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles assurances sont obligatoires en BTP ?',
          a: "Décennale (Loi Spinetta — TOUS artisans BTP), garantie biennale (art. 1792-3 C. civ.), garantie parfait achèvement (art. 1792-6 C. civ.). Pour le maître d'ouvrage : dommages-ouvrage (L. 242-1 C. assur.). Pour les marchés publics : garantie financière (cautionnement bancaire). RC Pro travaux et multirisque pro non obligatoires stricto sensu mais EXIGÉES par 100% des donneurs d'ordre B2B.",
        },
        {
          q: "Combien coûte l'assurance d'un artisan BTP ?",
          a: 'Pack complet (décennale + RC + véhicule pro) : démarre à 980€/an pour AE peintre solo, 1 280-1 980€/an pour AE plombier/électricien, 1 580-2 380€/an pour AE maçon/charpentier, 1 880-2 680€/an pour couvreur-zingueur. SARL avec salariés : 3 800-25 000€/an selon métier et taille.',
        },
        {
          q: 'SMABTP ou autre assureur BTP ?',
          a: "SMABTP (Société Mutuelle d'Assurance du Bâtiment et des Travaux Publics) est l'assureur historique du secteur BTP en France, choisi par défaut par 50% des entreprises BTP. Mais NOTRE CABINET compare systématiquement avec MAAF Pro, Allianz Pro BTP, AXA Pro BTP, Hiscox, April Pro, Generali Pro, Wakam — économies typiques 15-30% pour des garanties équivalentes.",
        },
        {
          q: 'Quelle différence entre décennale et tous risques chantier (TRC) ?',
          a: "DÉCENNALE = couvre les dommages affectant la solidité de l'ouvrage 10 ANS APRÈS RÉCEPTION (responsabilité de l'artisan envers le maître d'ouvrage). TRC (Tous Risques Chantier) = couvre les dommages survenant AU CHANTIER LUI-MÊME PENDANT les travaux (incendie, vol matériel, effondrement partiel). Souvent souscrite par le maître d'ouvrage pour les gros chantiers.",
        },
        {
          q: 'RGE photovoltaïque : assurance plus chère ?',
          a: "OUI — +30 à +60% vs un électricien BTP standard. Justification : sinistralité AQC élevée (9,2% sur les installations PV — incendies onduleurs, défauts d'étanchéité toiture). Tarif type 2026 : 1 880-3 200€/an pour AE RGE PV, 9 200-16 000€/an pour SARL 5 salariés. Garantie obligatoire pour conserver le label RGE et bénéficier de la prime à l'autoconsommation.",
        },
        {
          q: "Désamianteur SS3 : combien coûte l'assurance ?",
          a: "Pack complet pour PME désamianteur SS3 (8 salariés) : 15 000-25 000€/an. Justification : risques majorés (santé travailleurs, pollution, responsabilité tiers exposés à l'amiante), obligations réglementaires renforcées (formation, EPI, plan de retrait). Garanties spécifiques requises : RC Pro amiante, garantie subséquente longue (jusqu'à 30 ans post-cessation), couverture des frais de dépollution.",
        },
        {
          q: 'Combien de temps pour un devis assurance BTP ?',
          a: 'Devis personnalisé via notre formulaire : 24-48h ouvrées avec 3-5 propositions de nos assureurs partenaires BTP (SMABTP, MAAF Pro, Allianz Pro BTP, AXA Pro, Hiscox, April Pro). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour démarrage chantier urgent.',
        },
      ]}
    />
  )
}

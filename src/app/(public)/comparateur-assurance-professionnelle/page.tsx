/**
 * Pilier — Comparateur assurance professionnelle
 * KW Ahrefs : "comparateur assurance professionnelle" 700 vol KD 5 CPC 35€
 * Famille : "comparatif assurance pro", "comparer assurance pro"
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'comparateur-assurance-professionnelle'
const TITLE = 'Comparateur assurance professionnelle 2026 — 8 assureurs comparés'
const TAGLINE =
  "Comparez gratuitement les 8 principales compagnies d'assurance professionnelle en France : Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam. Conseil ORIAS sous 24h."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Comparateur assurance professionnelle 2026 : 8 assureurs comparés (Allianz Pro, AXA Pro, MMA Pro, MAAF Pro, Hiscox, April Pro, Generali Pro, Wakam). Critères : tarifs, garanties, plafonds, exclusions, qualité service sinistre. Comparatif gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comparer 3-5 assureurs avant de souscrire est l'étape CRITIQUE pour optimiser le rapport coût/protection de votre assurance professionnelle. Notre cabinet ORIAS compare systématiquement 8 assureurs distribués en France métropolitaine sur EXACTEMENT le même cahier des charges (couverture identique, plafonds identiques, franchises identiques) — économies typiques 15-30% pour des garanties équivalentes ou supérieures. Cette page présente le comparatif détaillé des 8 assureurs (Allianz Pro, AXA Pro, MMA Pro, MAAF Pro, Hiscox, April Pro, Generali Pro, Wakam), leurs spécialités sectorielles, les critères de choix prioritaires et la procédure de devis comparatif gratuit en 24h."
      legalReference="Recommandation ACPR 2024-R-03 (devoir de conseil tracé du courtier ORIAS)"
      isObligatoire={false}
      benefits={[
        {
          icon: '⚖️',
          title: '8 assureurs comparés',
          desc: 'Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam — sur même cahier des charges',
        },
        {
          icon: '💰',
          title: 'Économie 15-30%',
          desc: 'Typique vs souscription directe sans comparatif (assureur connu / par défaut)',
        },
        {
          icon: '⏱️',
          title: '24h ouvrées',
          desc: '3-5 propositions personnalisées sous 24h après formulaire de 5 minutes',
        },
        {
          icon: '🆓',
          title: 'Gratuit ORIAS',
          desc: 'Notre rémunération vient de la commission assureur après souscription, pas de vous',
        },
      ]}
      sections={[
        {
          h2: 'Comparatif détaillé des 8 assureurs pro distribués en France',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Forces</th>
                    <th className="border p-2 text-left">Limites</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Allianz Pro</strong>
                    </td>
                    <td className="border p-2">
                      Multi-secteurs, ETI, gestion sinistre rapide, réseau agences fort
                    </td>
                    <td className="border p-2">Pas le moins cher en entrée de gamme</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>AXA Pro</strong>
                    </td>
                    <td className="border p-2">
                      Tarifs compétitifs PME, gestion en ligne, BTP / taxi
                    </td>
                    <td className="border p-2">Service client par téléphone variable</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Pro</strong>
                    </td>
                    <td className="border p-2">
                      Réseau agences physique fort, conseiller dédié, artisans
                    </td>
                    <td className="border p-2">Délais traitement 3-5 j</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MAAF Pro</strong>
                    </td>
                    <td className="border p-2">Mutualiste, prix attractifs TPE / PME</td>
                    <td className="border p-2">Garanties standard (peu de premium)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Hiscox</strong>
                    </td>
                    <td className="border p-2">
                      Spécialiste freelance, IT, cyber, dirigeant. Plafonds élevés
                    </td>
                    <td className="border p-2">Tarifs supérieurs entrée de gamme</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro</strong>
                    </td>
                    <td className="border p-2">
                      Modulaire à la carte, app mobile, BTP / santé TNS
                    </td>
                    <td className="border p-2">
                      Pas de spécialisation profonde sur certains secteurs
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali Pro</strong>
                    </td>
                    <td className="border p-2">PME haut de gamme, restauration, dirigeants</td>
                    <td className="border p-2">Tarifs supérieurs (ciblage premium)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Wakam</strong>
                    </td>
                    <td className="border p-2">
                      100% digital, devis 6h, VTC / mobilité / e-commerce
                    </td>
                    <td className="border p-2">Pas de réseau physique</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: "Critères de choix prioritaires (par ordre d'importance)",
          body: (
            <>
              <ol>
                <li>
                  <strong>Couverture identique</strong> entre les devis (plafonds, franchises,
                  exclusions) — sinon comparaison faussée
                </li>
                <li>
                  <strong>Spécialité sectorielle</strong> de l&apos;assureur (Hiscox = freelance/IT,
                  SMABTP = BTP, MACSF = santé, Wakam = mobilité)
                </li>
                <li>
                  <strong>Qualité du service sinistres</strong> : avis Trustpilot, délai moyen
                  indemnisation, présence d&apos;un interlocuteur dédié
                </li>
                <li>
                  <strong>Tarif annuel TTC</strong> (à inclure : prime + frais de fractionnement +
                  surprime éventuelle)
                </li>
                <li>
                  <strong>Exclusions notables</strong> en petit caractère (cyber, vol nuit, faute
                  lourde dirigeant…)
                </li>
                <li>
                  <strong>Conditions de résiliation</strong> (loi Hamon, infra-annuelle, motifs de
                  résiliation par l&apos;assureur)
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comparateur assurance pro : gratuit vraiment ?',
          a: "OUI gratuit chez notre cabinet ORIAS. Notre rémunération vient de la COMMISSION assureur APRÈS souscription effective d'un contrat — vous ne payez rien pour le devis ni pour le conseil ORIAS. Économies typiques 15-30% vs souscription directe.",
        },
        {
          q: 'Quel est le meilleur assureur professionnel en 2026 ?',
          a: "Aucun « meilleur » dans l'absolu — dépend du métier : freelance / IT → Hiscox. BTP → SMABTP / MAAF Pro. Santé → MACSF. Restauration → Generali. VTC / mobilité → Wakam. PME multi-secteurs → Allianz Pro / AXA Pro. Notre comparateur identifie le meilleur pour VOTRE profil exact.",
        },
        {
          q: 'Comparer plusieurs devis : méthode ?',
          a: '(1) Vérifier que la couverture est IDENTIQUE entre les devis (mêmes garanties, plafonds, franchises). (2) Lister les exclusions (souvent cachées en petit caractère). (3) Comparer prime annuelle + qualité service sinistres (avis Trustpilot, délai moyen indemnisation). (4) Vérifier les options optionnelles incluses (assistance 24/7, véhicule remplacement, etc.).',
        },
        {
          q: 'Combien de temps pour un comparatif ?',
          a: '24h ouvrées via notre formulaire avec 3-5 propositions personnalisées. Échange conseil ORIAS de 15-30 min pour décrypter les nuances. Souscription : 24-48h. Effet du contrat : 1er du mois suivant ou immédiat (procédure express +120€).',
        },
      ]}
    />
  )
}

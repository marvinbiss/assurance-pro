/**
 * Guide pratique — Devis assurance professionnelle (intent commercial fort)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "devis assurance professionnelle"           → 450 vol, KD 17, CPC 600€ ⭐ (money KW)
 * - "devis assurance entreprise"                → 200 vol, KD 22, CPC 600€
 * - "devis assurance professionnelle en ligne"  → 150 vol, KD 39, CPC 500€
 * - "simulation assurance professionnelle"      → 150 vol, KD 12, CPC 500€
 * - "devis responsabilité civile professionnelle" → 200 vol, KD 10, CPC 800€
 * - Famille cumulée : ~1 150 vol/mois, CPC moyen 600€ — INTENT COMMERCIAL EXTRÊME
 *
 * Stratégie : guide pratique qui éduque sur la procédure de devis ET capture
 * les leads via CTA appuyés vers /devis. Conversion attendue >> page éditoriale pure.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides/devis-assurance-professionnelle'
const TITLE = 'Devis assurance professionnelle — Procédure 24h et comparatif 2026'
const TAGLINE =
  'Comment obtenir un devis assurance professionnelle gratuit, rapide et conforme : étapes, documents, comparatif assureurs, pièges à éviter. Conseil ORIAS sous 24h.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis assurance professionnelle 2026 : procédure complète en 5 étapes, documents à préparer, comparatif 8 assureurs (Allianz, AXA, MMA, MAAF, Hiscox, April, Generali, Wakam), pièges à éviter. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Obtenir un devis assurance professionnelle est l'étape cruciale avant la souscription d'un contrat : c'est elle qui détermine la couverture exacte, le tarif, les exclusions et la qualité du service de gestion des sinistres. La procédure standard prend entre 24 heures (pour les profils simples : freelance, AE, TPE solo) et 5-7 jours (pour les PME complexes : multi-sites, flotte automobile, exposition cyber élevée). Cette page détaille la procédure complète en 5 étapes, liste les documents à préparer pour gagner du temps, compare les 8 principaux assureurs distribués en France et alerte sur les 5 pièges classiques (sous-déclaration de CA, oubli d'activité secondaire, choix d'un plafond inadapté, négligence des exclusions, comparaison sur des couvertures non identiques). Notre cabinet ORIAS automatise la procédure : 1 formulaire de 5 minutes → 3 à 5 propositions personnalisées sous 24h ouvrées."
      legalReference="Code des assurances + Devoir de conseil DDA + Recommandation ACPR 2024-R-03"
      isObligatoire={false}
      benefits={[
        {
          icon: '⚡',
          title: 'Devis sous 24h',
          desc: '3 à 5 propositions personnalisées de nos 8 assureurs partenaires, conseil ORIAS dédié',
        },
        {
          icon: '📋',
          title: '5 étapes structurées',
          desc: 'Formulaire → Comparatif → Validation → Signature électronique → Attestation immédiate',
        },
        {
          icon: '💰',
          title: 'Gratuit sans engagement',
          desc: 'Aucun frais pour le devis — notre rémunération vient de la commission assureur après souscription',
        },
        {
          icon: '⚖️',
          title: 'Conseil ORIAS DDA',
          desc: 'Conformité Recommandation ACPR 2024-R-03 — devoir de conseil tracé',
        },
      ]}
      sections={[
        {
          h2: 'La procédure de devis assurance professionnelle en 5 étapes',
          body: (
            <>
              <h3>Étape 1 — Évaluation du besoin (5 minutes)</h3>
              <p>Vous remplissez un formulaire en ligne avec :</p>
              <ul>
                <li>Métier exact et code NAF</li>
                <li>Statut juridique (AE, EI, EURL, SARL, SAS)</li>
                <li>CA prévisionnel ou réalisé</li>
                <li>Nombre de salariés (le cas échéant)</li>
                <li>Présence d&apos;un local pro / véhicule pro</li>
                <li>Antécédents sinistres 5 dernières années</li>
                <li>Garanties souhaitées (RC, multirisque, cyber, mutuelle, prévoyance)</li>
              </ul>
              <h3>Étape 2 — Comparatif personnalisé (sous 24h)</h3>
              <p>
                Notre courtier ORIAS analyse votre profil et sollicite 3-5 assureurs pertinents.
                Vous recevez par email un tableau comparatif détaillé incluant : garanties,
                plafonds, franchises, exclusions notables, prime annuelle, qualité du service
                sinistres.
              </p>
              <h3>Étape 3 — Échange conseil ORIAS (15-30 minutes)</h3>
              <p>
                Un courtier vous appelle pour clarifier les nuances entre les propositions,
                expliquer les exclusions importantes, vous orienter vers la meilleure option pour
                votre profil exact. Conformité Recommandation ACPR 2024-R-03 (devoir de conseil
                tracé).
              </p>
              <h3>Étape 4 — Signature électronique (5 minutes)</h3>
              <p>
                Une fois la proposition retenue : signature électronique du contrat (DocuSign /
                Yousign), paiement de la première cotisation (CB ou virement), notification
                immédiate à l&apos;assureur.
              </p>
              <h3>Étape 5 — Attestation et activation (24h)</h3>
              <p>
                Attestation conforme 2026 (arrêté 23 janvier 2024) téléchargeable dans les 24h
                suivant le paiement. Effet du contrat : immédiat ou 1er du mois suivant selon votre
                choix.
              </p>
            </>
          ),
        },
        {
          h2: 'Documents à préparer pour accélérer le devis',
          body: (
            <>
              <p>
                Pour gagner du temps et éviter des allers-retours, préparez ces documents AVANT le
                formulaire :
              </p>
              <h3>Pour TOUS les profils</h3>
              <ul>
                <li>Extrait Kbis ou attestation INSEE (SIRET, code NAF)</li>
                <li>CA réalisé année N-1 + estimation N (bilan ou liasse fiscale)</li>
                <li>Pièce d&apos;identité du dirigeant / représentant légal</li>
              </ul>
              <h3>Pour les artisans BTP</h3>
              <ul>
                <li>Liste détaillée des activités exercées (codes FFB)</li>
                <li>Antécédents sinistres décennaux 5 dernières années</li>
                <li>Certifications (RGE, Qualibat, label artisan)</li>
                <li>Attestations de formation continue (si applicable)</li>
              </ul>
              <h3>Pour les professions réglementées (santé, juridique, conseil financier)</h3>
              <ul>
                <li>Diplôme professionnel + inscription à l&apos;Ordre / au registre</li>
                <li>Carte professionnelle (CGP : carte CIF, médecin : RPPS)</li>
                <li>Antécédents disciplinaires (le cas échéant)</li>
              </ul>
              <h3>Pour les entreprises avec local pro</h3>
              <ul>
                <li>Bail commercial</li>
                <li>Surface du local + photos extérieures + intérieures</li>
                <li>Inventaire mobilier + matériel + stock à valeur déclarée</li>
                <li>Présence d&apos;alarme NF + télésurveillance</li>
              </ul>
              <h3>Pour les véhicules pro</h3>
              <ul>
                <li>Carte grise + km annuel estimé par véhicule</li>
                <li>Antécédents accidents conducteurs 3 dernières années</li>
                <li>Liste des conducteurs (titulaires + occasionnels)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Les 5 pièges à éviter à la souscription',
          body: (
            <>
              <ol>
                <li>
                  <strong>Sous-déclarer son CA</strong> pour économiser sur la prime : règle
                  proportionnelle appliquée en cas de sinistre. Indemnisation au prorata du CA
                  déclaré (ex : sinistre 50k€, CA réel 60k€ déclaré 30k€ → 25k€ versés).
                </li>
                <li>
                  <strong>Oublier les activités secondaires</strong> : un plombier qui fait aussi de
                  l&apos;électricité = 2 garanties à activer. Sans déclaration, exclusion en cas de
                  sinistre sur l&apos;activité secondaire.
                </li>
                <li>
                  <strong>Choisir un plafond RC trop bas</strong> pour économiser : un sinistre
                  cyber TPE peut atteindre 80-300 k€, un sinistre RC Pro IT systémique peut
                  atteindre 5 M€. Plafond standard 1,5 M€ insuffisant pour 30% des activités.
                </li>
                <li>
                  <strong>Comparer sur des couvertures non identiques</strong> : un devis « moins
                  cher » avec franchise 2 000€ et exclusion vol nuit n&apos;est PAS comparable à un
                  devis avec franchise 500€ et vol nuit inclus.
                </li>
                <li>
                  <strong>Négliger le service sinistres</strong> : un assureur low-cost avec
                  sinistre traité en 6 mois vs un assureur premium en 15 jours = différence majeure
                  dans la pratique. Vérifier les avis Trustpilot / délai moyen d&apos;indemnisation.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Comparatif 8 assureurs distribués par notre cabinet ORIAS',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Atout devis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Allianz Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs, ETI</td>
                    <td className="border p-2">Devis 24h pour PME, conseiller dédié</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>AXA Pro</strong>
                    </td>
                    <td className="border p-2">Artisans, BTP, taxi</td>
                    <td className="border p-2">Tarifs compétitifs PME, gestion en ligne</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Pro</strong>
                    </td>
                    <td className="border p-2">Artisans, commerçants</td>
                    <td className="border p-2">Réseau agences physique fort</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MAAF Pro</strong>
                    </td>
                    <td className="border p-2">TPE, PME</td>
                    <td className="border p-2">Mutualiste, prix attractifs</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Hiscox</strong>
                    </td>
                    <td className="border p-2">Freelance, IT, cyber, dirigeants</td>
                    <td className="border p-2">Spécialiste digital, plafonds élevés</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro</strong>
                    </td>
                    <td className="border p-2">BTP, santé TNS</td>
                    <td className="border p-2">Modulaire à la carte, app mobile</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali Pro</strong>
                    </td>
                    <td className="border p-2">PME, restauration, dirigeants</td>
                    <td className="border p-2">Garanties haut de gamme</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Wakam</strong>
                    </td>
                    <td className="border p-2">VTC, mobilité, e-commerce</td>
                    <td className="border p-2">100% digital, devis 6h</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <Link href="/comparateur-assureurs" className="text-primary-600 underline">
                  → Comparateur complet de nos assureurs partenaires
                </Link>
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour obtenir un devis assurance professionnelle ?',
          a: '24h ouvrées via notre cabinet ORIAS pour les profils simples (freelance, AE, TPE solo) avec 3-5 propositions personnalisées. 48-72h pour les PME complexes (multi-sites, flotte, exposition cyber élevée). 5-7 jours pour les ETI nécessitant un audit de risque approfondi. Procédure « Express 6h » disponible pour démarrage urgent (+80-120€).',
        },
        {
          q: 'Combien coûte un devis assurance professionnelle ?',
          a: "GRATUIT et sans engagement chez notre cabinet ORIAS. Notre rémunération vient de la commission assureur APRÈS souscription effective d'un contrat — vous ne payez rien pour le devis ni le conseil. Le devis détaille les garanties, plafonds, franchises, exclusions, prime annuelle.",
        },
        {
          q: 'Quels documents préparer pour le devis ?',
          a: 'Tous profils : Kbis/SIRET, CA N-1 + estimation N. Artisans BTP : codes FFB activités + antécédents sinistres décennaux. Professions réglementées : diplôme + inscription Ordre + carte pro. Local pro : bail commercial + inventaire à valeur déclarée + photos. Véhicules pro : cartes grises + km annuels + antécédents accidents.',
        },
        {
          q: 'Comment comparer plusieurs devis ?',
          a: 'Méthode : (1) vérifier que la couverture est IDENTIQUE entre les devis (mêmes garanties activées, mêmes plafonds, mêmes franchises), (2) lister les exclusions (souvent cachées en petit caractère), (3) comparer la prime annuelle ET la qualité du service sinistres (avis Trustpilot, délai moyen indemnisation), (4) vérifier les options optionnelles incluses (assistance 24/7, véhicule de remplacement, etc.).',
        },
        {
          q: 'Le devis est-il modifiable après envoi ?',
          a: "OUI — un devis n'engage à rien. Vous pouvez demander des ajustements (plafonds, franchises, options) AVANT signature. Notre courtier ORIAS itère gratuitement avec l'assureur pour ajuster la proposition selon vos retours. Une fois le contrat signé : modifications possibles via avenant (procédure plus formelle, ~15 jours de traitement).",
        },
        {
          q: 'Peut-on obtenir un devis 100% en ligne ?',
          a: 'OUI pour les profils simples (freelance, AE, TPE bureau) via notre formulaire ou les plateformes des assureurs (Hiscox, Wakam — 100% digital). Pour les profils complexes (PME, BTP, transport, santé), un échange conseil ORIAS de 15-30 minutes est nécessaire pour qualifier le risque (conformité Recommandation ACPR 2024-R-03, devoir de conseil tracé).',
        },
        {
          q: 'Que faire si tous les devis sont trop chers ?',
          a: "3 leviers d'optimisation : (1) augmenter les franchises (1 000€ vs 500€ = -8 à -15% sur prime), (2) réduire les plafonds si vraiment surdimensionnés (mais attention au sous-assurance), (3) supprimer les options optionnelles non essentielles. Notre courtier ORIAS peut aussi explorer des assureurs spécialisés dans votre secteur (souvent plus compétitifs sur des niches).",
        },
      ]}
    />
  )
}

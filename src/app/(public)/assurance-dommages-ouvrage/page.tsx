/**
 * Pilier — Assurance dommages-ouvrage (DO) — angle TRANSACTIONNEL
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance dommages-ouvrage" → 150 vol, KD 0
 * - "assurance dommages ouvrage" → 400 vol, KD 19, CPC 140€ (déjà /guides/dommages-ouvrage)
 *
 * Distinction avec /guides/dommages-ouvrage existant :
 * - /guides/dommages-ouvrage = ÉDUCATIONNEL (qu'est-ce que c'est ? différence décennale)
 * - /assurance-dommages-ouvrage = TRANSACTIONNEL (souscrire — cible maître d'ouvrage)
 *
 * Concurrent benchmark : pro.april.fr/guide/difference-decennale-dommages-ouvrage = 329 vis/mois.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-dommages-ouvrage'
const TITLE = 'Assurance dommages-ouvrage (DO) — Souscription 2026 (particulier, promoteur)'
const TAGLINE =
  "L'assurance DO obligatoire pour tout maître d'ouvrage : particulier construisant sa maison, promoteur, copropriété. Souscription AVANT travaux. Comparatif 5 assureurs."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Souscription assurance dommages-ouvrage (Loi Spinetta L. 242-1) : maître d'ouvrage particulier, promoteur, copropriété. Prix 2-5% du coût HT travaux. Comparatif SMABTP, MAAF Pro, Generali, AXA, Groupama. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance dommages-ouvrage (DO) est OBLIGATOIRE pour tout maître d'ouvrage faisant réaliser des travaux de construction (article L. 242-1 du Code des assurances, Loi Spinetta du 4 janvier 1978) : particulier construisant sa maison individuelle, promoteur immobilier, copropriété, syndic faisant des travaux de gros œuvre, vendeur immobilier d'un bien neuf. Elle doit être souscrite AVANT le démarrage du chantier (avant la déclaration d'ouverture en mairie pour les CMI). Son rôle : pré-financer immédiatement la réparation des sinistres relevant de la garantie décennale (10 ans après réception), sans attendre la résolution juridique sur l'identité du responsable. Prix moyen 2026 : 2 à 5% du coût total HT des travaux (versement unique à la signature). Cette page est dédiée à la SOUSCRIPTION et au DEVIS DO. Pour comprendre la mécanique juridique en détail, voir notre /guides/dommages-ouvrage."
      legalReference="Article L. 242-1 du Code des assurances + Loi Spinetta du 4 janvier 1978"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Loi Spinetta L. 242-1',
          desc: "OBLIGATION absolue maître d'ouvrage AVANT démarrage travaux",
        },
        {
          icon: '⚡',
          title: 'Indemnisation 60-90j',
          desc: "Versement rapide sans attendre l'identification du responsable",
        },
        {
          icon: '💰',
          title: '2-5% coût HT travaux',
          desc: 'Prime UNIQUE à la signature. Maison 200k€ : 5 000-10 000€. Programme 2,5M€ : 37k-75k€',
        },
        {
          icon: '🏠',
          title: 'Transmise à la revente',
          desc: "L'assurance DO suit le BIEN — transmise automatiquement au nouvel acquéreur",
        },
      ]}
      sections={[
        {
          h2: "Qui doit souscrire l'assurance dommages-ouvrage ?",
          body: (
            <>
              <p>OBLIGATION pour 6 profils :</p>
              <ul>
                <li>
                  <strong>Promoteurs immobiliers</strong> (programmes neufs, marchand de biens,
                  marchand-promoteur, SCI promotion)
                </li>
                <li>
                  <strong>Particuliers construisant pour eux-mêmes</strong> (maison individuelle,
                  extension, rénovation lourde)
                </li>
                <li>
                  <strong>Vendeurs d&apos;un bien immobilier neuf</strong> (vente avant 10 ans après
                  réception)
                </li>
                <li>
                  <strong>Copropriétés et syndics</strong> faisant des travaux de gros œuvre
                  (réfection toiture, ravalement, terrassement)
                </li>
                <li>
                  <strong>Maîtres d&apos;ouvrage publics</strong> (collectivités, État, hôpitaux)
                </li>
                <li>
                  <strong>Mandataires</strong> (CMI - Constructeur de Maisons Individuelles, MOE
                  délégué, AMO)
                </li>
              </ul>
              <p>
                <strong>Cas particulier des particuliers</strong> : ne pas être sanctionné
                pénalement n&apos;équivaut PAS à ne pas avoir d&apos;obligation. La DO reste
                juridiquement obligatoire, et son absence rend la revente du bien quasi-impossible
                avant 10 ans (refus systématique de la banque pour l&apos;acquéreur).
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance dommages-ouvrage 2026',
          body: (
            <>
              <p>
                Tarifs indicatifs basés sur les barèmes de nos 5 partenaires DO (SMABTP, MAAF Pro,
                Generali Construction, AXA Construction, Groupama Bâtiment) :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de chantier</th>
                    <th className="border p-2 text-right">Coût HT travaux</th>
                    <th className="border p-2 text-right">Prime DO unique</th>
                    <th className="border p-2 text-right">% du coût</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Maison individuelle CMI</td>
                    <td className="border p-2 text-right">200 000 €</td>
                    <td className="border p-2 text-right">5 000 € – 10 000 €</td>
                    <td className="border p-2 text-right">2,5-5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maison individuelle haut de gamme</td>
                    <td className="border p-2 text-right">450 000 €</td>
                    <td className="border p-2 text-right">9 000 € – 18 000 €</td>
                    <td className="border p-2 text-right">2-4%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Extension / rénovation lourde</td>
                    <td className="border p-2 text-right">80 000 €</td>
                    <td className="border p-2 text-right">2 400 € – 4 800 €</td>
                    <td className="border p-2 text-right">3-6%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Petit programme immobilier 4 lots</td>
                    <td className="border p-2 text-right">800 000 €</td>
                    <td className="border p-2 text-right">16 000 € – 32 000 €</td>
                    <td className="border p-2 text-right">2-4%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Programme immobilier 12 lots</td>
                    <td className="border p-2 text-right">2 500 000 €</td>
                    <td className="border p-2 text-right">37 500 € – 75 000 €</td>
                    <td className="border p-2 text-right">1,5-3%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bureaux ETI</td>
                    <td className="border p-2 text-right">1 200 000 €</td>
                    <td className="border p-2 text-right">22 000 € – 50 000 €</td>
                    <td className="border p-2 text-right">1,8-4%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Réfection toiture copropriété</td>
                    <td className="border p-2 text-right">120 000 €</td>
                    <td className="border p-2 text-right">3 600 € – 6 000 €</td>
                    <td className="border p-2 text-right">3-5%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables qui font monter la prime : zone sismique (+30%), terrain argileux/instable
                (+20-50%), présence nappe phréatique (+15%), architecture complexe (porte-à-faux,
                sous-sol immergé), souscription après ouverture chantier (+10-30%, parfois refus).
              </p>
            </>
          ),
        },
        {
          h2: 'Procédure de souscription DO en 5 étapes',
          body: (
            <>
              <ol>
                <li>
                  <strong>Constitution dossier</strong> : descriptif des travaux + plans + DTU +
                  permis de construire + devis acceptés des artisans BTP (avec leurs attestations
                  décennale en cours de validité)
                </li>
                <li>
                  <strong>Demande de devis ORIAS</strong> : transmission à 3-5 assureurs
                  partenaires. Délai de réponse 5-7 jours (étude technique du dossier).
                </li>
                <li>
                  <strong>Comparatif personnalisé</strong> : tarif + plafonds + franchises +
                  exclusions. Notre cabinet vous accompagne pour décrypter les nuances.
                </li>
                <li>
                  <strong>Souscription + paiement prime unique</strong> : signature du contrat +
                  virement ou prélèvement de la prime intégrale (la DO se paie en UNE FOIS, vs
                  annuellement pour les autres assurances).
                </li>
                <li>
                  <strong>Émission de l&apos;attestation DO</strong> : remise sous 48-72h après
                  paiement, à conserver précieusement (à présenter au notaire en cas de revente du
                  bien).
                </li>
              </ol>
              <p>
                <strong>Délai global</strong> : 2-3 semaines entre demande de devis et émission
                attestation. <strong>À anticiper</strong> avant le démarrage du chantier
                (souscription tardive = surcoût 10-30% ou refus).
              </p>
            </>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs DO distribués par notre cabinet',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Atout DO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>SMABTP</strong>
                    </td>
                    <td className="border p-2">Leader historique BTP</td>
                    <td className="border p-2">
                      Expertise sinistres + réseau d&apos;experts en France
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MAAF Pro</strong>
                    </td>
                    <td className="border p-2">CMI + particuliers</td>
                    <td className="border p-2">
                      Tarifs compétitifs maison individuelle, mutualiste
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali Construction</strong>
                    </td>
                    <td className="border p-2">Promoteurs + ETI</td>
                    <td className="border p-2">
                      Garanties haut de gamme, gestion grands programmes
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>AXA Construction</strong>
                    </td>
                    <td className="border p-2">PME + ETI BTP</td>
                    <td className="border p-2">Réseau international, expertise zones complexes</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Groupama Bâtiment</strong>
                    </td>
                    <td className="border p-2">Régional + collectivités</td>
                    <td className="border p-2">Présence locale forte, gestion sinistres rapide</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance dommages-ouvrage est-elle obligatoire ?",
          a: "OUI pour tout maître d'ouvrage (particulier, promoteur, copropriété, syndic) faisant réaliser des travaux de construction (art. L. 242-1 C. assur.). Sanction absence : 75 000€ amende + 6 mois prison (sauf personnes physiques bâtissant pour leur propre usage — pas de sanction pénale, mais revente du bien quasi-impossible avant 10 ans).",
        },
        {
          q: 'Combien coûte la dommages-ouvrage en 2026 ?',
          a: '2 à 5% du coût total HT des travaux. Maison 200k€ HT : 5 000-10 000€. Extension 80k€ HT : 2 400-4 800€. Programme immobilier 2,5M€ HT : 37 500-75 000€. Variables : zone sismique, terrain instable, complexité architecturale, souscription tardive (+10-30%).',
        },
        {
          q: 'Quand souscrire la DO ?',
          a: "OBLIGATOIREMENT AVANT l'ouverture du chantier (avant la déclaration d'ouverture en mairie pour les CMI). Souscription pendant les travaux : prime majorée 10-30%, parfois refus. Souscription après réception : refusée systématiquement (risque de sinistre déjà en formation).",
        },
        {
          q: 'Différence entre dommages-ouvrage et garantie décennale ?',
          a: "DÉCENNALE = souscrite par L'ARTISAN, couvre SA responsabilité. DOMMAGES-OUVRAGE = souscrite par LE MAÎTRE D'OUVRAGE (particulier, promoteur), permet d'être INDEMNISÉ RAPIDEMENT en cas de sinistre sans attendre la décision de justice sur la responsabilité. Les 2 sont COMPLÉMENTAIRES. Plus de détails dans notre <a href='/guides/dommages-ouvrage' class='text-primary-600 underline'>/guides/dommages-ouvrage</a>.",
        },
        {
          q: 'Que se passe-t-il en cas de revente du bien avant 10 ans ?',
          a: "L'assurance DO est ATTACHÉE AU BIEN (pas à la personne) et se transmet AUTOMATIQUEMENT au nouvel acquéreur sans démarche particulière. Le notaire vérifie systématiquement la souscription d'une DO en cours de validité avant tout acte de vente d'un bien de moins de 10 ans — son absence est un BLOQUANT à la vente.",
        },
        {
          q: 'Documents à préparer pour le devis DO ?',
          a: "Descriptif détaillé des travaux + plans architecte + permis de construire + DTU applicables + devis acceptés des artisans BTP (avec leurs attestations DÉCENNALE en cours de validité — vérification croisée par l'assureur DO) + diagnostics techniques (sol, sismique). Délai d'étude du dossier par l'assureur : 5-7 jours ouvrés.",
        },
        {
          q: 'Combien de temps pour obtenir un devis DO ?',
          a: 'Devis personnalisé via notre formulaire : 5-7 jours ouvrés (étude technique du dossier requise). Comparatif de 3-5 assureurs (SMABTP, MAAF Pro, Generali Construction, AXA Construction, Groupama Bâtiment). Souscription : 48-72h après acceptation. Émission attestation DO : 48-72h après paiement de la prime unique.',
        },
      ]}
    />
  )
}

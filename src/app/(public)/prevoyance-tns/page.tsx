/**
 * Pilier — Prévoyance TNS
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "prévoyance tns"            → 500 vol, KD 4, CPC 350€ ⭐
 * - "prévoyance artisan"        → 150 vol, KD 0, CPC 250€
 * - "assurance prévoyance tns"  →  90 vol, KD 6, CPC 190€
 * - "prévoyance tns comparatif" →  80 vol, KD 1, CPC 300€
 * - "devis prévoyance tns"      →  70 vol
 * - "prévoyance tns tarif"      →  70 vol, KD 1, CPC 110€
 * - "comparatif prévoyance tns" →  70 vol
 * - Famille cumulée : ~1 350 vol/mois
 *
 * Concurrent benchmark :
 * - pro.april.fr/.../prevoyance → 357 vis/mois (top concurrent)
 * - simplis.fr/.../prevoyance-accident/prevoyance → 55 vis/mois
 *
 * Distinction critique : prévoyance ≠ mutuelle (pilier /mutuelle-tns existant).
 * Prévoyance = IJ + invalidité + décès. Mutuelle = remboursement frais santé courants.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'prevoyance-tns'
const TITLE = 'Prévoyance TNS — Loi Madelin 2026 : IJ, invalidité, décès, capital'
const TAGLINE =
  'La prévoyance dédiée aux Travailleurs Non Salariés : indemnités journalières, rente invalidité, capital décès. Loi Madelin déductible. Devis gratuit ORIAS.'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Prévoyance TNS Loi Madelin : indemnités journalières dès J0, rente invalidité jusqu'à 70% du revenu, capital décès, rente conjoint, rente éducation. Cotisations déductibles fiscalement. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La prévoyance TNS est l'assurance qui protège un Travailleur Non Salarié (artisan, commerçant, profession libérale, gérant majoritaire) contre les conséquences financières d'un arrêt de travail (maladie, accident), d'une invalidité ou d'un décès. Pour un TNS, le régime obligatoire de Sécurité Sociale verse des indemnités journalières (IJ) très inférieures à celles d'un salarié — typiquement 22 à 65 €/jour selon le revenu — et seulement après 3 jours de carence. Pour un artisan dégageant 50 k€ de bénéfice annuel, la perte de revenu en cas d'arrêt prolongé peut atteindre 80% du revenu habituel. La prévoyance privée comble ce gap : indemnités journalières dès J0, rente invalidité jusqu'à 70% du revenu, capital décès jusqu'à 8 ans de revenus pour la famille. Conformément à la Loi Madelin (art. 154 bis CGI), les cotisations sont déductibles du bénéfice imposable. Cette page distingue la prévoyance TNS de la mutuelle santé (page dédiée /mutuelle-tns), détaille les garanties indispensables, les tarifs 2026 par profil et compare les principaux contrats."
      legalReference="Article 154 bis du CGI — Loi Madelin du 11 février 1994"
      isObligatoire={false}
      benefits={[
        {
          icon: '🩹',
          title: 'IJ dès J0',
          desc: 'Indemnité journalière sans carence (vs 3-7 jours pour la Sécu) — choix du montant 50 à 500€/jour',
        },
        {
          icon: '♿',
          title: 'Rente invalidité',
          desc: "Jusqu'à 70% du revenu en cas d'invalidité permanente (1er, 2e ou 3e degré)",
        },
        {
          icon: '💼',
          title: 'Capital décès famille',
          desc: "Jusqu'à 8 ans de revenu versé en capital + rente conjoint + rente éducation enfants",
        },
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: 'Cotisations déductibles du bénéfice imposable (plafond commun santé+prévoyance)',
        },
      ]}
      sections={[
        {
          h2: 'Prévoyance vs mutuelle santé : la confusion à éviter',
          body: (
            <>
              <p>Beaucoup de TNS confondent ces deux contrats — pourtant complémentaires :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">MUTUELLE santé</th>
                    <th className="border p-2 text-left">PRÉVOYANCE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Couvre quoi</strong>
                    </td>
                    <td className="border p-2">
                      Frais médicaux quotidiens (consultations, médicaments, optique, dentaire,
                      hospitalisation)
                    </td>
                    <td className="border p-2">
                      Perte de revenu (IJ + rente invalidité + capital décès)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Risque géré</strong>
                    </td>
                    <td className="border p-2">Le QUOTIDIEN</td>
                    <td className="border p-2">Les COUPS DURS (arrêt long, invalidité, décès)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Bénéficiaire</strong>
                    </td>
                    <td className="border p-2">Le TNS lui-même + famille</td>
                    <td className="border p-2">Le TNS + famille (capital décès)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Cotisation moyenne TNS 35 ans</strong>
                    </td>
                    <td className="border p-2">42 € – 65 €/mois</td>
                    <td className="border p-2">85 € – 220 €/mois</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Madelin déductible</strong>
                    </td>
                    <td className="border p-2">Oui (plafond commun)</td>
                    <td className="border p-2">Oui (plafond commun)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>
                  Pour un artisan, la PRÉVOYANCE est encore plus critique que la mutuelle
                </strong>{' '}
                : un arrêt de travail de 3 mois suite à un accident BTP = revenus à zéro (la Sécu
                verse ~22-65 €/jour seulement). Sans prévoyance, c&apos;est l&apos;asphyxie
                financière garantie. Voir aussi notre page dédiée mutuelle TNS pour la
                complémentaire santé.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs prévoyance TNS 2026 par profil',
          body: (
            <>
              <p>
                Tarifs indicatifs basés sur les barèmes 2026 de nos 6 partenaires (April Pro, MMA
                Pro, Generali, Allianz Vie, Aon, MetLife) — formule équilibrée : IJ 100€/jour +
                invalidité 70% du revenu + capital décès 4 ans :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil TNS</th>
                    <th className="border p-2 text-right">Revenu annuel</th>
                    <th className="border p-2 text-right">Cotisation mensuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Consultant 30 ans, non-fumeur, sans antécédent</td>
                    <td className="border p-2 text-right">40 k€</td>
                    <td className="border p-2 text-right">68 € – 110 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan BTP 35 ans (catégorie risque B)</td>
                    <td className="border p-2 text-right">45 k€</td>
                    <td className="border p-2 text-right">128 € – 220 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Profession libérale 40 ans (médecin généraliste)</td>
                    <td className="border p-2 text-right">75 k€</td>
                    <td className="border p-2 text-right">180 € – 320 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dirigeant SARL/SAS gérant majoritaire 45 ans</td>
                    <td className="border p-2 text-right">100 k€</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Couvreur-zingueur 38 ans (catégorie risque D)</td>
                    <td className="border p-2 text-right">55 k€</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Avocat 50 ans</td>
                    <td className="border p-2 text-right">90 k€</td>
                    <td className="border p-2 text-right">240 € – 420 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : âge (×1,5%/an), tabagisme (+30 à +60%), catégorie de risque
                professionnel (BTP &gt; libéral &gt; tertiaire), niveau d&apos;IJ choisi, franchise
                (15j / 30j / 90j), durée de versement (1 095 jours = 3 ans standard). Examen médical
                complémentaire au-delà de 200€/jour d&apos;IJ.
              </p>
            </>
          ),
        },
        {
          h2: "Les 5 garanties indispensables d'un contrat prévoyance TNS",
          body: (
            <>
              <ol>
                <li>
                  <strong>Indemnités journalières (IJ)</strong> : choix du montant (50 à 500
                  €/jour), franchise (15j / 30j / 90j), durée maximale 1 095 jours. Pour un artisan
                  : franchise 30j + IJ = 80% du revenu net journalier
                </li>
                <li>
                  <strong>Rente invalidité</strong> : 1er degré (33-66% IPP), 2e degré (66-100% IPP)
                  ou 3e degré (totale + tierce personne). Versée jusqu&apos;à 60-65 ans. Plafond 70%
                  du revenu
                </li>
                <li>
                  <strong>Capital décès</strong> : versé à la famille en cas de décès (maladie ou
                  accident). Recommandé : 4 à 8 ans de revenu
                </li>
                <li>
                  <strong>Rente de conjoint survivant</strong> : ~50% du revenu versé à vie au
                  conjoint (utile si conjoint sans revenu propre)
                </li>
                <li>
                  <strong>Rente éducation enfants</strong> : ~25% du revenu par enfant jusqu&apos;à
                  25 ans (poursuite des études)
                </li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Garantie « doublement capital décès accidentel » (×2 si accident)</li>
                <li>Garantie « hospitalisation forfait jour »</li>
                <li>Couverture maladie redoutée (cancer, AVC, infarctus → capital immédiat)</li>
                <li>
                  Garantie « rachat de cotisations » en cas d&apos;arrêt de travail (l&apos;assureur
                  paie vos cotisations)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Madelin : la fiscalité qui change tout',
          body: (
            <>
              <p>
                Conformément à l&apos;article 154 bis du CGI, les cotisations prévoyance d&apos;un
                contrat Madelin sont <strong>déductibles du bénéfice imposable</strong> dans le
                plafond annuel commun santé + prévoyance :
              </p>
              <p className="my-3 border-l-4 border-primary-500 bg-gray-50 p-3">
                <strong>Plafond Madelin santé + prévoyance</strong> = 3,75% du PASS + 7% du bénéfice
                imposable, dans la limite de 3% de 8 PASS.
              </p>
              <p>Avec PASS 2026 = 47 100 €, pour un bénéfice de 60 k€ :</p>
              <ul>
                <li>Plafond annuel = ~5 826 € (commun santé + prévoyance)</li>
                <li>Si vous cotisez 2 200 €/an en prévoyance : 100% déductibles</li>
                <li>Économie d&apos;impôt nette à TMI 30% : ~660 €/an</li>
                <li>+ économie cotisations sociales (~25-32% selon statut)</li>
              </ul>
              <p>
                <strong>Conditions cumulatives</strong> : être TNS (EI, EURL, gérant majoritaire
                SARL, profession libérale BNC), être à jour des cotisations sociales obligatoires,
                contrat étiqueté Madelin par l&apos;assureur, rentes versées au TNS sous forme
                d&apos;arrérages (pas de rachat capital).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle différence entre prévoyance TNS et mutuelle santé TNS ?',
          a: "MUTUELLE = remboursement des frais médicaux courants (consultations, médicaments, optique, dentaire, hospitalisation). PRÉVOYANCE = compensation de la perte de revenu (IJ en cas d'arrêt de travail + rente invalidité + capital décès famille). Les deux sont complémentaires et toutes les deux déductibles dans le plafond Madelin commun.",
        },
        {
          q: 'Combien coûte une prévoyance TNS en 2026 ?',
          a: "Démarre à 68€/mois pour un consultant tertiaire 30 ans non-fumeur (formule équilibrée IJ 100€/jour + invalidité 70% + capital décès 4 ans). Médiane marché : 128-220€/mois pour un artisan BTP 35 ans (catégorie risque B). Variables : âge, statut tabagique, catégorie de risque professionnel (BTP > libéral > tertiaire), niveau d'IJ choisi.",
        },
        {
          q: 'Pourquoi la prévoyance est-elle plus critique que la mutuelle pour un artisan ?',
          a: "Parce qu'un arrêt de travail = revenus à zéro pour un artisan TNS. La Sécu ne verse que 22-65€/jour d'IJ après 3 jours de carence. Pour un artisan dégageant 50 k€/an de bénéfice (~150€/jour de revenu net), c'est 60-85% de perte de revenu. Sans prévoyance, un arrêt de 2-3 mois = asphyxie financière (charges fixes + remboursement prêt pro continuent à courir).",
        },
        {
          q: "Quel niveau d'IJ choisir ?",
          a: "Calcul : IJ = 80% du revenu NET journalier souhaité (la Sécu verse 22-65€/jour qui s'ajoutent à votre IJ privée). Pour un revenu net de 150€/jour : IJ ~120€/jour est cohérent. Au-delà de 200€/jour d'IJ, examen médical complémentaire requis. Plafond pratique : 500€/jour.",
        },
        {
          q: 'Auto-entrepreneur : peut-il souscrire une prévoyance Madelin ?',
          a: "Pas en régime micro-fiscal classique (versement libératoire) — pas de déduction Madelin possible. Pour bénéficier de Madelin, basculer au régime réel d'imposition. Démarche pertinente dès que le bénéfice dépasse ~30 k€/an. Alternative : prévoyance individuelle non-Madelin (cotisation NON déductible mais accessible à tous statuts).",
        },
        {
          q: 'À quel âge limite peut-on souscrire une prévoyance TNS ?',
          a: "Souscription possible jusqu'à 60-65 ans selon les contrats. Au-delà, les garanties IJ et invalidité s'arrêtent automatiquement (durée de versement maximale = 60-65 ans). Le capital décès peut être maintenu jusqu'à 75-85 ans selon contrat. Recommandation : souscrire AVANT 40 ans pour optimiser les cotisations (tarif jeune verrouillé).",
        },
        {
          q: 'Comment résilier ma prévoyance TNS ?',
          a: "Loi Hamon : résiliation possible à tout moment APRÈS 1 an d'engagement, sans frais. Lettre recommandée AR. Effet : 1 mois après réception. Le nouvel assureur peut faire la démarche pour vous (mandat). ATTENTION : ne pas résilier sans avoir validé que le nouvel assureur a déjà émis le contrat (continuité de couverture) — sinon période de carence appliquée par le nouveau contrat.",
        },
      ]}
    />
  )
}

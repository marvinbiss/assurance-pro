/**
 * Pilier — "travaux sans garantie décennale" (250 vol, KD 0)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'travaux-sans-garantie-decennale'
const TITLE = 'Travaux sans Garantie Décennale — Risques et alternatives'
const TAGLINE =
  'Travaux réalisés sans décennale : risques pour le propriétaire (vente immobilière bloquée, défaut couverture sinistre) et options de régularisation.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Travaux sans décennale : conséquences vente immobilière, vérification ouvrage par notaire, régularisation possible (DO rétroactive), recours contre constructeur.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Vous découvrez que des travaux ont été réalisés sans décennale (constructeur disparu, défaut administratif, exercice illégal) ? Cette page explique les conséquences réelles pour vous (propriétaire ou acheteur), les recours possibles, et les options de régularisation a posteriori."
      legalReference="art. 1792 Code civil + art. L. 243-3 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚠️',
          title: 'Vente immobilière bloquée',
          desc: 'Le notaire vérifie obligatoirement la décennale &lt; 10 ans avant vente',
        },
        {
          icon: '🛡️',
          title: 'DO rétroactive possible',
          desc: 'Dommages-Ouvrage souscriptible a posteriori pour régulariser',
        },
        {
          icon: '⚖️',
          title: 'Recours contre constructeur',
          desc: 'Responsabilité personnelle illimitée 10 ans même sans assurance',
        },
        {
          icon: '🆘',
          title: 'Solutions de régularisation',
          desc: 'Expertise technique + DO rétro + médiation possible',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi un constructeur peut être sans décennale',
          body: (
            <ul>
              <li>
                <strong>Exercice illégal de l&apos;activité</strong> (sanctionné Art. L. 243-3 :
                75k€ + 6 mois prison)
              </li>
              <li>
                <strong>Constructeur a fait faillite ou disparu</strong> sans transférer dossiers
              </li>
              <li>
                <strong>Activité étrangère non agréée ACPR</strong> (LPS européen non couvert)
              </li>
              <li>
                <strong>Travaux réalisés &quot;au noir&quot;</strong> (artisan non déclaré, pas de
                SIREN)
              </li>
              <li>
                <strong>Sous-traitant non assuré</strong> sans déclaration au donneur d&apos;ordre
              </li>
              <li>
                <strong>Erreur administrative</strong> (oubli renouvellement, contestation prime)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Conséquences pour le propriétaire / acheteur',
          body: (
            <>
              <p>
                <strong>Lors d&apos;une vente immobilière</strong> :
              </p>
              <ul>
                <li>
                  Le notaire vérifie OBLIGATOIREMENT la décennale pour tous travaux &lt; 10 ans
                </li>
                <li>Absence d&apos;attestation valide = blocage de la vente</li>
                <li>Acheteur peut négocier baisse de prix significative (-10 à -30%)</li>
                <li>Ou conditionner l&apos;achat à une régularisation préalable</li>
              </ul>
              <p>
                <strong>En cas de sinistre dans les 10 ans</strong> :
              </p>
              <ul>
                <li>Pas d&apos;indemnisation par assureur (puisque pas de contrat)</li>
                <li>
                  Recours possible uniquement contre le constructeur (souvent insolvable si
                  faillite)
                </li>
                <li>
                  Si vous aviez une DO active : indemnisation possible, puis subrogation contre
                  constructeur
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Solutions de régularisation',
          body: (
            <ol>
              <li>
                <strong>Souscrire une Dommages-Ouvrage rétroactive</strong> : possible chez certains
                assureurs (Allianz, MMA, Generali) jusqu&apos;à 5 ans après réception, coût 3-8k€
                pour maison individuelle.
              </li>
              <li>
                <strong>Demander une expertise technique amiable</strong> : ingénieur structure ou
                cabinet expertise immobilière (1 500-3 500€) pour évaluer solidité réelle de
                l&apos;ouvrage.
              </li>
              <li>
                <strong>Engager poursuites contre constructeur</strong> : si encore en activité ou
                solvable. Délai prescription 10 ans à compter de réception.
              </li>
              <li>
                <strong>Saisir le Médiateur de l&apos;Assurance</strong> : si refus DO rétroactive
                abusif.
              </li>
              <li>
                <strong>Acceptation du risque</strong> : si ouvrage solide et acheteur informé,
                vente possible avec décote prix.
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment vérifier si mes travaux étaient assurés ?',
          a: 'Demander attestation décennale au constructeur (obligation légale de remise). Si pas de réponse : consulter le registre Refassu de l&apos;ACPR (assureurs agréés) avec nom + SIREN du constructeur. Notaire peut aussi vérifier lors d&apos;une vente.',
        },
        {
          q: 'Mon constructeur a disparu, quels recours ?',
          a: 'Si entreprise en faillite : déclaration créance auprès du mandataire judiciaire (souvent indemnisation faible). Si entreprise dissoute : recours quasi-impossible. Solution : DO rétroactive + expertise + acceptation risque.',
        },
        {
          q: 'Peut-on vendre une maison avec travaux sans décennale ?',
          a: 'Oui mais avec difficulté. Le notaire informera l&apos;acheteur. Solutions : 1) Souscrire DO rétroactive avant vente. 2) Négocier décote prix (-15-30%). 3) Garantie personnelle vendeur (engagement à indemniser si sinistre dans les 10 ans).',
        },
        {
          q: 'Combien coûte une DO rétroactive ?',
          a: 'Pour maison individuelle de 100-150m² : 3 000-8 000€ (selon ancienneté travaux + sinistralité passée). Possible jusqu&apos;à 5 ans après réception chez certains assureurs (Allianz, MMA). Au-delà : très difficile / impossible.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale obligatoire (sanctions)', slug: 'assurance-decennale-obligatoire' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
        { name: 'Pour quels travaux ?', slug: 'garantie-decennale-obligatoire-pour-quels-travaux' },
      ]}
    />
  )
}

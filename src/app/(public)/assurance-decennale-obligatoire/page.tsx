/**
 * Pilier — "assurance décennale obligatoire" (TIER S — 300 vol/mois, KD 5)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-obligatoire'
const TITLE = 'Assurance Décennale Obligatoire — Pour qui ? Sanctions, durée, plafonds'
const TAGLINE =
  'Tout savoir sur l&apos;obligation de souscrire une décennale : qui est concerné (Loi Spinetta), sanctions pénales si défaut, durée 10 ans, plafonds légaux.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale obligatoire : qui est concerné (Loi Spinetta, art. 1792-1), durée 10 ans, sanctions pénales (75 000€ amende + 6 mois prison). Plafonds, exceptions, vérifications.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale est obligatoire en France depuis la Loi Spinetta du 4 janvier 1978 (art. 1792-1 Code civil + art. L. 241-1 Code des assurances). Tout constructeur — au sens large (artisan, entreprise BTP, architecte, maître d'œuvre, CMI, promoteur, sous-traitant) — qui réalise des travaux susceptibles d'affecter la solidité ou la destination d'un ouvrage doit obligatoirement souscrire une décennale AVANT le démarrage du chantier. Cette page détaille qui est concerné, les exceptions, les sanctions et les vérifications à effectuer."
      legalReference="Loi Spinetta 1978 + art. 1792-1 Code civil + art. L. 241-1 et L. 243-3 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'Loi Spinetta — obligation absolue',
          desc: 'Aucune exception métier BTP. Y compris AE et sous-traitants.',
        },
        {
          icon: '⚠️',
          title: 'Sanctions pénales lourdes',
          desc: '75 000€ amende + 6 mois prison (art. L. 243-3 C. assur.)',
        },
        {
          icon: '⏱️',
          title: '10 ans de garantie',
          desc: 'À compter du PV de réception des travaux',
        },
        {
          icon: '🔒',
          title: 'Souscrite AVANT chantier',
          desc: 'Attestation présentable au maître d&apos;ouvrage en amont',
        },
      ]}
      sections={[
        {
          h2: 'Qui est concerné par l&apos;obligation décennale ?',
          body: (
            <>
              <p>
                <strong>Article 1792-1 Code civil</strong> : est réputé constructeur de
                l&apos;ouvrage et donc soumis à décennale :
              </p>
              <ol>
                <li>
                  Tout architecte, entrepreneur, technicien ou autre personne liée au maître de
                  l&apos;ouvrage par un contrat de louage d&apos;ouvrage
                </li>
                <li>
                  Toute personne qui vend, après achèvement, un ouvrage qu&apos;elle a construit ou
                  fait construire
                </li>
                <li>
                  Toute personne qui, bien qu&apos;agissant en qualité de mandataire du
                  propriétaire, accomplit une mission assimilable à celle d&apos;un locateur
                  d&apos;ouvrage
                </li>
              </ol>
              <p>
                Concrètement : artisans BTP (52 métiers couverts), entreprises BTP toutes tailles,
                architectes DPLG, maîtres d&apos;œuvre, BET, CMI, promoteurs, sous-traitants en lien
                direct avec le MO, auto-entrepreneurs BTP.
              </p>
            </>
          ),
        },
        {
          h2: 'Sanctions en cas de défaut de décennale',
          body: (
            <>
              <p>
                <strong>Pénales (art. L. 243-3 C. assur.)</strong> :
              </p>
              <ul>
                <li>
                  Amende jusqu&apos;à 75 000€ pour personne physique, 375 000€ pour personne morale
                </li>
                <li>Peine d&apos;emprisonnement jusqu&apos;à 6 mois</li>
                <li>
                  Peines complémentaires possibles : interdiction d&apos;exercer, publication
                  jugement
                </li>
              </ul>
              <p>
                <strong>Civiles</strong> :
              </p>
              <ul>
                <li>Responsabilité personnelle illimitée du constructeur sur 10 ans</li>
                <li>
                  Patrimoine personnel exposé (pour AE) ou patrimoine du dirigeant en cas de faute
                  de gestion
                </li>
                <li>Saisie possible des biens en cas de jugement défavorable</li>
              </ul>
              <p>
                <strong>Commerciales</strong> :
              </p>
              <ul>
                <li>
                  Impossible de soumettre à appel d&apos;offres public ou privé exigeant attestation
                </li>
                <li>Vente immobilière bloquée chez le notaire (vérification obligatoire)</li>
                <li>Maître d&apos;ouvrage peut refuser le chantier ou suspendre paiement</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Exceptions et cas particuliers',
          body: (
            <ul>
              <li>
                <strong>Travaux pour soi-même</strong> (auto-construction sans intervention pro) :
                pas d&apos;obligation décennale (mais responsabilité personnelle si revente &lt;10
                ans)
              </li>
              <li>
                <strong>Ouvrages non immobiliers</strong> : pas concernés (ex : aménagement
                intérieur non fixé, mobilier urbain)
              </li>
              <li>
                <strong>Travaux mineurs n&apos;affectant ni solidité ni destination</strong> :
                peuvent relever de la RC Pro ou parfait achèvement seulement (à valider au cas par
                cas)
              </li>
              <li>
                <strong>Sous-traitant indirect</strong> (sans lien contractuel avec MO) : RC Pro
                obligatoire mais décennale du donneur d&apos;ordre couvre l&apos;ouvrage
              </li>
            </ul>
          ),
        },
        {
          h2: 'Vérifications à effectuer',
          body: (
            <>
              <p>Pour vous assurer de votre conformité :</p>
              <ol>
                <li>
                  Vérifier que l&apos;assureur est <strong>agréé ACPR</strong> (ou passeport
                  européen LPS reconnu)
                </li>
                <li>
                  Vérifier que les <strong>métiers et activités déclarés couvrent</strong> ce que
                  vous facturez réellement
                </li>
                <li>
                  Confirmer le <strong>plafond par sinistre</strong> (minimum recommandé 1M€ AE,
                  2-3M€ SARL)
                </li>
                <li>
                  Vérifier la <strong>période de validité</strong> (1 an renouvelable, à renouveler
                  AVANT échéance)
                </li>
                <li>Conserver attestation présentable au MO en début de chantier</li>
                <li>
                  En cas de cessation d&apos;activité : maintenir la <strong>postériorité</strong>{' '}
                  (subséquente) 10 ans
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Un auto-entrepreneur BTP doit-il vraiment avoir une décennale ?',
          a: 'OUI, aucune exception. Tout AE exerçant une activité de constructeur (peintre, plombier, électricien, etc.) doit souscrire une décennale AVANT le premier chantier. Sanctions identiques à toute autre forme juridique.',
        },
        {
          q: 'Que risque-t-on à exercer sans décennale ?',
          a: 'Pénal : 75 000€ amende + 6 mois prison (art. L. 243-3 C. assur.). Civil : responsabilité personnelle illimitée 10 ans, patrimoine perso exposé. Commercial : appels d&apos;offres bloqués, vente immobilière de l&apos;ouvrage refusée chez notaire.',
        },
        {
          q: 'La décennale couvre-t-elle tous les travaux ?',
          a: 'Non. Elle couvre les dommages affectant la SOLIDITÉ de l&apos;ouvrage ou le rendant IMPROPRE à sa destination. Les défauts esthétiques ou les vices apparents relèvent de la garantie de parfait achèvement (1 an) ou biennale (2 ans).',
        },
        {
          q: 'Combien de temps dure l&apos;obligation décennale ?',
          a: '10 ans à compter de la réception (signature du PV de réception). En cas de cessation d&apos;activité avant les 10 ans, la postériorité (subséquente) doit être maintenue par l&apos;assureur jusqu&apos;à expiration de la garantie sur les chantiers antérieurs.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
      ]}
    />
  )
}

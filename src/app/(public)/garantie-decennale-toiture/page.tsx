/**
 * Pilier — "garantie décennale toiture" (TIER S — 400 vol/mois, KD 1)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'garantie-decennale-toiture'
const TITLE = 'Garantie Décennale Toiture — Couvreur, étancheur, charpentier'
const TAGLINE =
  'La décennale toiture couvre les défauts d&apos;étanchéité, infiltrations et effondrements de charpente pendant 10 ans. Tarifs couvreur, étancheur, charpentier 2026.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Garantie décennale toiture : obligation Loi Spinetta pour couvreur, étancheur, charpentier. Tarif 1 800-3 500€/an (AE) à 4 500€/an (SARL). Infiltrations + effondrement couverts.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La garantie décennale toiture s'applique à tous les professionnels intervenant sur la couverture, l'étanchéité et la charpente d'un bâtiment : couvreur-zingueur, étancheur, charpentier (bois ou métallique), bardeur. Elle couvre pendant 10 ans à compter de la réception les défauts qui affectent la solidité de la couverture ou la rendent impropre à sa destination (infiltrations massives, effondrement partiel, défaut d'étanchéité bardage)."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '🏠',
          title: '10 ans à réception',
          desc: 'Couverture étanchéité + structure charpente',
        },
        {
          icon: '💧',
          title: 'Infiltrations + sinistres',
          desc: 'Indemnisation maître d&apos;ouvrage en cas de défaut',
        },
        {
          icon: '💰',
          title: '1 800-4 500€/an',
          desc: 'AE 1 800-3 500€ • SARL/SAS 2 800-4 500€+ (risque élevé)',
        },
        {
          icon: '🏗️',
          title: '4 métiers concernés',
          desc: 'Couvreur, étancheur, charpentier bois/métal, bardeur',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi le couvreur est très exposé en décennale',
          body: (
            <>
              <p>
                La toiture représente <strong>~25% des sinistres décennaux</strong> (AQC SYCODÉS) :
              </p>
              <ul>
                <li>
                  Infiltrations par solins, faîtage, raccords cheminée — sinistre N+2 à N+8 fréquent
                </li>
                <li>Glissement de tuiles, soulèvement par vent fort</li>
                <li>Défauts d&apos;étanchéité bardage / zinguerie</li>
                <li>Effondrement charpente (rare mais catastrophique : 100 000-500 000€)</li>
                <li>Condensation sous toiture mal ventilée → moisissures combles</li>
              </ul>
              <p>
                La sinistralité toiture explique pourquoi la prime est 2-3x supérieure aux métiers
                BTP de finition (peintre, plaquiste).
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs par métier toiture (2026)',
          body: (
            <ul>
              <li>
                <strong>Couvreur-zingueur auto-entrepreneur</strong> : 2 200-3 500€/an
              </li>
              <li>
                <strong>Étancheur AE</strong> (terrasse + toits-terrasses) : 2 500-4 200€/an
              </li>
              <li>
                <strong>Charpentier bois AE</strong> : 2 400-3 800€/an
              </li>
              <li>
                <strong>Charpentier métallique AE</strong> : 2 800-4 500€/an
              </li>
              <li>
                <strong>Bardeur AE</strong> : 2 200-3 500€/an
              </li>
              <li>
                <strong>SARL/SAS couvreur</strong> : 3 500-7 500€/an
              </li>
              <li>
                <strong>SARL/SAS étancheur</strong> : 4 000-9 000€/an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Qualifications recommandées pour réduire la prime',
          body: (
            <>
              <p>Certaines qualifications donnent accès à des tarifs préférentiels (-5 à -15%) :</p>
              <ul>
                <li>
                  <strong>Qualibat 3111, 3112, 3122</strong> (couverture)
                </li>
                <li>
                  <strong>Qualibat 3211, 3212</strong> (étanchéité)
                </li>
                <li>
                  <strong>Qualibat 4411, 4413</strong> (charpente bois)
                </li>
                <li>
                  <strong>RGE Qualibat / RGE Qualit&apos;EnR</strong> pour les couvreurs PV
                </li>
                <li>
                  <strong>SOPREMA Pro, IKO Pro</strong> certifications fabricants étanchéité
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La décennale couvre-t-elle les fuites de toiture après réception ?',
          a: "Oui, si le défaut affecte l'étanchéité globale ou rend la toiture impropre à sa destination (infiltrations massives, multiples points de fuite). Une fuite isolée mineure peut relever de la garantie de parfait achèvement (1 an) ou biennale (2 ans), pas systématiquement décennale.",
        },
        {
          q: 'Quel plafond pour une décennale couvreur ?',
          a: 'Minimum légal Spinetta : non plafonné (couverture intégrale du sinistre dans la limite contractuelle). Les assureurs fixent généralement 1-2M€ par sinistre pour AE, 3-5M€ pour SARL/SAS. Vérifier sur attestation.',
        },
        {
          q: 'Que se passe-t-il si je sous-traite la couverture ?',
          a: "Vous restez responsable décennalement vis-à-vis du maître d'ouvrage (lien contractuel direct). Vérifier que votre sous-traitant a aussi sa décennale + attestation valide. Sinon, votre couverture peut être réduite ou refusée.",
        },
        {
          q: 'La décennale couvre-t-elle les panneaux photovoltaïques en toiture ?',
          a: "Oui, mais nécessite une qualification RGE + souvent une extension décennale photovoltaïque. Sans cette extension, l'installation PV est exclue. Couverture spécifique 800-2 000€/an additionnel.",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pas chère (économies)', slug: 'assurance-decennale-pas-cher' },
        { name: 'Multirisque BTP', slug: 'assurance-btp' },
      ]}
    />
  )
}

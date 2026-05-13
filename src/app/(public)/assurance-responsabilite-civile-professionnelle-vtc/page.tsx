/**
 * Pilier — "assurance responsabilité civile professionnelle vtc" (200 vol, KD 1, CPC 250€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-responsabilite-civile-professionnelle-vtc'
const TITLE = 'Assurance Responsabilité Civile Professionnelle VTC — Décret 2014'
const TAGLINE =
  "L'assurance RC Professionnelle VTC est imposée par le décret 2014-371 : plafonds 1.5M€ corporel + 1M€ matériel mini. Comparatif Wakam, Stello, Hiscox, AXA."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Professionnelle VTC : obligation légale décret 2014-371, plafond mini 1.5M€ corporel. Tarifs 280-650€/an (AE), 450-1 200€/an (SARL). 4 assureurs comparés.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance Responsabilité Civile Professionnelle (RC Pro) est imposée légalement à tout chauffeur VTC inscrit au registre EVTC (décret 2014-371 du 26 mars 2014 + Code des transports R. 3122-3). Elle se distingue de l'assurance automobile classique : la RC Pro VTC couvre les dommages causés aux passagers et tiers dans l'exercice professionnel, tandis que l'assurance auto couvre le véhicule lui-même."
      legalReference="Décret 2014-371 + Code des transports R. 3122-3 + art. L. 124-3 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation décret 2014-371',
          desc: 'Indispensable inscription registre EVTC préfecture',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1.5M€ corporel + 1M€ matériel',
          desc: 'Minima légaux. Recommandé 3-5M€ pour activité intense',
        },
        {
          icon: '💰',
          title: '280-1 200€/an',
          desc: 'AE débutant 280-450€ • Expérimenté 350-550€ • SARL 450-1 200€',
        },
        {
          icon: '🔍',
          title: '4 assureurs compétitifs',
          desc: 'Wakam (best AE) • Stello (digital) • Hiscox (luxe) • AXA Pro',
        },
      ]}
      sections={[
        {
          h2: 'Distinction RC Pro VTC vs assurance auto VTC',
          body: (
            <>
              <p>Les 2 sont obligatoires mais distinctes :</p>
              <ul>
                <li>
                  <strong>Assurance auto VTC</strong> (art. L. 211-1) : couvre{' '}
                  <strong>votre véhicule</strong> (vol, incendie, dégâts, accidents responsable)
                </li>
                <li>
                  <strong>RC Pro VTC</strong> (décret 2014-371) : couvre les{' '}
                  <strong>dommages causés à des tiers</strong> (passagers, autres usagers route)
                  dans l&apos;exercice de votre activité de transport
                </li>
              </ul>
              <p>
                Stello propose un contrat unique 2-en-1 qui simplifie la gestion. Les autres
                assureurs vendent les 2 contrats séparément.
              </p>
            </>
          ),
        },
        {
          h2: 'Pièces nécessaires pour souscrire',
          body: (
            <ol>
              <li>
                <strong>Carte VTC nationale</strong> (délivrée par la préfecture après formation et
                examen)
              </li>
              <li>
                <strong>Numéro d&apos;inscription au registre EVTC</strong>
              </li>
              <li>
                <strong>Carte grise du véhicule</strong> (mention &quot;transport public de
                personnes&quot;)
              </li>
              <li>
                <strong>Permis B en cours de validité</strong> (recto-verso)
              </li>
              <li>
                <strong>Justificatif d&apos;identité</strong>
              </li>
              <li>
                <strong>RIB</strong> pour le paiement
              </li>
              <li>
                <strong>Relevé d&apos;information assurance auto précédent</strong> (si déjà assuré)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Garanties complémentaires utiles',
          body: (
            <ul>
              <li>
                <strong>Protection juridique</strong> : litiges clients (réclamations Uber/Bolt),
                administration (PV), accidents. +60-120€/an.
              </li>
              <li>
                <strong>Perte d&apos;exploitation</strong> : indemnité journalière si véhicule
                immobilisé. +80-180€/an, idéal si activité full-time.
              </li>
              <li>
                <strong>Assistance véhicule professionnel</strong> : remorquage + véhicule de
                remplacement conforme VTC.
              </li>
              <li>
                <strong>Effets personnels passagers</strong> : couvre bagages clients en cas
                d&apos;accident.
              </li>
              <li>
                <strong>Catastrophes naturelles + tempête</strong> : inclus en formule TR.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: "Quelle différence entre RC Pro VTC et l'assurance auto VTC ?",
          a: "L'assurance auto VTC couvre votre véhicule (obligatoire art. L. 211-1). La RC Pro VTC couvre les dommages causés à des tiers dans votre activité professionnelle (obligatoire décret 2014-371). Vous avez besoin des DEUX.",
        },
        {
          q: 'Combien coûte une RC Pro VTC en 2026 ?',
          a: 'AE débutant (1ère année) : 280-450€/an. AE expérimenté (3+ ans) : 350-550€/an. SARL/EURL : 450-900€/an. Flotte multi-chauffeurs : 250-450€/an/chauffeur. Activité haut de gamme : 600-1 200€/an.',
        },
        {
          q: 'Wakam ou Stello pour un VTC débutant ?',
          a: 'Wakam = leader VTC France, tarif compétitif sur AE (280-350€/an). Stello = challenger pure-digital, contrat 2-en-1 (auto + RC Pro), bon rapport prix/garanties (350-450€/an). À profil égal, comparer les 2.',
        },
        {
          q: 'Peut-on exercer en VTC sans RC Pro ?',
          a: 'Non — interdit. Sans RC Pro : retrait carte VTC, suspension registre EVTC, amende 1 500€, et patrimoine personnel exposé en cas d&apos;accident grave (frais médicaux passagers, indemnisation préjudice).',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro VTC (vue globale)', slug: 'rc-pro-vtc' },
        { name: 'Assurance RC Pro VTC', slug: 'assurance-rc-pro-vtc' },
        { name: 'Assurance VTC complète', slug: 'assurance-vtc' },
        { name: 'RC Pro convoyage', slug: 'rc-pro-convoyage' },
        { name: 'Assurance taxi', slug: 'assurance-taxi' },
      ]}
    />
  )
}

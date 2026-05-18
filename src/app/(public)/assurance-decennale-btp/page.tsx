/**
 * Pilier — "assurance décennale btp" (TIER A — 300 vol/mois, KD 12, CPC 700€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-btp'
const TITLE = 'Assurance Décennale BTP — 52 métiers, tarifs, comparatif 2026'
const TAGLINE =
  'La décennale BTP est obligatoire (Loi Spinetta) pour 52 métiers : maçon, plombier, électricien, couvreur, etc. Tarifs 2026 et comparatif April Pro, SMABTP, Allianz Pro, Hiscox.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale BTP : tarif par métier (peintre 950€, plombier 1400€, maçon 2500€). Comparatif April Pro vs SMABTP vs Allianz Pro vs Hiscox. Devis 24h gratuit.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale BTP est obligatoire pour tous les professionnels du Bâtiment et des Travaux Publics intervenant sur la structure ou les éléments faisant corps d'un ouvrage (Loi Spinetta 1978 + art. 1792 Code civil). Elle couvre pendant 10 ans à compter de la réception les dommages affectant la solidité de l'ouvrage ou le rendant impropre à sa destination. 52 métiers BTP sont concernés : du gros œuvre (maçon, charpentier) au second œuvre (plombier, électricien) en passant par les finitions (peintre, carreleur)."
      legalReference="Loi Spinetta 1978 + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: '52 métiers BTP couverts',
          desc: 'Gros œuvre, second œuvre, finitions, équipements techniques, RGE ou Qualibat',
        },
        {
          icon: '⚖️',
          title: 'Obligation Loi Spinetta',
          desc: 'Aucune exception, y compris auto-entrepreneur. Sanctions pénales si défaut.',
        },
        {
          icon: '💰',
          title: '950€-15 000€ par an',
          desc: 'AE peintre 950€ • Maçon SARL 2 500-5 000€ • Multi-services BTP SAS 15 000€+',
        },
        {
          icon: '⏱️',
          title: '10 ans à réception',
          desc: 'Garantie active 10 ans à compter du PV de réception',
        },
      ]}
      sections={[
        {
          h2: 'Les 52 métiers BTP soumis à décennale',
          body: (
            <>
              <p>Liste exhaustive (catégories Qualibat ou RGE) :</p>
              <ul>
                <li>
                  <strong>Gros œuvre</strong> (6) : Maçon, terrassier, charpentier bois ou métal,
                  démolisseur, foreur géothermie
                </li>
                <li>
                  <strong>Couverture ou étanchéité</strong> (4) : Couvreur-zingueur, étancheur,
                  bardeur, façadier ITE
                </li>
                <li>
                  <strong>Plomberie ou CVC</strong> (5) : Plombier, chauffagiste, climaticien,
                  sanitaire
                </li>
                <li>
                  <strong>Électricité ou domotique</strong> (4) : Électricien, domoticien, alarme,
                  fibre ou réseau
                </li>
                <li>
                  <strong>Menuiserie</strong> (5) : Menuisier int ou ext, agenceur ou cuisiniste,
                  escaliéreur, parqueteur
                </li>
                <li>
                  <strong>Finitions</strong> (6) : Peintre, plaquiste, carreleur, solier, vitrier,
                  serrurier
                </li>
                <li>
                  <strong>Spécialités</strong> (9) : Pisciniste, paysagiste, élagueur, désamianteur,
                  ascensoriste, cheminée, véranda
                </li>
                <li>
                  <strong>Conception ou MOE</strong> (6) : Architecte intérieur, DPLG, MOE, BET,
                  économiste, géomètre
                </li>
                <li>
                  <strong>Promotion</strong> (3) : CMI, promoteur, sous-traitant BTP
                </li>
                <li>
                  <strong>RGE ou énergie</strong> (5) : Photovoltaïque, PAC, poêle bois, isolation
                  ITE ou ITI, multi-services
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Comparatif April Pro vs SMABTP vs Allianz vs Hiscox',
          body: (
            <>
              <ul>
                <li>
                  <strong>April Pro</strong> : leader BTP français, best price sur AE et petites
                  SARL. Plafond standard 1-2M€. Postériorité 5 ans.
                </li>
                <li>
                  <strong>SMABTP</strong> : assureur paritaire historique, BTP-only. Solidité
                  maximale, prime souvent plus chère mais services premium.
                </li>
                <li>
                  <strong>Allianz Pro BTP</strong> : couverture large, plafond 3-5M€, postériorité
                  10 ans (excellente). Prime moyenne.
                </li>
                <li>
                  <strong>Hiscox</strong> : haut de gamme, plafond 2-10M€, postériorité 10 ans.
                  Idéal multi-services et structures complexes.
                </li>
                <li>
                  <strong>MMA Pro</strong> : alternative équilibrée, bon rapport prix ou garanties
                  pour SARL moyennes.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Sinistralité BTP par poste (AQC SYCODÉS 2024)',
          body: (
            <ul>
              <li>
                <strong>Couverture ou étanchéité</strong> : 24% des sinistres décennaux (le plus
                exposé)
              </li>
              <li>
                <strong>Plomberie ou CVC</strong> : 18% (infiltrations, fuites)
              </li>
              <li>
                <strong>Façades ou ITE</strong> : 14%
              </li>
              <li>
                <strong>Gros œuvre ou maçonnerie</strong> : 12% (fissures structurelles)
              </li>
              <li>
                <strong>Carrelage ou revêtements</strong> : 9%
              </li>
              <li>
                <strong>Menuiserie ext.</strong> : 7%
              </li>
              <li>
                <strong>Autres</strong> : 16%
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel est le prix d&apos;une décennale BTP ?',
          a: 'AE peintre 950€ par an, plombier AE 1 400€, maçon SARL 2 500-5 000€, multi-services BTP SAS 3 500-15 000€+ selon CA et sinistralité.',
        },
        {
          q: 'La décennale BTP couvre-t-elle la sous-traitance ?',
          a: 'Oui si déclarée et chiffrée au contrat. Sous-traitance non déclarée = exclusion automatique. Le sous-traitant doit aussi avoir sa propre décennale (vérifier attestation avant signature).',
        },
        {
          q: 'Comment réduire ma prime décennale BTP ?',
          a: '1) Comparer 5 assureurs spécialisés BTP via courtier ORIAS (-15-25%). 2) Augmenter franchise (-12-18%). 3) Obtenir Qualibat ou RGE (-5-10%). 4) Regrouper RC Pro + Décennale (-8-12%).',
        },
        {
          q: 'Que se passe-t-il si un sinistre déclenche ma décennale ?',
          a: 'L&apos;assureur indemnise le maître d&apos;ouvrage (ou subroge la DO du MO). Votre franchise s&apos;applique (300-3 000€). Votre prime peut être révisée à la hausse au renouvellement (+15-50% selon gravité).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Garantie décennale toiture', slug: 'garantie-decennale-toiture' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
        { name: 'Assurance artisan', slug: 'assurance-artisan' },
      ]}
    />
  )
}

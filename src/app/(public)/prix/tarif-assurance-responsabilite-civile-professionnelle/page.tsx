/**
 * Prix — "tarif assurance responsabilité civile professionnelle" (200 vol, KD 3, CPC 250€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix/tarif-assurance-responsabilite-civile-professionnelle'
const TITLE = 'Tarif Assurance Responsabilité Civile Professionnelle 2026'
const TAGLINE =
  'Tarif assurance responsabilité civile professionnelle 2026 : grilles complètes par profil et activité. AE 95€/an, SARL 600€/an, SAS PME 1 500€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Tarif assurance RC Pro 2026 vérifié : AE dès 95€/an, SARL 350-2 800€, SAS PME 2 500-15 000€. Comparatif 5 assureurs en parallèle.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tarif détaillé de l'assurance responsabilité civile professionnelle (RC Pro) en 2026, vérifié sur 1 000+ devis réels. Cette page présente les grilles tarifaires complètes par statut juridique, par activité et par assureur. Best price 2026 = Hiscox 95€/an pour AE services intellectuels (plafond 1M€ + postériorité 10 ans incluses)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '💼',
          title: 'Grilles complètes 2026',
          desc: 'Tous statuts, activités, plafonds, options',
        },
        {
          icon: '🥇',
          title: 'Best price identifié',
          desc: 'Hiscox 95€/an leader marché AE services',
        },
        {
          icon: '📈',
          title: 'Tendance marché',
          desc: 'Stabilité prix 2026 vs 2025 (+1-3% inflation contenue)',
        },
        {
          icon: '💰',
          title: '6 leviers économies',
          desc: 'Total -30-50% possible vs prime initiale',
        },
      ]}
      sections={[
        {
          h2: 'Tarif assurance RC Pro par statut',
          body: (
            <ul>
              <li>
                <strong>Micro-entreprise / auto-entrepreneur</strong> :
                <ul>
                  <li>Services intellectuels : 95-280€/an (best Hiscox)</li>
                  <li>Services manuels : 180-400€/an</li>
                  <li>BTP + décennale : 250-450€/an RC Pro + décennale obligatoire</li>
                </ul>
              </li>
              <li>
                <strong>EURL / SARL unipersonnelle</strong> :
                <ul>
                  <li>Services CA &lt; 100k€ : 350-700€/an</li>
                  <li>Services CA 100-300k€ : 600-1 200€/an</li>
                </ul>
              </li>
              <li>
                <strong>SARL multi-associés</strong> : 700-3 000€/an
              </li>
              <li>
                <strong>SAS / SASU services</strong> :
                <ul>
                  <li>CA 500k-1M€ : 1 400-2 800€/an</li>
                  <li>CA 1-3M€ : 2 500-5 000€/an</li>
                  <li>CA 3-10M€ : 4 500-15 000€/an (négocié)</li>
                </ul>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarif RC Pro par activité',
          body: (
            <ul>
              <li>
                <strong>Services intellectuels</strong> (consultant, IT, design) : 95-280€/an AE —
                600-1 200€/an SARL
              </li>
              <li>
                <strong>Services personnes</strong> (coach, formateur, esthéticienne) : 150-400€/an
                AE — 800-1 500€/an SARL
              </li>
              <li>
                <strong>BTP</strong> (artisan/PME) : 250-1 500€/an RC Pro + 950-25 000€/an décennale
                obligatoire
              </li>
              <li>
                <strong>Libéral réglementé</strong> (avocat, expert-comptable, notaire) : 800-5
                000€/an
              </li>
              <li>
                <strong>Médical / paramédical</strong> : 250-3 500€/an
              </li>
              <li>
                <strong>Immobilier</strong> (agent, syndic, courtier) : 600-2 500€/an + caution
              </li>
              <li>
                <strong>Mobilité</strong> (VTC, livreur, taxi) : 280-2 000€/an (souvent 2-en-1
                auto+RC)
              </li>
              <li>
                <strong>Commerce / e-commerce</strong> : 200-1 500€/an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarif RC Pro par assureur leader',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : best AE/SARL services intellectuels — 95-2 800€/an selon
                CA
              </li>
              <li>
                <strong>Stello</strong> : challenger digital pure — 90-2 500€/an, postériorité 5 ans
              </li>
              <li>
                <strong>Allianz Pro</strong> : multi-secteurs — 180-8 000€/an selon profil
              </li>
              <li>
                <strong>MMA Pro</strong> : réseau agences — 250-7 500€/an, conseil personnalisé
              </li>
              <li>
                <strong>AXA Pro</strong> : premium — 280-12 000€/an, programmes fidélité
              </li>
              <li>
                <strong>April Pro BTP</strong> : spécialiste BTP — 250-15 000€/an (RC + décennale)
              </li>
              <li>
                <strong>SMABTP</strong> : paritaire BTP — 350-25 000€/an, expertise sinistres BTP
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Tarif RC Pro évolue chaque année ?',
          a: 'OUI mais lentement : inflation contenue +1-3%/an. Renouvellement annuel automatique sauf résiliation. Pas de hausse brutale si sans sinistre. Renégocier tous les 2-3 ans via courtier ORIAS pour rester compétitif.',
        },
        {
          q: 'Peut-on négocier le tarif ?',
          a: 'NON sur tarifs Hiscox/Stello (tarification automatique). OUI sur tarifs Allianz/MMA/AXA via courtier ORIAS (économies 15-30% négociées). OUI sur grands comptes SAS PME (négociation directe).',
        },
        {
          q: 'Tarif RC Pro premier emploi vs après 5 ans ?',
          a: 'Première souscription : tarif standard. Après 5 ans sans sinistre : bonus -10-20% chez certains assureurs (Hiscox, Allianz Pro). Après sinistre : malus +30-100% pendant 3 ans. Historique sinistres = critère majeur tarification.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix assurance RC Pro', slug: 'prix/assurance-rc-pro-prix' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Tarif RC Pro AE', slug: 'prix/tarif-rc-pro-auto-entrepreneur' },
        { name: 'RC Pro prix', slug: 'prix/rc-pro-prix' },
        {
          name: 'Responsabilité civile pro tarif',
          slug: 'prix/responsabilite-civile-professionnelle-tarif',
        },
      ]}
    />
  )
}

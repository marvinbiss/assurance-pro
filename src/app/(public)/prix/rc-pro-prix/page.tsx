/**
 * Prix — "rc pro prix" (200 vol, KD 3, CPC 300€)
 */
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { buildPageMetadata } from '@/lib/seo/page-metadata'

export const revalidate = 86400
const SLUG = 'prix/rc-pro-prix'
const TITLE = 'RC Pro Prix 2026 — Combien coûte la responsabilité civile pro ?'
const TAGLINE =
  'RC Pro prix 2026 : AE dès 95€/an, SARL 600€/an, SAS PME 1 500€/an. Grilles par activité + 6 leviers économies + 4 pièges low-cost.'

export const metadata = buildPageMetadata({
  slug: SLUG,
  title: TITLE,
  tagline: TAGLINE,
  description:
    'RC Pro prix vérifié 2026 par statut/activité. Hiscox 95€/an best AE services. Allianz 600€/an SARL. 6 leviers économies. CPC 300€.',
  price: 'dès 95€/an',
})

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Combien coûte vraiment une RC Pro en 2026 ? Cette page synthétique répond à la question prix avec les fourchettes vérifiées par profil : auto-entrepreneur dès 95€/an chez Hiscox, SARL services à partir de 350€/an, SAS PME 1 500-5 000€/an, professions à risque (BTP, médical, libéral réglementé) jusqu'à 10-15 000€/an. Détail des 6 leviers d'économies et des 4 pièges à éviter."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        { icon: '💰', title: 'Dès 95€/an AE', desc: 'Hiscox best price AE services intellectuels' },
        { icon: '📊', title: 'Grilles par profil', desc: 'AE, SARL, SAS PME, libéral réglementé' },
        {
          icon: '🚀',
          title: '6 leviers économies',
          desc: 'Total -30-50% possible sur prime initiale',
        },
        {
          icon: '⚠️',
          title: '4 pièges low-cost',
          desc: 'Plafonds insuffisants, exclusions cachées, postériorité limitée',
        },
      ]}
      sections={[
        {
          h2: 'Fourchettes prix RC Pro 2026 par statut',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur</strong> : 95-450€/an (best Hiscox 95€)
              </li>
              <li>
                <strong>SARL services</strong> : 350-2 800€/an (best Hiscox/Allianz Pro)
              </li>
              <li>
                <strong>SAS PME services</strong> : 2 500-15 000€/an (négocié courtier)
              </li>
              <li>
                <strong>SARL BTP</strong> : 600-1 500€/an RC Pro + 4 500-8 000€/an décennale
              </li>
              <li>
                <strong>SAS BTP 20 salariés</strong> : 2 500-5 000€/an RC Pro + 15-25 000€/an
                décennale
              </li>
              <li>
                <strong>Libéral réglementé</strong> (avocat, expert-comptable, architecte) : 800-5
                000€/an
              </li>
              <li>
                <strong>Médical / paramédical</strong> : 250-3 500€/an (selon spécialité)
              </li>
              <li>
                <strong>Immobilier</strong> : 600-2 500€/an + caution Galian/CGI 2 000-15 000€/an
              </li>
              <li>
                <strong>Mobilité (VTC)</strong> : 280-2 000€/an (selon flotte)
              </li>
            </ul>
          ),
        },
        {
          h2: '6 leviers économies sur prime RC Pro',
          body: (
            <ol>
              <li>
                <strong>Comparer 3-5 assureurs via courtier ORIAS</strong> : -20-30% naturel sur
                tarif sans comparaison
              </li>
              <li>
                <strong>Augmenter franchise</strong> de 300 à 1 500€ : -15-20%
              </li>
              <li>
                <strong>Ajuster plafond</strong> à votre risque réel (500k€-1M€ AE, 1-2M€ SARL) :
                -10-20%
              </li>
              <li>
                <strong>Pack multi-contrats</strong> chez même assureur (RC Pro + cyber + auto pro)
                : -10-15%
              </li>
              <li>
                <strong>Paiement annuel</strong> vs mensualisation : -3-7%
              </li>
              <li>
                <strong>Souscription en ligne directe</strong> (Hiscox, Stello) : -10-15% sur
                commissions
              </li>
            </ol>
          ),
        },
        {
          h2: '4 pièges des contrats RC Pro low-cost',
          body: (
            <ol>
              <li>
                <strong>Plafond insuffisant &lt; 500k€</strong> : risque sous-assurance grave. Mini
                AE : 500k€. Mini SARL/SAS : 1M€.
              </li>
              <li>
                <strong>Exclusions étendues cachées</strong> : cyber, sous-traitance, conseil
                financier — lire toutes exclusions
              </li>
              <li>
                <strong>Postériorité limitée 2-3 ans</strong> : sinistres tardifs non couverts si
                cessation. Mini 5 ans, idéal 10 ans (Hiscox)
              </li>
              <li>
                <strong>Assureur non agréé ACPR</strong> : vérifier sur Refassu
                (acpr.banque-france.fr)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi RC Pro coûte si peu cher chez Hiscox ?',
          a: '1) Modèle 100% digital sur services intellectuels (économies opérationnelles). 2) Spécialisation services (sinistralité contrôlée vs BTP/médical). 3) Volume marché France (30 ans présent, économies échelle). 4) Solidité financière A+ (groupe britannique). Prix répercuté en prime client.',
        },
        {
          q: 'À partir de quel CA souscrire RC Pro ?',
          a: 'RC Pro recommandée dès le 1er euro de CA. Coût Hiscox = 95€/an = 8€/mois pour AE services = ridicule vs sinistre potentiel (30k-1M€). Souscription dès activation auto-entreprise idéale.',
        },
        {
          q: 'Comment savoir si mon tarif est compétitif ?',
          a: 'Comparer 3-5 assureurs via courtier ORIAS. Tarif compétitif = dans la fourchette basse de votre profil (ex: AE consultant IT = 95-180€/an, donc 95-130€ compétitif, 180€ acceptable, 250€+ trop cher). Devis gratuit en 5 min.',
        },
      ]}
      relatedMetiers={[
        { name: 'Prix RC Pro (variante)', slug: 'prix/rc-pro' },
        { name: 'Tarif RC Pro', slug: 'prix/tarif-rc-pro' },
        { name: 'Assurance RC Pro prix', slug: 'prix/assurance-rc-pro-prix' },
        { name: 'Tarif RC Pro AE', slug: 'prix/tarif-rc-pro-auto-entrepreneur' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

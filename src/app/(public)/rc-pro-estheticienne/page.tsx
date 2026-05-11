/**
 * Pilier — "rc pro estheticienne" (150 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-estheticienne'
const TITLE = 'RC Pro Esthéticienne — Soins, allergies, brûlures, tarifs 2026'
const TAGLINE =
  "L'esthéticienne (à domicile ou en institut) doit avoir une RC Pro pour couvrir réactions allergiques, brûlures épilation, dommages cutanés. Tarif 180-450€/an."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro esthéticienne : couvre allergies, brûlures épilation laser, dommages soins. Tarif AE 180-350€/an, institut 350-750€/an. Comparatif assureurs spécialisés beauté.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'esthéticienne — qu'elle exerce à domicile ou en institut de beauté — doit obligatoirement avoir une RC Pro pour exercer (CAP esthétique + déclaration d'activité). Cette assurance couvre les dommages corporels (allergies, brûlures, réactions cutanées) et matériels causés aux clients lors des soins (épilation, manucure, modelage, prothèses ongulaires, soins visage). Sinistre moyen : 3-15k€ (allergies graves, brûlures épilation laser sans qualification)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Code de la santé publique (cosmétiques, dispositifs médicaux)"
      benefits={[
        {
          icon: '💆',
          title: 'Soins esthétiques couverts',
          desc: 'Épilation, manucure, modelage, soins visage, prothèses ongulaires',
        },
        {
          icon: '⚠️',
          title: 'Allergies + brûlures',
          desc: 'Réactions cosmétiques, brûlures cire/laser, dermatites de contact',
        },
        {
          icon: '💰',
          title: '180-750€/an',
          desc: 'AE à domicile 180-350€ • Institut TPE 350-550€ • Institut + équipe 550-750€',
        },
        {
          icon: '🛡️',
          title: 'Plafond 500k€-1M€',
          desc: 'Recommandé 1M€ si épilation laser/IPL (risque brûlure majeur)',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres typiques esthéticienne',
          body: (
            <ul>
              <li>
                <strong>Allergie à un produit cosmétique</strong> : dermatite contact, urticaire
                généralisée, choc anaphylactique (rare). Indemnisation 2-15k€.
              </li>
              <li>
                <strong>Brûlure épilation à la cire</strong> : cire trop chaude, fuite cire,
                arrachement peau. Indemnisation 1-5k€.
              </li>
              <li>
                <strong>Brûlure épilation laser/IPL sans qualification</strong> (CAP esthétique +
                formation laser obligatoire) : 10-50k€ + sanction pénale.
              </li>
              <li>
                <strong>Réaction prothèses ongulaires</strong> : décollement ongle, infection,
                allergie acrylique. 1-8k€.
              </li>
              <li>
                <strong>Chute client cabine bronzage</strong> : sol humide, faux pas. RC
                Exploitation + RC Pro.
              </li>
              <li>
                <strong>Tâche brûlure soin chimique</strong> : peeling, gommage agressif. 2-10k€.
              </li>
              <li>
                <strong>Dommages bijoux/vêtements client</strong> : produits qui tachent ou abîment.
                200-2k€.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Couvertures spécifiques esthétique',
          body: (
            <ul>
              <li>
                <strong>Épilation laser/IPL</strong> : extension obligatoire si vous proposez ce
                service. Sans qualification + assurance dédiée = exercice illégal de la médecine.
              </li>
              <li>
                <strong>Soins amincissants (cryolipolyse, presso, radiofréquence)</strong> :
                extension &quot;appareils esthétiques médicaux&quot;. +100-300€/an.
              </li>
              <li>
                <strong>Maquillage permanent / dermopigmentation</strong> : extension &quot;tatouage
                cosmétique&quot;. Formation et assurance dédiée requises.
              </li>
              <li>
                <strong>Onglerie / prothèses ongulaires</strong> : couvert RC Pro standard.
              </li>
              <li>
                <strong>Vente produits cosmétiques</strong> : extension RC Produits (couvre
                responsabilité produits revendus).
              </li>
              <li>
                <strong>Soins à domicile</strong> : couvre déplacement + intervention chez client.
                Préciser à la souscription.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro esthéticienne 2026',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur à domicile</strong> (épilation + manucure + soins visage)
                : 180-280€/an
              </li>
              <li>
                <strong>Auto-entrepreneur avec onglerie</strong> : 220-350€/an
              </li>
              <li>
                <strong>Institut TPE indépendant</strong> (1-2 esthéticiennes) : 350-550€/an
              </li>
              <li>
                <strong>Institut + épilation laser/IPL</strong> : 550-900€/an (extension
                obligatoire)
              </li>
              <li>
                <strong>Spa / centre bien-être PME</strong> : 700-1 500€/an (RC Pro + multirisque)
              </li>
              <li>
                <strong>Esthéticienne + maquillage permanent</strong> : 450-800€/an (extension
                tatouage)
              </li>
              <li>
                <strong>Centre amincissant / cryolipolyse</strong> : 800-2 000€/an (appareils
                médicaux)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Une esthéticienne à domicile doit-elle avoir une RC Pro ?',
          a: 'OUI obligatoire. L&apos;exercice à domicile expose à des sinistres (allergies, brûlures, dommages mobilier client). Tarif AE à domicile : 180-280€/an. Préciser à la souscription le statut &quot;à domicile&quot; (couverture déplacement incluse).',
        },
        {
          q: 'Quelle assurance pour épilation laser ?',
          a: "Extension obligatoire à votre RC Pro standard. Coût additionnel : +200-400€/an. Sans cette extension + qualification médicale, l'épilation laser/IPL est exercice illégal de la médecine (sanctions pénales).",
        },
        {
          q: 'RC Pro esthéticienne couvre-t-elle les produits cosmétiques revendus ?',
          a: 'Non par défaut. Extension &quot;RC Produits&quot; nécessaire : +50-150€/an. Couvre la responsabilité pour produits cosmétiques revendus en cas de réaction client.',
        },
        {
          q: 'Combien coûte une RC Pro pour un institut de beauté ?',
          a: 'Institut TPE 1-2 esthéticiennes : 350-550€/an. Avec épilation laser : 550-900€/an. Avec maquillage permanent : 450-800€/an. Spa/centre bien-être PME : 700-1 500€/an. Notre courtier ORIAS compare 5 assureurs spé beauté.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro esthétique', slug: 'rc-pro/esthetique' },
        { name: 'RC Pro coiffeur', slug: 'rc-pro/coiffeur' },
        { name: 'Assurance commerce', slug: 'assurance-commerce' },
      ]}
    />
  )
}

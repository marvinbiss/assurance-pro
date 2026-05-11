/**
 * Souscription — "rc pro en ligne" (700 vol, KD 22, CPC 600€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-en-ligne'
const TITLE = 'RC Pro En Ligne — Comparer + souscrire en 5 min'
const TAGLINE =
  'RC Pro 100% en ligne : comparez 5 assureurs (Hiscox, Stello, Allianz, MMA, AXA) puis souscrivez en 5 min. Attestation immédiate, sans rendez-vous.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro en ligne : comparateur 5 assureurs leaders + souscription immédiate 5 min. Hiscox 95€/an, Stello 90€/an. Attestation téléchargeable PDF.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="RC Pro 100% en ligne : KW à 700 vol/mois Ahrefs et 600€ CPC Google Ads — l'un des MONEY KW les plus stratégiques du marché. Cette page compare les 5 assureurs leaders en parallèle (Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro) et propose un parcours souscription en 5 minutes avec attestation immédiate. Couvre AE, SARL, SAS PME pour tous secteurs (services, BTP, libéral, immobilier, mobilité)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🆚',
          title: 'Comparateur 5 assureurs',
          desc: 'Hiscox vs Stello vs Allianz vs MMA vs AXA en parallèle',
        },
        {
          icon: '⚡',
          title: 'Souscription 5 min',
          desc: 'Devis + paiement + attestation en moins de 5 min',
        },
        {
          icon: '🥇',
          title: 'Best price garanti',
          desc: 'Pour votre profil exact, indication assureur le moins cher',
        },
        {
          icon: '📋',
          title: 'Attestation immédiate',
          desc: 'PDF téléchargeable dès paiement validé',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi RC Pro en ligne explose en 2026',
          body: (
            <ul>
              <li>
                <strong>Adoption massive</strong> : 70%+ des nouveaux contrats RC Pro souscrits 100%
                online en 2026
              </li>
              <li>
                <strong>Tarifs plus bas</strong> : -10-15% économisé sur commissions agents
                physiques
              </li>
              <li>
                <strong>Accessibilité 24/7</strong> : adapté freelance/AE qui démarrent activité
                hors heures bureau
              </li>
              <li>
                <strong>Comparaison transparente</strong> : tarifs/garanties affichés côte à côte
                (impossible en agence)
              </li>
              <li>
                <strong>Décision rapide</strong> : pas de pression commerciale, vous décidez à votre
                rythme
              </li>
              <li>
                <strong>Gestion digitale</strong> : app mobile, e-signature, déclaration sinistres
                en ligne
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif tarifs RC Pro en ligne 2026',
          body: (
            <ul>
              <li>
                <strong>AE consultant IT</strong> : Hiscox 95€ • Stello 90€ • Allianz Pro 180€
              </li>
              <li>
                <strong>AE designer</strong> : Hiscox 120€ • Stello 110€ • Allianz Pro 200€
              </li>
              <li>
                <strong>AE coach sportif</strong> : Allianz Pro 220€ • Hiscox 250€ • MMA Pro 280€
              </li>
              <li>
                <strong>AE BTP plombier</strong> : April Pro 300€ + décennale 1 400€
              </li>
              <li>
                <strong>SARL services 200k€ CA</strong> : Hiscox 600€ • Allianz Pro 700€ • MMA 750€
              </li>
              <li>
                <strong>SAS PME 1M€ CA</strong> : Allianz Pro 1 800€ • Hiscox 2 000€ • MMA 2 100€
              </li>
            </ul>
          ),
        },
        {
          h2: 'Parcours en ligne du devis au contrat',
          body: (
            <ol>
              <li>
                <strong>Comparateur intelligent</strong> : 5 questions clés (statut, activité, CA,
                options souhaitées, antécédents)
              </li>
              <li>
                <strong>Résultats parallèles</strong> : 3-5 offres affichées côte à côte avec
                scoring
              </li>
              <li>
                <strong>Sélection offre best fit</strong> : critères personnalisés (prix, plafond,
                postériorité, options)
              </li>
              <li>
                <strong>Confirmation infos</strong> : SIRET, RIB, IBAN, justificatifs requis (Kbis,
                ACOSS, RIB)
              </li>
              <li>
                <strong>Paiement sécurisé</strong> : CB, prélèvement annuel ou mensuel selon
                assureur
              </li>
              <li>
                <strong>Téléchargement immédiat</strong> : attestation PDF + contrat complet
              </li>
              <li>
                <strong>Mail confirmation + suivi</strong> : ouverture espace adhérent + app mobile
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'En ligne aussi sécurisé qu&apos;en agence ?',
          a: 'OUI : assureurs en ligne agréés ACPR (mêmes contraintes que physiques). Solidité financière A+/A. Données chiffrées TLS 1.3. Paiements sécurisés PCI-DSS. Loi Hamon protège : 14 jours rétractation possibles.',
        },
        {
          q: 'CPC 600€ : pourquoi Google Ads coûte si cher ?',
          a: 'Marché ultra-concurrentiel : 50+ assureurs ciblent ce segment via Ads. LTV client élevée (renouvellements + cross-sell cyber/auto/santé). Pros décident vite (conversion forte). Combinaison = enchères 600€/clic.',
        },
        {
          q: 'Mon dossier complexe possible en ligne ?',
          a: 'Pour SAS PME multi-corps BTP ou libéral réglementé (avocat, expert-comptable, notaire) : conseillons formulaire courtier ORIAS plutôt que pure en ligne. Conseil humain ajoute valeur sur dossiers >5 000€/an primes.',
        },
        {
          q: 'Délai entre devis et attestation finale ?',
          a: 'Immédiat chez Hiscox/Stello (pure digital). 24h chez Allianz/MMA (en ligne mais validation humaine). 48-72h chez AXA Pro / SAS PME complexes. Toujours attestation provisoire en attendant.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro en ligne (variante)', slug: 'assurance-rc-pro-en-ligne' },
        { name: 'Souscrire RC Pro en ligne', slug: 'souscrire-rc-pro-en-ligne' },
        { name: 'RC Pro souscription en ligne', slug: 'rc-pro-souscription-en-ligne' },
        { name: 'Devis RC Pro en ligne', slug: 'devis/rc-pro-en-ligne' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}

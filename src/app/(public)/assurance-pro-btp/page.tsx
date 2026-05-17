/**
 * Pilier — "assurance pro btp" (TIER S — 400 vol/mois, KD 4)
 * Hub vertical assurances pro pour le secteur BTP.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-pro-btp'
const TITLE = 'Vivos Assurance BTP — Décennale, RC Pro, Mutuelle, Multirisque 2026'
const TAGLINE =
  'Le pack assurance complet pour les pros du Bâtiment : décennale (obligatoire Spinetta), RC Pro, multirisque pro, mutuelle pro BTP et flotte véhicule. Devis groupé sous 24h.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance pro BTP : pack décennale + RC Pro + multirisque + mutuelle santé + flotte. Tarifs négociés 52 métiers BTP. Devis groupé 24h. Économies 15-25% vs souscription séparée.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le pack assurance pro BTP regroupe les 5 assurances clés pour exercer en toute sérénité dans le Bâtiment et les Travaux Publics : 1) Décennale obligatoire (Loi Spinetta), 2) RC Pro complémentaire, 3) Multirisque pro (local, stock, perte d'exploitation), 4) Mutuelle santé pro BTP, 5) Flotte véhicule utilitaire. Souscrire en pack = économies de 15-25% vs assurances séparées + gestion centralisée + 1 seul interlocuteur ORIAS."
      legalReference="Loi Spinetta + art. 1792 Code civil + ANI 2013 + art. L. 124-3 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🏗️',
          title: '5 assurances en 1 pack',
          desc: 'Décennale + RC Pro + Multirisque + Mutuelle + Flotte',
        },
        {
          icon: '💰',
          title: 'Économies 15-25%',
          desc: 'Remise paquet vs souscription séparée par assureur',
        },
        {
          icon: '🛡️',
          title: '52 métiers BTP couverts',
          desc: 'Du maçon au photovoltaïque, tarifs spécifiques par activité',
        },
        {
          icon: '📋',
          title: '1 interlocuteur ORIAS',
          desc: 'Gestion centralisée des contrats, sinistres et renouvellements',
        },
      ]}
      sections={[
        {
          h2: 'Les 5 assurances pro BTP indispensables',
          body: (
            <>
              <ol>
                <li>
                  <strong>Garantie décennale</strong> (OBLIGATOIRE — Loi Spinetta) : couvre votre
                  responsabilité 10 ans sur tout dommage affectant la solidité de l&apos;ouvrage ou
                  le rendant impropre à destination.
                </li>
                <li>
                  <strong>RC Pro BTP</strong> (FORTEMENT RECOMMANDÉ) : couvre les dommages causés à
                  des tiers EN DEHORS du périmètre décennale (ex : casse matériel client, blessure
                  d&apos;un visiteur sur le chantier).
                </li>
                <li>
                  <strong>Multirisque pro BTP</strong> (RECOMMANDÉ) : protège votre local (atelier,
                  entrepôt, stockage matériel), votre outillage professionnel, vos marchandises, et
                  inclut la perte d&apos;exploitation en cas de sinistre.
                </li>
                <li>
                  <strong>Mutuelle santé pro BTP</strong> (OBLIGATOIRE salariés ANI 2013, RECOMMANDÉ
                  TNS) : PRO BTP, April Pro, Harmonie Mutuelle BTP, MMA Mutuelle Pro selon profil.
                </li>
                <li>
                  <strong>Assurance flotte véhicule utilitaire</strong> (OBLIGATOIRE) : couvre vos
                  camionnettes, fourgons, camions de chantier. Tarifs préférentiels flotte BTP.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs pack assurance pro BTP par profil',
          body: (
            <>
              <ul>
                <li>
                  <strong>Auto-entrepreneur BTP solo</strong> (peintre, plâtrier, multi-services) :
                  pack à partir de 1 800-2 800€ par an (décennale + RC Pro + mutuelle TNS, sans
                  flotte).
                </li>
                <li>
                  <strong>SARL ou EURL BTP (1-3 salariés)</strong> : pack 3 500-6 500€ par an
                  (décennale + RC Pro + multirisque + mutuelle collective + 1-2 véhicules).
                </li>
                <li>
                  <strong>SAS BTP moyenne entreprise (5-20 salariés)</strong> : pack 6 000-15 000€
                  par an avec flotte étendue + assurance dirigeant homme-clé.
                </li>
                <li>
                  <strong>Multi-services BTP grosse structure</strong> : pack 12 000-35 000€ par an+
                  avec cyber-assurance + protection juridique + perte d&apos;exploitation étendue.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Pourquoi grouper vos assurances BTP ?',
          body: (
            <>
              <ul>
                <li>
                  <strong>Économies tarifaires</strong> : remise paquet de 15-25% vs contrats
                  séparés (en moyenne 1 500-3 000€ par an d&apos;économie pour une SARL BTP
                  standard).
                </li>
                <li>
                  <strong>Cohérence des couvertures</strong> : pas de zone grise entre décennale et
                  RC Pro, pas de double exclusion entre multirisque et flotte.
                </li>
                <li>
                  <strong>Gestion simplifiée</strong> : 1 interlocuteur courtier ORIAS, 1 date de
                  renouvellement, 1 dossier sinistre unique.
                </li>
                <li>
                  <strong>Conseil global ORIAS</strong> : votre courtier peut optimiser le pack
                  chaque année selon évolution CA, embauches, nouveaux véhicules.
                </li>
                <li>
                  <strong>Réactivité sinistre</strong> : en cas de sinistre complexe (incendie
                  atelier + perte exploitation + casse outillage + sinistre véhicule), pas de
                  ping-pong entre assureurs.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien coûte le pack complet assurance pro BTP ?',
          a: 'Pour un auto-entrepreneur BTP solo : 1 800-2 800€ par an. Pour une SARL BTP (1-3 salariés) : 3 500-6 500€ par an. Pour une SAS BTP moyenne (5-20 salariés) : 6 000-15 000€ par an. Tarifs incluant décennale + RC Pro + multirisque + mutuelle + flotte 1-2 véhicules.',
        },
        {
          q: 'Faut-il vraiment toutes ces assurances pour un artisan solo ?',
          a: "Décennale + RC Pro = obligatoires ou critiques. Mutuelle TNS = optionnelle mais déductible Madelin = avantage fiscal. Multirisque + Flotte = recommandées si vous avez un local d'atelier ou un véhicule utilitaire. Le pack minimum solo = décennale + RC Pro + auto pro.",
        },
        {
          q: 'Peut-on changer un seul contrat du pack en cours d&apos;année ?',
          a: 'Oui, chaque contrat reste juridiquement distinct même dans un pack négocié. Vous pouvez résilier (loi infra-annuelle après 1 an) un contrat spécifique tout en gardant les autres. Le courtier ORIAS gère les transitions.',
        },
        {
          q: 'Quel courtier choisir pour mon pack pro BTP ?',
          a: 'Privilégier un courtier ORIAS spécialisé BTP (vs courtier généraliste). Avantages : connaissance fine des 52 métiers, partenariats négociés avec assureurs spécialisés BTP (April Pro, SMABTP, MMA Pro BTP, Allianz Pro BTP), expérience sur sinistres complexes décennale.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale', slug: 'assurance-decennale' },
        { name: 'RC Pro BTP', slug: 'assurance-rc-pro' },
        { name: 'Multirisque pro BTP', slug: 'multirisque-pro' },
        { name: 'Mutuelle pro BTP', slug: 'mutuelle-pro-btp' },
        { name: 'Assurance artisan', slug: 'assurance-artisan' },
        { name: 'Assurance BTP (hub)', slug: 'assurance-btp' },
      ]}
    />
  )
}

/**
 * Auto-entrepreneur — "assurance décennale auto entrepreneur pro btp" (100 vol, KD 1, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-auto-entrepreneur-pro-btp'
const TITLE = 'Assurance Décennale Auto Entrepreneur Pro BTP — Pack complet 2026'
const TAGLINE =
  'Pack décennale + mutuelle PRO BTP pour auto-entrepreneur BTP : décennale via April Pro/SMABTP + santé PRO BTP TNS. Coût pack 2 800-4 500€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale AE BTP + Mutuelle PRO BTP : pack complet artisan. Décennale 950-2 800€/an + Mutuelle PRO BTP 65-120€/mois TNS. Coût total 2 800-4 500€/an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'auto-entrepreneur BTP a besoin de 2 assurances principales : 1) la décennale (obligatoire Loi Spinetta) souscrite via April Pro BTP, SMABTP ou Allianz Pro BTP, et 2) la mutuelle PRO BTP TNS (recommandée, déductible Madelin) souscrite via PRO BTP, April Pro Santé ou Harmonie BTP. Cette page détaille le pack complet pour AE BTP — coût total annuel et optimisations possibles."
      legalReference="Décennale : Loi Spinetta + art. 1792 • Mutuelle TNS : Loi Madelin art. 154 bis CGI"
      isObligatoire={true}
      benefits={[
        {
          icon: '🏗️',
          title: 'Décennale obligatoire',
          desc: 'April Pro BTP, SMABTP, Allianz Pro BTP — best price AE',
        },
        {
          icon: '💊',
          title: 'Mutuelle TNS recommandée',
          desc: 'PRO BTP, April Pro Santé, Harmonie BTP — Madelin déductible',
        },
        {
          icon: '💰',
          title: 'Pack 2 800-4 500€/an',
          desc: 'Décennale 950-2 800€/an + mutuelle 65-120€/mois',
        },
        {
          icon: '📦',
          title: '+ RC Pro recommandée',
          desc: 'Complément décennale +250-450€/an pour AE BTP',
        },
      ]}
      sections={[
        {
          h2: 'Composantes du pack AE BTP complet',
          body: (
            <ul>
              <li>
                <strong>Décennale BTP</strong> (OBLIGATOIRE Loi Spinetta) : 950-3 500€/an selon
                métier — April Pro best price AE
              </li>
              <li>
                <strong>RC Pro Bâtiment</strong> (recommandée) : 250-450€/an — couvre dommages
                PENDANT chantier (avant réception)
              </li>
              <li>
                <strong>Mutuelle santé TNS BTP</strong> (recommandée + déductible Madelin) :
                65-120€/mois selon âge — PRO BTP S3 ou April Pro Santé
              </li>
              <li>
                <strong>Multirisque pro</strong> (optionnel) : si local atelier ou stockage matériel
                — 350-650€/an
              </li>
              <li>
                <strong>Auto-mission</strong> (si véhicule perso utilisé pro) : 80-180€/an extension
                assurance auto
              </li>
              <li>
                <strong>Protection juridique</strong> (optionnel) : 60-150€/an — litiges clients,
                prud&apos;hommes, administration
              </li>
            </ul>
          ),
        },
        {
          h2: 'Calcul coût pack AE BTP par métier',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 950€ décennale + 250€ RC Pro + 780€ mutuelle TNS ={' '}
                <strong>1 980€/an pack minimum</strong> (sans options)
              </li>
              <li>
                <strong>Plombier AE</strong> : 1 400€ + 400€ + 900€ mutuelle ={' '}
                <strong>2 700€/an pack minimum</strong>
              </li>
              <li>
                <strong>Électricien AE</strong> : 1 500€ + 450€ + 900€ ={' '}
                <strong>2 850€/an pack minimum</strong>
              </li>
              <li>
                <strong>Maçon AE</strong> : 1 800€ + 500€ + 1 080€ ={' '}
                <strong>3 380€/an pack minimum</strong>
              </li>
              <li>
                <strong>Couvreur AE</strong> : 2 200€ + 600€ + 1 080€ ={' '}
                <strong>3 880€/an pack minimum</strong>
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 2 200€ + 600€ + 1 080€ ={' '}
                <strong>3 880€/an pack minimum</strong>
              </li>
              <li>
                Avec options (multirisque + auto-mission + protection juridique) :{' '}
                <strong>+500-1 200€/an</strong>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Optimisations fiscales TNS BTP (Madelin)',
          body: (
            <ul>
              <li>
                <strong>Mutuelle TNS Madelin</strong> : 780-1 080€/an déductible (économie 22-45%
                TMI)
              </li>
              <li>
                <strong>Prévoyance TNS Madelin</strong> : 500-1 500€/an déductible (recommandée)
              </li>
              <li>
                <strong>Retraite TNS Madelin</strong> : déductible jusqu&apos;à 10% revenu net + 15%
                tranche au-delà PASS
              </li>
              <li>
                <strong>RC Pro et Décennale</strong> : déductibles charges professionnelles (au
                régime réel — pas en versement libératoire)
              </li>
              <li>
                <strong>Économie fiscale cumulée Madelin TNS</strong> : 800-3 000€/an selon profil
                et TMI
              </li>
              <li>
                <strong>Conditions</strong> : statut TNS confirmé + déclaration au régime réel ou
                simplifié (pas versement libératoire)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment optimiser pack assurance AE BTP ?',
          a: '1) Comparer 5 assureurs spé BTP pour décennale (-15-25% économie). 2) Souscrire pack décennale + RC Pro chez même assureur (-15-20%). 3) Choisir mutuelle TNS Madelin déductible (-22-45% impôts). 4) Augmenter franchise décennale (-12-18%). Économie totale potentielle : 1 000-2 500€/an pour AE BTP standard.',
        },
        {
          q: 'PRO BTP fait-il la décennale ?',
          a: 'NON. PRO BTP fait seulement la MUTUELLE SANTÉ + retraite complémentaire BTP. Pour la décennale, passer par : SMABTP (institution paritaire assurance BTP), April Pro BTP (privé), Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP.',
        },
        {
          q: 'Coût annuel total AE BTP plombier débutant ?',
          a: 'Pack minimum AE plombier débutant : 2 700€/an (décennale 1 400€ + RC Pro 400€ + mutuelle TNS 900€). Avec options recommandées : 3 200-3 500€/an. Soit 225-290€/mois. À budgéter dans business plan AE.',
        },
        {
          q: 'Mutuelle PRO BTP pour AE BTP est-elle obligatoire ?',
          a: 'NON, pas obligatoire pour TNS. Salariés BTP : oui obligatoire (ANI 2013). Pour AE TNS BTP : recommandée fortement (couverture santé + déduction Madelin 22-45% TMI). PRO BTP, April Pro Santé, Harmonie BTP sont les 3 leaders du segment BTP.',
        },
      ]}
      relatedMetiers={[
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pour AE', slug: 'assurance-decennale-pour-auto-entrepreneur' },
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'BTP Pro Mutuelle (comparatif)', slug: 'btp-pro-mutuelle' },
        { name: 'Assurance pro BTP (pack complet)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}

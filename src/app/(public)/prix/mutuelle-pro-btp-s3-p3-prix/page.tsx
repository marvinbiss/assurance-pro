/**
 * Prix — "mutuelle pro btp s3 p3 prix" (250 vol, KD 1, CPC 60€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'prix/mutuelle-pro-btp-s3-p3-prix'
const TITLE = 'Mutuelle Pro BTP S3 P3 Prix — Grille tarifaire 2026'
const TAGLINE =
  'Prix de la formule Mutuelle Pro BTP S3 P3 en 2026 : 35-55€/mois actif salarié. Couverture intermédiaire (renforts soins courants + dentaire + optique).'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Mutuelle Pro BTP S3 P3 prix 2026 : 35-55€/mois actif salarié. Formule milieu de gamme. Comparée à S2P2 (-15€) et S4P4 (+20€).',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La formule S3 P3 de Mutuelle Pro BTP est le niveau intermédiaire : couverture renforcée sur soins courants (S3) + dentaire/optique (P3). Tarif vérifié 2026 : 35-55€/mois pour un actif salarié BTP, 50-75€/mois pour un retraité BTP. Cette page détaille la grille tarifaire par profil et compare avec les formules S2P2 (-15€) et S4P4 (+20€)."
      legalReference="art. L. 911-1 et suivants Code sécurité sociale + ANI 11/01/2013"
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        { icon: '💰', title: 'Prix 35-55€/mois actif', desc: 'Formule milieu de gamme accessible' },
        {
          icon: '🦷',
          title: 'Renfort dentaire P3',
          desc: 'Couronnes 300%, implants partiels, orthodontie',
        },
        { icon: '👓', title: 'Renfort optique P3', desc: 'Monture 200€ + verres complexes' },
        {
          icon: '🏗️',
          title: 'Spécialisé BTP',
          desc: 'Pathologies BTP couvertes (TMS, prothèses auditives)',
        },
      ]}
      sections={[
        {
          h2: 'Grille tarifaire S3 P3 2026 par profil',
          body: (
            <ul>
              <li>
                <strong>Actif salarié BTP isolé</strong> : 35-50€/mois (selon âge 25-50 ans)
              </li>
              <li>
                <strong>Actif salarié BTP + conjoint</strong> : 55-80€/mois
              </li>
              <li>
                <strong>Actif salarié BTP famille (2 enfants)</strong> : 75-110€/mois
              </li>
              <li>
                <strong>Cadre BTP isolé</strong> : 45-65€/mois (renforts cadres)
              </li>
              <li>
                <strong>Retraité BTP isolé &lt; 75 ans</strong> : 50-75€/mois
              </li>
              <li>
                <strong>Retraité BTP isolé &gt; 75 ans</strong> : 75-110€/mois
              </li>
              <li>
                <strong>Retraité BTP + conjoint</strong> : 90-130€/mois
              </li>
            </ul>
          ),
        },
        {
          h2: 'Garanties incluses S3 P3',
          body: (
            <ul>
              <li>
                <strong>Hospitalisation</strong> : 200% BR + chambre particulière 60€/j + forfait
                journalier illimité
              </li>
              <li>
                <strong>Soins courants (S3)</strong> : médecin 200% BR + spécialiste 200% BR +
                pharmacie SMR moyen 100%
              </li>
              <li>
                <strong>Dentaire (P3)</strong> : soins 200%, couronnes 300% BR (~700€), bridges
                350%, orthodontie 200%
              </li>
              <li>
                <strong>Optique (P3)</strong> : monture 200€/an, verres simples 100€, complexes 350€
              </li>
              <li>
                <strong>Auditif</strong> : prothèse 1 000€/2 ans (proche du 100% santé)
              </li>
              <li>
                <strong>Médecines douces</strong> : 200€/an (ostéo, acupuncture, chiro)
              </li>
              <li>
                <strong>Cures thermales</strong> : forfait 400€/an (utile lombalgies BTP)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif S3 P3 vs S2 P2 vs S4 P4',
          body: (
            <ul>
              <li>
                <strong>S2 P2</strong> : 20-40€/mois — base + 1 renfort. Dentaire/optique limités
              </li>
              <li>
                <strong>S3 P3</strong> : 35-55€/mois — milieu gamme équilibré ⭐ recommandé majorité
                actifs
              </li>
              <li>
                <strong>S4 P4</strong> : 55-80€/mois — haut de gamme. Dentaire 500% + optique 400€ +
                médecines douces 400€
              </li>
              <li>
                <strong>Critère choix</strong> : prévoir dentaire/optique année prochaine ? → S4P4.
                Sinon → S3P3 suffit.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'S3 P3 vraiment bon rapport qualité/prix ?',
          a: 'OUI pour la majorité des actifs BTP : couverture suffisante pour soins courants + dentaire/optique standards. Insuffisant si traitement dentaire majeur prévu (couronnes/implants nombreux) → préférer S4 P4. Sur-assurance si pas de besoins spécifiques → S2 P2 suffit.',
        },
        {
          q: 'Combien à long terme (retraite) ?',
          a: 'Mutuelle Pro BTP applique majoration progressive avec âge (RIA — règle 60% ALS) : 50€/mois à 60 ans → 75€ à 70 ans → 110€ à 80 ans → 140€+ à 85 ans. Anticiper budget retraite santé.',
        },
        {
          q: 'Comparer Mutuelle Pro BTP S3 P3 vs concurrents ?',
          a: 'Mutuelle Pro BTP S3 P3 = 35-55€/mois. Concurrents équivalents : Apicil 32-50€, Harmonie Mutuelle 30-48€, MAAF Santé 28-45€. Mutuelle Pro BTP gagne sur réseaux soins BTP + cures thermales + dossier hospitalisation tiers-payant.',
        },
      ]}
      relatedMetiers={[
        { name: 'Mutuelle Pro BTP S4 P4 prix', slug: 'prix/mutuelle-pro-btp-s4-p4-prix' },
        { name: 'Mutuelle Pro BTP tarif', slug: 'prix/mutuelle-pro-btp-tarif' },
        { name: 'Mutuelle Pro BTP retraite tarif', slug: 'prix/tarif-mutuelle-pro-btp-retraite' },
        { name: 'Mutuelle Pro BTP (vue globale)', slug: 'mutuelle-pro-btp' },
        { name: 'Mutuelle pro santé BTP', slug: 'mutuelle-pro-sante-btp' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Politique de confidentialité (RGPD)',
  description:
    'Politique de protection des données personnelles. RGPD, finalités, durées de conservation, droits, DPO, cookies.',
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Politique de confidentialité (RGPD)',
    description:
      'Politique de protection des données personnelles. RGPD, finalités, durées de conservation, droits, DPO, cookies.',
    url: `${SITE_URL}/confidentialite`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique de confidentialité (RGPD)',
    description:
      'Politique de protection des données personnelles. RGPD, finalités, durées de conservation, droits, DPO, cookies.',
  },
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'Confidentialité' }]}
        eyebrow="RGPD · Politique de confidentialité"
        EyebrowIcon={Lock}
        title="Politique de confidentialité"
        description="Comment nous collectons, utilisons et protégeons vos données personnelles."
        size="sm"
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p className="text-sm text-charcoal-500">Dernière mise à jour : 30 avril 2026</p>

          <p>
            La protection de vos données personnelles est essentielle pour notre cabinet de courtage
            ORIAS Vivos Assurance. La présente politique décrit la manière dont nous collectons,
            utilisons et protégeons vos données conformément au Règlement Général sur la Protection
            des Données (RGPD).
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est <strong>Vivos Assurance</strong>, immatriculé à l’ORIAS
            sous le numéro {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution"}.
          </p>
          <p>
            <strong>Délégué à la Protection des Données (DPO)</strong> :{' '}
            <a href="mailto:dpo@vivos-assurance.fr">dpo@vivos-assurance.fr</a>
          </p>

          <h2>2. Données collectées</h2>
          <h3>Finalité 1 : établissement d’un devis</h3>
          <ul>
            <li>Identité : nom, prénom, civilité</li>
            <li>Coordonnées : email, téléphone, adresse postale</li>
            <li>Profil professionnel : SIRET, activité, CA, statut juridique, ancienneté</li>
            <li>Profil de risque : antécédents sinistres, sous-traitance, garanties souhaitées</li>
          </ul>
          <h3>Finalité 2 : gestion contractuelle (si souscription)</h3>
          <ul>
            <li>Données bancaires (RIB pour prélèvement)</li>
            <li>Données justificatives (Kbis, attestations)</li>
            <li>Historique des contrats et sinistres</li>
          </ul>

          <h2>3. Bases légales (art. 6 RGPD)</h2>
          <ul>
            <li>
              <strong>Mesures précontractuelles</strong> (art. 6.1.b RGPD) : pour établir un devis
            </li>
            <li>
              <strong>Exécution contractuelle</strong> (art. 6.1.b RGPD) : pour gérer le contrat
              souscrit
            </li>
            <li>
              <strong>Obligations légales</strong> (art. 6.1.c RGPD) : LCB-FT (lutte
              anti-blanchiment), comptabilité
            </li>
            <li>
              <strong>Consentement</strong> (art. 6.1.a RGPD) : marketing direct, cookies
              non-essentiels
            </li>
          </ul>

          <h2>4. Destinataires</h2>
          <ul>
            <li>Nos équipes habilitées (courtiers ORIAS, services support)</li>
            <li>Nos compagnies d’assurance partenaires (lors de l’envoi de demandes de devis)</li>
            <li>Nos prestataires techniques (hébergement, CRM, email transactionnel)</li>
            <li>Autorités habilitées (ACPR, CNIL, fisc) sur demande légale</li>
          </ul>
          <p>
            <strong>
              Nous ne vendons ni ne cédons jamais vos données à des tiers à des fins commerciales.
            </strong>
          </p>

          <h2>5. Durées de conservation</h2>
          <ul>
            <li>
              Prospects (devis sans souscription) : <strong>3 ans</strong> à compter du dernier
              contact
            </li>
            <li>
              Clients (contrat actif) : durée du contrat + délais de prescription (2 ou 5 ans selon
              nature)
            </li>
            <li>
              Documents comptables : <strong>5 ans</strong> après la fin du contrat (Code de
              commerce)
            </li>
            <li>
              LCB-FT : <strong>10 ans</strong> à compter de la fin de la relation (art. L. 561-12
              CMF)
            </li>
            <li>Cookies : 6 à 13 mois (selon CNIL)</li>
          </ul>

          <h2>6. Vos droits (art. 15-22 RGPD)</h2>
          <ul>
            <li>
              <strong>Droit d’accès</strong> à vos données personnelles
            </li>
            <li>
              <strong>Droit de rectification</strong> en cas d’inexactitude
            </li>
            <li>
              <strong>Droit à l’effacement</strong> (sous réserve des obligations légales de
              conservation)
            </li>
            <li>
              <strong>Droit d’opposition</strong> au traitement
            </li>
            <li>
              <strong>Droit à la limitation</strong> du traitement
            </li>
            <li>
              <strong>Droit à la portabilité</strong> de vos données
            </li>
            <li>
              <strong>Droit de retirer votre consentement</strong> à tout moment
            </li>
            <li>
              <strong>Directives post-mortem</strong> (sort des données après décès)
            </li>
          </ul>
          <p>
            Pour exercer vos droits, contactez notre DPO :{' '}
            <a href="mailto:dpo@vivos-assurance.fr">dpo@vivos-assurance.fr</a>. Réponse sous 1 mois
            maximum.
          </p>
          <p>
            Vous pouvez également adresser une réclamation à la <strong>CNIL</strong> :{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            .
          </p>

          <h2>7. Sécurité</h2>
          <p>Nous mettons en œuvre les mesures techniques et organisationnelles appropriées :</p>
          <ul>
            <li>Chiffrement TLS pour toutes les communications</li>
            <li>Hébergement sur serveurs sécurisés en France ou UE (RGPD-compliant)</li>
            <li>Authentification multi-facteurs pour les accès admin</li>
            <li>Sauvegardes quotidiennes chiffrées</li>
            <li>Sensibilisation et formation régulière du personnel</li>
            <li>Tests de sécurité réguliers (audits, pentests)</li>
          </ul>
          <p>
            En cas de violation de données, nous nous engageons à notifier la CNIL sous 72 heures
            (art. 33 RGPD) et à informer les personnes concernées si le risque est élevé (art. 34
            RGPD).
          </p>

          <h2>8. Cookies et traceurs</h2>
          <p>
            Notre site utilise des cookies pour différentes finalités. Vous pouvez gérer vos
            préférences via notre bandeau de consentement (conforme aux recommandations CNIL).
          </p>
          <ul>
            <li>
              <strong>Cookies essentiels</strong> (toujours actifs) : session, sécurité, préférences
            </li>
            <li>
              <strong>Cookies de mesure d’audience</strong> (sur consentement) : Google Analytics 4
            </li>
            <li>
              <strong>Cookies marketing</strong> (sur consentement) : Meta Pixel, retargeting
            </li>
          </ul>

          <h2>9. Profilage automatisé</h2>
          <p>
            Notre cabinet utilise un algorithme de scoring lead (segmentation HOT, WARM ou COLD)
            pour prioriser les rappels commerciaux. Ce profilage n’a pas d’impact juridique sur vous
            : il sert uniquement à ajuster le délai de notre rappel. Vous pouvez vous opposer à ce
            profilage à tout moment via notre DPO.
          </p>

          <h2>10. Modifications</h2>
          <p>
            Cette politique peut être mise à jour pour refléter les évolutions légales ou
            techniques. La date de dernière mise à jour figure en haut de la page. Les modifications
            substantielles vous seront notifiées par email.
          </p>
        </article>
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { Cookie } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Politique cookies | Assurance Pro',
  description:
    "Politique cookies du cabinet de courtage ORIAS Assurance Pro. Cookies essentiels, mesure d'audience, marketing. Gestion du consentement RGPD.",
  alternates: { canonical: `${SITE_URL}/cookies` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Politique cookies | Assurance Pro',
    description:
      'Politique cookies du cabinet de courtage ORIAS Assurance Pro. Cookies essentiels, mesure d\\',
    url: `${SITE_URL}/cookies`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politique cookies | Assurance Pro',
    description:
      'Politique cookies du cabinet de courtage ORIAS Assurance Pro. Cookies essentiels, mesure d\\',
  },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Cookies' }]}
        eyebrow="Politique cookies · CNIL"
        EyebrowIcon={Cookie}
        title="Politique cookies"
        description="Cookies utilisés, finalités, durées et choix de paramétrage."
        size="sm"
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p className="text-sm text-gray-500">Dernière mise à jour : 30 avril 2026</p>

          <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
            mobile) lors de la visite d&apos;un site. Il permet au site de reconnaître votre
            navigateur et de stocker des préférences ou informations utiles.
          </p>

          <h2>2. Cadre juridique</h2>
          <p>
            Conformément à l&apos;article 82 de la <strong>Loi Informatique et Libertés</strong>, à
            l&apos;article 5(3) de la <strong>directive ePrivacy 2002/58/CE</strong> et aux{' '}
            <strong>lignes directrices et recommandation cookies 2020 de la CNIL</strong>, votre
            consentement est requis avant tout dépôt de cookie non strictement nécessaire au
            fonctionnement du site.
          </p>

          <h2>3. Cookies utilisés sur ce site</h2>

          <h3>3.1 Cookies strictement nécessaires (sans consentement)</h3>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>cookie_consent</code>
                </td>
                <td>Mémoriser votre choix de consentement cookies</td>
                <td>13 mois</td>
              </tr>
              <tr>
                <td>
                  <code>session</code>
                </td>
                <td>Sécurité (jeton CSRF, anti-spam formulaires)</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>

          <h3>3.2 Cookies de mesure d&apos;audience (consentement)</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Finalité</th>
                <th>Durée</th>
                <th>Éditeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Tag Manager + GA4</td>
                <td>Mesure d&apos;audience anonymisée, parcours utilisateur</td>
                <td>13 mois max</td>
                <td>Google Ireland Ltd</td>
              </tr>
              <tr>
                <td>Contentsquare</td>
                <td>Analyse UX (heatmaps, parcours)</td>
                <td>13 mois max</td>
                <td>Contentsquare SAS</td>
              </tr>
            </tbody>
          </table>

          <h3>3.3 Cookies marketing (consentement)</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Finalité</th>
                <th>Durée</th>
                <th>Éditeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Meta Pixel</td>
                <td>Mesure conversion campagnes Facebook/Instagram</td>
                <td>90 jours</td>
                <td>Meta Platforms Ireland Ltd</td>
              </tr>
            </tbody>
          </table>

          <h2>4. Gérer mon consentement</h2>
          <p>
            Lors de votre première visite, une bannière vous permet d&apos;accepter, refuser ou
            personnaliser chaque catégorie de cookies. Vous pouvez à tout moment modifier vos choix
            :
          </p>
          <p>
            <button
              type="button"
              data-cookie-consent-reopen
              className="not-prose inline-block rounded bg-primary-500 px-5 py-2.5 font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600"
            >
              Modifier mes préférences cookies
            </button>
          </p>
          <p>
            Vous pouvez également configurer votre navigateur pour bloquer tous les cookies ou être
            averti avant leur dépôt :
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/fr-fr/microsoft-edge"
                target="_blank"
                rel="noopener noreferrer"
              >
                Edge
              </a>
            </li>
          </ul>

          <h2>5. Durée de conservation du consentement</h2>
          <p>
            Conformément aux recommandations CNIL, votre choix est conservé{' '}
            <strong>13 mois maximum</strong>. Au-delà, la bannière vous est de nouveau présentée.
          </p>

          <h2>6. Refus = pas de pénalisation</h2>
          <p>
            Refuser les cookies non essentiels ne dégrade en rien l&apos;accès au site. Toutes les
            pages informatives, le comparateur et le formulaire de devis restent accessibles sans
            cookies marketing ni mesure d&apos;audience.
          </p>

          <h2>7. Vos droits RGPD</h2>
          <p>
            Pour l&apos;exercice de vos droits (accès, rectification, effacement, opposition,
            portabilité), consultez notre{' '}
            <a href="/confidentialite">Politique de confidentialité</a>.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question relative aux cookies :{' '}
            <a href="mailto:dpo@vivos-assurance.fr">dpo@vivos-assurance.fr</a>
          </p>
        </article>
      </div>
    </main>
  )
}

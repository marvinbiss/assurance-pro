'use client'

/**
 * TrackingScripts — chargement strictement post-consent (CNIL 2020).
 *
 * Aucun pixel n'est chargé tant que l'utilisateur n'a pas explicitement consenti
 * (cookie 'cookie_consent' présent ET la préférence correspondante = true).
 *
 * Implémentation : un événement custom `cookie-consent-changed` est dispatché par
 * CookieConsent.tsx à chaque changement. Ce composant écoute, lit
 * localStorage, et n'injecte les <Script> de tracking qu'aux catégories acceptées.
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'

const COOKIE_CONSENT_KEY = 'cookie_consent'
const COOKIE_PREFERENCES_KEY = 'cookie_preferences'

interface Preferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

const DENIED: Preferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
}

function readPrefs(): Preferences {
  if (typeof window === 'undefined') return DENIED
  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) return DENIED
  try {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (!raw) return DENIED
    const parsed = JSON.parse(raw) as Partial<Preferences>
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      personalization: Boolean(parsed.personalization),
    }
  } catch {
    return DENIED
  }
}

interface TrackingScriptsProps {
  nonce?: string
  gtmId?: string
  metaPixelId?: string
  clarityId?: string
}

export function TrackingScripts({ nonce, gtmId, metaPixelId, clarityId }: TrackingScriptsProps) {
  const [prefs, setPrefs] = useState<Preferences>(DENIED)

  useEffect(() => {
    setPrefs(readPrefs())
    const onChange = () => setPrefs(readPrefs())
    window.addEventListener('cookie-consent-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('cookie-consent-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const loadGTM = prefs.analytics && Boolean(gtmId)
  const loadMetaPixel = prefs.marketing && Boolean(metaPixelId)
  const loadContentsquare = prefs.analytics
  const loadClarity = prefs.analytics && Boolean(clarityId)

  return (
    <>
      {loadGTM && gtmId && (
        <>
          <Script id="gtm" strategy="afterInteractive" nonce={nonce}>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager (no JavaScript)"
            />
          </noscript>
        </>
      )}

      {loadMetaPixel && metaPixelId && (
        <Script id="meta-pixel" strategy="lazyOnload" nonce={nonce}>
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {loadContentsquare && (
        <Script id="contentsquare-deferred" strategy="lazyOnload" nonce={nonce}>
          {`(function(){function l(){if(l.d)return;l.d=1;var s=document.createElement('script');s.src='https://t.contentsquare.net/uxa/8da7eeef2dab8.js';s.async=true;document.head.appendChild(s)}if(typeof requestIdleCallback==='function'){requestIdleCallback(l,{timeout:5000})}else{setTimeout(l,5000)}})();`}
        </Script>
      )}

      {loadClarity && clarityId && (
        <Script id="ms-clarity" strategy="lazyOnload" nonce={nonce}>
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  )
}

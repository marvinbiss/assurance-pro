'use client'

import dynamic from 'next/dynamic'

const ServiceWorkerRegistration = dynamic(() => import('@/components/ServiceWorkerRegistration'), {
  ssr: false,
})
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false })
const WebVitals = dynamic(
  () => import('@/components/WebVitals').then((mod) => ({ default: mod.WebVitals })),
  { ssr: false }
)
const ChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget').then((mod) => ({ default: mod.ChatWidget })),
  { ssr: false }
)
const NewsletterBanner = dynamic(
  () =>
    import('@/components/marketing/NewsletterBanner').then((mod) => ({
      default: mod.NewsletterBanner,
    })),
  { ssr: false }
)

export function ClientOnlyWebVitals() {
  return <WebVitals />
}

export function ClientOnlyFooterHelpers() {
  // ChatWidget actif même en mode pre-ORIAS : c'est un assistant IA informatif
  // (pas de distribution d'assurance au sens art. L. 511-1 C. assur.).
  // Disclaimer YMYL intégré dans le widget rappelle qu'il s'agit d'IA générique.
  return (
    <>
      <ServiceWorkerRegistration />
      <CookieConsent />
      <NewsletterBanner />
      <ChatWidget />
    </>
  )
}

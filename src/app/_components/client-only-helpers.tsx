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

export function ClientOnlyWebVitals() {
  return <WebVitals />
}

export function ClientOnlyFooterHelpers() {
  return (
    <>
      <ServiceWorkerRegistration />
      <CookieConsent />
      <ChatWidget />
    </>
  )
}

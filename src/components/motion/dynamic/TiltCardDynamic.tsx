/**
 * TiltCardDynamic — Code-split wrapper around TiltCard.
 *
 * Defers the TiltCard client chunk so its JS no longer ships with the
 * initial parent page bundle. SSR stays enabled so the children DOM
 * is server-rendered (no CLS, no FOUC).
 *
 * Use this in place of `@/components/motion/TiltCard` everywhere it is
 * used below the fold or in non-critical paths.
 */
import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { TiltCard as TiltCardType } from '../TiltCard'

const TiltCardImpl = dynamic(() => import('../TiltCard').then((m) => ({ default: m.TiltCard })), {
  ssr: true,
})

type TiltCardProps = ComponentProps<typeof TiltCardType>

export function TiltCard(props: TiltCardProps) {
  return <TiltCardImpl {...props} />
}

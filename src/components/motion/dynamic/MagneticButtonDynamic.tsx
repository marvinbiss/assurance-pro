/**
 * MagneticButtonDynamic — Code-split wrapper around MagneticButton.
 *
 * Defers the MagneticButton client chunk so its JS no longer ships
 * with the initial parent page bundle. SSR is kept enabled (`ssr: true`)
 * so the children DOM is server-rendered (no CLS, no FOUC).
 *
 * Use this in place of `@/components/motion/MagneticButton` everywhere
 * the component is below the fold or non-critical for first paint.
 */
import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { MagneticButton as MagneticButtonType } from '../MagneticButton'

const MagneticButtonImpl = dynamic(
  () => import('../MagneticButton').then((m) => ({ default: m.MagneticButton })),
  { ssr: true }
)

type MagneticButtonProps = ComponentProps<typeof MagneticButtonType>

export function MagneticButton(props: MagneticButtonProps) {
  return <MagneticButtonImpl {...props} />
}

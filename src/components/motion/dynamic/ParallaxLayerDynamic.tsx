/**
 * ParallaxLayerDynamic — Code-split wrapper around ParallaxLayer.
 *
 * Defers the ParallaxLayer client chunk so its JS (including the rAF +
 * scroll/mousemove listeners) no longer ships with the initial parent
 * page bundle. SSR stays enabled so the wrapper DOM is server-rendered
 * (no CLS, decorative blobs paint immediately).
 *
 * Use this in place of `@/components/motion/ParallaxLayer` everywhere
 * the layer is purely decorative or below the fold.
 */
import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { ParallaxLayer as ParallaxLayerType } from '../ParallaxLayer'

const ParallaxLayerImpl = dynamic(
  () => import('../ParallaxLayer').then((m) => ({ default: m.ParallaxLayer })),
  { ssr: true }
)

type ParallaxLayerProps = ComponentProps<typeof ParallaxLayerType>

export function ParallaxLayer(props: ParallaxLayerProps) {
  return <ParallaxLayerImpl {...props} />
}

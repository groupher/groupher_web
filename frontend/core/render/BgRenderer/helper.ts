import type { CSSProperties } from 'react'

import { BG_RENDER_TYPE } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'

type TBgRendererEngine = 'failed' | 'webgl' | 'webgpu'

/** Returns fallback style for the frontend shared workflow. */
export const getFallbackStyle = (renderSpec: TBgRenderSpec): CSSProperties => ({
  background: renderSpec.background,
})

/** Returns filter layer style for the frontend shared workflow. */
export const getFilterLayerStyle = (
  renderSpec: TBgRenderSpec,
  engine: TBgRendererEngine = 'webgl',
): CSSProperties => {
  if (engine === 'webgpu') {
    // WebGPU owns the complete exported pixel pipeline, including global effects.
    return { filter: 'none' }
  }

  if (engine === 'failed') return { filter: 'none' }

  return { filter: renderSpec.filter }
}

/** Returns pattern layer style for the frontend shared workflow. */
export const getPatternLayerStyle = (
  renderSpec: TBgRenderSpec,
  patternSize: string,
): CSSProperties => ({
  backgroundColor: renderSpec.patternColor,
  maskImage: `url(${renderSpec.patternImage})`,
  maskRepeat: 'repeat',
  maskSize: patternSize,
  opacity: renderSpec.patternOpacity,
  WebkitMaskImage: `url(${renderSpec.patternImage})`,
  WebkitMaskRepeat: 'repeat',
  WebkitMaskSize: patternSize,
})

/** Returns visual identity for the frontend shared workflow. */
export const getVisualIdentity = (renderSpec: TBgRenderSpec): string =>
  [renderSpec.type, renderSpec.source, renderSpec.imageUrl].join('|')

const canAnimate = (): boolean =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Reports whether crossfade at the frontend shared boundary. */
export const shouldCrossfade = (previous: TBgRenderSpec, next: TBgRenderSpec): boolean =>
  canAnimate() && getVisualIdentity(previous) !== getVisualIdentity(next)

/** Runs the preload image operation at the frontend shared boundary. */
export const preloadImage = (renderSpec: TBgRenderSpec): Promise<void> => {
  if (renderSpec.type !== BG_RENDER_TYPE.IMAGE || !renderSpec.imageUrl) return Promise.resolve()

  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      if (!image.decode) {
        resolve()
        return
      }

      image.decode().then(resolve).catch(resolve)
    }
    image.onerror = () => resolve()
    image.src = renderSpec.imageUrl
  })
}

import type { TBgRendererFailure } from '~/render/BgRenderer/renderer'

export type TProps = {
  className?: string
  patternSize?: string
  renderSize?: readonly [number, number]
  renderLogicalSize?: readonly [number, number]
  positioned?: boolean
  preferVgpu?: boolean
  textureScale?: number
  onReady?: () => void
  onFailure?: (failure: TBgRendererFailure) => void
}

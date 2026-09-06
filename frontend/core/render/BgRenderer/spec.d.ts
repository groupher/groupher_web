import type { TBgPreviewFrame, TBgRenderSpec } from '~/lib/bg'

import type { TBgRendererFailure } from './renderer'

/**
 * Optional preview subscription hook for adapter components.
 *
 * Wallpaper uses this to inject global dashboard preview frames. CoverEditor can
 * skip it and pass render spec changes directly from its active editor draft.
 *
 * @example
 * const previewSubscriber: TBgPreviewSubscriber = (listener) =>
 *   subscribePreview(listener)
 */
export type TBgPreviewSubscriber = (listener: (frame: TBgPreviewFrame) => void) => () => void

/** Imperative handle used for transient frames without a React subtree update. */
export type TBgLayerHandle = {
  updatePreviewFrame: (renderSpec: TBgRenderSpec) => void
}

/**
 * Props for the shared Bg renderer.
 *
 * This component renders actual backgrounds, not only thumbnails. Global Wallpaper,
 * Wallpaper previews, and CoverEditor backgrounds should all use this component
 * with render specs produced by `composeBgRenderSpec`.
 *
 * @example
 * <BgRenderer renderSpec={renderSpec} className="absolute inset-0" />
 */
export type TProps = {
  className?: string
  renderSpec: TBgRenderSpec
  patternSize?: string
  /** Optional fixed backing-store size displayed with CSS cover semantics. */
  renderSize?: readonly [number, number]
  /** Optional profile composition size rendered at the current display density. */
  renderLogicalSize?: readonly [number, number]
  positioned?: boolean
  previewSubscriber?: TBgPreviewSubscriber
  preferVgpu?: boolean
  textureScale?: number
  /** Called after the renderer has an active canvas and has had a frame to paint. */
  onReady?: () => void
  /** Called when renderer initialization or execution fails. */
  onFailure?: (failure: TBgRendererFailure) => void
}

/**
 * Internal layer props used for active/exiting crossfade layers.
 */
export type TBgLayerProps = {
  className?: string
  renderSpec: TBgRenderSpec
  exiting?: boolean
  patternSize: string
  renderSize?: readonly [number, number]
  renderLogicalSize?: readonly [number, number]
  preferVgpu: boolean
  textureScale: number
  onExited?: () => void
  onReady?: () => void
  onFailure?: (failure: TBgRendererFailure) => void
}

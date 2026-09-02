import type { TBgPreviewFrame, TBgRenderSpec } from '~/lib/bg'

type TWallpaperPreviewListener = (frame: TBgPreviewFrame) => void

const listeners = new Set<TWallpaperPreviewListener>()
let previewVersion = 0

/**
 * Emits an ephemeral wallpaper preview outside the persisted wallpaper store.
 *
 * This keeps hover/drag previews cheap and reversible while the final selected
 * value is still committed through the wallpaper store.
 */
export const emitWallpaperPreview = (renderSpec: TBgRenderSpec | null): void => {
  const frame: TBgPreviewFrame = {
    version: ++previewVersion,
    renderSpec,
  }

  for (const listener of listeners) listener(frame)
}

/**
 * Subscribes to transient wallpaper preview changes and returns a cleanup.
 */
export const subscribeWallpaperPreview = (listener: TWallpaperPreviewListener): (() => void) => {
  listeners.add(listener)

  return () => listeners.delete(listener)
}

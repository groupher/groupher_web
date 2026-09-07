const PREVIEW_DPR_CAP = 2

type TRectSize = {
  height: number
  width: number
}

export type TPreviewSurfaceSize = {
  logicalSize: readonly [number, number]
  pixelSize: readonly [number, number]
}

/**
 * Resolve CSS-space geometry independently from the backing-store resolution.
 * Fixed targets stay pixel-exact; viewport and profile compositions render up to 2x on HiDPI.
 */
export const resolvePreviewSurfaceSize = (
  rect: TRectSize,
  devicePixelRatio: number,
  renderSize?: readonly [number, number],
  renderLogicalSize?: readonly [number, number],
): TPreviewSurfaceSize => {
  if (renderSize) return { logicalSize: renderSize, pixelSize: renderSize }

  const logicalSize =
    renderLogicalSize ?? ([Math.max(1, rect.width), Math.max(1, rect.height)] as const)
  const dpr = Math.min(devicePixelRatio || 1, PREVIEW_DPR_CAP)

  return {
    logicalSize,
    pixelSize: [
      Math.max(1, Math.round(logicalSize[0] * dpr)),
      Math.max(1, Math.round(logicalSize[1] * dpr)),
    ],
  }
}

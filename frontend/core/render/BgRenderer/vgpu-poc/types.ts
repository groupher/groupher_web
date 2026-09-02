export type TVgpuPocModel = 'flow' | 'liquid'

export type TVgpuPocMeshSpec = {
  model: TVgpuPocModel
  colors: readonly string[]
  colorStops: readonly number[]
  flow: number
  softness: number
  seed: number
  warp: number
  scale: number
  brightness: number
  contrast: number
}

export type TVgpuPocRenderReport = {
  model: TVgpuPocModel
  size: readonly [number, number]
  canvasBackingSize: readonly [number, number]
  canvasBackingSizeMatches: boolean
  renderMs: number
  readbackMs: number
  readbackBytes: number
  expectedReadbackBytes: number
  readbackIsContiguousRgba: boolean
  webpBytes: number
  webpMime: string
  webpDecodedSize: readonly [number, number]
  webpDimensionsMatch: boolean
  webpUnder800Kb: boolean
}

export type TVgpuPocReport = {
  supported: true
  deviceLabel: string
  initMs: number
  initTimeoutMs: number
  typedWgslImport: true
  uvOrigin: 'top-left'
  topOriginReadback: boolean
  topPixel: readonly number[]
  bottomPixel: readonly number[]
  asyncErrors: readonly string[]
  renders: readonly TVgpuPocRenderReport[]
}

export type TVgpuPocController = {
  report: TVgpuPocReport
  exports: Readonly<Record<TVgpuPocModel, Blob>>
  dispose: () => void
}

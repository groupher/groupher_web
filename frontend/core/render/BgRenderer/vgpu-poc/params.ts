import { packVgpuColors } from '../vgpu/params'
import type { TVgpuPocMeshSpec } from './types'

/** Maps a normalized Flow/Liquid recipe to the reflected WGSL uniform object. */
export const toVgpuMeshParams = (spec: TVgpuPocMeshSpec): Record<string, unknown> => {
  return {
    ...packVgpuColors(spec.colors, spec.colorStops),
    meshModel: spec.model === 'liquid' ? 2 : 1,
    flow: spec.flow,
    softness: spec.softness,
    meshSeed: spec.seed,
    meshWarp: spec.warp,
    meshScale: spec.scale,
    meshBrightness: spec.brightness / 100,
    meshContrast: spec.contrast / 100,
  }
}

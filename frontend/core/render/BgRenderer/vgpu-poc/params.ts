import type { TVgpuPocMeshSpec } from './types'

const MAX_COLORS = 6
const FALLBACK_COLOR: readonly [number, number, number, number] = [0.85, 0.73, 0.89, 1]

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

const parseColor = (value: string): readonly [number, number, number, number] => {
  const color = value.trim()
  if (!color.startsWith('#')) return FALLBACK_COLOR

  const hex = color.slice(1)
  const fullHex =
    hex.length === 3
      ? hex
          .split('')
          .map((item) => `${item}${item}`)
          .join('')
      : hex
  if (!/^[0-9a-f]{6}$/i.test(fullHex)) return FALLBACK_COLOR

  return [
    Number.parseInt(fullHex.slice(0, 2), 16) / 255,
    Number.parseInt(fullHex.slice(2, 4), 16) / 255,
    Number.parseInt(fullHex.slice(4, 6), 16) / 255,
    1,
  ]
}

/** Maps a normalized Flow/Liquid recipe to the reflected WGSL uniform object. */
export const toVgpuMeshParams = (spec: TVgpuPocMeshSpec): Record<string, unknown> => {
  const colors = Array.from({ length: MAX_COLORS }, (_, index) =>
    parseColor(spec.colors[index] ?? spec.colors.at(-1) ?? '#d8b9e3'),
  )
  const stops = Array.from(
    { length: MAX_COLORS },
    (_, index) => clamp(spec.colorStops[index] ?? 100, 0, 100) / 100,
  )

  return {
    color0: colors[0],
    color1: colors[1],
    color2: colors[2],
    color3: colors[3],
    color4: colors[4],
    color5: colors[5],
    stops0: stops.slice(0, 4),
    stops1: stops.slice(4, 6),
    colorCount: Math.max(1, Math.min(MAX_COLORS, spec.colors.length)),
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

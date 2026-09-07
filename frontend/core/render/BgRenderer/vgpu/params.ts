import { BG_RENDER_TYPE } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'
import { GRADIENT_RENDERER, WALLPAPER_TEXTURE } from '~/lib/wallpaperMesh'

const MAX_COLORS = 6
const FALLBACK_COLOR: readonly [number, number, number, number] = [0.85, 0.73, 0.89, 1]

const TEXTURE_TYPE: Record<WALLPAPER_TEXTURE, number> = {
  [WALLPAPER_TEXTURE.NOISE]: 1,
  [WALLPAPER_TEXTURE.BEAM]: 5,
  [WALLPAPER_TEXTURE.ASCII]: 6,
  [WALLPAPER_TEXTURE.DOTS]: 7,
  [WALLPAPER_TEXTURE.TILE]: 8,
  [WALLPAPER_TEXTURE.OIL]: 9,
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

/** Maps the Wallpaper blur control to the renderer's CSS-pixel-equivalent radius. */
export const toVgpuBlurRadius = (blurIntensity: number): number =>
  (clamp(blurIntensity, 0, 100) / 100) * 6

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

/** Packs the color and stop arrays shared by production and browser POC meshes. */
export const packVgpuColors = (
  sourceColors: readonly string[],
  sourceStops: readonly number[],
): Record<string, unknown> => {
  const colors = Array.from({ length: MAX_COLORS }, (_, index) =>
    parseColor(sourceColors[index] ?? sourceColors.at(-1) ?? '#d8b9e3'),
  )
  const stops = Array.from(
    { length: MAX_COLORS },
    (_, index) => clamp(sourceStops[index] ?? 100, 0, 100) / 100,
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
    colorCount: Math.max(1, Math.min(MAX_COLORS, sourceColors.length)),
  }
}

/** Maps the canonical background render spec to the shared wallpaper WGSL uniforms. */
export const toVgpuMeshParams = (
  renderSpec: TBgRenderSpec,
  patternRepeat: readonly [number, number] = [1, 1],
  patternReady = true,
): Record<string, unknown> => {
  const meshRecipe = renderSpec.meshRecipe
  const gradientRecipe = renderSpec.gradientRecipe
  return {
    ...packVgpuColors(renderSpec.colors, renderSpec.colorStops),
    meshModel:
      renderSpec.type === BG_RENDER_TYPE.LINEAR_GRADIENT
        ? 0
        : renderSpec.type === BG_RENDER_TYPE.RADIAL_GRADIENT
          ? 3
          : renderSpec.type === BG_RENDER_TYPE.IMAGE
            ? 4
            : meshRecipe?.renderer === GRADIENT_RENDERER.LIQUID
              ? 2
              : 1,
    flow: renderSpec.flow,
    softness: meshRecipe?.softness ?? 0,
    meshSeed: meshRecipe?.seed ?? 1,
    meshWarp: meshRecipe?.warp ?? 55,
    meshScale: meshRecipe?.scale ?? 55,
    meshBrightness: (meshRecipe?.brightness ?? 100) / 100,
    meshContrast: (meshRecipe?.contrast ?? 100) / 100,
    globalBrightness: Math.max(0, renderSpec.brightness) / 100,
    globalSaturation: Math.max(0, renderSpec.saturation) / 100,
    blurRadius: toVgpuBlurRadius(renderSpec.blurIntensity),
    textureType: renderSpec.hasTexture ? (TEXTURE_TYPE[renderSpec.texture.type] ?? 0) : 0,
    textureIntensity: renderSpec.hasTexture ? clamp(renderSpec.texture.intensity, 0, 100) / 100 : 0,
    textureScale: 1,
    resolution: [1, 1],
    imageSize: [1, 1],
    imageReady: 0,
    radialCenter:
      gradientRecipe?.renderer === GRADIENT_RENDERER.RADIAL
        ? [gradientRecipe.center.x, gradientRecipe.center.y]
        : [0.5, 0.5],
    radialRadius:
      gradientRecipe?.renderer === GRADIENT_RENDERER.RADIAL
        ? clamp(gradientRecipe.radius, 1, 100) / 100
        : 0.72,
    patternColor: parseColor(renderSpec.patternColor),
    patternOpacity:
      renderSpec.hasPattern && patternReady ? clamp(renderSpec.patternOpacity, 0, 1) : 0,
    patternRepeat,
  }
}

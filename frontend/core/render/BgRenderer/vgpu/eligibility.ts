import { BG_RENDER_TYPE } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'
import { GRADIENT_RENDERER, WALLPAPER_TEXTURE } from '~/lib/wallpaperMesh'

/** Returns whether the current production vgpu wallpaper slice can render this spec. */
export const isVgpuWallpaperSpec = (renderSpec: TBgRenderSpec): boolean =>
  (renderSpec.type === BG_RENDER_TYPE.LINEAR_GRADIENT ||
    renderSpec.type === BG_RENDER_TYPE.RADIAL_GRADIENT ||
    (renderSpec.type === BG_RENDER_TYPE.IMAGE && !!renderSpec.imageUrl) ||
    (renderSpec.type === BG_RENDER_TYPE.MESH_GRADIENT &&
      (renderSpec.meshRecipe?.renderer === GRADIENT_RENDERER.FLOW ||
        renderSpec.meshRecipe?.renderer === GRADIENT_RENDERER.LIQUID))) &&
  (!renderSpec.hasTexture ||
    Object.values(WALLPAPER_TEXTURE).includes(renderSpec.texture.type as WALLPAPER_TEXTURE))

/** Backwards-compatible name for the earlier gradient-only slice. */
export const isVgpuGradientSpec = isVgpuWallpaperSpec

/** Backwards-compatible name for callers that only knew the original mesh slice. */
export const isVgpuMeshSpec = isVgpuWallpaperSpec

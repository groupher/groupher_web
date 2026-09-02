import type { TBgRenderSpec } from '~/lib/bg'
import type {
  TVgpuWallpaperExport,
  TVgpuWallpaperExportOptions,
} from '~/render/BgRenderer/vgpu/export'

const EXPORT_RUNTIME_LOAD_TIMEOUT_MS = 10_000

const loadExportRuntime = async (): Promise<typeof import('~/render/BgRenderer/vgpu/export')> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const importPromise = import('~/render/BgRenderer/vgpu/export')
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new Error(
          `BG_VGPU_EXPORT_RUNTIME_LOAD_TIMEOUT: export runtime exceeded ${EXPORT_RUNTIME_LOAD_TIMEOUT_MS}ms`,
        ),
      )
    }, EXPORT_RUNTIME_LOAD_TIMEOUT_MS)
  })

  try {
    return await Promise.race([importPromise, timeoutPromise])
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
  }
}

/**
 * Exports a wallpaper through the lazy vgpu renderer boundary.
 *
 * Keeping the implementation behind this function prevents WebGPU and WGSL code from entering
 * the normal editor bundle before an export is requested.
 */
export const exportWallpaperAsset = async (
  renderSpec: TBgRenderSpec,
  options?: TVgpuWallpaperExportOptions,
): Promise<TVgpuWallpaperExport> => {
  const { exportVgpuWallpaper } = await loadExportRuntime()

  return exportVgpuWallpaper(renderSpec, options)
}

import type { TBgRenderSpec } from '~/lib/bg'
import {
  WALLPAPER_PROFILE_SPECS,
  WALLPAPER_VARIANT_SPECS,
  type TWallpaperProfile,
} from '~/lib/wallpaperProfiles'
import type {
  TVgpuWallpaperExportJob,
  TVgpuWallpaperExport,
  TVgpuWallpaperExportOptions,
} from '~/render/BgRenderer/vgpu/export'
import { checksumImageFile } from '~/render/ImageExport'
import type {
  TExportedImageVariant,
  TImageExportProgress,
  TImageExportTarget,
} from '~/render/ImageExport'

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

export type TRenderWallpaperThemeInput = {
  renderSpec: TBgRenderSpec
  theme: 'light' | 'dark'
}

export type TRenderWallpaperBatchInput = {
  onProgress?: (progress: TImageExportProgress) => void
  targets: readonly TImageExportTarget[]
  themes: readonly TRenderWallpaperThemeInput[]
}

/** Maps the Wallpaper profile matrix to neutral image-export targets. */
export const wallpaperExportTargets = (): readonly TImageExportTarget[] =>
  WALLPAPER_VARIANT_SPECS.map((variant) => {
    const profile = WALLPAPER_PROFILE_SPECS.find((item) => item.key === variant.profile)!
    return {
      format: variant.format,
      height: variant.height,
      key: variant.key,
      logicalHeight: profile.logicalHeight,
      logicalWidth: profile.logicalWidth,
      quality: variant.quality,
      width: variant.width,
    }
  })

/** Returns a stable target key for one theme/profile pair. */
export const wallpaperTargetKey = (theme: 'light' | 'dark', profile: TWallpaperProfile): string =>
  `${theme}-${profile}`

/** Exports the requested light/dark profile matrix through one lazy GPU runtime. */
export const exportWallpaperBatch = async ({
  onProgress,
  targets,
  themes,
}: TRenderWallpaperBatchInput): Promise<TExportedImageVariant[]> => {
  const runtime = await loadExportRuntime()
  const targetByKey = new Map(targets.map((target) => [target.key, target]))
  const jobs: TVgpuWallpaperExportJob[] = []

  for (const theme of themes) {
    for (const target of targets) {
      const profile = WALLPAPER_PROFILE_SPECS.find((item) => item.key === target.key)?.key
      if (!profile) throw new Error(`WALLPAPER_EXPORT_PROFILE_UNKNOWN: ${target.key}`)

      const targetKey = wallpaperTargetKey(theme.theme, profile)
      onProgress?.({ stage: 'render', status: 'pending', targetKey })
      jobs.push({
        options: {
          filename: `${targetKey}.webp`,
          logicalSize: [target.logicalWidth, target.logicalHeight],
          quality: target.quality,
          size: [target.width, target.height],
        },
        renderSpec: theme.renderSpec,
        targetKey,
      })
    }
  }

  const exported = await runtime.exportVgpuWallpaperBatch(jobs)
  const results: TExportedImageVariant[] = []

  for (const variant of exported) {
    const target = targetByKey.get(variant.targetKey.replace(/^(light|dark)-/, ''))
    if (!target) throw new Error(`WALLPAPER_EXPORT_TARGET_UNKNOWN: ${variant.targetKey}`)

    onProgress?.({ stage: 'render', status: 'done', targetKey: variant.targetKey })
    onProgress?.({ stage: 'encode', status: 'done', targetKey: variant.targetKey })
    onProgress?.({ stage: 'validate', status: 'done', targetKey: variant.targetKey })
    onProgress?.({ stage: 'checksum', status: 'running', targetKey: variant.targetKey })
    const checksum = await checksumImageFile(variant.file)
    onProgress?.({ stage: 'checksum', status: 'done', targetKey: variant.targetKey })
    results.push({
      blob: variant.blob,
      checksum,
      height: target.height,
      mimeType: variant.mimeType,
      targetKey: variant.targetKey,
      width: target.width,
    })
  }

  return results
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

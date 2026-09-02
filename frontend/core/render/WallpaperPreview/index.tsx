'use client'

import { lazy, Suspense, useCallback, useState } from 'react'

import { cnMerge } from '~/css'
import useTheme from '~/hooks/useTheme'
import { adaptWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import useWallpaperDomain from '~/stores/wallpaper/hooks'

import StaticPreviewBranch from './StaticPreviewBranch'

const WallpaperRenderer = lazy(() => import('~/render/WallpaperRenderer'))

type TProps = {
  className?: string
  patternSize?: string
  preferVgpu?: boolean
  textureScale?: number
}

/** Keeps both editor fallback branches visible until the matching GPU branch is ready. */
export default function WallpaperPreview({
  className,
  patternSize = DEFAULT_WALLPAPER_PATTERN_SIZE,
  preferVgpu = false,
  textureScale = 1,
}: TProps) {
  const wallpaper = useWallpaperDomain()
  const { theme } = useTheme()
  const [gpuReadyTheme, setGpuReadyTheme] = useState<'light' | 'dark' | null>(null)
  const lightSpec = adaptWallpaperBgRenderSpec(wallpaper.light)
  const darkSpec = adaptWallpaperBgRenderSpec(wallpaper.dark)
  const handleGpuReady = useCallback(() => setGpuReadyTheme(theme), [theme])
  const handleGpuFailure = useCallback(() => setGpuReadyTheme(null), [])

  return (
    <div className={cnMerge('abs-full overflow-hidden', className)}>
      <div
        className={cnMerge(
          'abs-full wallpaper-preview-fallback transition-opacity duration-200 ease-out',
          gpuReadyTheme === theme ? 'opacity-0' : 'opacity-100',
        )}
        aria-hidden='true'
      >
        <StaticPreviewBranch branch={lightSpec} patternSize={patternSize} theme='light' />
        <StaticPreviewBranch branch={darkSpec} patternSize={patternSize} theme='dark' />
      </div>
      <Suspense fallback={null}>
        <WallpaperRenderer
          key={theme}
          className={cnMerge(
            'abs-full transition-opacity duration-200 ease-out',
            gpuReadyTheme === theme ? 'opacity-100' : 'opacity-0',
          )}
          positioned={false}
          preferVgpu={preferVgpu}
          textureScale={textureScale}
          patternSize={patternSize}
          onReady={handleGpuReady}
          onFailure={handleGpuFailure}
        />
      </Suspense>
    </div>
  )
}

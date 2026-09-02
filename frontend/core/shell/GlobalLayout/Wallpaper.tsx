'use client'

import { lazy, Suspense, useCallback, useState } from 'react'

import { cnMerge } from '~/css'
import useTheme from '~/hooks/useTheme'
import { DEFAULT_WALLPAPER_EXPORT_SIZE } from '~/lib/bg'
import StaticWallpaper from '~/render/StaticWallpaper'
import EditorStaticWallpaper from '~/render/StaticWallpaper/EditorStaticWallpaper'
import useWallpaperRuntimeMode from '~/stores/wallpaperRuntime/hooks'

import useSalon from './salon/wallpaper'

const EditorWallpaperLayer = lazy(() => import('~/render/WallpaperRenderer'))

export default function Wallpaper() {
  const s = useSalon()
  const mode = useWallpaperRuntimeMode()
  const { theme } = useTheme()
  const [gpuReadyTheme, setGpuReadyTheme] = useState<'light' | 'dark' | null>(null)
  const handleGpuReady = useCallback(() => setGpuReadyTheme(theme), [theme])
  const handleGpuFailure = useCallback(() => setGpuReadyTheme(null), [])

  if (mode !== 'editor') return <StaticWallpaper className={s.wrapper} />

  return (
    <>
      <EditorStaticWallpaper
        className={cnMerge(s.wrapper, gpuReadyTheme === theme ? 'opacity-0' : 'opacity-100')}
      />
      <Suspense fallback={null}>
        <EditorWallpaperLayer
          key={theme}
          className={cnMerge(s.wrapper, gpuReadyTheme === theme ? 'opacity-100' : 'opacity-0')}
          positioned={false}
          preferVgpu
          renderSize={DEFAULT_WALLPAPER_EXPORT_SIZE}
          onReady={handleGpuReady}
          onFailure={handleGpuFailure}
        />
      </Suspense>
    </>
  )
}

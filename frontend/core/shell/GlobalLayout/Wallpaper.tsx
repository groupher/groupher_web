'use client'

import { lazy, Suspense, useCallback, useMemo, useState } from 'react'

import { cn } from '~/css'
import useActiveWallpaperProfile from '~/hooks/useActiveWallpaperProfile'
import useTheme from '~/hooks/useTheme'
import StaticWallpaper from '~/render/StaticWallpaper'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'
import useWallpaperRuntimeMode from '~/stores/wallpaperRuntime/hooks'

import { hasPublishedWallpaper } from './background'
import useSalon from './salon/wallpaper'
import useSettledWallpaperProfile from './useSettledWallpaperProfile'

const EditorStaticWallpaper = lazy(() => import('~/render/StaticWallpaper/EditorStaticWallpaper'))
const EditorWallpaperLayer = lazy(() => import('~/render/WallpaperRenderer'))

export default function Wallpaper() {
  const s = useSalon()
  const mode = useWallpaperRuntimeMode()
  const { theme } = useTheme()
  const publishedWallpaper = useStaticWallpaper()
  const activeProfile = useActiveWallpaperProfile()
  const { profile: rendererProfile, isSettled: isProfileSettled } =
    useSettledWallpaperProfile(activeProfile)
  const published = hasPublishedWallpaper(publishedWallpaper, theme)
  const renderLogicalSize = useMemo(
    () =>
      published
        ? ([rendererProfile.logicalWidth, rendererProfile.logicalHeight] as const)
        : undefined,
    [rendererProfile, published],
  )
  const handoffKey = `${theme}:${published ? activeProfile.key : 'viewport'}`
  const rendererKey = `${theme}:${published ? rendererProfile.key : 'viewport'}`
  const canHandoff = !published || isProfileSettled
  const [gpuReadyKey, setGpuReadyKey] = useState<string | null>(null)
  const [gpuFailedKey, setGpuFailedKey] = useState<string | null>(null)
  const gpuReady = canHandoff && gpuReadyKey === handoffKey
  const gpuFailed = canHandoff && gpuFailedKey === handoffKey
  const handleGpuReady = useCallback(() => {
    setGpuFailedKey(null)
    setGpuReadyKey(rendererKey)
  }, [rendererKey])
  const handleGpuFailure = useCallback(() => {
    setGpuReadyKey(null)
    setGpuFailedKey(rendererKey)
  }, [rendererKey])

  if (mode !== 'editor') return <StaticWallpaper className={s.wrapper} />

  return (
    <>
      <Suspense fallback={null}>
        <EditorStaticWallpaper className={cn(s.wrapper, gpuReady ? 'opacity-0' : 'opacity-100')} />
      </Suspense>
      <StaticWallpaper
        className={cn(s.wrapper, gpuReady || gpuFailed ? 'opacity-0' : 'opacity-100')}
      />
      <Suspense fallback={null}>
        <EditorWallpaperLayer
          key={rendererKey}
          className={cn(s.wrapper, gpuReady ? 'opacity-100' : 'opacity-0')}
          positioned={false}
          preferVgpu
          renderLogicalSize={renderLogicalSize}
          onReady={handleGpuReady}
          onFailure={handleGpuFailure}
        />
      </Suspense>
    </>
  )
}

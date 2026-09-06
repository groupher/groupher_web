'use client'

import { adaptWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import { cn } from '~/lib/css'
import { getPatternLayerStyle } from '~/render/BgRenderer/helper'
import useWallpaperDomain from '~/stores/wallpaper/hooks'

import type { TStaticWallpaperProps } from './index'

/**
 * Keeps the editor's SSR/static layer visible when no published artifact exists yet.
 * The fallback is CSS-only; the live renderer still takes over after its first frame.
 */
export default function EditorStaticWallpaper(props: TStaticWallpaperProps) {
  const wallpaper = useWallpaperDomain()
  const light = adaptWallpaperBgRenderSpec(wallpaper.light)
  const dark = adaptWallpaperBgRenderSpec(wallpaper.dark)

  return (
    <div
      aria-hidden='true'
      className={cn('pointer-events-none fixed s-full top-0', props.className)}
      data-wallpaper-editor-preview
    >
      <div
        className='theme-light-branch abs-full bg-cover bg-center bg-no-repeat'
        data-wallpaper-editor-theme='light'
        style={{ background: light.background, filter: light.filter }}
      >
        {light.hasPattern && (
          <div
            className='abs-full-pe-none'
            style={getPatternLayerStyle(light, DEFAULT_WALLPAPER_PATTERN_SIZE)}
          />
        )}
      </div>
      <div
        className='theme-dark-branch abs-full bg-cover bg-center bg-no-repeat'
        data-wallpaper-editor-theme='dark'
        style={{ background: dark.background, filter: dark.filter }}
      >
        {dark.hasPattern && (
          <div
            className='abs-full-pe-none'
            style={getPatternLayerStyle(dark, DEFAULT_WALLPAPER_PATTERN_SIZE)}
          />
        )}
      </div>
    </div>
  )
}

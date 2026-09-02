'use client'

import { composeWallpaperBgCss } from '~/hooks/useWallpaper'
import StaticWallpaper from '~/render/StaticWallpaper'
import useWallpaperDomain from '~/stores/wallpaper/hooks'

import type { TStaticWallpaperProps } from './index'

/**
 * Keeps the editor's SSR/static layer visible when no published artifact exists yet.
 * The fallback is CSS-only; the live renderer still takes over after its first frame.
 */
export default function EditorStaticWallpaper(props: TStaticWallpaperProps) {
  const wallpaper = useWallpaperDomain()

  return (
    <StaticWallpaper
      {...props}
      fallback={{
        light: composeWallpaperBgCss(wallpaper.light).background,
        dark: composeWallpaperBgCss(wallpaper.dark).background,
      }}
    />
  )
}

'use client'

import type { CSSProperties } from 'react'

import { cn } from '~/lib/css'
import type { TStaticWallpaper } from '~/spec'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'

export type TStaticWallpaperProps = {
  wallpaper?: TStaticWallpaper | null
  className?: string
  fallback?: {
    light?: string
    dark?: string
  }
}

/** Renders the published wallpaper bitmap without loading the editor renderer. */
export default function StaticWallpaper({
  wallpaper: propWallpaper,
  className,
  fallback,
}: TStaticWallpaperProps) {
  const contextWallpaper = useStaticWallpaper()
  const wallpaper = propWallpaper === undefined ? contextWallpaper : propWallpaper
  const lightPaint = wallpaper?.light?.url
    ? `url("${wallpaper.light.url}")`
    : (fallback?.light ?? 'none')
  const darkPaint = wallpaper?.dark?.url
    ? `url("${wallpaper.dark.url}")`
    : (fallback?.dark ?? fallback?.light ?? 'none')
  const style = {
    '--wallpaper-light-image': lightPaint,
    '--wallpaper-dark-image': darkPaint,
  } as CSSProperties

  return (
    <div
      aria-hidden='true'
      className={cn(
        'static-wallpaper pointer-events-none fixed s-full top-0 bg-cover bg-center bg-no-repeat',
        className,
      )}
      data-wallpaper-revision={wallpaper?.revision ?? undefined}
      style={style}
    />
  )
}

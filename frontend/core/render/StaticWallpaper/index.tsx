'use client'

import { cn } from '~/lib/css'
import type { TPublishedWallpaper } from '~/spec'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'

import { getStaticWallpaperStyle } from './style'

export type TStaticWallpaperProps = {
  wallpaper?: TPublishedWallpaper | null
  className?: string
}

/** Renders the published wallpaper bitmap without loading the editor renderer. */
export default function StaticWallpaper({
  wallpaper: propWallpaper,
  className,
}: TStaticWallpaperProps) {
  const contextWallpaper = useStaticWallpaper()
  const wallpaper = propWallpaper === undefined ? contextWallpaper : propWallpaper
  const style = getStaticWallpaperStyle(wallpaper)

  return (
    <div
      aria-hidden='true'
      className={cn(
        'static-wallpaper pointer-events-none fixed s-full top-0 bg-cover bg-center bg-no-repeat',
        className,
      )}
      data-wallpaper-version={wallpaper?.version}
      style={style}
    />
  )
}

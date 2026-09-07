import type { CSSProperties } from 'react'

import type { TPublishedWallpaper } from '~/spec'

const profilePaint = (
  wallpaper: TPublishedWallpaper | null | undefined,
  theme: 'light' | 'dark',
  profile: string,
): string | undefined => {
  const branch = wallpaper?.[theme]
  const variant = branch?.[profile as keyof typeof branch]
  return variant?.url ? `url("${variant.url}")` : undefined
}

/** Builds the theme-scoped CSS variables for the published wallpaper layer. */
export const getStaticWallpaperStyle = (
  wallpaper: TPublishedWallpaper | null | undefined,
): CSSProperties =>
  ({
    '--wallpaper-light-wide': profilePaint(wallpaper, 'light', 'wide'),
    '--wallpaper-light-desktop': profilePaint(wallpaper, 'light', 'desktop'),
    '--wallpaper-light-tablet': profilePaint(wallpaper, 'light', 'tablet'),
    '--wallpaper-light-phone': profilePaint(wallpaper, 'light', 'phone'),
    '--wallpaper-dark-wide': profilePaint(wallpaper, 'dark', 'wide'),
    '--wallpaper-dark-desktop': profilePaint(wallpaper, 'dark', 'desktop'),
    '--wallpaper-dark-tablet': profilePaint(wallpaper, 'dark', 'tablet'),
    '--wallpaper-dark-phone': profilePaint(wallpaper, 'dark', 'phone'),
  }) as CSSProperties

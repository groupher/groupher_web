'use client'

import { use } from 'react'

import { StaticWallpaperContext } from './context'

/** Reads the static Wallpaper snapshot supplied by the current route provider. */
export default function useStaticWallpaper() {
  return use(StaticWallpaperContext)
}

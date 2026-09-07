'use client'

import { use } from 'react'

import { WallpaperRuntimeContext } from './context'

/** Reads the runtime mode used to select the Wallpaper rendering path. */
export default function useWallpaperRuntimeMode() {
  return use(WallpaperRuntimeContext)
}

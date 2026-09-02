'use client'

import { use } from 'react'

import createStoreHook from '../createStoreHook'
import { StoreContext } from './context'
import type { TStore } from './spec'

const useWallpaper = createStoreHook(StoreContext)

export default useWallpaper

/** Returns the stable Wallpaper working copy for preview and save callbacks. */
export const useWallpaperStore = (): TStore => {
  const store = use(StoreContext)
  if (!store) throw new Error('useWallpaperStore must be used within a WallpaperStoreProvider')
  return store
}

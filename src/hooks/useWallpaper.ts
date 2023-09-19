import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TWallpaperInfo } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useWallpaper = (): TWallpaperInfo => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { wallpaperEditor } = store
  const { customWallpaper, wallpaper, wallpapers, hasShadow } = wallpaperEditor

  return {
    customWallpaper,
    wallpaper,
    wallpapers,
    hasShadow,
  }
}

export default useWallpaper

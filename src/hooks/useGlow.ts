import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TGlowEffect } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGlow = (): TGlowEffect => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { wallpaper } = store.wallpaperEditor
  const { uiSettings } = store.dashboardThread

  const { glowType, glowFixed, glowOpacity } = uiSettings

  return {
    glowType: wallpaper && glowType,
    glowFixed,
    glowOpacity,
  }
}

export default useGlow

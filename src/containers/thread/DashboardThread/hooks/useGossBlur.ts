import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TWallpaperInfo } from '@/spec'

type TRet = {
  gossBlur: number
  gossBlurDark: number
  saving: boolean
  isTouched: boolean
  isDarkTouched: boolean
  wallpaperInfo: TWallpaperInfo
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGossBlur = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { gossBlur, gossBlurDark, saving, touched, uiSettings } = store.dashboardThread

  return {
    gossBlur,
    gossBlurDark,
    saving,
    wallpaperInfo: uiSettings.wallpaperInfo,
    isTouched: touched.gossBlur,
    isDarkTouched: touched.gossBlurDark,
  }
}

export default useGossBlur

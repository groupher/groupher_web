import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TBannerLayout } from '@/spec'

type TRet = {
  layout: TBannerLayout
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBannerInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { bannerLayout, saving, touched } = store.dashboardThread

  return {
    layout: bannerLayout,
    saving,
    isTouched: touched.bannerLayout,
  }
}

export default useBannerInfo

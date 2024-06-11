import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TBannerLayout } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  layout: TBannerLayout
  isTouched: boolean
  saving: boolean
}

const useBannerInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { bannerLayout, saving } = store.dashboardThread

  return {
    layout: bannerLayout,
    saving,
    isTouched: isChanged('bannerLayout'),
  }
}

export default useBannerInfo

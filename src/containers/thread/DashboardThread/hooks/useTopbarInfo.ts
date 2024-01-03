import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TTopbarLayout, TColorName } from '@/spec'

type TRet = {
  layout: TTopbarLayout
  isLayoutTouched: boolean
  isBgTouched: boolean
  saving: boolean
  bg: TColorName
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTopbarInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { topbarLayout, topbarBg, saving, touched } = store.dashboardThread

  return {
    layout: topbarLayout,
    isLayoutTouched: touched.topbarLayout,
    isBgTouched: touched.topbarBg,
    bg: topbarBg,
    saving,
  }
}

export default useTopbarInfo

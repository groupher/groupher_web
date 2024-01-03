import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TColorName } from '@/spec'

type TRet = {
  primaryColor: TColorName
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const usePrimaryInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { primaryColor, saving, touched } = store.dashboardThread

  return {
    primaryColor,
    saving,
    isTouched: touched.primaryColor,
  }
}

export default usePrimaryInfo

import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import useHelper from './useHelper'

type TRet = {
  gossBlur: number
  gossBlurDark: number
  saving: boolean
  isTouched: boolean
  isDarkTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGossBlurInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { gossBlur, gossBlurDark, saving } = store.dashboardThread

  return {
    gossBlur,
    gossBlurDark,
    saving,
    isTouched: isChanged('gossBlur'),
    isDarkTouched: isChanged('gossBlurDark'),
  }
}

export default useGossBlurInfo

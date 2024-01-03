import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import THEME from '@/constant/theme'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGossBlur = (): number => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { dashboardThread, theme } = store
  const { gossBlur, gossBlurDark } = dashboardThread

  return theme.curTheme === THEME.DAY ? gossBlur : gossBlurDark
}

export default useGossBlur

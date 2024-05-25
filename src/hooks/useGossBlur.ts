import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import useTheme from '@/hooks/useTheme'
import THEME from '@/const/theme'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGossBlur = (): number => {
  const { theme } = useTheme()
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { dashboardThread } = store
  const { gossBlur, gossBlurDark } = dashboardThread

  return theme === THEME.DAY ? gossBlur : gossBlurDark
}

export default useGossBlur

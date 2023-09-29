import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TThemeName } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTheme = (): TThemeName => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store.theme.curTheme
}

export default useTheme

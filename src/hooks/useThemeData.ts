import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TThemeMap } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useThemeData = (): TThemeMap => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  console.log('## in hooks: ', store.theme.curTheme)
  return store.theme.themeData as TThemeMap
}

export default useThemeData

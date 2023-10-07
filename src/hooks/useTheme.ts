import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useTheme as useStyledTheme } from 'styled-components'

import type { TThemeName, TThemeMap } from '@/spec'

type TRet = {
  curTheme: TThemeName
  changeTheme: (name: TThemeName) => void
  themeMap: TThemeMap
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTheme = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const styledTheme = useStyledTheme() as TThemeMap

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    curTheme: store.theme.curTheme,
    changeTheme: (name: TThemeName) => store.theme.changeTheme(name),
    themeMap: styledTheme,
  }
}

export default useTheme

import { useContext } from 'react'
// import { MobXProviderContext } from 'mobx-react'

import type { TThemeMap } from '@/spec'

import { StoreContext } from '@/stores2'

/**
 * NOTE: should use observer to wrap the component who use this hook
 * this hook is ONLY used for init ThemePalette, cuz the useTheme from
 * styled-component can only be used before it init
 */
const useThemeData = (): TThemeMap => {
  // const { store } = useContext(MobXProviderContext)
  const { theme } = useContext(StoreContext)

  return theme.themeData
}

export default useThemeData

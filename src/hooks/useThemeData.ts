import { useContext } from 'react'
import { useSnapshot } from 'valtio'

import type { TThemeMap } from '@/spec'

import { StoreContext } from '@/stores3'

/**
 * NOTE: should use observer to wrap the component who use this hook
 * this hook is ONLY used for init ThemePalette, cuz the useTheme from
 * styled-component can only be used before it init
 */
const useThemeData = (): TThemeMap => {
  const root = useContext(StoreContext)
  const { theme } = useSnapshot(root)

  return theme.themeData
}

export default useThemeData

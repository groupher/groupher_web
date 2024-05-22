import { useContext } from 'react'
import { useTheme as useStyledTheme } from 'styled-components'

import type { TThemeName, TThemeMap } from '@/spec'

import { StoreContext } from '@/stores2'

type TRet = {
  theme: TThemeName
  change: (name: TThemeName) => void
  toggle: () => void
  themeMap: TThemeMap
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTheme = (): TRet => {
  const { theme: themeStore } = useContext(StoreContext)
  const styledTheme = useStyledTheme() as TThemeMap

  const { theme, change, toggle } = themeStore

  return {
    theme,
    change,
    toggle,
    themeMap: styledTheme,
  }
}

export default useTheme

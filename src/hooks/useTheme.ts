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
  const { theme } = useContext(StoreContext)
  const styledTheme = useStyledTheme() as TThemeMap

  return {
    theme: theme.theme,
    change: (name: TThemeName) => theme.change(name),
    toggle: () => theme.toggle(),
    themeMap: styledTheme,
  }
}

export default useTheme

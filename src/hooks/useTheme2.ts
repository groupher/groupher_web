import { useContext } from 'react'
import { useTheme as useStyledTheme } from 'styled-components'
import { useSnapshot } from 'valtio'

import type { TThemeName, TThemeMap } from '@/spec'

import { StoreContext } from '@/stores3'

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
  const root = useContext(StoreContext)
  const { theme: store } = useSnapshot(root)

  const styledTheme = useStyledTheme() as TThemeMap

  const { theme, change, toggle } = store

  return {
    theme,
    change,
    toggle,
    themeMap: styledTheme,
  }
}

export default useTheme

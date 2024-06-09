import { useTheme as useStyledTheme } from 'styled-components'

import type { TThemeName, TThemeMap } from '@/spec'

import useStoreTree from '@/hooks/useStoreTree'

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
  const store = useStoreTree('theme')
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

import { useTheme as useStyledTheme } from 'styled-components'

import type { TThemeName, TThemeMap } from '@/spec'

import useSubStore from '@/hooks/useSubStore'

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
  const { theme, change, toggle } = useSubStore('theme')
  const styledTheme = useStyledTheme() as TThemeMap

  return {
    theme,
    change,
    toggle,
    themeMap: styledTheme,
  }
}

export default useTheme

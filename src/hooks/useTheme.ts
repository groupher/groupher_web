import { useTheme as useStyledTheme } from 'styled-components'

import type { TThemeName, TThemeMap } from '~/spec'

import useSubStore from '~/hooks/useSubStore'

type TRet = {
  theme: TThemeName
  change: (name: TThemeName) => void
  toggle: () => void
  themeMap: TThemeMap
}

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

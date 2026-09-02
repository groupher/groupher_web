import THEME, { THEME_MODE } from '~/const/theme'
import { persistThemeMode, resolveRuntimeTheme } from '~/lib/theme'
import type { TThemeMode, TThemeName } from '~/spec'
import useThemeDomain from '~/stores/theme/hooks'

type TRet = {
  theme: TThemeName
  themeMode: TThemeMode
  isLightTheme: boolean
  isDarkTheme: boolean
  change: (name: TThemeName) => void
  changeMode: (name: TThemeMode) => void
  preview: (name: TThemeName) => void
  toggle: () => void
}

/** Exposes theme state and actions through the shared React hook boundary. */
export default function useTheme(): TRet {
  const { theme, themeMode, change: changeTheme, changeMode: doChangeMode } = useThemeDomain()

  const applyTheme = (t: TThemeName) => {
    changeTheme(t)
    document.documentElement.setAttribute('data-theme', t)
    document.documentElement.style.colorScheme = t
  }

  const changeMode = (mode: TThemeMode) => {
    doChangeMode(mode)

    applyTheme(resolveRuntimeTheme(mode))
    persistThemeMode(mode)
  }

  const toggle = () => {
    changeMode(theme === THEME.DARK ? THEME_MODE.LIGHT : THEME_MODE.DARK)
  }

  return {
    theme,
    themeMode,
    isLightTheme: theme === THEME.LIGHT,
    isDarkTheme: theme === THEME.DARK,
    change: applyTheme,
    changeMode,
    preview: applyTheme,
    toggle,
  }
}

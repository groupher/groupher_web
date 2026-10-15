import { proxy } from 'valtio'

import THEME, { THEME_MODE } from '~/const/theme'
import type { TThemeMode, TThemeName } from '~/spec'

import type { TInit, TStore } from './spec'

/** Creates an isolated reactive store for the resolved theme and user-selected theme mode. */
export default function createThemeStore(
  initOrMode: TInit | TThemeMode = THEME_MODE.SYSTEM,
  legacyTheme: TThemeName = THEME.LIGHT,
): TStore {
  const initial =
    typeof initOrMode === 'object'
      ? initOrMode
      : {
          themeMode: initOrMode,
          theme: legacyTheme,
        }

  const store = proxy({
    theme: initial.theme,
    themeMode: initial.themeMode,

    // actions
    change: (theme: TThemeName): void => {
      store.theme = theme
    },

    changeMode: (theme: TThemeMode): void => {
      store.themeMode = theme
    },
  })

  return store
}

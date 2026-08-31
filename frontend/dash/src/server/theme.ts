import { createServerFn } from '@tanstack/react-start'

import { THEME_MODE } from '~/const/theme'
import THEME from '~/const/theme'
import type { TThemeMode, TThemeName } from '~/spec'

export type TThemeSeed = {
  theme: TThemeName
  themeMode: TThemeMode
}

/** Keeps Dash SSR theme-independent; the pre-paint script resolves the browser preference. */
export const PUBLIC_THEME_SEED: TThemeSeed = {
  theme: THEME.LIGHT,
  themeMode: THEME_MODE.SYSTEM,
}

export const loadThemeSeed = createServerFn({ method: 'GET', strict: false }).handler(
  (): TThemeSeed => PUBLIC_THEME_SEED,
)

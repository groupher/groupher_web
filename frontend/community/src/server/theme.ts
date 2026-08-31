import { createServerFn } from '@tanstack/react-start'

import { THEME_MODE } from '~/const/theme'
import THEME from '~/const/theme'
import type { TThemeMode, TThemeName } from '~/spec'

type TThemeSeed = { theme: TThemeName; themeMode: TThemeMode }

/** Stable public seed; the browser pre-paint script resolves the user's mode. */
export const PUBLIC_THEME_SEED: TThemeSeed = {
  theme: THEME.LIGHT,
  themeMode: THEME_MODE.SYSTEM,
}

export const loadThemeSeed = createServerFn({ method: 'GET', strict: false }).handler(
  (): TThemeSeed => PUBLIC_THEME_SEED,
)

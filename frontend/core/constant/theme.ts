export enum THEME_MODE {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const THEME = {
  LIGHT: THEME_MODE.LIGHT,
  DARK: THEME_MODE.DARK,
} as const

export default THEME

export const THEME_MODE_COOKIE = 'themeMode'
export const THEME_COOKIE_MAX_AGE = 31_536_000

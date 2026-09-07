import THEME, { THEME_COOKIE_MAX_AGE, THEME_MODE, THEME_MODE_COOKIE } from '~/const/theme'
import type { TThemeMode, TThemeName } from '~/spec'

import { getThemeCookieDomain, warnForUnknownThemeCookieHost } from './cookie'

/** Resolves system theme without leaking frontend shared routing details to callers. */
export const resolveSystemTheme = (): TThemeName => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? THEME.DARK : THEME.LIGHT
}

/** Resolves runtime theme without leaking frontend shared routing details to callers. */
export const resolveRuntimeTheme = (mode: TThemeMode): TThemeName => {
  if (mode === THEME_MODE.LIGHT) return THEME.LIGHT
  if (mode === THEME_MODE.DARK) return THEME.DARK

  return resolveSystemTheme()
}

const getThemeCookieAttributes = (): string => {
  const { hostname, protocol } = window.location
  const domain = getThemeCookieDomain(hostname)
  warnForUnknownThemeCookieHost(hostname, domain)
  const domainAttribute = domain ? `; Domain=${domain}` : ''
  const secureAttribute = protocol === 'https:' ? '; Secure' : ''

  return `Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${domainAttribute}${secureAttribute}`
}

/** Persists only the user's theme preference; resolved theme remains runtime state. */
export const persistThemeMode = (mode: TThemeMode): void => {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.themeMode = mode
  document.cookie = `${THEME_MODE_COOKIE}=${mode}; ${getThemeCookieAttributes()}`
}

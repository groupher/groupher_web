import {
  RESOLVED_THEME_COOKIE,
  THEME_COOKIE_MAX_AGE,
  THEME_MODE,
  THEME_MODE_COOKIE,
} from '~/const/theme'
import type { TThemeMode, TThemeName } from '~/spec'

export type TThemeSeed = {
  theme: TThemeName
  themeMode: TThemeMode
}

const isThemeName = (value: string | undefined): value is TThemeName =>
  value === THEME_MODE.LIGHT || value === THEME_MODE.DARK

const isThemeMode = (value: string | undefined): value is TThemeMode =>
  isThemeName(value) || value === THEME_MODE.SYSTEM

/** Uses the theme resolved by the pre-paint script when the client store is created. */
export const resolvePrePaintThemeSeed = (fallback: TThemeSeed): TThemeSeed => {
  if (typeof document === 'undefined') return fallback

  const { theme, themeMode } = document.documentElement.dataset

  return {
    theme: isThemeName(theme) ? theme : fallback.theme,
    themeMode: isThemeMode(themeMode) ? themeMode : fallback.themeMode,
  }
}

/** Builds the pre-hydration script that resolves and persists the Community theme. */
export const prePaintThemeDetectScript = ({ theme, themeMode }: TThemeSeed) => `
(function() {
  try {
    var mode = '${themeMode}';
    var theme = '${theme}';
    var cookieParts = document.cookie ? document.cookie.split(';') : [];
    var readCookie = function(name) {
      for (var i = 0; i < cookieParts.length; i += 1) {
        var pair = cookieParts[i].trim().split('=');
        if (pair.shift() === name) return decodeURIComponent(pair.join('='));
      }
    };
    var storedMode = readCookie('${THEME_MODE_COOKIE}');
    if (storedMode === '${THEME_MODE.LIGHT}' || storedMode === '${THEME_MODE.DARK}' || storedMode === '${THEME_MODE.SYSTEM}') {
      mode = storedMode;
    }
    if (mode === '${THEME_MODE.SYSTEM}') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? '${THEME_MODE.DARK}' : '${THEME_MODE.LIGHT}';
    } else {
      theme = mode;
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.style.colorScheme = theme;
    document.cookie = '${THEME_MODE_COOKIE}=' + mode + '; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax';
    document.cookie = '${RESOLVED_THEME_COOKIE}=' + theme + '; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax';
  } catch (e) {}
})();
`

/** Seeds browser runtime globals required by shared code before hydration. */
export const prePaintRuntimeSeedScript = (renderedAt: number) => `
(function() {
  try {
    window.process = window.process || { env: {} };
    window.__GROUPHER_INITIAL_NOW__ = ${renderedAt};
  } catch (e) {}
})();
`

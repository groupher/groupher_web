import { equals, mergeDeepRight, pick } from 'ramda'

import { GRADIENT_WALLPAPER, WALLPAPER_TYPE } from '~/const/wallpaper'
import { normalizeWallpaperSettings } from '~/lib/wallpaperSettingsCodec'

import {
  INITIAL_WALLPAPER_THEME_STATE,
  WALLPAPER_SAVABLE_THEME_STATE_KEYS,
  WALLPAPER_THEME_STATE_KEYS,
} from './constant'
import type { TInit, TStore, TWallpaperPatch, TWallpaperState, TWallpaperThemeState } from './spec'

/**
 * Builds a single-theme wallpaper state from hydrated data or defaults.
 *
 * Wallpaper stores build gradient recipes eagerly — when SSR delivers a
 * `source` without `gradient`, this function resolves it from the catalog
 * so the store always holds a ready-to-render `TGradientRecipe`.
 *
 * CoverEditor and new consumers that prefer lazy resolution do the
 * equivalent in their own adapter layer instead of relying on this.
 *
 * @example
 * const state = initStateByTheme({ source: 'sky', type: 'gradient' })
 * // state.gradient === GRADIENT_WALLPAPER.sky
 */
const initStateByTheme = (
  init: Partial<TWallpaperThemeState> | null | undefined = {},
): TWallpaperThemeState => {
  const state = {
    ...mergeDeepRight(INITIAL_WALLPAPER_THEME_STATE, pick(WALLPAPER_THEME_STATE_KEYS, init ?? {})),
  } as TWallpaperThemeState

  if (state.type === WALLPAPER_TYPE.GRADIENT && !state.gradient) {
    state.gradient = GRADIENT_WALLPAPER[state.source] ?? GRADIENT_WALLPAPER.amber_mauve
  }

  return state
}

/**
 * Builds full { light, dark } wallpaper state from server-provided data or defaults.
 *
 * This is the store-side initialization entrypoint after SSR parsing.
 *
 * @example
 * const state = initState({
 *   light: { source: 'sky', type: 'gradient' },
 * })
 * // state.light.source === 'sky'
 * // state.dark === default dark theme config
 */
export const initState = (init: TInit): TWallpaperState => ({
  light: initStateByTheme(init.light),
  dark: initStateByTheme(init.dark),
})

/**
 * Returns the active theme-specific wallpaper config by theme mode.
 *
 * Use this at runtime edges (hooks/components) where light/dark state is both
 * present in the store and one branch must be selected.
 *
 * @example
 * const state = pickWallpaperThemeState(store, false) // light
 * const state = pickWallpaperThemeState(store, true) // dark
 */
export const pickWallpaperThemeState = (
  store: Pick<TStore, keyof TWallpaperState>,
  isDarkTheme: boolean,
): TWallpaperThemeState => {
  return isDarkTheme ? store.dark : store.light
}

/**
 * Wraps a partial single-theme patch with a theme container for store commits.
 *
 * Example:
 * - On light mode: `{ source: 'amber' } -> { light: { source: 'amber' } }`
 * - On dark mode: `{ source: 'amber' } -> { dark: { source: 'amber' } }`
 *
 * @example
 * toWallpaperThemePatch({ source: 'orange' }, false)
 * // => { light: { source: 'orange' } }
 */
export const toWallpaperThemePatch = (
  patch: Partial<TWallpaperThemeState>,
  isDarkTheme: boolean,
): TWallpaperPatch => {
  return isDarkTheme ? { dark: patch } : { light: patch }
}

/** Computes the savable patch for one theme without inspecting the other branch. */
export const getWallpaperThemeSavablePatch = (
  store: TStore,
  theme: keyof TWallpaperState,
): Partial<TWallpaperThemeState> => {
  const current = normalizeWallpaperSettings(store[theme])
  const original = normalizeWallpaperSettings(store.original[theme])

  if (equals(current, original)) return {}

  const patch: Partial<TWallpaperThemeState> = {}
  const mutablePatch = patch as Record<keyof TWallpaperThemeState, unknown>

  for (const key of WALLPAPER_SAVABLE_THEME_STATE_KEYS) {
    if (!equals(store.original[theme][key], store[theme][key])) {
      mutablePatch[key] = store[theme][key]
    }
  }

  return patch
}

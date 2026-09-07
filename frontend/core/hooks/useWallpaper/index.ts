'use client'

import { use, useMemo } from 'react'
import { useSnapshot } from 'valtio'

import useTheme from '~/hooks/useTheme'
import { composeBgCss, composeBgRenderSpec } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'
import type { TWallpaperFmt } from '~/spec'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'
import createWallpaperStore from '~/stores/wallpaper'
import { INITIAL_WALLPAPER_THEME_STATE } from '~/stores/wallpaper/constant'
import { StoreContext } from '~/stores/wallpaper/context'
import { pickWallpaperThemeState } from '~/stores/wallpaper/helper'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

const EMPTY_WALLPAPER_STORE = createWallpaperStore()

type TRet = { source: string } & TWallpaperFmt

const toWallpaperBgCssConfig = (store: TWallpaperThemeState): TWallpaperThemeState => ({
  ...store,
  texture: { ...store.texture, enabled: false, intensity: 0 },
})

/**
 * Compose wallpaper CSS fallback output from one theme branch.
 *
 * This reuses `composeBgCss` for the actual background string.
 *
 * @example
 * const css = composeWallpaperBgCss(pickWallpaperThemeState(store, isDarkTheme))
 */
export const composeWallpaperBgCss = (state: TWallpaperThemeState): TRet => {
  const parsed = composeBgCss(state)

  return parsed
}

/**
 * Adapt one wallpaper theme branch to the shared Bg render spec.
 *
 * @example
 * const renderSpec = adaptWallpaperBgRenderSpec(wallpaper.light)
 */
export const adaptWallpaperBgRenderSpec = (state: TWallpaperThemeState): TBgRenderSpec => {
  return composeBgRenderSpec(state)
}

/** Exposes wallpaper state and actions through the shared React hook boundary. */
export default function useWallpaper(): TRet {
  const store = use(StoreContext)
  const { isDarkTheme } = useTheme()
  const staticWallpaper = useStaticWallpaper()
  const snapshot = useSnapshot(store ?? EMPTY_WALLPAPER_STORE) as unknown as {
    light: TWallpaperThemeState
    dark: TWallpaperThemeState
  }
  const state = toWallpaperBgCssConfig(
    store
      ? pickWallpaperThemeState(snapshot, isDarkTheme)
      : {
          ...INITIAL_WALLPAPER_THEME_STATE,
          source:
            staticWallpaper?.[isDarkTheme ? 'darkSource' : 'lightSource'] ??
            INITIAL_WALLPAPER_THEME_STATE.source,
        },
  )

  return useMemo(
    () => composeWallpaperBgCss(state),
    [state.source, state.pattern, state.effect, state.gradient, state.customWallpaper, state.type],
  )
}

/** Exposes wallpaper bg render spec state and actions through the shared React hook boundary. */
export function useWallpaperBgRenderSpec(): TBgRenderSpec {
  const store = use(StoreContext)
  if (!store)
    throw new Error('useWallpaperBgRenderSpec must be used within a WallpaperStoreProvider')
  const snapshot = useSnapshot(store) as unknown as {
    light: TWallpaperThemeState
    dark: TWallpaperThemeState
  }
  const { isDarkTheme } = useTheme()
  const state = pickWallpaperThemeState(snapshot, isDarkTheme)

  return useMemo(
    () => adaptWallpaperBgRenderSpec(state),
    [
      state.source,
      state.pattern,
      state.effect,
      state.texture,
      state.gradient,
      state.customWallpaper,
      state.type,
    ],
  )
}

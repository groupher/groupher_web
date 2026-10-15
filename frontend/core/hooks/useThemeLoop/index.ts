'use client'

import { useCallback, useState } from 'react'

import THEME, { THEME_MODE } from '~/const/theme'
import type { TThemeMode } from '~/spec'
import useThemeDomain from '~/stores/theme/hooks'

export default function UseThemeLoop() {
  const { theme, themeMode } = useThemeDomain()

  const [loop] = useState<TThemeMode[]>(() => {
    if (themeMode === THEME_MODE.LIGHT) {
      return [THEME_MODE.LIGHT, THEME_MODE.DARK, THEME_MODE.SYSTEM]
    }
    if (themeMode === THEME_MODE.DARK) {
      return [THEME_MODE.DARK, THEME_MODE.LIGHT, THEME_MODE.SYSTEM]
    }
    return theme === THEME.DARK
      ? [THEME_MODE.SYSTEM, THEME_MODE.LIGHT, THEME_MODE.DARK]
      : [THEME_MODE.SYSTEM, THEME_MODE.DARK, THEME_MODE.LIGHT]
  })

  const getNextThemeMode = useCallback((): TThemeMode => {
    const currentIndex = loop.indexOf(themeMode)

    if (currentIndex === -1) return THEME_MODE.SYSTEM

    const nextIndex = (currentIndex + 1) % loop.length
    return loop[nextIndex]
  }, [loop, themeMode])

  const getAriaLabel = useCallback(() => {
    return `${themeMode} mode`
  }, [themeMode])

  return {
    getNextThemeMode,
    getAriaLabel,
  }
}

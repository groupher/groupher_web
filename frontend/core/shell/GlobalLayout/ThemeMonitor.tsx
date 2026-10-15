'use client'

import { useEffect, useEffectEvent } from 'react'

import { THEME_MODE } from '~/const/theme'
import useTheme from '~/hooks/useTheme'

export default function ThemeMonitor() {
  const { themeMode, changeMode } = useTheme()
  const applySystemMode = useEffectEvent(() => changeMode(THEME_MODE.SYSTEM))

  useEffect(() => {
    if (themeMode !== THEME_MODE.SYSTEM) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      if (document.documentElement.dataset.themeMode === THEME_MODE.SYSTEM) {
        applySystemMode()
      }
    }
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [themeMode])

  return null
}

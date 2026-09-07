'use client'

import { useEffect, useRef } from 'react'

import { THEME_MODE } from '~/const/theme'
import useTheme from '~/hooks/useTheme'

export default function ThemeMonitor() {
  const { themeMode, changeMode } = useTheme()
  const changeModeRef = useRef(changeMode)
  changeModeRef.current = changeMode

  useEffect(() => {
    if (themeMode !== THEME_MODE.SYSTEM) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      if (document.documentElement.dataset.themeMode === THEME_MODE.SYSTEM) {
        changeModeRef.current(THEME_MODE.SYSTEM)
      }
    }
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [themeMode])

  return null
}

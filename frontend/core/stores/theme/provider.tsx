'use client'

import { type ReactNode, useState } from 'react'

import THEME, { THEME_MODE } from '~/const/theme'

import setupStore from '.'
import { ServerThemeContext, StoreContext } from './context'
import type { TInit, TStore } from './spec'

type TProps = {
  children: ReactNode
  initData?: TInit
}

const resolveBrowserInit = (initData?: TInit): TInit | undefined => {
  if (typeof document === 'undefined') return initData

  const root = document.documentElement
  const theme = root.dataset.theme
  const themeMode = root.dataset.themeMode
  const resolvedTheme = theme === THEME.DARK || theme === THEME.LIGHT ? theme : initData?.theme
  const resolvedMode =
    themeMode === THEME_MODE.DARK ||
    themeMode === THEME_MODE.LIGHT ||
    themeMode === THEME_MODE.SYSTEM
      ? themeMode
      : (initData?.themeMode ?? THEME_MODE.SYSTEM)

  if (!resolvedTheme || !resolvedMode) return initData

  return { theme: resolvedTheme, themeMode: resolvedMode }
}

export default function Provider({ children, initData }: TProps) {
  const [serverTheme] = useState<TInit>(
    () => initData ?? { theme: THEME.LIGHT, themeMode: THEME_MODE.SYSTEM },
  )

  // Runtime state can honor the pre-paint decision immediately. Each consumer
  // still receives serverTheme while its own streamed boundary hydrates.
  const [store] = useState<TStore>(() => setupStore(resolveBrowserInit(serverTheme)))

  return (
    <ServerThemeContext.Provider value={serverTheme}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </ServerThemeContext.Provider>
  )
}

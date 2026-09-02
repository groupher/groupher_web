'use client'

import { type ReactNode, useRef } from 'react'

import THEME, { THEME_MODE } from '~/const/theme'

import setupStore from '.'
import { StoreContext } from './context'
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
  const storeRef = useRef<TStore | null>(null)

  storeRef.current ??= setupStore(resolveBrowserInit(initData))

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

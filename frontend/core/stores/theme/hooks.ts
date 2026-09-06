'use client'

import { use } from 'react'

import createStoreHook from '../createStoreHook'
import { ServerThemeContext, StoreContext } from './context'
import useHydrationLatch from './useHydrationLatch'

/** Exposes the resolved current theme and theme-domain actions to UI consumers. */
const useRuntimeTheme = createStoreHook(StoreContext, ['change', 'changeMode'])

/** Exposes a hydration-safe theme snapshot to every independently streamed boundary. */
const useTheme = () => {
  const runtime = useRuntimeTheme()
  const serverTheme = use(ServerThemeContext)
  const hydrated = useHydrationLatch()

  if (hydrated || !serverTheme) return runtime

  return {
    ...runtime,
    theme: serverTheme.theme,
    themeMode: serverTheme.themeMode,
  }
}

export default useTheme

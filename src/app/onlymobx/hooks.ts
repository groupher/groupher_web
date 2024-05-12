import { useContext, useMemo } from 'react'

import type { TThemeName } from '@/spec'

import { StoreContext } from '.'
import { initRootStore } from './store'

export const useStore = (initialState) => {
  const store = useMemo(() => initRootStore(initialState), [initialState])
  return store
}

type TTheme = {
  theme: TThemeName
  readonly themeDesc: string
  readonly themeDesc2: string
  toggle: () => void
}

export const useTheme = (): TTheme => {
  const root = useContext(StoreContext)

  return root.theme
}

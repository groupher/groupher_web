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
  themeDesc: string
  toggle: () => void
}

export const useTheme = (): TTheme => {
  const root = useContext(StoreContext)

  return root.theme
}

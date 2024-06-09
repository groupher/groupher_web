import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'

import createThemeStore from './themeStore'
import createViewingStore from './viewingStore'

const initialRootState = {
  theme: THEME.DAY,
  viewing: {},
}

const createRootStore = (initialState = initialRootState): TRootStore => {
  return proxy({
    theme: createThemeStore(initialState.theme),
    viewing: createViewingStore(initialState.viewing),
  })
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initialState) => {
  const store = useMemo(() => useRef(proxy(createRootStore(initialState))).current, [initialState])
  // const store = useMemo(() => createRootStore(initialState), [initialState])

  return store
}

import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'

import createThemeStore from './themeStore'

const initialRootState = {
  theme: THEME.DAY,
}

const createRootStore = (initialState = initialRootState): TRootStore => {
  const store = {
    theme: createThemeStore(initialState.theme),
  }

  return proxy(store)
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initialState) => {
  const store = useMemo(() => useRef(proxy(createRootStore(initialState))).current, [initialState])
  // const store = useMemo(() => createRootStore(initialState), [initialState])

  return store
}

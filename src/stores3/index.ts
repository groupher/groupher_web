import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'

import createThemeStore from './themeStore'
import createViewingStore from './viewingStore'
import creaetAccountStore from './accountStore'

const initialRootState = {
  theme: THEME.DAY,
  viewing: {},
}

const createRootStore = (initialState = initialRootState): TRootStore => {
  return proxy({
    account: creaetAccountStore(),
    theme: createThemeStore(initialState.theme),
    viewing: createViewingStore(initialState.viewing),
  })
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initialState) => {
  // see details: https://valtio.pmnd.rs/docs/how-tos/how-to-use-with-context
  const store = useMemo(() => useRef(proxy(createRootStore(initialState))).current, [initialState])

  return store
}

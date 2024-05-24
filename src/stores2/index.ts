import { useMemo } from 'react'
import React, { createContext } from 'react'
import { configure } from 'mobx'

import type { TRootStore } from './spec'

import THEME from '@/constant/theme'

import createAccountStore from './accountStore'
import createThemeStore from './themeStore'
import createDashboardStore from './dashboardStore'
import createViewingStore from './viewingStore'

configure({
  enforceActions: 'never',
})

let clientSideRootStore: TRootStore | null

const initialRootState = {
  theme: THEME.DAY,
  viewing: {},
  dashboard: {},
}

// rootStore
const createRootStore = (initialState = initialRootState): TRootStore => {
  const rootStore = {
    viewing: createViewingStore(initialState.viewing),
    account: createAccountStore(),
    theme: createThemeStore(),
    dashboard: null,
  }

  rootStore.dashboard = createDashboardStore(rootStore, initialState.dashboard)

  return rootStore
}

export const initRootStore = (initialState = initialRootState) => {
  const _store = clientSideRootStore ?? createRootStore(initialState)

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }

  // Create the store once in the client
  if (!clientSideRootStore) {
    clientSideRootStore = _store
  }

  return clientSideRootStore
}

// 创建 `rootStore` 的实例
export const StoreContext = createContext(createRootStore(initialRootState))

export const useStore = (initialState) => {
  const store = useMemo(() => initRootStore(initialState), [initialState])
  return store
}

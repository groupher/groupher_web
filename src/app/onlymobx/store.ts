import { battery } from '@/mobx'

import THEME from '@/constant/theme'
import type { TThemeName } from '@/spec'

let clientSideRootStore

type TThemeStore = {
  theme: TThemeName
  readonly themeDesc: string
  toggle: () => void
}

type TRootStore = {
  theme: TThemeStore
}

const initialRootState = {
  theme: THEME.DAY,
}

// theme store
export const createThemeStore = (init: TThemeName = THEME.DAY): TThemeStore => {
  const store = {
    theme: init,

    get themeDesc(): string {
      return store.theme === 'day' ? 'now is Day' : 'now is Night'
    },

    toggle() {
      store.theme = store.theme === 'day' ? 'night' : 'day'
    },
  }

  return battery(store)
}

// rootStore
export const createRootStore = (initialState = initialRootState): TRootStore => {
  const rootStore = {
    theme: createThemeStore(initialState?.theme || 'day'),
  }

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
export const rootStore = createRootStore(initialRootState)

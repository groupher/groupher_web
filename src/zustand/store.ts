import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { PreloadedStoreInterface } from './StoreProvider'

export type TStore = {
  lastUpdate: number
  light: boolean
  count: number
  theme: {
    theme: string
    toggleTheme: () => void
    themeDesc: () => string
  }
  tick: (lastUpdate: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
}

function getDefaultInitialState() {
  return {
    lastUpdate: new Date(1970, 1, 1).getTime(),
    light: false,
    count: 0,
  } as const
}

const themeStore = (set, get) => {
  return {
    theme: 'day',

    // views
    themeDesc: () =>
      get().theme.theme === 'dark' ? 'Dark theme selected' : 'Light theme selected',

    // actions
    toggleTheme: () => {
      return set(({ theme: self }) => ({
        theme: {
          ...self,
          theme: self.theme === 'day' ? 'dark' : 'day',
        },
      }))
    },
  }
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  return createStore<TStore>((set, get) => ({
    ...getDefaultInitialState(),
    theme: themeStore(set, get),
    ...preloadedState,
    tick: (lastUpdate) =>
      set({
        lastUpdate,
        light: !get().light,
      }),
    increment: () =>
      set({
        count: get().count + 1,
      }),
    decrement: () =>
      set({
        count: get().count - 1,
      }),
    reset: () =>
      set({
        count: getDefaultInitialState().count,
      }),
  }))
}
export type StoreType = ReturnType<typeof initializeStore>
const storeContext = createContext<StoreType | null>(null)
export const Provider = storeContext.Provider

export function useStore<T>(selector: (state: TStore) => T) {
  const store = useContext(storeContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'
import { LOCALE } from '@/const/i18n'

import createThemeStore from './themeStore'
import createViewingStore from './viewingStore'
import creaetAccountStore from './accountStore'

const INITIAL_STATE = {
  theme: THEME.DAY,
  locale: LOCALE.EN,
  localeData: '{}',
  viewing: {},
}

const createRootStore = (initState = INITIAL_STATE): TRootStore => {
  return proxy({
    // locale: T.opt(T.enum('locale', values(LOCALE)), LOCALE.EN),
    locale: initState.locale,
    localeData: initState.localeData,

    account: creaetAccountStore(),
    theme: createThemeStore(initState.theme),
    viewing: createViewingStore(initState.viewing),
  })
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initState) => {
  // see details: https://valtio.pmnd.rs/docs/how-tos/how-to-use-with-context
  const store = useMemo(() => useRef(proxy(createRootStore(initState))).current, [initState])

  return store
}

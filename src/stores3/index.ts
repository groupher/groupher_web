import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'
import { LOCALE } from '@/const/i18n'

import createLocaleStore from './localeStore'
import createThemeStore from './themeStore'
import creaetAccountStore from './accountStore'
import createViewingStore from './viewingStore'
import createDashboardStore from './dashboardStore'

const INITIAL_STATE = {
  theme: THEME.DAY,
  locale: LOCALE.EN,
  localeData: '{}',
  viewing: {},
  dashboard: {},
}

const createRootStore = (initState = INITIAL_STATE): TRootStore => {
  return proxy({
    locale: createLocaleStore(initState.locale, initState.localeData),
    account: creaetAccountStore(),
    theme: createThemeStore(initState.theme),
    viewing: createViewingStore(initState.viewing),
    dashboard: createDashboardStore(initState.dashboard),
  })
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initState) => {
  // see details: https://valtio.pmnd.rs/docs/how-tos/how-to-use-with-context
  const store = useMemo(() => useRef(proxy(createRootStore(initState))).current, [initState])

  return store
}

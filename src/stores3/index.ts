import { createContext, useRef, useMemo } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'
import { LOCALE } from '@/const/i18n'

import createLocale from './locale'
import createTheme from './theme'
import creaetAccount from './account'
import createViewing from './viewing'
import createDashboard from './dashboard'

const INITIAL_STATE = {
  theme: THEME.DAY,
  locale: LOCALE.EN,
  localeData: '{}',
  viewing: {},
  dashboard: {},
}

const createRootStore = (init = INITIAL_STATE): TRootStore => {
  return proxy({
    locale: createLocale(init.locale, init.localeData),
    account: creaetAccount(),
    theme: createTheme(init.theme),
    viewing: createViewing(init.viewing),
    dashboard: createDashboard(init.dashboard),
  })
}

export const StoreContext = createContext(createRootStore())

export const useStore = (initState) => {
  // see details: https://valtio.pmnd.rs/docs/how-tos/how-to-use-with-context
  const store = useMemo(() => useRef(proxy(createRootStore(initState))).current, [initState])

  return store
}

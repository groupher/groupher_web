import { createContext, useRef } from 'react'
import { proxy } from 'valtio'

import type { TRootStore } from './spec'

import THEME from '@/const/theme'
import { LOCALE } from '@/const/i18n'

import setupLocale from './locale'
import setupTheme from './theme'
import setupAccount from './account'
import setupViewing from './viewing'
import setupDashboard from './dashboard'

const INITIAL_STATE = {
  theme: THEME.DAY,
  locale: LOCALE.EN,
  localeData: '{}',
  viewing: {},
  dashboard: {},
}

const setupRootStore = (init = INITIAL_STATE): TRootStore => {
  return proxy({
    locale: setupLocale(init.locale, init.localeData),
    account: setupAccount(),
    theme: setupTheme(init.theme),
    viewing: setupViewing(init.viewing),
    dashboard: setupDashboard(init.dashboard),
    // wallpaperEditor:
  })
}

export const StoreContext = createContext(setupRootStore())

export const useStore = (initState) => {
  // see details: https://valtio.pmnd.rs/docs/how-tos/how-to-use-with-context
  return useRef(proxy(setupRootStore(initState))).current
}

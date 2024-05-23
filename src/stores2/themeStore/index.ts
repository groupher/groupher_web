import { battery } from '@/mobx'

import type { TThemeMap, TThemeName } from '@/spec'

import THEME from '@/constant/theme'
import { themeSkins } from '@/utils/themes'

import type { TStore } from './spec'

// theme store
const createThemeStore = (theme: TThemeName = THEME.DAY): TStore => {
  const store = {
    theme,

    // views
    get themeData(): TThemeMap {
      return themeSkins[store.theme] as TThemeMap
    },

    // actions
    change: (theme: TThemeName) => {
      store.theme = theme
    },
    toggle() {
      store.theme = store.theme === THEME.DAY ? THEME.NIGHT : THEME.DAY
    },
  }

  return battery(store)
}

export default createThemeStore

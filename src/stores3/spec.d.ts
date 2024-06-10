import type { TLocale } from '@/spec'

import type { TStore as TLocaleStore } from './localeStore/spec'
import type { TStore as TViewingStore } from './viewingStore/spec'
import type { TStore as TAccountStore } from './accountStore/spec'
import type { TStore as TThemeStore } from './themeStore/spec'
import type { TStore as TDashbaordStore } from './dashboardStore/spec'

export type TRootStore = {
  locale: TLocaleStore
  theme: TThemeStore
  viewing: TViewingStore
  account: TAccountStore
  dashboard: TDashbaordStore
}

export type TTreeStoreKey = keyof TRootStore
export type TTreeStore<K extends TTreeStoreKey> = TRootStore[K]

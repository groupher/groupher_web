import type { TLocale } from '@/spec'

import type { TStore as TLocaleStore } from './locale/spec'
import type { TStore as TViewingStore } from './viewing/spec'
import type { TStore as TAccountStore } from './account/spec'
import type { TStore as TThemeStore } from './theme/spec'
import type { TStore as TDashbaordStore } from './dashboard/spec'

export type TRootStore = {
  locale: TLocaleStore
  theme: TThemeStore
  viewing: TViewingStore
  account: TAccountStore
  dashboard: TDashbaordStore
}

export type TTreeStoreKey = keyof TRootStore
export type TTreeStore<K extends TTreeStoreKey> = TRootStore[K]

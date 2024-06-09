import type { TStore as TViewingStore } from './viewingStore/spec'
import type { TStore as TAccountStore } from './accountStore/spec'
import type { TStore as TThemeStore } from './themeStore/spec'
import type { TStore as TDashbaordStore } from './dashboardStore/spec'

export type TStoreMap = {
  viewing: TViewingStore
  account: TAccountStore
  theme: TThemeStore
  dashboard: TDashbaordStore // 如果 dashboard 也应该被包含的话
}

export type TTreeStoreKey = keyof TStoreMap
export type TTreeStore<K extends TTreeStoreKey> = TStoreMap[K]

export type TRootStore = {
  viewing: TViewingStore
  account: TAccountStore
  theme: TThemeStore
  // dashboard: TDashbaordStore
}

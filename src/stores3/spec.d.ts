import type { TStore as TViewingStore } from './viewingStore/spec'
import type { TStore as TAccountStore } from './accountStore/spec'
import type { TStore as TThemeStore } from './themeStore/spec'
import type { TStore as TDashbaordStore } from './dashboardStore/spec'

export type TRootStore = {
  viewing: TViewingStore
  account: TAccountStore
  theme: TThemeStore
  // dashboard: TDashbaordStore
}

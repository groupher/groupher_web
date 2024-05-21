import type { TViewingStore } from './viewingStore/spec'
import type { TAccountStore } from './accountStore/spec'
import type { TThemeStore } from './themeStore/spec'
import type { TDashbaordStore } from './dashboardStore/spec'

export type TRootStore = {
  viewing: TViewingStore
  account: TAccountStore
  theme: TThemeStore
  dashboard: TDashbaordStore
}

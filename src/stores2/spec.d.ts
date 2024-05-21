import type { TThemeStore } from './themeStore/spec'
import type { TAccountStore } from './accountStore/spec'
import type { TDashbaordStore } from './DashboardStore2/spec'

export type TRootStore = {
  account: TAccountStore
  theme: TThemeStore
  dashboard: TDashbaordStore
}

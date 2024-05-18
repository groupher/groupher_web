import type { TThemeStore } from './themeStore/spec'
import type { TAccountStore } from './accountStore/spec'

export type TRootStore = {
  account: TAccountStore
  theme: TThemeStore
}

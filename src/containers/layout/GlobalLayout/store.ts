/*
 * GlobalLayout store
 *
 */

import type { TRootStore, TAccount, TC11N, TCommunity, TWallpaper, TGlobalLayout } from '@/spec'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

const Platform = T.model('Platform', {
  isChrome: T.opt(T.bool, true),
  isFirefox: T.opt(T.bool, false),
  isSafari: T.opt(T.bool, false),
  isIE: T.opt(T.bool, false),
  isEdge: T.opt(T.bool, false),
})

const GlobalLayout = T.model('GlobalLayoutStore', {
  online: T.opt(T.bool, true),
  platform: T.opt(Platform, {}),
  isMobile: T.opt(T.bool, false),
  // follow the mac convention
  bodyScrollDirection: T.opt(T.enum(['up', 'down']), 'up'),
})
  .views((self) => ({
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.account.accountInfo
    },
    get c11n(): TC11N {
      const root = getParent(self) as TRootStore
      return root.account.c11n
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get sidebarPin(): boolean {
      // const root = getParent(self) as TRootStore
      // return root.sidebar.pin
      return false
    },
    get wallpaper(): string {
      const root = getParent(self) as TRootStore
      return root.wallpaperEditor.wallpaper
    },
    get wallpapers(): Record<string, TWallpaper> {
      const root = getParent(self) as TRootStore
      return root.wallpaperEditor.wallpapers
    },
    get glowType(): string {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.uiSettings.glowType
    },
    get glowFixed(): boolean {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.uiSettings.glowFixed
    },
    get hasShadow(): boolean {
      const root = getParent(self) as TRootStore

      return root.wallpaperEditor.hasShadow
    },
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },
  }))
  .actions((self) => ({
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof GlobalLayout>

export default GlobalLayout

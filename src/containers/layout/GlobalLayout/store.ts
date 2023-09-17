/*
 * GlobalLayout store
 *
 */
import { pick } from 'ramda'

import type {
  TRootStore,
  TAccount,
  TC11N,
  TCommunity,
  TGlobalLayout,
  TGlowEffect,
  TWallpaperInfo,
  TBroadcastConfig,
  TDashboardSEOConfig,
} from '@/spec'

import { SEO_KEYS } from '@/constant/seo'

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
    get seo(): TDashboardSEOConfig {
      const root = getParent(self) as TRootStore

      return pick(SEO_KEYS, root.dashboardThread)
    },
    get sidebarPin(): boolean {
      // const root = getParent(self) as TRootStore
      // return root.sidebar.pin
      return false
    },
    get wallpaperInfo(): TWallpaperInfo {
      const root = getParent(self) as TRootStore

      const { wallpaperEditor } = root
      const { customWallpaper, wallpaper, wallpapers } = wallpaperEditor

      return {
        customWallpaper: toJS(customWallpaper),
        wallpaper,
        wallpapers,
      }
    },
    get glowEffect(): TGlowEffect {
      const root = getParent(self) as TRootStore
      const { wallpaper } = root.wallpaperEditor
      const { uiSettings } = root.dashboardThread
      const { glowType, glowFixed, glowOpacity } = uiSettings

      return {
        glowType: wallpaper && glowType,
        glowFixed,
        glowOpacity,
      }
    },
    get hasShadow(): boolean {
      const root = getParent(self) as TRootStore

      return root.wallpaperEditor.wallpaper && root.wallpaperEditor.hasShadow
    },
    get broadcastConfig(): TBroadcastConfig {
      const root = getParent(self) as TRootStore

      return pick(
        [
          'broadcastLayout',
          'broadcastBg',
          'broadcastEnable',
          'broadcastArticleLayout',
          'broadcastArticleBg',
          'broadcastArticleEnable',
        ],
        root.dashboardThread,
      )
    },
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },

    get showDashboardAlert(): boolean {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.demoAlertEnable
    },
  }))
  .actions((self) => ({
    loadDemoSetting(): void {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.afterCreate()
    },
    clearLocalSettings(): void {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.clearLocalSettings()
    },
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

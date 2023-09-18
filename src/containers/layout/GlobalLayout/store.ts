/*
 * GlobalLayout store
 *
 */
import { pick } from 'ramda'

import type { TRootStore, TGlobalLayout, TBroadcastConfig } from '@/spec'

import { T, getParent, markStates, Instance } from '@/utils/mobx'

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

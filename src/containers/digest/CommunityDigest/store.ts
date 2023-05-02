/*
 * CommunityDigest store
 *
 */

import type {
  TAccount,
  TRootStore,
  TViewing,
  TRoute,
  TCommunity,
  TThread,
  TGlobalLayout,
  TDashboardThreadConfig,
} from '@/spec'
import { T, getParent, markStates, toJS, Instance } from '@/utils/mobx'

const CommunityDigest = T.model('CommunityDigest', {
  loading: T.opt(T.bool, false),

  inViewport: T.opt(T.bool, true),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get curRoute(): TRoute {
      const root = getParent(self) as TRootStore
      return root.curRoute
    },
    get viewing(): TViewing {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing)
    },
    get realtimeVisitors(): number {
      return 0
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore
      return root.viewing.activeThread
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get dashboardSettings(): TDashboardThreadConfig {
      const root = getParent(self) as TRootStore

      return {
        enable: toJS(root.dashboardThread.enableSettings),
        nameAlias: toJS(root.dashboardThread.nameAlias),
      }
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
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    addSubscribedCommunity(community: TCommunity): void {
      const root = getParent(self) as TRootStore
      root.account.addSubscribedCommunity(community)
    },
    removeSubscribedCommunity(community: TCommunity): void {
      const root = getParent(self) as TRootStore
      root.account.removeSubscribedCommunity(community)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CommunityDigest>
export default CommunityDigest

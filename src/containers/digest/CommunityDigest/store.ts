/*
 * CommunityDigest store
 *
 */

import type { TAccount, TRootStore, TViewing, TRoute, TCommunity } from '@/spec'
import { T, getParent, markStates, toJS, Instance } from '@/mobx'

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
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get curRoute(): TRoute {
      const root = getParent(self) as TRootStore
      return root.curRoute
    },
    get viewing(): TViewing {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing)
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

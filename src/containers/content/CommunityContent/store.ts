/*
 * CommunityContent store
 *
 */

import type { TRootStore, TAccount, TCommunity, TThread, TGlobalLayout } from '@/spec'
import { T, getParent, markStates, toJS, Instance, useMobxContext } from '@/mobx'
import { sortByIndex } from '@/helper'

const CommunityContent = T.model('CommunityContent', {})
  .views((self) => ({
    get isMobile(): boolean {
      const root = getParent(self) as TRootStore

      return root.isMobile
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore
      return root.viewing.activeThread
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get subscribedCommunitiesData(): TCommunity[] {
      const root = getParent(self) as TRootStore
      const { subscribedCommunities } = root.account

      return subscribedCommunities ? sortByIndex(subscribedCommunities.entries) : []
    },
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },
  }))
  .actions((self) => ({
    setCurThread(thread: TThread): void {
      const root = getParent(self) as TRootStore
      root.setCurThread(thread)
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CommunityContent>
export const useStore = (): TStore => useMobxContext().store.communityContent

export default CommunityContent

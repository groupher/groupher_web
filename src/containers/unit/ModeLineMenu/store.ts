/*
 * ModeLineMenu store
 *
 */

import type { TRootStore, TArticle, TCommunity } from '~/spec'
import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '~/mobx'

import type { TCurActive } from './spec'

const ModeLineMenu = T.model('ModeLineMenu', {
  searchCommunityValue: T.opt(T.string, ''),
})
  .views((self) => ({
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return toJS(root.viewingArticle)
    },
    get curActive(): TCurActive {
      const root = getParent(self) as TRootStore
      const slf = self as TStore

      return {
        community: toJS(root.viewing.community),
        thread: root.viewing.activeThread,
        article: toJS(slf.viewingArticle),
      }
    },
    get subscribedCommunities(): TCommunity[] {
      return []
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ModeLineMenu>
// @ts-ignore
export const useStore = (): TStore => useMobxContext().store.modeLineMenu

export default ModeLineMenu

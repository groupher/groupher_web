/*
 * ModeLineMenu store
 *
 */

import { prop, trim, filter, includes } from 'ramda'

import type { TRootStore, TArticle, TCommunity } from '@/spec'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { notEmpty } from '@/validator'

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
      const root = getParent(self) as TRootStore
      const { subscribedCommunities } = root.account
      const { searchCommunityValue } = self as TStore

      if (notEmpty(trim(searchCommunityValue))) {
        return filter(
          // @ts-ignore
          (item) => includes(searchCommunityValue, prop('title', item)),
          subscribedCommunities.entries,
        )
      }

      return subscribedCommunities ? subscribedCommunities.entries : []
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ModeLineMenu>
export const useStore = (): TStore => useMobxContext().store.modeLineMenu

export default ModeLineMenu

/*
 * UserLister store
 *
 */

import { findIndex, propEq } from 'ramda'

import type { TRootStore, TCommunity, TPagedUsers, TAccount } from '@/spec'
import TYPE from '@/constant/type'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { PagedUsers, emptyPagi } from '@/model'

const UserLister = T.model('UserLister', {
  loading: T.opt(T.bool, false),
  curView: T.opt(T.enum('curView', [TYPE.RESULT, TYPE.LOADING, TYPE.RESULT_EMPTY]), TYPE.LOADING),
  pagedUsers: T.opt(PagedUsers, emptyPagi),
  type: T.opt(
    T.enum('type', [
      TYPE.USER_LISTER_FAVORITES,
      TYPE.USER_LISTER_STARS,
      TYPE.USER_LISTER_COMMUNITY_EDITORS,
      TYPE.USER_LISTER_COMMUNITY_SUBSCRIBERS,
      TYPE.USER_LISTER_FOLLOWINGS,
      TYPE.USER_LISTER_FOLLOWERS,
    ]),
    TYPE.USER_LISTER_FAVORITES,
  ),
  id: T.maybeNull(T.string),
  thread: T.maybeNull(T.string),
  action: T.maybeNull(T.string),
  brief: T.opt(T.string, ''),
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
    get pagedUsersData(): TPagedUsers {
      return toJS(self.pagedUsers)
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
  }))
  .actions((self) => ({
    reset(): void {
      //
    },
    toggleHasFollow(login: string): void {
      const { entries } = self.pagedUsersData

      // @ts-ignore
      const index = findIndex(propEq('login', login), entries)
      if (index < 0) return

      const curIsFollow = self.pagedUsers.entries[index].viewerHasFollowed
      self.pagedUsers.entries[index].viewerHasFollowed = !curIsFollow
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof UserLister>
export const useStore = (): TStore => useMobxContext().store.userLister

export default UserLister

/*
 * UserContent store
 *
 */

import { values } from 'ramda'

import type { TRootStore, TAccount, TUser, TPagedCommunities } from '@/spec'
import { USER_THREAD } from '@/constant/thread'
import { T, getParent, Instance, markStates, toJS } from '@/mobx'
import { PagedCommunities, emptyPagi } from '@/model'

const UserContent = T.model('UserContent', {
  activeThread: T.opt(T.enum('activeThread', values(USER_THREAD)), USER_THREAD.PROFILE),
  following: T.opt(T.bool, false),

  pagedEditableCommunities: T.opt(PagedCommunities, emptyPagi),
  subscribedCommunities: T.opt(PagedCommunities, emptyPagi),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.account.accountInfo
    },
    get viewingUser(): TUser {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.user)
    },
    get isSelfViewing(): boolean {
      const root = getParent(self) as TRootStore
      return root.viewing.isSelfViewing
    },
    get pagedEditableCommunitiesData(): TPagedCommunities {
      return toJS(self.pagedEditableCommunities)
    },

    get hasContentBg(): boolean {
      const root = getParent(self) as TRootStore

      if (self.activeThread === USER_THREAD.PUBLISH) {
        return root.userPublishedArticles.hasContentBg
      }

      return true
    },
  }))
  .actions((self) => ({
    authWarning(options) {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    updateViewingUser(user) {
      const root = getParent(self) as TRootStore
      root.viewing.updateViewingUser(user)
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof UserContent>
export default UserContent

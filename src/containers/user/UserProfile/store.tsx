/*
 * UserProfile store
 *
 */

import { reject } from 'ramda'

import type { TRootStore, TUser, TPagedCommunities, TUserActivity } from '@/spec'
import { HCN } from '@/constant/name'

import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { PagedCommunities, emptyPagi, PagedPosts } from '@/model'

const UserProfile = T.model('UserProfile', {
  hasFollowedUser: T.maybeNull(T.bool),
  subscribedCommunities: T.opt(PagedCommunities, emptyPagi),
  pagedPosts: T.opt(PagedPosts, emptyPagi),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get viewingUser(): TUser {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.user)
    },
    get pagedSubscribedCommunitiesData(): TPagedCommunities {
      const { subscribedCommunities } = self
      const subscribedCommunitiesData = toJS(subscribedCommunities)

      if (subscribedCommunities.totalCount === 1) {
        return subscribedCommunitiesData
      }

      const { entries, ...rest } = subscribedCommunitiesData

      return {
        // @ts-ignore
        entries: reject((c) => c.slug === HCN, entries),
        ...rest,
      }
    },
    get activities(): TUserActivity[] {
      const slf = self as TStore
      const { pagedPosts } = slf

      return toJS(pagedPosts.entries).map((a) => {
        return {
          id: a.id,
          articleTitle: a.title,
          digest: a.digest,
          insertedAt: a.insertedAt,
        }
      })
    },
  }))
  .actions((self) => ({
    reset(): void {
      self.hasFollowedUser = null
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof UserProfile>
export const useStore = (): TStore => useMobxContext().store.userProfile

export default UserProfile

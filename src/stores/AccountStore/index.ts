/*
 * AccountStore store
 *
 */

import { mergeRight, clone, remove, insert, findIndex, propEq, includes } from 'ramda'

import type { TRootStore, TAccount, TCommunity, TPagedCommunities, TModerator } from '@/spec'
import { T, getParent, markStates, Instance, toJS } from '@/mobx'
import BStore from '@/utils/bstore'

import { User, EmptyUser, PagedCommunities } from '@/model'

const AccountStore = T.model('AccountStore', {
  user: T.opt(User, {}),
  isValidSession: T.opt(T.bool, false),
  userSubscribedCommunities: T.maybeNull(PagedCommunities),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get accountInfo(): TAccount {
      const slf = self as TStore

      const { user, curCommunity } = slf
      const moderatorLogins = curCommunity.moderators.map((item: TModerator) => item.user.login)

      return {
        ...toJS(user),
        isLogin: self.isValidSession,
        isValidSession: self.isValidSession,
        isModerator: includes(slf.user.login, moderatorLogins),
      }
    },
    get subscribedCommunities(): TPagedCommunities {
      if (!self.userSubscribedCommunities) {
        return { entries: [] }
      }
      return toJS(self.userSubscribedCommunities)
    },
    get isLogin(): boolean {
      return self.isValidSession
    },
    get pageDensity(): number {
      return parseInt(self.user.customization.displayDensity, 10)
    },
  }))
  .actions((self) => ({
    logout(): void {
      const root = getParent(self) as TRootStore
      const { sessionCleanup } = self as TStore
      root.drawer.close()
      sessionCleanup()
    },
    isMemberOf(type): boolean {
      const { achievement } = toJS(self.user)
      if (!achievement) return false
      return achievement[type] || false
    },
    updateAccount(sobj): void {
      const user = mergeRight(toJS(self.user), { ...sobj })
      const { mark } = self as TStore

      mark({ user })
    },
    updateSession({ isValid, user }) {
      self.isValidSession = isValid

      const { setSession, updateAccount, sessionCleanup } = self as TStore

      if (isValid) {
        setSession(user, BStore.get('token'))
        return updateAccount(user || {})
      }
      return sessionCleanup()
    },
    setSession(user: string, token: string): void {
      BStore.set('user', user)
      BStore.set('token', token)
      BStore.cookie.set('jwtToken', token)
    },
    sessionCleanup(): void {
      // @ts-ignore
      self.user = EmptyUser
      self.isValidSession = false
      BStore.remove('user')
      BStore.remove('token')
      BStore.cookie.remove('jwtToken')
    },
    loadSubscribedCommunities(data): void {
      // self.user.subscribedCommunities = data
      self.userSubscribedCommunities = data
    },
    addSubscribedCommunity(community: TCommunity): void {
      const {
        userSubscribedCommunities: { entries },
      } = self
      // @ts-ignore
      self.userSubscribedCommunities.entries = insert(0, community, entries)
      self.userSubscribedCommunities.totalCount += 1
    },

    removeSubscribedCommunity(community: TCommunity): void {
      const {
        userSubscribedCommunities: { entries },
      } = self

      const index = findIndex(propEq(community.id, 'id'), entries)
      // @ts-ignore
      self.userSubscribedCommunities.entries = remove(index, 1, entries)
      self.userSubscribedCommunities.totalCount -= 1
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof AccountStore>
export default AccountStore

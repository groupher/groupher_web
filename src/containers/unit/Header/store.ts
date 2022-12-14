/*
 * HeaderStore store
 *
 */

import { contains, values } from 'ramda'

import type { TRootStore, TCommunity, TAccount } from '@/spec'
import METRIC from '@/constant/metric'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

const HeaderStore = T.model('HeaderStore', {
  metric: T.opt(T.enum(values(METRIC)), METRIC.COMMUNITY),
})
  .views((self) => ({
    get isOnline(): boolean {
      const root = getParent(self) as TRootStore
      return root.isOnline
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.account.accountInfo
    },
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get hasNoBottomBorder(): boolean {
      return contains(self.metric, [
        METRIC.EXPLORE,
        METRIC.SPONSOR,
        METRIC.SUPPORT_US,
        METRIC.SUBSCRIBE,
        METRIC.ARTICLE,
        METRIC.MEMBERSHIP,
        METRIC.USER,
        METRIC.COMMUNITY_EDITOR,
        METRIC.HELP_CENTER,
      ])
    },
    get leftOffset(): string {
      // const root = getParent(self) as TRootStore
      // const curSidebarPin = root.sidebar.pin

      // if (
      //   (!curSidebarPin && !self.preSidebarPin && !self.fixed) ||
      //   (!curSidebarPin && !self.preSidebarPin) ||
      //   (curSidebarPin && !self.preSidebarPin && !self.fixed) ||
      //   (curSidebarPin && self.preSidebarPin && self.fixed) ||
      //   (curSidebarPin && self.preSidebarPin && !self.fixed) ||
      //   (!curSidebarPin && self.preSidebarPin && !self.fixed)
      // ) {
      //   return 0
      // }

      // 特殊情况： 当 sidebar 打开时下滑页面， 需要一个 preSidebarPin 的中间状态
      // if (!curSidebarPin && self.preSidebarPin && self.fixed) {
      // if (!curSidebarPin) {
      //   return '-180px'
      // }

      // isPin && !self.preSidebarPin && self.fixed
      // return '180px'
      return '0'
    },
  }))
  .actions((self) => ({
    logout(): void {
      const root = getParent(self) as TRootStore
      root.account.logout()
    },
    updateSession(state): void {
      const root = getParent(self) as TRootStore
      root.account.updateSession(state)
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    handleLogin(): void {
      // const root = getParent(self) as TRootStore
      // root.doraemon.handleLogin()
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof HeaderStore>

export default HeaderStore

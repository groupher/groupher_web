/*
 * PassportEditor store
 */

import { find } from 'ramda'

import type { TCommunity, TRootStore, TUser, TAccount } from '@/spec'
import { buildLog } from '@/logger'
import { markStates, toJS, T, getParent, Instance } from '@/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:PassportEditor')

const PassportEditor = T.model('PassportEditor', {
  selectedRules: T.opt(T.array(T.str), []),
})
  .views((self) => ({
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get activeModerator(): TUser {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.activeModerator)
    },
    get isCurUserModeratorRoot(): boolean {
      const slf = self as TStore
      const { curCommunity, accountInfo } = slf

      const curModerators = curCommunity.moderators
      const curRoot = find((moderator) => moderator.role === 'root', curModerators)

      return curRoot.user.login === accountInfo.login
    },
    get isActiveModeratorRoot(): boolean {
      const slf = self as TStore
      const { curCommunity, activeModerator } = slf

      const curModerators = curCommunity.moderators
      const curRoot = find((moderator) => moderator.role === 'root', curModerators)

      return curRoot.user.login === activeModerator.login
    },
    get allRootRules(): string {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.allRootRules)
    },
    get allModeratorRules(): string {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.allModeratorRules)
    },
    get selectedRulesData(): string[] {
      return toJS(self.selectedRules)
    },

    get allPassportLoaded(): boolean {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.allModeratorRules) !== '{}'
    },
  }))
  .actions((self) => ({
    setAllPassportRules(rootRules: string, moderatorRules): void {
      const root = getParent(self) as TRootStore

      root.dashboardThread.setAllPassportRules(rootRules, moderatorRules)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof PassportEditor>

export default PassportEditor

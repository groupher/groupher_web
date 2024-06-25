/*
 * PassportEditor store
 */

import { find } from 'ramda'

import type { TCommunity, TRootStore, TUser } from '@/spec'
import { markStates, toJS, T, getParent, type Instance, useMobxContext } from '@/mobx'

const PassportEditor = T.model('PassportEditor', {
  selectedRules: T.opt(T.array(T.str), []),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get activeModerator(): TUser {
      //const root = getParent(self) as TRootStore
      // toJS(root.dashboardThread?.activeModerator)
      return {}
    },
    get isCurUserModeratorRoot(): boolean {
      return true
      // const { curCommunity, accountInfo } = slf

      // const curModerators = curCommunity.moderators
      // const curRoot = find((moderator) => moderator.role === 'root', curModerators)

      // return curRoot.user.login === accountInfo.login
    },
    get isActiveModeratorRoot(): boolean {
      const slf = self as TStore
      const { curCommunity, activeModerator } = slf

      const curModerators = curCommunity.moderators
      const curRoot = find((moderator) => moderator.role === 'root', curModerators)

      return curRoot.user.login === activeModerator?.login
    },
    get allRootRules(): string {
      // const root = getParent(self) as TRootStore

      // return toJS(root.dashboardThread.allRootRules)
      return ''
    },
    get allModeratorRules(): string {
      // const root = getParent(self) as TRootStore

      // toJS(root.dashboardThread.allModeratorRules)

      return ''
    },
    get selectedRulesData(): string[] {
      return toJS(self.selectedRules)
    },

    get allPassportLoaded(): boolean {
      // const root = getParent(self) as TRootStore

      // toJS(root.dashboardThread.allModeratorRules) !== '{}'
      return true
    },
  }))
  .actions((self) => ({
    setAllPassportRules(rootRules: string, moderatorRules): void {
      // const root = getParent(self) as TRootStore
      // root.dashboardThread.setAllPassportRules(rootRules, moderatorRules)

      return
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof PassportEditor>
export const useStore = (): TStore => useMobxContext().store.passportEditor

export default PassportEditor

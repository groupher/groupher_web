/*
 * PassportEditor store
 */

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS, T, getParent, Instance } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:PassportEditor')

const PassportEditor = T.model('PassportEditor', {
  allModeratorRules: T.opt(T.str, '{}'),
  allRootRules: T.opt(T.str, '{}'),
  selectedRules: T.opt(T.array(T.str), []),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get selectedRulesData(): string[] {
      return toJS(self.selectedRules)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof PassportEditor>

export default PassportEditor

/*
 * AboutThread store
 */

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/logger'
import { T, getParent, markStates, Instance, toJS } from '@/mobx'

const _log = buildLog('S:AboutThread')

const AboutThread = T.model('AboutThread', {})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof AboutThread>

export default AboutThread

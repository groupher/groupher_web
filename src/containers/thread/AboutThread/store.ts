/*
 * AboutThread store
 */

import type { TCommunity, TRootStore } from '@/spec'
import { T, getParent, markStates, type Instance, toJS } from '@/mobx'

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

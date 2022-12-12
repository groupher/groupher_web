/*
 * HelpThread store
 */

// import {} from 'ramda'

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:HelpThread')

const HelpThread = T.model('HelpThread', {
  mode: T.opt(T.enum(['full', 'helpcenter', 'faq', 'article']), 'article'),
})
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

export type TStore = Instance<typeof HelpThread>

export default HelpThread

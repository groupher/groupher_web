/*
 * HelpThread store
 */

// import {} from 'ramda'

import type { TCommunity, THelpLayout, TRootStore, TFileTreeDirection } from '@/spec'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:HelpThread')

const HelpThread = T.model('HelpThread', {
  isArticleLayout: T.opt(T.bool, false),
  isFAQArticleLayout: T.opt(T.bool, true),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get fileTreeDirection(): TFileTreeDirection {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.uiSettings.fileTreeDirection
    },
    get layout(): THelpLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.uiSettings.helpLayout)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof HelpThread>

export default HelpThread

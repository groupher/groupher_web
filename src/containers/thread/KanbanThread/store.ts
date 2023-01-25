/*
 * KanbanThread store
 */

// import {} from 'ramda'

import type { TCommunity, TKanbanLayout, TRootStore, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:KanbanThread')

const KanbanThread = T.model('KanbanThread', {})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get layout(): TKanbanLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.kanbanLayout)
    },
    get avatarLayout(): TAvatarLayout {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.avatarLayout
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof KanbanThread>

export default KanbanThread

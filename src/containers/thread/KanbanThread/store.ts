/*
 * KanbanThread store
 */

// import {} from 'ramda'

import type {
  TCommunity,
  TKanbanLayout,
  TRootStore,
  TAvatarLayout,
  TColorName,
  TPagedArticles,
} from '@/spec'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

import { emptyPagi, PagedPosts } from '@/model'

/* eslint-disable-next-line */
const log = buildLog('S:KanbanThread')

const KanbanThread = T.model('KanbanThread', {
  todo: T.opt(PagedPosts, emptyPagi),
  wip: T.opt(PagedPosts, emptyPagi),
  done: T.opt(PagedPosts, emptyPagi),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get layout(): TKanbanLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.kanbanLayout)
    },
    get kanbanBgColors(): TColorName[] {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.kanbanBgColors as TColorName[]
    },
    get avatarLayout(): TAvatarLayout {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.avatarLayout
    },
    get todoPosts(): TPagedArticles {
      return toJS(self.todo)
    },
    get wipPosts(): TPagedArticles {
      return toJS(self.wip)
    },
    get donePosts(): TPagedArticles {
      return toJS(self.done)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof KanbanThread>

export default KanbanThread

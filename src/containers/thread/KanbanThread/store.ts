/*
 * KanbanThread store
 */

// import {} from 'ramda'

import type { TCommunity, TKanbanLayout, TRootStore, TColorName, TPagedArticles } from '@/spec'
import { buildLog } from '@/logger'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'

import { emptyPagi, PagedPosts } from '@/model'

/* eslint-disable-next-line */
const log = buildLog('S:KanbanThread')

const KanbanThread = T.model('KanbanThread', {
  todo: T.opt(PagedPosts, emptyPagi),
  wip: T.opt(PagedPosts, emptyPagi),
  done: T.opt(PagedPosts, emptyPagi),
})
  .views((self) => ({
    get layout(): TKanbanLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.kanbanLayout)
    },
    get kanbanBgColors(): TColorName[] {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.kanbanBgColors) as TColorName[]
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
export const useStore = (): TStore => useMobxContext().store.kanbanThread

export default KanbanThread

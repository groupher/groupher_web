/*
 * ChangelogThread store
 */

import { values } from 'ramda'

import type { TCommunity, TRootStore, TGlobalLayout, TTag, TPagedArticles } from '@/spec'
import { buildLog } from '@/logger'

import { T, getParent, markStates, Instance, toJS } from '@/mobx'
import { mockTags, mockChangelogTimeTags, mockChangelogVersionTags } from '@/mock'

import { PagedChangelogs, emptyPagi } from '@/model'

import { TAGS_MODE } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:ChangelogThread')

const ChangelogThread = T.model('ChangelogThread', {
  pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),
  tagsMode: T.opt(T.enum(values(TAGS_MODE)), TAGS_MODE.ALL),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },
    get tagsData(): TTag[] {
      const slf = self as TStore
      if (slf.tagsMode === TAGS_MODE.ALL || slf.tagsMode === TAGS_MODE.TAG) {
        return mockTags(15)
      }

      if (slf.tagsMode === TAGS_MODE.VERSION) {
        return mockChangelogVersionTags(15)
      }

      return mockChangelogTimeTags(15)
    },
    get pagedChangelogsData(): TPagedArticles {
      return toJS(self.pagedChangelogs)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ChangelogThread>

export default ChangelogThread

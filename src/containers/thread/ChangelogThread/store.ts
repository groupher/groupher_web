/*
 * ChangelogThread store
 */

import { types as T, getParent, Instance } from 'mobx-state-tree'
import { values } from 'ramda'

import type { TCommunity, TRootStore, TGlobalLayout, TTag } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS } from '@/utils/mobx'

import {
  mockTags,
  mockChangelogTimeTags,
  mockChangelogVersionTags,
} from '@/utils/mock'

import { TAGS_MODE } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:ChangelogThread')

const ChangelogThread = T.model('ChangelogThread', {
  tagsMode: T.optional(T.enumeration(values(TAGS_MODE)), TAGS_MODE.DEFAULT),
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
      if (slf.tagsMode === TAGS_MODE.DEFAULT) {
        return mockTags(15)
      }

      if (slf.tagsMode === TAGS_MODE.VERSION) {
        return mockChangelogVersionTags(15)
      }

      return mockChangelogTimeTags(15)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ChangelogThread>

export default ChangelogThread

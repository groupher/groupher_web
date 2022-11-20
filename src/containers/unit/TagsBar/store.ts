/*
 * TagsBar store
 *
 */

import { types as T, getParent, Instance } from 'mobx-state-tree'
import { findIndex, propEq } from 'ramda'
import { THREAD } from '@/constant'

import type {
  TRootStore,
  TCommunity,
  TTag,
  TGroupedTags,
  TThread,
} from '@/spec'

import { markStates, toJS } from '@/utils/mobx'
import { groupByKey } from '@/utils/helper'

import { Tag, emptyTag } from '@/model'

const TagsBar = T.model('TagsBar', {
  tags: T.optional(T.array(Tag), []),
  activeTag: T.maybeNull(Tag),
  thread: T.maybeNull(T.string),

  loading: T.optional(T.boolean, false),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore
      return root.viewing.activeThread
    },
    get tagsData(): TTag[] {
      const root = getParent(self) as TRootStore
      const { curThread } = self as TStore

      if (curThread === THREAD.CHANGELOG) {
        return root.changelogThread.tagsData
      }
      return toJS(self.tags)
      // return mockTags(15)
    },
    get activeTagData(): TTag {
      return toJS(self.activeTag) || emptyTag
    },
    get groupedTags(): TGroupedTags {
      const { tagsData } = self as TStore

      return groupByKey(tagsData, 'group')
    },
    get maxDisplayCount(): number {
      // const slf = self as TStore
      return 3
    },
    get totalCountThrold(): number {
      return 12
    },
  }))
  .actions((self) => ({
    selectTag(tag): void {
      const cur = tag.raw === '' ? null : tag

      self.activeTag = cur
    },
    getTagIdByTitle(title: string): boolean | string {
      if (!title) return false

      // @ts-ignore
      const index = findIndex(propEq('title', title), self.tagsData)
      if (index >= 0) {
        return self.tagsData[index].id
      }
      return false
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof TagsBar>
export default TagsBar

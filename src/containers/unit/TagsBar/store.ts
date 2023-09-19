/*
 * TagsBar store
 *
 */

import { findIndex, propEq } from 'ramda'
import { THREAD } from '@/constant/thread'

import type { TRootStore, TCommunity, TTag, TGroupedTags, TThread } from '@/spec'

import { T, getParent, markStates, Instance, toJS } from '@/mobx'
// import { mockTags } from '@/mock'
import { groupByKey } from '@/helper'

import { Tag, emptyTag } from '@/model'

const TagsBar = T.model('TagsBar', {
  tags: T.opt(T.array(Tag), []),
  activeTag: T.maybeNull(Tag),
  thread: T.maybeNull(T.string),

  loading: T.opt(T.bool, false),
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
      // return mockTags(15)
      return toJS(self.tags)
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
      return 10
    },
  }))
  .actions((self) => ({
    selectTag(tag): void {
      const cur = tag.slug === '' ? null : tag

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

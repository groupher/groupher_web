/*
 * TagSettingEditor store
 */

import type { TCommunity, TRootStore, TTag, TSelectOption } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS, T, getParent, Instance } from '@/utils/mobx'

import { Tag } from '@/model'

/* eslint-disable-next-line */
const log = buildLog('S:TagSettingEditor')

const TagSettingEditor = T.model('TagSettingEditor', {
  mode: T.opt(T.enum('mode', ['create', 'edit']), 'edit'),
  editingTag: T.maybeNull(Tag),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get curTag(): TTag {
      const slf = self as TStore

      return slf.mode === 'create' ? slf.editingTag : slf.settingTag
    },

    get categoryOptions(): TSelectOption[] {
      const root = getParent(self) as TRootStore
      const tagCategories = toJS(root.dashboardThread.tagCategories)

      return tagCategories.map((cat) => {
        return {
          label: cat,
          value: cat,
        }
      })
    },

    get settingTag(): TTag {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.settingTag || {})
    },

    get curCategory(): TSelectOption {
      const slf = self as TStore
      const { settingTag } = slf

      return {
        label: settingTag.group,
        value: settingTag.group,
      }
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof TagSettingEditor>

export default TagSettingEditor

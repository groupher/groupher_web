/*
 * TagSettingEditor store
 */
import { uniq, reject, values } from 'ramda'

import type { TCommunity, TRootStore, TTag, TSelectOption, TThread } from '@/spec'
import { buildLog } from '@/utils/logger'
import { nilOrEmpty } from '@/utils/validator'
import { markStates, toJS, T, getParent, Instance } from '@/utils/mobx'
import { CHANGE_MODE } from '@/constant/mode'

import { Tag } from '@/model'

/* eslint-disable-next-line */
const log = buildLog('S:TagSettingEditor')

const TagSettingEditor = T.model('TagSettingEditor', {
  mode: T.opt(T.enum('mode', values(CHANGE_MODE)), CHANGE_MODE.UPDATE),
  editingTag: T.maybeNull(Tag),
  processing: T.opt(T.bool, false),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.activeTagThread.toUpperCase() as TThread
    },
    get settingTag(): TTag {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.settingTag || {})
    },

    get editingTagData(): TTag {
      return toJS(self.editingTag || {})
    },

    get categoryOptions(): TSelectOption[] {
      const root = getParent(self) as TRootStore
      const slf = self as TStore

      const tagGroups = toJS(root.dashboardThread.tagGroups)

      const { editingTagData } = slf

      const existOptions = tagGroups.map((cat) => ({
        label: cat,
        value: cat,
      }))

      let retOptions = existOptions

      const { group } = editingTagData
      if (group) {
        retOptions = uniq([
          {
            label: group,
            value: group,
          },
          ...existOptions,
        ])
      }

      return reject((opt: TSelectOption) => nilOrEmpty(opt.value), uniq(retOptions))
    },

    get curCategory(): TSelectOption {
      const slf = self as TStore
      const {
        editingTagData: { group },
      } = slf

      return {
        label: group,
        value: group,
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

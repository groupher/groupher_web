/*
 * TagSettingEditor store
 */

import { types as T, getParent, Instance } from 'mobx-state-tree'
// import {} from 'ramda'

import type { TCommunity, TRootStore, TTag, TSelectOption } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:TagSettingEditor')

const TagSettingEditor = T.model('TagSettingEditor', {})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
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

      return toJS(root.dashboardThread.settingTag)
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

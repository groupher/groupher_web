/*
 * CoverEditor store
 */

import { values } from 'ramda'

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS, getParent, Instance, T } from '@/utils/mobx'

import type { TToolboxSetting, TImagePos, TSettingLevel } from './spec'
import { IMAGE_POS, SETTING_LEVEL } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:CoverEditor')

const CoverEditor = T.model('CoverEditor', {
  imagePos: T.opt(T.enum(values(IMAGE_POS)), IMAGE_POS.CENTER),
  shadowLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L1),
  borderRadiusLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L1),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get toolboxSetting(): TToolboxSetting {
      const slf = self as TStore
      const { imagePos, shadowLevel, borderRadiusLevel } = slf

      return {
        pos: imagePos as TImagePos,
        shadowLevel: shadowLevel as TSettingLevel,
        borderRadiusLevel: borderRadiusLevel as TSettingLevel,
      }
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CoverEditor>

export default CoverEditor

/*
 * CoverEditor store
 */

import { values, keys, clone, forEach } from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TWallpaper,
  TWallpaperGradient,
  TWallpaperGradientDir,
} from '@/spec'
import { GRADIENT_WALLPAPER, GRADIENT_DIRECTION } from '@/constant'

import { buildLog } from '@/utils/logger'
import { markStates, toJS, getParent, Instance, T } from '@/utils/mobx'

import type { TToolboxSetting, TImagePos, TSettingLevel, TLinearBorderPos } from './spec'
import { IMAGE_POS, SETTING_LEVEL, LINEAR_BORDER } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:CoverEditor')

const CoverEditor = T.model('CoverEditor', {
  imagePos: T.opt(T.enum(values(IMAGE_POS)), IMAGE_POS.TOP_LEFT),
  shadowLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L3),
  borderRadiusLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L3),
  linearBorderPos: T.opt(T.enum(values(LINEAR_BORDER)), LINEAR_BORDER.BOTTOM_RIGHT),
  // for background
  wallpaper: T.opt(T.string, 'pink'),
  hasPattern: T.opt(T.bool, false),
  hasBlur: T.opt(T.bool, true),
  direction: T.opt(T.string, GRADIENT_DIRECTION.BOTTOM),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get gradientWallpapers(): Record<string, TWallpaper> {
      const slf = self as TStore
      const wallpapers = clone(GRADIENT_WALLPAPER)
      const paperKeys = keys(GRADIENT_WALLPAPER)

      forEach((key) => {
        const wallpaperObj = wallpapers[key] as TWallpaperGradient

        wallpaperObj.hasPattern = slf.hasPattern
        wallpaperObj.hasBlur = slf.hasBlur
        wallpaperObj.direction = slf.direction
      }, paperKeys)

      return wallpapers
    },

    get toolboxSetting(): TToolboxSetting {
      const slf = self as TStore
      const {
        imagePos,
        shadowLevel,
        borderRadiusLevel,
        linearBorderPos,
        wallpaper,
        gradientWallpapers,
        direction,
      } = slf

      return {
        pos: imagePos as TImagePos,
        shadowLevel: shadowLevel as TSettingLevel,
        borderRadiusLevel: borderRadiusLevel as TSettingLevel,
        linearBorderPos: linearBorderPos as TLinearBorderPos,
        wallpapers: gradientWallpapers,
        wallpaper,
        direction: direction as TWallpaperGradientDir,
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

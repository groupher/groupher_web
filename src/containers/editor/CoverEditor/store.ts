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
import { COVER_GRADIENT_WALLPAPER, GRADIENT_DIRECTION } from '@/constant/wallpaper'

import { buildLog } from '@/logger'
import { markStates, toJS, getParent, Instance, T, useMobxContext } from '@/mobx'

import type {
  TToolboxSetting,
  TImagePos,
  TSettingLevel,
  TLinearBorderPos,
  TImageSize,
  TImageRadio,
} from './spec'
import { IMAGE_POS, SETTING_LEVEL, LINEAR_BORDER, IMAGE_SIZE, IMAGE_RATIO } from './constant'

const log = buildLog('S:CoverEditor')

const CoverEditor = T.model('CoverEditor', {
  imagePos: T.opt(T.enum(values(IMAGE_POS)), IMAGE_POS.CENTER),
  lightPos: T.opt(T.enum(values(IMAGE_POS)), IMAGE_POS.NONE),
  shadowLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L1),
  borderRadiusLevel: T.opt(T.enum(values(SETTING_LEVEL)), SETTING_LEVEL.L1),
  linearBorderPos: T.opt(T.enum(values(LINEAR_BORDER)), LINEAR_BORDER.NONE),
  size: T.opt(T.enum(values(IMAGE_SIZE)), IMAGE_SIZE.LARGE),
  ratio: T.opt(T.enum(values(IMAGE_RATIO)), IMAGE_RATIO.SCREEN),
  rotate: T.opt(T.int, 0),
  hasGlassBorder: T.opt(T.bool, false),

  // for background
  wallpaper: T.opt(T.string, ''),
  hasPattern: T.opt(T.bool, false),
  hasBlur: T.opt(T.bool, true),
  direction: T.opt(T.string, GRADIENT_DIRECTION.BOTTOM_RIGHT),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get gradientWallpapers(): Record<string, TWallpaper> {
      const slf = self as TStore
      const wallpapers = clone(COVER_GRADIENT_WALLPAPER)
      const paperKeys = keys(COVER_GRADIENT_WALLPAPER)

      forEach((key) => {
        const wallpaperObj = wallpapers[key] as TWallpaperGradient

        wallpaperObj.hasPattern = slf.hasPattern
        wallpaperObj.hasBlur = slf.hasBlur
        wallpaperObj.direction = slf.direction as TWallpaperGradientDir
      }, paperKeys)

      return wallpapers
    },

    get toolboxSetting(): TToolboxSetting {
      const slf = self as TStore

      const {
        imagePos,
        lightPos,
        shadowLevel,
        borderRadiusLevel,
        linearBorderPos,
        wallpaper,
        gradientWallpapers,
        direction,
        size,
        ratio,
        rotate,
        hasGlassBorder,
      } = slf

      return {
        pos: imagePos as TImagePos,
        lightPos: lightPos as TImagePos,
        shadowLevel: shadowLevel as TSettingLevel,
        borderRadiusLevel: borderRadiusLevel as TSettingLevel,
        linearBorderPos: linearBorderPos as TLinearBorderPos,
        wallpapers: gradientWallpapers,
        wallpaper,
        direction: direction as TWallpaperGradientDir,
        size: size as TImageSize,
        ratio: ratio as TImageRadio,
        rotate,
        hasGlassBorder,
      }
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CoverEditor>
export const useStore = (): TStore => useMobxContext().store.coverEditor

export default CoverEditor

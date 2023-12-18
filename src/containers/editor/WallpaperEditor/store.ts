/*
 * WallpaperEditor store
 */

import { keys, values, clone, forEach, pick } from 'ramda'

import type {
  TWallpaper,
  TWallpaperGradient,
  TWallpaperPic,
  TWallpaperGradientDir,
  TCustomWallpaper,
  TCommunity,
  TRootStore,
  TWallpaperData,
} from '@/spec'
import { GRADIENT_WALLPAPER, PATTERN_WALLPAPER, WALLPAPER_TYPE } from '@/constant/wallpaper'

import { buildLog } from '@/logger'
import { T, markStates, Instance, getParent, toJS, useMobxContext } from '@/mobx'

import { TAB } from './constant'

const _log = buildLog('S:WallpaperEditor')

const initWallpaperModalFields = {
  wallpaperType: T.opt(T.enum(values(WALLPAPER_TYPE)), WALLPAPER_TYPE.GRADIENT),
  wallpaper: T.opt(T.string, 'pink'),
  // for gradient & custom colors
  hasPattern: T.opt(T.bool, true),
  direction: T.opt(T.string, 'bottom'),

  // for uploaded bg image
  bgSize: T.opt(T.string, 'cover'),
  // common
  hasBlur: T.opt(T.bool, false),
  hasShadow: T.opt(T.bool, false),
}

const InitWallpaper = T.model('WallpaperInit', initWallpaperModalFields)

const WallpaperEditor = T.model('WallpaperEditor', {
  ...initWallpaperModalFields,
  loading: T.opt(T.bool, false),
  tab: T.opt(T.enum(values(TAB)), TAB.BUILDIN),
  customColorValue: T.opt(T.str, ''),
  uploadBgImage: T.opt(T.str, ''),
  initWallpaper: T.opt(InitWallpaper, {}),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },

    get isTouched(): boolean {
      const slf = self as TStore
      const init = slf.initWallpaper

      return (
        self.wallpaper !== init.wallpaper ||
        self.hasPattern !== init.hasPattern ||
        self.hasBlur !== init.hasBlur ||
        self.direction !== init.direction
      )
    },
    get customWallpaper(): TCustomWallpaper {
      const slf = self as TStore
      const { hasPattern, hasBlur, hasShadow, direction, customColorValue } = slf

      if (slf.wallpaperType === WALLPAPER_TYPE.CUSTOM_GRADIENT) {
        const customColors = customColorValue.split(',').map((c) => c.trim())

        return {
          colors: customColors,
          hasPattern,
          hasBlur,
          hasShadow,
          direction: direction as TWallpaperGradientDir,
        }
      }

      return null
    },
    get patternWallpapers(): Record<string, TWallpaper> {
      const slf = self as TStore
      const wallpapers = clone(PATTERN_WALLPAPER)
      const paperKeys = keys(PATTERN_WALLPAPER)

      forEach((key) => {
        const wallpaperObj = wallpapers[key] as TWallpaperPic
        wallpaperObj.hasBlur = slf.hasBlur
      }, paperKeys)

      return wallpapers
    },

    get gradientWallpapers(): Record<string, TWallpaper> {
      const slf = self as TStore
      const wallpapers = clone(GRADIENT_WALLPAPER)
      const paperKeys = keys(GRADIENT_WALLPAPER)

      forEach((key) => {
        const wallpaperObj = wallpapers[key] as TWallpaperGradient

        wallpaperObj.hasPattern = slf.hasPattern
        wallpaperObj.hasBlur = slf.hasBlur
        wallpaperObj.direction = slf.direction as TWallpaperGradientDir
      }, paperKeys)

      return wallpapers
    },

    get wallpapers(): Record<string, TWallpaper> {
      const slf = self as TStore

      return {
        ...slf.gradientWallpapers,
        ...slf.patternWallpapers,
      }
    },

    get wallpaperData(): TWallpaperData {
      const slf = self as TStore

      return {
        ...pick(
          [
            'wallpaper',
            'patternWallpapers',
            'gradientWallpapers',
            'wallpaperType',
            'hasPattern',
            'hasBlur',
            'hasShadow',
          ],
          slf,
        ),

        customColor: slf.customColorValue,
        direction: self.direction as TWallpaperGradientDir,
      }
    },
  }))
  .actions((self) => ({
    /** it also maybe called by landing page */
    changeWallpaper(wallpaper: string): void {
      const slf = self as TStore
      slf.wallpaper = wallpaper
    },
    rollbackEdit(): void {
      const slf = self as TStore
      const init = slf.initWallpaper

      self.wallpaper = init.wallpaper
      self.hasPattern = init.hasPattern
      self.hasBlur = init.hasBlur
      self.direction = init.direction as TWallpaperGradientDir
    },

    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
    reset(): void {
      self.tab = TAB.BUILDIN
    },
  }))

export type TStore = Instance<typeof WallpaperEditor>
export const useStore = (): TStore => useMobxContext().store.wallpaperEditor

export default WallpaperEditor

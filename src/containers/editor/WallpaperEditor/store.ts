/*
 * WallpaperEditor store
 */

import { keys, values, clone, forEach, pick } from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TWallpaper,
  TWallpaperType,
  TWallpaperGradient,
  TWallpaperPic,
  TWallpaperGradientDir,
} from '@/spec'
import { GRADIENT_WALLPAPER, PATTERN_WALLPAPER } from '@/constant/wallpaper'

import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { getWallpaperType } from '@/utils/wallpaper'

import type { TWallpaperData } from './spec'
import { TAB } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:WallpaperEditor')

const initWallpaperModalFields = {
  wallpaper: T.opt(T.string, 'pink'),
  // for gradient colors
  hasPattern: T.opt(T.bool, true),
  hasBlur: T.opt(T.bool, false),
  hasShadow: T.opt(T.bool, true),
  direction: T.opt(T.string, 'bottom'),
}

const InitWallpaper = T.model('WallpaperInit', initWallpaperModalFields)

const WallpaperEditor = T.model('WallpaperEditor', {
  tab: T.opt(T.enum(values(TAB)), TAB.BUILDIN),
  ...initWallpaperModalFields,
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

    get wallpaperType(): TWallpaperType {
      const slf = self as TStore
      return getWallpaperType(slf.wallpaper)
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

export default WallpaperEditor

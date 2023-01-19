/*
 * LandingPage store
 */

import type { TCommunity, TRootStore, TWallpaper } from '@/spec'

import { buildLog } from '@/utils/logger'
import { markStates, toJS, T, getParent, Instance } from '@/utils/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:LandingPage')

const LandingPage = T.model('LandingPage', {})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get wallpaper(): string {
      const root = getParent(self) as TRootStore

      return root.wallpaperEditor.wallpaper
    },
    get wallpapers(): Record<string, TWallpaper> {
      const root = getParent(self) as TRootStore
      return root.wallpaperEditor.wallpapers
    },
    get gradientWallpapers(): Record<string, TWallpaper> {
      const root = getParent(self) as TRootStore

      return root.wallpaperEditor.gradientWallpapers
    },
  }))
  .actions((self) => ({
    changeWallpaper(wallpaper: string): void {
      const root = getParent(self) as TRootStore

      return root.wallpaperEditor.changeWallpaper(wallpaper)
    },

    changeGlowEffect(glowEffect: string): void {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.changeGlowEffect(glowEffect)
    },

    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof LandingPage>

export default LandingPage

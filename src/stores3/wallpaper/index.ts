import { proxy } from 'valtio'
import { mergeLeft, mergeDeepRight } from 'ramda'

import type { TWallpaperGradientDir } from '@/spec'
import { WALLPAPER_TYPE } from '@/const/wallpaper'

import type { TStore, TInitState } from './spec'

export default (initState: TInitState = {}): TStore => {
  const store = proxy(
    mergeLeft(initState, {
      customWallpaper: null,
      customColorValue: '',
      wallpaper: 'pick',
      wallpaperType: WALLPAPER_TYPE.GRADIENT,
      // TODO: move out
      // wallpapers: Record<string, TWallpaper>
      hasPattern: true,
      hasBlur: false,
      hasShadow: false,
      // TODO: move out
      // gradientWallpapers: Record<string, TWallpaper>,

      direction: 'bottom' as TWallpaperGradientDir,
      bgSize: 'cover',

      uploadBgImage: '',

      commit: (patch: Partial<TStore>): void => {
        Object.assign(store, mergeDeepRight(store, patch))
      },
    }),
  )

  return store
}

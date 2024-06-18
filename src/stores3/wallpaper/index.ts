import { proxy } from 'valtio'
import { mergeLeft } from 'ramda'

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

      direction: 'bottom',
      bgSize: 'cover',

      uploadBgImage: '',
    }),
  )

  return store
}

import { useCallback } from 'react'
import { clone, keys, forEach, pick } from 'ramda'

import type {
  TWallpaper,
  TWallpaperGradient,
  TWallpaperPic,
  TWallpaperGradientDir,
  TWallpaperData,
} from '~/spec'
import { GRADIENT_WALLPAPER, PATTERN_WALLPAPER } from '~/const/wallpaper'

import useSubStore from '~/hooks/useSubStore'

type TRet = {
  wallpaper: string
  changeWallpaper: (wallpaper: string) => void
  getWallpaper: () => TWallpaperData
  getGradientWallpapers: () => Record<string, TWallpaper>
  getPatternWallpapers: () => Record<string, TWallpaper>
}

export default (): TRet => {
  const store = useSubStore('wallpaper')

  const getGradientWallpapers = useCallback((): Record<string, TWallpaper> => {
    const wallpapers = clone(GRADIENT_WALLPAPER)
    const paperKeys = keys(GRADIENT_WALLPAPER)

    forEach((key) => {
      const wallpaperObj = wallpapers[key] as TWallpaperGradient
      const { hasPattern, hasBlur, direction } = store

      wallpaperObj.hasPattern = hasPattern
      wallpaperObj.hasBlur = hasBlur
      wallpaperObj.direction = direction as TWallpaperGradientDir
    }, paperKeys)

    return wallpapers
  }, [store])

  const getPatternWallpapers = useCallback((): Record<string, TWallpaper> => {
    const wallpapers = clone(PATTERN_WALLPAPER)
    const paperKeys = keys(PATTERN_WALLPAPER)

    forEach((key) => {
      const wallpaperObj = wallpapers[key] as TWallpaperPic
      wallpaperObj.hasBlur = store.hasBlur
    }, paperKeys)

    return wallpapers
  }, [store])

  const getWallpaper = useCallback((): TWallpaperData => {
    const { customColorValue, direction } = store

    return {
      ...pick(['wallpaper', 'wallpaperType', 'hasPattern', 'hasBlur', 'hasShadow'], store),
      gradientWallpapers: getGradientWallpapers(),
      patternWallpapers: getPatternWallpapers(),
      customColor: customColorValue,
      direction,
    }
  }, [store])

  const changeWallpaper = (wallpaper: string): void => store.commit({ wallpaper })

  return {
    wallpaper: store.wallpaper,
    changeWallpaper,
    getGradientWallpapers,
    getPatternWallpapers,
    getWallpaper,
  }
}

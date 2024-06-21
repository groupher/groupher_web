import { useState, useCallback } from 'react'
import { pick, clone, keys, forEach } from 'ramda'

import type {
  TWallpaper,
  TWallpaperGradient,
  TWallpaperPic,
  TWallpaperGradientDir,
  TWallpaperType,
  TWallpaperData,
} from '@/spec'
import {
  GRADIENT_WALLPAPER,
  PATTERN_WALLPAPER,
  WALLPAPER_TYPE,
  WALLPAPER_STATE_KEYS,
} from '@/const/wallpaper'

import useSubStore from '@/hooks/useSubStore'
// import { closeDrawer } from '@/signal'

import type { TWallpaperState } from '@/stores3/wallpaper/spec'
import { INITIAL_WALLPAPER_STATE } from '@/stores3/wallpaper'

import type { TTab } from './spec'
import { TAB } from './constant'

type TRet = {
  tab: TTab
  loading: boolean
  // drived
  getWallpaper: () => TWallpaperData
  getIsTouched: () => boolean
  // actions
  initRollback: () => void
  rollbackWallpaper: () => void
  onSave: () => void
  close: () => void

  changeTab: (tab: TTab) => void
  changeDirection: (direction: TWallpaperGradientDir) => void
  removeWallpaper: () => void
  changeGradientWallpaper: (wallpaper: string) => void
  changePatternWallpaper: (wallpaper: string) => void
  changeCustomGradientWallpaper: () => void
  changeWallpaperType: (wallpaperType: TWallpaperType) => void
  confirmCustomColor: (customColorValue: string) => void
  togglePattern: (hasPattern: boolean) => void
  toggleBlur: (hasBlur: boolean) => void
  toggleShadow: (hasShadow: boolean) => void
}

export default (): TRet => {
  const store = useSubStore('wallpaper')

  const [tab, setTab] = useState<TTab>(TAB.BUILDIN)
  const [loading, setLoading] = useState(false)
  const [initialWallpaper, setInitialWallpaper] = useState<TWallpaperState>(INITIAL_WALLPAPER_STATE)

  // TODO: move to drived
  const getGradientWallpapers = (): Record<string, TWallpaper> => {
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
  }

  const getPatternWallpapers = (): Record<string, TWallpaper> => {
    const wallpapers = clone(PATTERN_WALLPAPER)
    const paperKeys = keys(PATTERN_WALLPAPER)

    forEach((key) => {
      const wallpaperObj = wallpapers[key] as TWallpaperPic
      wallpaperObj.hasBlur = store.hasBlur
    }, paperKeys)

    return wallpapers
  }

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

  const getIsTouched = useCallback((): boolean => {
    return (
      store.wallpaper !== initialWallpaper.wallpaper ||
      store.hasPattern !== initialWallpaper.hasPattern ||
      store.hasBlur !== initialWallpaper.hasBlur ||
      store.direction !== initialWallpaper.direction
    )
  }, [store, initialWallpaper])

  const close = (): void => {
    // store.rollbackEdit()
    // closeDrawer()
  }

  const initRollback = (): void => {
    setInitialWallpaper(pick(WALLPAPER_STATE_KEYS, store))
  }

  const rollbackWallpaper = (): void => store.commit(initialWallpaper)

  const onSave = (): void => {
    console.log('## TODO: ')
    setLoading(true)
  }

  const changeTab = (tab: TTab): void => setTab(tab)
  const changeDirection = (direction: TWallpaperGradientDir): void => store.commit({ direction })
  const removeWallpaper = (): void =>
    store.commit({ wallpaper: '', wallpaperType: WALLPAPER_TYPE.NONE })
  const changeGradientWallpaper = (wallpaper: string): void =>
    store.commit({ wallpaper, wallpaperType: WALLPAPER_TYPE.GRADIENT })
  const changePatternWallpaper = (wallpaper: string): void =>
    store.commit({ wallpaper, wallpaperType: WALLPAPER_TYPE.PATTERN })

  const changeCustomGradientWallpaper = (): void => {
    store.commit({ wallpaper: '', wallpaperType: WALLPAPER_TYPE.CUSTOM_GRADIENT })
  }

  const changeWallpaperType = (wallpaperType: TWallpaperType): void => {
    store.commit({ wallpaperType })
  }

  const confirmCustomColor = (customColorValue: string): void => {
    store.commit({ customColorValue, wallpaperType: WALLPAPER_TYPE.CUSTOM_GRADIENT })
  }

  const togglePattern = (hasPattern: boolean): void => store.commit({ hasPattern })
  const toggleBlur = (hasBlur: boolean): void => store.commit({ hasBlur })
  const toggleShadow = (hasShadow: boolean): void => store.commit({ hasShadow })

  return {
    tab,
    loading,
    // drived
    getWallpaper,
    getIsTouched,
    //actions
    initRollback,
    rollbackWallpaper,
    onSave,
    close,
    changeTab,
    changeDirection,
    removeWallpaper,
    changeGradientWallpaper,
    changePatternWallpaper,
    changeCustomGradientWallpaper,
    changeWallpaperType,
    confirmCustomColor,
    togglePattern,
    toggleBlur,
    toggleShadow,
  }
}

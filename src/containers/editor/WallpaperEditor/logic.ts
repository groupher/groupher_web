import { useEffect } from 'react'
import { pick } from 'ramda'

import type { TWallpaperGradientDir } from '@/spec'
import EVENT from '@/constant/event'
import { WALLPAPER_TYPE } from '@/constant/wallpaper'

import { buildLog } from '@/logger'
import asyncSuit from '@/async'
import { toast, closeDrawer } from '@/signal'

import S from './schema'
import type { TTab } from './spec'
import type { TStore } from './store'
import { QUERY_KEYS } from './constant'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  receive: EVENT.DRAWER.AFTER_CLOSE,
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:WallpaperEditor')

export const changeTab = (tab: TTab): void => {
  store.mark({ tab })
}

export const changeDirection = (direction: TWallpaperGradientDir): void => {
  store.mark({ direction })
}

export const removeWallpaper = (): void => {
  store.mark({ wallpaper: '', wallpaperType: WALLPAPER_TYPE.NONE })
}

export const changeGradientWallpaper = (wallpaper: string): void => {
  store.mark({ wallpaper, wallpaperType: WALLPAPER_TYPE.GRADIENT })
}

export const changePatternWallpaper = (wallpaper: string): void => {
  store.mark({ wallpaper, wallpaperType: WALLPAPER_TYPE.PATTERN })
}

export const changeCustomGradientWallpaper = (): void => {
  store.mark({ wallpaper: '', wallpaperType: WALLPAPER_TYPE.CUSTOM_GRADIENT })
}

export const changeWallpaperType = (wallpaperType: string): void => {
  store.mark({ wallpaperType })
}

export const confirmCustomColor = (customColorValue: string): void => {
  store.mark({ customColorValue, wallpaperType: WALLPAPER_TYPE.CUSTOM_GRADIENT })
}

/**
 * toggle pattern mark only for gradient backgrounds
 */
export const togglePattern = (hasPattern: boolean): void => store.mark({ hasPattern })
export const toggleBlur = (hasBlur: boolean): void => store.mark({ hasBlur })
export const toggleShadow = (hasShadow: boolean): void => store.mark({ hasShadow })

export const close = (): void => {
  store.rollbackEdit()
  closeDrawer()
}

export const onSave = (): void => {
  const { curCommunity } = store
  const community = curCommunity.slug

  const args = { community, ...pick(QUERY_KEYS, store) }

  store.mark({ loading: true })

  sr71$.mutate(S.updateDashboardWallpaper, args)
}

const DataResolver = [
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => store.reset(),
  },
  {
    match: asyncRes('updateDashboardWallpaper'),
    action: ({ updateDashboardWallpaper }) => {
      store.mark({
        initWallpaper: pick(QUERY_KEYS, updateDashboardWallpaper.dashboard.wallpaper),
        loading: false,
      })
      closeDrawer()
      toast('壁纸已保存')
    },
  },
]

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataResolver, []))
    }
    // return () => store.reset()
  }, [_store])
}

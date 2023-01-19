import { useEffect } from 'react'
// import { } from 'ramda'

import type { TWallpaperGradientDir } from '@/spec'
import { buildLog } from '@/utils/logger'
import EVENT from '@/constant/event'
import asyncSuit from '@/utils/async'

// import S from './schma'
import type { TTab } from './spec'
import type { TStore } from './store'

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

export const changeWallpaper = (wallpaper: string): void => {
  store.changeWallpaper(wallpaper)
}

export const changeCustomColor = (customColorValue: string): void => {
  store.mark({ customColorValue })
}

export const rollbackEdit = (): void => store.rollbackEdit()

/**
 * toggle pattern mark only for gradient backgrounds
 */
export const togglePattern = (hasPattern: boolean): void => {
  store.mark({ hasPattern })
}

export const toggleBlur = (hasBlur: boolean): void => {
  store.mark({ hasBlur })
}

export const toggleShadow = (hasShadow: boolean): void => {
  store.mark({ hasShadow })
}

const DataResolver = [
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => store.reset(),
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

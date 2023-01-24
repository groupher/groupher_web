/* eslint-disable no-useless-return */
import { useEffect } from 'react'
// import { } from 'ramda'

import { GRADIENT_WALLPAPER_NAME } from '@/constant/wallpaper'
import { GLOW_EFFECT_NAME } from '@/constant/glow_effect'
import { buildLog } from '@/utils/logger'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:LandingPage')

export const changeWallpaper = (wallpaper: string): void => {
  store.changeWallpaper(wallpaper)
}

export const changeGlowEffect = (wallpaper: string): void => {
  switch (wallpaper) {
    case GRADIENT_WALLPAPER_NAME.PINK: {
      store.changeGlowEffect(GLOW_EFFECT_NAME.ORANGE_PURPLE)
      return
    }
    case GRADIENT_WALLPAPER_NAME.GREEN: {
      store.changeGlowEffect(GLOW_EFFECT_NAME.GREY_GREEN)
      return
    }
    case GRADIENT_WALLPAPER_NAME.GREY: {
      store.changeGlowEffect(GLOW_EFFECT_NAME.GREY_BROWN)
      return
    }
    case GRADIENT_WALLPAPER_NAME.ORANGE: {
      store.changeGlowEffect(GLOW_EFFECT_NAME.YELLOW_RED)
      return
    }
    case GRADIENT_WALLPAPER_NAME.PURPLE:
    case GRADIENT_WALLPAPER_NAME.BLUE: {
      store.changeGlowEffect(GLOW_EFFECT_NAME.PURPLE_BLUE)
      return
    }
    default: {
      // pic/custom wallpaper
      store.changeGlowEffect('')
      return
    }
  }
}

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    // return () => store.reset()
  }, [_store])
}

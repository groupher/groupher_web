import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/utils/logger'

import type { TImagePos, TLinearBorderPos, TSettingLevel } from './spec'
// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:CoverEditor')

export const posOnChange = (imagePos: TImagePos): void => {
  store.mark({ imagePos })
}

export const shadowOnChange = (shadowLevel: TSettingLevel): void => {
  store.mark({ shadowLevel })
}

export const borderRadiusOnChange = (borderRadiusLevel: TSettingLevel): void => {
  store.mark({ borderRadiusLevel })
}

export const linearBorderPosOnChange = (linearBorderPos: TLinearBorderPos): void => {
  store.mark({ linearBorderPos })
}

export const wallpaperOnChange = (wallpaper: string): void => {
  store.mark({ wallpaper })
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

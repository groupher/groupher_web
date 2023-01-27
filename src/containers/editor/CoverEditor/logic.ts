import { useEffect } from 'react'
// import { } from 'ramda'

import type { TWallpaperGradientDir } from '@/spec'
import { buildLog } from '@/utils/logger'

import type {
  TImagePos,
  TImageRadio,
  TImageRotate,
  TImageSize,
  TLinearBorderPos,
  TSettingLevel,
} from './spec'
import { IMAGE_POS } from './constant'
import type { TStore } from './store'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:CoverEditor')

export const posOnChange = (imagePos: TImagePos): void => store.mark({ imagePos })

export const lightPosOnChange = (lightPos: TImagePos): void => {
  const curPos = store.lightPos

  if (curPos === lightPos && curPos !== IMAGE_POS.NONE) {
    store.mark({ lightPos: IMAGE_POS.NONE })
    return
  }

  store.mark({ lightPos })
}

export const shadowOnChange = (shadowLevel: TSettingLevel): void => store.mark({ shadowLevel })
export const borderRadiusOnChange = (borderRadiusLevel: TSettingLevel): void =>
  store.mark({ borderRadiusLevel })
export const linearBorderPosOnChange = (linearBorderPos: TLinearBorderPos): void =>
  store.mark({ linearBorderPos })
export const wallpaperOnChange = (wallpaper: string): void => store.mark({ wallpaper })
export const gradientDirOnChange = (direction: TWallpaperGradientDir): void =>
  store.mark({ direction })
export const sizeOnChange = (size: TImageSize): void => store.mark({ size })
export const ratioOnChange = (ratio: TImageRadio): void => store.mark({ ratio })
export const rotateOnChange = (rotate: number): void => store.mark({ rotate })

export const glassBorderOnChange = (hasGlassBorder: boolean) => store.mark({ hasGlassBorder })
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

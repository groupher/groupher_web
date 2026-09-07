import { WALLPAPER_TYPE } from '~/const/wallpaper'
import { INITIAL_WALLPAPER_THEME_STATE } from '~/stores/wallpaper/constant'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

import { composeBgCss, composeBgRenderSpec, toBgConfig } from './compose'
import { BG_RENDER_TYPE } from './constant'

describe('background composition', () => {
  const noneConfig = toBgConfig({
    ...INITIAL_WALLPAPER_THEME_STATE,
    type: WALLPAPER_TYPE.NONE,
  } as TWallpaperThemeState)

  it('does not compose a CSS background for NONE', () => {
    expect(composeBgCss(noneConfig)).toEqual({
      background: '',
      effect: '',
      source: 'amber_mauve',
    })
  })

  it('does not expose a renderable background for NONE', () => {
    expect(composeBgRenderSpec(noneConfig)).toMatchObject({
      background: 'transparent',
      filter: 'none',
      gradientRecipe: null,
      imageUrl: '',
      meshRecipe: null,
      type: BG_RENDER_TYPE.NONE,
    })
  })

  it('accepts a canonical NONE value without renderer fields', () => {
    expect(composeBgRenderSpec({ type: WALLPAPER_TYPE.NONE } as TBgConfig)).toMatchObject({
      background: 'transparent',
      filter: 'none',
      type: BG_RENDER_TYPE.NONE,
    })
  })
})

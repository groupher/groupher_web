import { describe, expect, it } from 'vitest'

import { WALLPAPER_TYPE } from '~/const/wallpaper'
import type { TPublishedWallpaper } from '~/spec'

import {
  getContentSurfaceRenderProps,
  hasPreviewWallpaper,
  hasPublishedWallpaper,
} from './background'

const publishedWallpaper: TPublishedWallpaper = {
  version: 1,
  light: {
    wide: { url: 'https://example.com/wide.webp', width: 2400, height: 1350 },
    desktop: { url: 'https://example.com/desktop.webp', width: 1920, height: 1080 },
    tablet: { url: 'https://example.com/tablet.webp', width: 1280, height: 960 },
    phone: { url: 'https://example.com/phone.webp', width: 768, height: 1024 },
  },
  dark: null,
}

describe('GlobalLayout wallpaper background state', () => {
  it('uses the published branch for static pages', () => {
    expect(hasPublishedWallpaper(publishedWallpaper, 'light')).toBe(true)
    expect(hasPublishedWallpaper(publishedWallpaper, 'dark')).toBe(false)
  })

  it('treats an uninitialized version as having no published Wallpaper', () => {
    expect(hasPublishedWallpaper({ version: 0, light: null, dark: null }, 'light')).toBe(false)
    expect(hasPublishedWallpaper({ version: 0, light: null, dark: null }, 'dark')).toBe(false)
  })

  it('uses the editor draft for preview state', () => {
    expect(hasPreviewWallpaper({ type: WALLPAPER_TYPE.GRADIENT })).toBe(true)
    expect(hasPreviewWallpaper({ type: WALLPAPER_TYPE.NONE })).toBe(false)
  })

  it('keeps the Content surface transparent without Wallpaper', () => {
    expect(getContentSurfaceRenderProps(false)).toEqual({
      className: '',
      backgroundColor: 'transparent',
    })
    expect(getContentSurfaceRenderProps(true)).toEqual({
      className: 'backdrop-blur-2xl',
      backgroundColor: 'var(--preview-page-bg, var(--color-pageBg))',
    })
  })
})

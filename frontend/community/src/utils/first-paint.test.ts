import { beforeEach, describe, expect, it } from 'vitest'

import THEME, { THEME_MODE } from '~/const/theme'

import { prePaintThemeDetectScript, resolvePrePaintThemeSeed } from './first-paint'

describe('resolvePrePaintThemeSeed', () => {
  const fallback = {
    theme: THEME.LIGHT,
    themeMode: THEME_MODE.SYSTEM,
  } as const

  beforeEach(() => {
    document.cookie = 'themeMode=; Path=/; Max-Age=0'
    document.cookie = 'resolvedTheme=; Path=/; Max-Age=0'
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-mode')
  })

  it('uses the DOM theme resolved before hydration', () => {
    document.documentElement.dataset.theme = THEME.DARK
    document.documentElement.dataset.themeMode = THEME_MODE.SYSTEM

    expect(resolvePrePaintThemeSeed(fallback)).toEqual({
      theme: THEME.DARK,
      themeMode: THEME_MODE.SYSTEM,
    })
  })

  it('falls back to the server seed when DOM values are invalid', () => {
    document.documentElement.dataset.theme = 'invalid'
    document.documentElement.dataset.themeMode = 'invalid'

    expect(resolvePrePaintThemeSeed(fallback)).toEqual(fallback)
  })

  it('uses the browser cookie over the public SSR fallback', () => {
    document.cookie = 'themeMode=dark; Path=/'

    window.eval(prePaintThemeDetectScript(fallback))

    expect(resolvePrePaintThemeSeed(fallback)).toEqual({
      theme: THEME.DARK,
      themeMode: THEME_MODE.DARK,
    })
  })
})

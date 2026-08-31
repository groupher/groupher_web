import { beforeEach, describe, expect, it, vi } from 'vitest'

import THEME, { THEME_MODE } from '~/const/theme'

import {
  prePaintRuntimeSeedScript,
  prePaintThemeDetectScript,
  resolvePrePaintThemeSeed,
} from './first-paint'

describe('prePaintThemeDetectScript', () => {
  beforeEach(() => {
    document.cookie = 'themeMode=; Path=/; Max-Age=0'
    document.cookie = 'resolvedTheme=; Path=/; Max-Age=0'
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-mode')
    document.documentElement.removeAttribute('style')
  })

  it('keeps an explicit dark theme before hydration', () => {
    window.eval(
      prePaintThemeDetectScript({
        theme: THEME.DARK,
        themeMode: THEME_MODE.DARK,
      }),
    )

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themeMode).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(document.cookie).toContain('themeMode=dark')
    expect(document.cookie).toContain('resolvedTheme=dark')
  })

  it('resolves system mode with matchMedia before hydration', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
      }),
    )

    window.eval(
      prePaintThemeDetectScript({
        theme: THEME.LIGHT,
        themeMode: THEME_MODE.SYSTEM,
      }),
    )

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themeMode).toBe('system')
    expect(document.cookie).toContain('resolvedTheme=dark')
  })

  it('uses the browser cookie over the public SSR fallback', () => {
    document.cookie = 'themeMode=dark; Path=/'

    window.eval(
      prePaintThemeDetectScript({
        theme: THEME.LIGHT,
        themeMode: THEME_MODE.SYSTEM,
      }),
    )

    expect(document.documentElement.dataset.theme).toBe(THEME.DARK)
    expect(document.documentElement.dataset.themeMode).toBe(THEME_MODE.DARK)
  })
})

describe('prePaintRuntimeSeedScript', () => {
  it('uses the server-rendered timestamp as the hydration baseline', () => {
    window.eval(prePaintRuntimeSeedScript(123_456))

    expect(
      (window as Window & { __GROUPHER_INITIAL_NOW__?: number }).__GROUPHER_INITIAL_NOW__,
    ).toBe(123_456)
  })
})

describe('resolvePrePaintThemeSeed', () => {
  const fallback = {
    theme: THEME.LIGHT,
    themeMode: THEME_MODE.SYSTEM,
  } as const

  beforeEach(() => {
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
})

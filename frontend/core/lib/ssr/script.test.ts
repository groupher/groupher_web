import { LOCAL_THEME_KEY, THEME_FIRST_PAINT_STYLE_ID, THEME_MODE } from '~/const/theme'

import {
  injectThemeFirstPaintVars,
  prePaintInitTime,
  prePaintThemeDetectScript,
  resolvePrePaintThemeSeed,
} from './script'

const runInlineScript = (script: string) => Function(script)()

describe('first-paint scripts', () => {
  beforeEach(() => {
    localStorage.clear()
    document.getElementById(THEME_FIRST_PAINT_STYLE_ID)?.remove()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-mode')
  })

  it('applies a persisted theme before paint', () => {
    localStorage.setItem(LOCAL_THEME_KEY, THEME_MODE.DARK)
    runInlineScript(prePaintThemeDetectScript())
    expect(document.documentElement.dataset.theme).toBe(THEME_MODE.DARK)
    expect(document.documentElement.dataset.themeMode).toBe(THEME_MODE.DARK)
    expect(resolvePrePaintThemeSeed()).toEqual({
      theme: THEME_MODE.DARK,
      themeMode: THEME_MODE.DARK,
    })
  })

  it('keeps the resolved system theme for hydration', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))

    runInlineScript(prePaintThemeDetectScript())

    expect(resolvePrePaintThemeSeed()).toEqual({
      theme: THEME_MODE.DARK,
      themeMode: THEME_MODE.SYSTEM,
    })
  })

  it('captures the initial browser timestamp', () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456)
    runInlineScript(prePaintInitTime())
    expect(
      (window as Window & { __GROUPHER_INITIAL_NOW__?: number }).__GROUPHER_INITIAL_NOW__,
    ).toBe(123456)
  })

  it('snapshots computed theme variables', () => {
    vi.spyOn(globalThis, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (name: string) => (name === '--color-title' ? '#f5f5f5' : ''),
    } as CSSStyleDeclaration)
    runInlineScript(injectThemeFirstPaintVars())
    expect(document.getElementById(THEME_FIRST_PAINT_STYLE_ID)?.textContent).toContain(
      '--color-title:#f5f5f5 !important;',
    )
  })
})

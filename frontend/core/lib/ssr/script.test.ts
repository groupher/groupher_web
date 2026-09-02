import { prePaintRuntimeSeedScript, prePaintThemeDetectScript } from './script'

const runInlineScript = (script: string) => Function(script)()

describe('first-paint scripts', () => {
  beforeEach(() => {
    document.cookie = 'themeMode=; Path=/; Max-Age=0'
    document.cookie = 'resolvedTheme=; Path=/; Max-Age=0'
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-mode')
    document.documentElement.removeAttribute('style')
  })

  it('applies an explicit theme from the preference cookie before paint', () => {
    document.cookie = 'themeMode=dark; Path=/'

    runInlineScript(prePaintThemeDetectScript())

    expect(document.cookie).toContain('themeMode=dark')
    expect(document.cookie).not.toContain('resolvedTheme=')
  })

  it('resolves system mode with matchMedia before hydration', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))

    runInlineScript(prePaintThemeDetectScript())

    expect(document.cookie).toContain('themeMode=system')
  })

  it('captures the initial browser timestamp in the shared runtime script', () => {
    runInlineScript(prePaintRuntimeSeedScript(123_456))

    expect(
      (window as Window & { __GROUPHER_INITIAL_NOW__?: number }).__GROUPHER_INITIAL_NOW__,
    ).toBe(123_456)
  })
})

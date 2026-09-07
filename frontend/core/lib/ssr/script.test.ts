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
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('resolves system mode with matchMedia before hydration', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))

    runInlineScript(prePaintThemeDetectScript())

    expect(document.cookie).toContain('themeMode=system')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('applies the server-seeded dark theme before paint without consulting light', () => {
    runInlineScript(
      prePaintThemeDetectScript({
        theme: 'dark',
        themeMode: 'dark',
      }),
    )

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themeMode).toBe('dark')
  })

  it('captures the initial browser timestamp in the shared runtime script', () => {
    runInlineScript(prePaintRuntimeSeedScript(123_456))

    expect(
      (window as Window & { __GROUPHER_INITIAL_NOW__?: number }).__GROUPHER_INITIAL_NOW__,
    ).toBe(123_456)
  })
})

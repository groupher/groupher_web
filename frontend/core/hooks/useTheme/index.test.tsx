import { act, renderHook, waitFor } from '@testing-library/react'

import THEME, { THEME_MODE } from '~/const/theme'
import { makeStoreWrapper } from '~/hooks/__test__/makeStoreWrapper'
import useTheme from '~/hooks/useTheme'

let mockMatchMediaDark = false

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    return {
      media: query,
      matches: mockMatchMediaDark,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }
  },
})

describe('useTheme', () => {
  beforeEach(() => {
    mockMatchMediaDark = false
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
    document.cookie = 'themeMode=; Path=/; Max-Age=0'
    document.cookie = 'resolvedTheme=; Path=/; Max-Age=0'
  })

  it('toggles theme and writes the preference cookie', async () => {
    const wrapper = makeStoreWrapper()
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.theme).toBe(THEME.LIGHT)
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()

    act(() => result.current.toggle())

    await waitFor(() => {
      expect(result.current.theme).toBe(THEME.DARK)
    })
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME.DARK)

    act(() => result.current.changeMode(THEME_MODE.LIGHT))

    await waitFor(() => {
      expect(result.current.themeMode).toBe(THEME_MODE.LIGHT)
    })
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME.LIGHT)
    expect(document.documentElement.style.colorScheme).toBe(THEME.LIGHT)
    expect(document.cookie).toContain('themeMode=light')
    expect(document.cookie).not.toContain('resolvedTheme=')
  })

  it('applies direct theme changes through the same DOM-backed source', async () => {
    const wrapper = makeStoreWrapper()
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.change(THEME.DARK))

    await waitFor(() => expect(result.current.theme).toBe(THEME.DARK))
    expect(document.documentElement.dataset.theme).toBe(THEME.DARK)
  })

  it('resolves SYSTEM mode via matchMedia', async () => {
    mockMatchMediaDark = true
    const wrapper = makeStoreWrapper()
    const { result } = renderHook(() => useTheme(), { wrapper })

    await act(async () => {
      result.current.changeMode(THEME_MODE.SYSTEM)
    })

    await waitFor(() => {
      expect(result.current.themeMode).toBe(THEME_MODE.SYSTEM)
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME.DARK)
    expect(document.documentElement.style.colorScheme).toBe(THEME.DARK)
  })

  it('uses the pre-paint DOM theme as the current theme', () => {
    document.documentElement.setAttribute('data-theme', THEME.DARK)

    const wrapper = makeStoreWrapper()
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.themeMode).toBe(THEME_MODE.SYSTEM)
    expect(result.current.theme).toBe(THEME.DARK)
    expect(result.current.isDarkTheme).toBe(true)
  })

  it('previews theme without changing persisted mode', async () => {
    const wrapper = makeStoreWrapper()
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.preview(THEME.DARK))

    await waitFor(() => {
      expect(result.current.theme).toBe(THEME.DARK)
    })

    expect(result.current.themeMode).toBe(THEME_MODE.SYSTEM)
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME.DARK)
    expect(document.documentElement.style.colorScheme).toBe(THEME.DARK)
  })
})

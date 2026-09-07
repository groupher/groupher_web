import { act, render, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import THEME, { THEME_MODE } from '~/const/theme'
import useTheme from '~/hooks/useTheme'
import type { TThemeMode } from '~/spec'
import ThemeStoreProvider from '~/stores/theme/provider'

import ThemeMonitor from './ThemeMonitor'

describe('ThemeMonitor', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-theme-mode')
    document.documentElement.style.colorScheme = ''
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn(() => ({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('does not re-resolve the theme on mount', () => {
    document.documentElement.dataset.theme = THEME.LIGHT
    document.documentElement.dataset.themeMode = THEME_MODE.LIGHT

    render(
      <ThemeStoreProvider initData={{ theme: THEME.LIGHT, themeMode: THEME_MODE.LIGHT }}>
        <ThemeMonitor />
      </ThemeStoreProvider>,
    )

    expect(document.documentElement.dataset.theme).toBe(THEME.LIGHT)
    expect(window.matchMedia).not.toHaveBeenCalled()
  })

  it('attaches and detaches system listeners as the store mode changes', async () => {
    let changeListener: (() => void) | undefined
    const media = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: vi.fn((_event: string, listener: () => void) => {
        changeListener = listener
      }),
      removeEventListener: vi.fn(),
    }

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn(() => media),
    })
    document.documentElement.dataset.theme = THEME.LIGHT
    document.documentElement.dataset.themeMode = THEME_MODE.DARK

    let setMode: ((mode: TThemeMode) => void) | undefined
    const Controller = ({ children }: { children: ReactNode }) => {
      const { changeMode } = useTheme()
      setMode = changeMode
      return children
    }

    render(
      <ThemeStoreProvider initData={{ theme: THEME.LIGHT, themeMode: THEME_MODE.DARK }}>
        <Controller>
          <ThemeMonitor />
        </Controller>
      </ThemeStoreProvider>,
    )

    expect(document.documentElement.dataset.theme).toBe(THEME.LIGHT)
    expect(media.addEventListener).not.toHaveBeenCalled()

    await act(async () => {
      setMode?.(THEME_MODE.SYSTEM)
    })

    await waitFor(() => expect(media.addEventListener).toHaveBeenCalledOnce())

    media.matches = true
    act(() => changeListener?.())

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe(THEME.DARK)
    })

    await act(async () => {
      setMode?.(THEME_MODE.LIGHT)
    })

    await waitFor(() => expect(media.removeEventListener).toHaveBeenCalledOnce())
  })
})

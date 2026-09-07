import { render, screen, waitFor } from '@testing-library/react'

import useThemePreset from './hooks'
import ThemePresetStoreProvider from './provider'

const makeTokens = (lightPrimary: string, darkPrimary: string) => ({
  shared: { glowFixed: true },
  light: {
    pageBg: '#fff',
    pageBgHue: 0,
    pageBgIntensity: 50,
    primaryColor: lightPrimary,
    accentColor: '#333',
    textTitle: '#111',
    textDigest: '#555',
    cardColor: '#fff',
    dividerColor: '#ddd',
    gaussBlur: 20,
    glowType: 'radial',
    glowOpacity: 50,
  },
  dark: {
    pageBg: '#111',
    pageBgHue: 0,
    pageBgIntensity: 50,
    primaryColor: darkPrimary,
    accentColor: '#ddd',
    textTitle: '#fff',
    textDigest: '#aaa',
    cardColor: '#222',
    dividerColor: '#444',
    gaussBlur: 20,
    glowType: 'radial',
    glowOpacity: 50,
  },
})

describe('ThemePresetStoreProvider', () => {
  it('hydrates the CSS projection when confirmed query data changes', async () => {
    const Probe = () => {
      const preset = useThemePreset()
      return (
        <span data-testid='preset'>{`${preset.themePreset}:${preset.themeTokens.light?.primaryColor}`}</span>
      )
    }
    const { rerender } = render(
      <ThemePresetStoreProvider
        initData={{
          themePreset: 'DEFAULT',
          themeTokens: makeTokens('red', 'blue'),
        }}
      >
        <Probe />
      </ThemePresetStoreProvider>,
    )

    rerender(
      <ThemePresetStoreProvider
        initData={{
          themePreset: 'OCEAN',
          themeTokens: makeTokens('cyan', 'navy'),
        }}
      >
        <Probe />
      </ThemePresetStoreProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('preset')).toHaveTextContent('OCEAN:cyan')
    })
  })
})

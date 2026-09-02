import { render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'

import THEME, { THEME_MODE } from '~/const/theme'

import useTheme from './hooks'
import ThemeStoreProvider from './provider'

describe('useTheme server snapshot', () => {
  it('renders the provider seed on the server', () => {
    const Probe = () => <span>{useTheme().theme}</span>
    const html = renderToString(
      <ThemeStoreProvider initData={{ theme: THEME.DARK, themeMode: THEME_MODE.DARK }}>
        <Probe />
      </ThemeStoreProvider>,
    )

    expect(html).toContain('dark')
    expect(html).not.toContain('light')
  })

  it('uses the pre-paint DOM theme when the browser hydrates a light seed', () => {
    document.documentElement.dataset.theme = THEME.DARK

    const Probe = () => <span>{useTheme().theme}</span>
    const { getByText } = render(
      <ThemeStoreProvider initData={{ theme: THEME.LIGHT, themeMode: THEME_MODE.SYSTEM }}>
        <Probe />
      </ThemeStoreProvider>,
    )

    expect(getByText(THEME.DARK)).toBeTruthy()
  })
})

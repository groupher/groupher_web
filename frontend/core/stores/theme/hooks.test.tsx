import { act, render } from '@testing-library/react'
import { Suspense } from 'react'
import { hydrateRoot, type Root } from 'react-dom/client'
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

  it('hydrates from the server seed before synchronizing the pre-paint theme', async () => {
    const Probe = () => <span>{useTheme().theme}</span>
    const initData = { theme: THEME.LIGHT, themeMode: THEME_MODE.SYSTEM }
    const ui = (
      <ThemeStoreProvider initData={initData}>
        <Probe />
      </ThemeStoreProvider>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(ui)
    document.body.append(container)
    document.documentElement.dataset.theme = THEME.DARK
    const recoverableErrors: unknown[] = []
    let root: Root | undefined

    await act(async () => {
      root = hydrateRoot(container, ui, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })

    expect(recoverableErrors).toEqual([])
    expect(container.textContent).toBe(THEME.DARK)

    await act(async () => root?.unmount())
    container.remove()
  })

  it('keeps the server snapshot for a Suspense boundary that hydrates later', async () => {
    let resolveBoundary: () => void = () => undefined
    let boundaryReady = false
    let serverPass = true
    const boundary = new Promise<void>((resolve) => {
      resolveBoundary = () => {
        boundaryReady = true
        resolve()
      }
    })
    const Probe = ({ deferred = false }: { deferred?: boolean }) => {
      if (deferred && !serverPass && !boundaryReady) throw boundary
      return <span>{useTheme().theme}</span>
    }
    const initData = { theme: THEME.LIGHT, themeMode: THEME_MODE.SYSTEM }
    const ui = (
      <ThemeStoreProvider initData={initData}>
        <Probe />
        <Suspense fallback={<span>loading</span>}>
          <Probe deferred />
        </Suspense>
      </ThemeStoreProvider>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(ui)
    document.body.append(container)
    serverPass = false
    document.documentElement.dataset.theme = THEME.DARK
    const recoverableErrors: unknown[] = []
    let root: Root | undefined

    await act(async () => {
      root = hydrateRoot(container, ui, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      })
    })
    await act(async () => resolveBoundary())

    expect(recoverableErrors).toEqual([])
    expect(container.textContent).toBe(`${THEME.DARK}${THEME.DARK}`)

    await act(async () => root?.unmount())
    container.remove()
  })
})

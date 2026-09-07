import { render } from '@testing-library/react'

const state = vi.hoisted(() => ({ hasWallpaper: false }))

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/' }),
}))

vi.mock('~/css', () => ({
  cn: (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' '),
}))

vi.mock('~/hooks/useTopbar', () => ({
  default: () => ({ hasTopbar: false }),
}))

vi.mock('~/hooks/useTrans', () => ({
  default: () => ({ locale: 'en' }),
}))

vi.mock('~/shell/GlobalLayout/salon/main', () => ({
  default: () => ({
    wrapper: 'wrapper',
    background: 'background',
    body: 'body',
    inner: 'inner',
    footer: 'footer',
    hasWallpaper: state.hasWallpaper,
  }),
}))

vi.mock('~/shell/GlobalLayout/GlowBackground', () => ({
  default: () => null,
}))

vi.mock('~/unit/SiteFooter', () => ({
  default: () => null,
}))

import Main from './Main'

describe('GlobalLayout Main Content surface', () => {
  beforeEach(() => {
    state.hasWallpaper = false
  })

  it('keeps the surface transparent without Wallpaper', () => {
    const { container } = render(<Main>content</Main>)
    const background = container.querySelector('.background') as HTMLElement

    expect(background.style.backgroundColor).toBe('transparent')
    expect(background).not.toHaveClass('backdrop-blur-2xl')
  })

  it('enables the surface color and blur only when Wallpaper exists', () => {
    state.hasWallpaper = true
    const { container } = render(<Main>content</Main>)
    const background = container.querySelector('.background') as HTMLElement

    expect(background.style.backgroundColor).toBe('var(--preview-page-bg, var(--color-pageBg))')
    expect(background).toHaveClass('backdrop-blur-2xl')
  })
})

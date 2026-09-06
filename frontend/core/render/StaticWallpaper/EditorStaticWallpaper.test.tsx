import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import EditorStaticWallpaper from './EditorStaticWallpaper'

vi.mock('~/hooks/useWallpaper', () => ({
  adaptWallpaperBgRenderSpec: (state: { theme: 'light' | 'dark' }) =>
    state.theme === 'light'
      ? {
          background: 'linear-gradient(#fff, #eee)',
          filter: 'brightness(1)',
          hasPattern: false,
          patternColor: '#000000',
          patternImage: '',
          patternOpacity: 0,
        }
      : {
          background: 'linear-gradient(#111, #222)',
          filter: 'brightness(0.8)',
          hasPattern: true,
          patternColor: '#ffffff',
          patternImage: '/wallpaper/pattern/01.png',
          patternOpacity: 0.3,
        },
}))

vi.mock('~/stores/wallpaper/hooks', () => ({
  default: () => ({ dark: { theme: 'dark' }, light: { theme: 'light' } }),
}))

describe('EditorStaticWallpaper', () => {
  it('renders both CSS-selected theme branches during SSR', () => {
    const html = renderToStaticMarkup(<EditorStaticWallpaper />)

    expect(html).toContain('theme-light-branch')
    expect(html).not.toContain('static-wallpaper')
    expect(html).toContain('data-wallpaper-editor-theme="light"')
    expect(html).toContain('background:linear-gradient(#fff, #eee)')
    expect(html).toContain('theme-dark-branch')
    expect(html).toContain('data-wallpaper-editor-theme="dark"')
    expect(html).toContain('background:linear-gradient(#111, #222)')
    expect(html).toContain('filter:brightness(0.8)')
    expect(html).toContain('background-color:#ffffff')
    expect(html).toContain('mask-image:url(/wallpaper/pattern/01.png)')
    expect(html).toContain('mask-size:260px auto')
    expect(html).toContain('opacity:0.3')
  })
})

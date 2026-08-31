import { describe, expect, it } from 'vitest'

import { PUBLIC_THEME_SEED } from './theme'

describe('public theme seed', () => {
  it('is stable and leaves browser preference resolution to pre-paint', () => {
    expect(PUBLIC_THEME_SEED).toEqual({
      theme: 'light',
      themeMode: 'system',
    })
  })
})

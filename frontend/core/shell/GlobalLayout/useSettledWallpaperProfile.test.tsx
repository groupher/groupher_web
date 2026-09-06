import { act, renderHook } from '@testing-library/react'

import { wallpaperProfileSpec } from '~/lib/wallpaperProfiles'

import useSettledWallpaperProfile, {
  WALLPAPER_PROFILE_SETTLE_MS,
} from './useSettledWallpaperProfile'

describe('useSettledWallpaperProfile', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('keeps the current renderer profile while the active profile is unstable', () => {
    const desktop = wallpaperProfileSpec('desktop')
    const wide = wallpaperProfileSpec('wide')
    const { result, rerender } = renderHook(({ profile }) => useSettledWallpaperProfile(profile), {
      initialProps: { profile: desktop },
    })

    rerender({ profile: wide })
    expect(result.current).toEqual({ profile: desktop, isSettled: false })

    act(() => vi.advanceTimersByTime(WALLPAPER_PROFILE_SETTLE_MS - 1))
    expect(result.current).toEqual({ profile: desktop, isSettled: false })

    rerender({ profile: desktop })
    act(() => vi.advanceTimersByTime(WALLPAPER_PROFILE_SETTLE_MS))
    expect(result.current).toEqual({ profile: desktop, isSettled: true })

    rerender({ profile: wide })
    act(() => vi.advanceTimersByTime(WALLPAPER_PROFILE_SETTLE_MS))
    expect(result.current).toEqual({ profile: wide, isSettled: true })
  })
})

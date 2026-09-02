import { act, renderHook } from '@testing-library/react'

import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

const mocks = vi.hoisted(() => ({
  emitPreview: vi.fn(),
  scheduleDraft: vi.fn(),
}))

vi.mock('~/hooks/useWallpaper', () => ({
  adaptWallpaperBgRenderSpec: (state: TWallpaperThemeState) => ({
    angle: state.gradient?.angle,
  }),
}))

vi.mock('~/lib/wallpaperPreview', () => ({
  emitWallpaperPreview: mocks.emitPreview,
}))

vi.mock('~/hooks/useDebouncedPreviewCommit', () => ({
  default: () => ({
    schedule: mocks.scheduleDraft,
    flush: vi.fn(),
    clear: vi.fn(),
  }),
}))

import useWallpaperPreview from './useWallpaperPreview'

const initialState = {
  gradient: { angle: 0 },
  effect: {},
  pattern: {},
  texture: {},
  contentShadow: {},
} as unknown as TWallpaperThemeState

describe('useWallpaperPreview', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mocks.emitPreview.mockClear()
    mocks.scheduleDraft.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('emits only the latest preview state once per animation frame', () => {
    const { result } = renderHook(() =>
      useWallpaperPreview({ state: initialState, onCommit: vi.fn() }),
    )

    act(() => {
      result.current.previewWallpaper({ gradient: { angle: 30 } })
      result.current.previewWallpaper({ gradient: { angle: 60 } })
    })

    expect(mocks.emitPreview).not.toHaveBeenCalled()

    act(() => {
      vi.runOnlyPendingTimers()
    })

    expect(mocks.emitPreview).toHaveBeenCalledTimes(1)
    expect(mocks.emitPreview.mock.calls[0][0].angle).toBe(60)
  })
})

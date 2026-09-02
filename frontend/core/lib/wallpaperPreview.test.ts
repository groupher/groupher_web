import type { TBgRenderSpec } from '~/lib/bg'

import { emitWallpaperPreview, subscribeWallpaperPreview } from './wallpaperPreview'

const renderSpec = { type: 'mesh-gradient' } as TBgRenderSpec

describe('wallpaper preview frame bus', () => {
  it('delivers one versioned frame to every subscriber and supports cleanup', () => {
    const first = vi.fn()
    const second = vi.fn()
    const unsubscribeFirst = subscribeWallpaperPreview(first)
    const unsubscribeSecond = subscribeWallpaperPreview(second)

    emitWallpaperPreview(renderSpec)

    expect(first).toHaveBeenCalledOnce()
    expect(second).toHaveBeenCalledOnce()
    expect(first.mock.calls[0][0]).toBe(second.mock.calls[0][0])
    expect(first.mock.calls[0][0]).toMatchObject({ renderSpec })

    unsubscribeFirst()
    emitWallpaperPreview(null)

    expect(first).toHaveBeenCalledOnce()
    expect(second).toHaveBeenCalledTimes(2)
    expect(second.mock.calls[1][0].renderSpec).toBeNull()

    unsubscribeSecond()
  })
})

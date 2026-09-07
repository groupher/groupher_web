import { getPatternRepeat } from './pattern'
import { resolvePreviewSurfaceSize } from './previewSize'

describe('resolvePreviewSurfaceSize', () => {
  it('keeps CSS-space pattern geometry while allocating a HiDPI backing store', () => {
    const surface = resolvePreviewSurfaceSize({ width: 1280, height: 720 }, 2)

    expect(surface).toEqual({
      logicalSize: [1280, 720],
      pixelSize: [2560, 1440],
    })

    const repeat = getPatternRepeat(surface.logicalSize, '260px auto', [360, 780])
    expect(surface.pixelSize[0] / repeat[0]).toBe(520)
  })

  it('caps live preview density at 2x', () => {
    expect(resolvePreviewSurfaceSize({ width: 390, height: 844 }, 3)).toEqual({
      logicalSize: [390, 844],
      pixelSize: [780, 1688],
    })
  })

  it('keeps explicit render targets pixel-exact', () => {
    expect(resolvePreviewSurfaceSize({ width: 1280, height: 720 }, 2, [1200, 630])).toEqual({
      logicalSize: [1200, 630],
      pixelSize: [1200, 630],
    })
  })

  it('renders a fixed logical composition at HiDPI resolution', () => {
    expect(
      resolvePreviewSurfaceSize({ width: 1720, height: 1250 }, 2, undefined, [1440, 900]),
    ).toEqual({
      logicalSize: [1440, 900],
      pixelSize: [2880, 1800],
    })
  })
})

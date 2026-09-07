import { executeAppearanceSave } from './saveCoordinator'

describe('executeAppearanceSave', () => {
  it('runs shadow before Wallpaper when both lanes are dirty', async () => {
    const events: string[] = []

    await executeAppearanceSave({
      contentShadow: async () => events.push('shadow'),
      wallpaper: async () => events.push('wallpaper'),
    })

    expect(events).toEqual(['shadow', 'wallpaper'])
  })

  it('does not start Wallpaper when the shadow lane fails', async () => {
    const wallpaper = vi.fn()

    await expect(
      executeAppearanceSave({
        contentShadow: async () => {
          throw new Error('shadow conflict')
        },
        wallpaper,
      }),
    ).rejects.toThrow('shadow conflict')

    expect(wallpaper).not.toHaveBeenCalled()
  })

  it('propagates Wallpaper failure after the shadow lane succeeds', async () => {
    const shadow = vi.fn().mockResolvedValue(undefined)

    await expect(
      executeAppearanceSave({
        contentShadow: shadow,
        wallpaper: async () => {
          throw new Error('wallpaper failed')
        },
      }),
    ).rejects.toThrow('wallpaper failed')

    expect(shadow).toHaveBeenCalledOnce()
  })
})

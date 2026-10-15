import { renderHook } from '@testing-library/react'

import { COLOR } from '~/const/colors'
import METRIC from '~/const/metric'
import useTwBelt from '~/hooks/useTwBelt'

const inputs = vi.hoisted(() => ({
  metric: 'COMMUNITY',
  isAvatarSquare: false,
  primaryColor: 'CUSTOM',
  accentColor: 'CUSTOM',
}))

vi.mock('~/hooks/useMetric', () => ({
  default: () => inputs.metric,
}))

vi.mock('~/hooks/useAvatarLayout', () => ({
  default: () => ({
    avatarLayout: inputs.isAvatarSquare ? 'SQUARE' : 'CIRCLE',
    isSquare: inputs.isAvatarSquare,
  }),
}))

vi.mock('~/hooks/usePrimaryColor', () => ({
  default: () => inputs.primaryColor,
}))

vi.mock('~/hooks/useAccentColor', () => ({
  default: () => inputs.accentColor,
}))

describe('useTwBelt', () => {
  beforeEach(() => {
    inputs.metric = METRIC.COMMUNITY
    inputs.isAvatarSquare = false
    inputs.primaryColor = COLOR.CUSTOM
    inputs.accentColor = COLOR.CUSTOM
  })

  it('keeps the belt and helper identities stable while inputs are unchanged', () => {
    const { result, rerender } = renderHook(() => useTwBelt())
    const belt = result.current

    rerender()

    expect(result.current).toBe(belt)
    expect(result.current.container).toBe(belt.container)
    expect(result.current.primary).toBe(belt.primary)
    expect(result.current.menu).toBe(belt.menu)
  })

  it('updates runtime helpers when metric, avatar, primary, or accent inputs change', () => {
    const { result, rerender } = renderHook(() => useTwBelt())

    expect(result.current.container()).toBe('container-community')
    expect(result.current.avatar()).toBe('circle')
    expect(result.current.primary()).toBe('text-rainbow-custom')
    expect(result.current.accent()).toBe('text-rainbow-subCustom')

    inputs.metric = METRIC.LANDING
    inputs.isAvatarSquare = true
    inputs.primaryColor = COLOR.RED
    inputs.accentColor = COLOR.BLUE
    rerender()

    expect(result.current.container()).toBe('container-landing')
    expect(result.current.containerWrapper()).toBe('container-landing-wrapper')
    expect(result.current.avatar()).toBe('rounded-md')
    expect(result.current.primary()).toBe('text-rainbow-red')
    expect(result.current.accent()).toBe('text-rainbow-blue')
    expect(result.current.linker('fill')).toBe('fill-rainbow-blue')
  })

  it('keeps module-level helpers stable when runtime inputs change', () => {
    const { result, rerender } = renderHook(() => useTwBelt())
    const { fg, rainbow, page } = result.current

    inputs.primaryColor = COLOR.RED
    rerender()

    expect(result.current.fg).toBe(fg)
    expect(result.current.rainbow).toBe(rainbow)
    expect(result.current.page).toBe(page)
    expect(result.current.page()).toBe('page-custom')
  })
})

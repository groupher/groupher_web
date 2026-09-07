import { tr } from '~/css'

describe('tr', () => {
  it('uses base, selected variants, and default variants', () => {
    const card = tr({
      base: 'rounded-lg border p-4',
      variants: {
        state: {
          idle: 'opacity-60',
          active: 'opacity-100 ring-2',
        },
      },
      defaultVariants: { state: 'idle' },
    })

    expect(card()).toBe('rounded-lg border p-4 opacity-60')
    expect(card({ state: 'active' })).toBe('rounded-lg border p-4 opacity-100 ring-2')
  })

  it('supports boolean variants', () => {
    const item = tr({
      variants: {
        disabled: {
          true: 'opacity-50',
          false: 'opacity-100',
        },
      },
      defaultVariants: { disabled: false },
    })

    expect(item()).toBe('opacity-100')
    expect(item({ disabled: true })).toBe('opacity-50')
  })

  it('falls back to the default for an unknown runtime key', () => {
    const card = tr({
      variants: {
        state: {
          idle: 'opacity-60',
          active: 'opacity-100',
        },
      },
      defaultVariants: { state: 'idle' },
    })

    expect(card({ state: 'unknown' as never })).toBe('opacity-60')
  })

  it('ignores an unknown key when no default exists', () => {
    const card = tr({
      variants: {
        state: {
          idle: 'opacity-60',
        },
      },
    })

    expect(card({ state: 'unknown' as never })).toBe('')
  })

  it('keeps recipe output order stable', () => {
    const recipe = tr({
      base: 'base',
      variants: {
        tone: { neutral: 'tone' },
        size: { sm: 'size' },
      },
      defaultVariants: { tone: 'neutral', size: 'sm' },
    })

    expect(recipe()).toBe('base tone size')
  })
})

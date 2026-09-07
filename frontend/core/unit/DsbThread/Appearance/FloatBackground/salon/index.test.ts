import useSalon from './index'

vi.mock('~/hooks/useTwBelt', () => ({
  default: () => ({
    cn: (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' '),
    br: (key: string) => `border-${key}`,
    bg: (key: string) => `bg-${key}`,
    hoverBr: () => 'hover-border',
    shadow: (key: string) => `shadow-${key}`,
    primary: (key: string) => `primary-${key}`,
    sexyBorder: () => 'sexy-border',
    vividDark: () => 'vivid-dark',
  }),
}))

describe('FloatBackground salon bars', () => {
  it('keeps geometry and an explicit light-panel background', () => {
    const salon = useSalon()

    expect(salon.bar).toContain('h-2')
    expect(salon.barToneLight).toContain('primary-bg')
    expect(salon.barToneLight).toContain('vivid-dark')
  })
})

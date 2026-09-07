import useDsbSalon from './useDsbSalon'

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

describe('useDsbSalon card recipe', () => {
  it('separates idle and active card state without class conflict resolution', () => {
    const salon = useDsbSalon()
    const recipe = salon.cardRecipe('w-72')

    expect(recipe({ state: 'idle' })).toContain('opacity-80')
    expect(recipe({ state: 'active' })).toContain('opacity-100')
    expect(recipe({ state: 'active' })).not.toContain('opacity-80')
  })
})

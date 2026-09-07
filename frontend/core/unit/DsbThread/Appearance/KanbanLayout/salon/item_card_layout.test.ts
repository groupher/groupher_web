import useSalon from './item_card_layout'

vi.mock('~/hooks/useTwBelt', () => ({
  default: () => ({
    cn: (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' '),
    br: (key: string) => `border-${key}`,
    bg: (key: string) => `bg-${key}`,
    avatar: () => 'avatar',
    hoverBr: () => 'hover-border',
    shadow: (key: string) => `shadow-${key}`,
    primary: (key: string) => `primary-${key}`,
    sexyBorder: () => 'sexy-border',
    vividDark: () => 'vivid-dark',
  }),
}))

describe('Kanban item card salon geometry', () => {
  it('keeps geometry on every overlay used with barBase', () => {
    const salon = useSalon()

    expect(salon.titleBar).toContain('h-1.5')
    expect(salon.bodyBar).toContain('h-2.5')
    expect(salon.sideBar).toContain('h-1.5')
    expect(salon.simpleMetric).toContain('h-1.5')
    expect(salon.tinyMetric).toContain('h-1.5')
  })
})

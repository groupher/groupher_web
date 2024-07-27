import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

export { cn } from '~/css'

type TProps = {
  expand: boolean
}

export default ({ expand }: TProps) => {
  const { cn, br, fg, bg, fill } = useTwBelt()
  const { inView: badgeInView } = useCommunityDigestViewport()

  const iconBox = cn(
    'size-6 row-align-both pointer rounded border border-transparent',
    `hover:${bg('hoverBg')}`,
  )
  const icon = cn('size-4 pointer', fill('text.digest'), `hover:${fill('text.title')}`)

  return {
    wrapper: cn(
      'relative border rounded-2xl h-10 hover:shadow-md trans-all-200',
      badgeInView ? 'w-48' : 'w-52 -ml-2.5',
      expand && badgeInView && '-ml-2.5',
      expand ? 'h-52' : 'h-10', // add real menu height here
      br('divider'),
      bg('popover.bg'),
    ),
    topBox: cn(iconBox, badgeInView ? 'max-w-0' : 'max-w-6'),
    iconBox,
    iconActive: cn(bg('hoverBg')),
    tipText: cn('py-0.5 px-1', fg('text.digest')),
    buttonBar: cn(
      'row-align-both absolute h-[38px] w-full left-px bottom-0 -ml-px gap-x-1.5 rounded-2xl',
      bg('htmlBg'),
    ),
    icon,
    iconI18n: cn(icon, 'size-6'),
    iconPeopleActive: cn(fill('rainbow.red'), `hover:${fill('rainbow.red')}`),
  }
}

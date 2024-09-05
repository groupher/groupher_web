import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = {
  fold: boolean
}

export default ({ fold }: TProps) => {
  const { cn, fill, fg, bg, global, primary, isDarkBlack } = useTwBelt()

  return {
    wrapper: 'mb-4',
    folder: cn('row-center group justify-between pointer mb-3'),
    iconBox: cn('align-both size-5'),
    title: cn('text-sm grow ml-2 bold', fg('text.digest')),
    arrowIcon: cn(
      'size-4 group-smoky-65 trans-all-200',
      !fold ? '-rotate-90' : 'rotate-180',
      fill('text.digest'),
    ),
    menu: cn('ml-1.5 mt-2 border-l border-transparent', global('sexy-border-50')),
    item: cn(
      'block relative no-underline w-full text-sm px-1 py-1 pl-5 mt-1 mb-0 rounded-lg',
      `hover:${bg('hoverBg')}`,
      fg('text.digest'),
      isDarkBlack && fg('text.title'),
    ),
    itemActive: cn('bold-sm rounded-tl-none rounded-bl-none py-1.5', primary('fg'), bg('hoverBg')),
    itemActiveBar: cn(
      'absolute -left-0.5 top-2 w-1 h-4 rounded opacity-80',
      primary('bg'),
      isDarkBlack && bg('text.digest'),
    ),
    menuIcon: cn('size-3.5', fill('text.digest')),
  }
}

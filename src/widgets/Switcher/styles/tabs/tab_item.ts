import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = {
  bottomSpace: number | string
}

export default ({ bottomSpace }: TProps) => {
  const { cn, bg, fg, enhanceDark } = useTwBelt()

  return {
    wrapper: cn(
      'row justify-center group relative h-full z-10 mr-4 px-2 py-1.5',
      'text-center m-w-auth pointer trans-all-200',
      fg('text.title'),
    ),
    label: cn(
      'row-center whitespace-nowrap py-1.5 px-1.5 rounded-md',
      `hover:${bg('hoverBg')}`,
      fg('text.digest'),
      `mb-${bottomSpace}`,
    ),
    labelActive: cn('bold-sm', fg('text.title'), enhanceDark()),
  }
}

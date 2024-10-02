import useBase from '.'
import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, fg, cutRest } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.template, 'row-center min-h-36 justify-between px-7 pr-8'),
    active: base.templateActive,
    left: 'column grow items-start',
    right: 'row gap-x-14',
    desc: cn('line-clamp-2 w-40 mt-1.5 text-xs', fg('text.digest')),
    center: 'column gap-x-2',
    groupTitle: cn('text-xs bold-sm mb-1.5', fg('text.title')),
    linkItem: cn(
      'text-xs pointer no-underline hover:underline mb-1',
      fg('text.digest'),
      cutRest('w-20'),
    ),
  }
}

import useTwBelt from '~/hooks/useTwBelt'

import { COLOR_NAME } from '~/const/colors'

export default () => {
  const { cn, fg, rainbow } = useTwBelt()

  return {
    wrapper: cn('column w-80 h-96 pl-14'),
    head: 'mb-8',
    footer: 'row-center mt-12 gap-x-5',

    // --
    title: cn('text-2xl', fg('text.title')),
    desc: cn('text-base mt-1', fg('text.digest')),

    barDivider: cn('rounded-md h-px w-28 mt-5 opacity-25', rainbow(COLOR_NAME.PURPLE, 'bg')),
  }
}

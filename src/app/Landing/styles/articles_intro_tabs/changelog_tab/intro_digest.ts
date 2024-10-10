import { COLOR_NAME } from '~/const/colors'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, rainbow } = useTwBelt()

  return {
    wrapper: cn('column -mt-6'),
    title: cn('text-xl bold-sm mt-1', rainbow(COLOR_NAME.RED, 'fg')),
    digest: cn('w-80 text-base mt-4 leading-relaxed opacity-80', fg('text.digest')),
    highlight: cn(
      'bold-sm italic ml-px mr-px px-0.5',
      rainbow(COLOR_NAME.RED, 'fg'),
      rainbow(COLOR_NAME.RED, 'bgSoft'),
    ),
  }
}

import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, fg, margin, fill } = useTwBelt()

  return {
    wrapper: cn('row-center', margin(spacing)),
    pubBtn: cn('row justify-between bold w-full rounded-xl', fg('button.fg')),

    arrowIcon: cn('size-3 rotate-90 opacity-40', fill('button.fg')),
  }
}

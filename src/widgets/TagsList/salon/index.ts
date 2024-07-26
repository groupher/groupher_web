import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, margin, fg } = useTwBelt()

  return {
    wrapper: cn('row-center wrap relative gap-x-1.5', margin(spacing)),
    tag: 'row-center',
    title: cn('text-xs keep-all mr-px', fg('text.digest')),
    more: cn('text-xs', fg('text.digest')),
  }
}

import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, br, margin } = useTwBelt()

  return {
    wrapper: cn('row-center', margin(spacing)),
    avatar: cn('border-2 text-xs size-6 rounded-md text-center', br('divider')),
  }
}

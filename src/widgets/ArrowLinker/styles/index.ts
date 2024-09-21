import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {} & TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, margin, primary } = useTwBelt()

  return {
    wrapper: cn('row-center hover:underline', primary('fg'), margin(spacing)),
    title: cn('text-sm'),
    arrowIcon: cn('size-3 ml-1', primary('fill')),
  }
}

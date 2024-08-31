import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  size: number
} & TSpace

export default ({ size, ...spacing }: TProps) => {
  const { cn, zise, margin, primary, enhanceDark } = useTwBelt()

  return {
    // bg('dot')
    wrapper: cn('circle opacity-80', zise(size), margin(spacing), primary('bg'), enhanceDark()),
  }
}

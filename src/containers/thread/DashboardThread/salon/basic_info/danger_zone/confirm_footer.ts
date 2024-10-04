import type { TSpace } from '~/spec'
// import InfoSVG from '~/icons/Info'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, fg, margin } = useTwBelt()

  return {
    wrapper: cn('column w-full', margin(spacing)),
    note: cn('mb-3', fg('text.title')),
    bold: cn('text-sm bold ml-0.5 mr-0.5', fg('text.title')),
    input: 'w-full text-sm',
  }
}

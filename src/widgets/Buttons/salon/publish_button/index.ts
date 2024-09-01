import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, fg, margin } = useTwBelt()

  // $smaller={mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER}

  return {
    wrapper: cn('row-center', margin(spacing)),
    pubBtn: cn('row justify-between bold w-full rounded-xl', fg('button.fg')),
  }
}

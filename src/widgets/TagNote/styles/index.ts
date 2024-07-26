import type { TColorName } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  color: TColorName | null
}

export default ({ color }: TProps) => {
  const { cn, fg, br, rainbowLight } = useTwBelt()

  return {
    wrapper: cn('border-b pt-3.5 pb-4 mb-4 -mt-1.5', br('divider')),
    header: 'row-center mb-1.5 w-full',
    tagWrapper: cn('row-align-both -ml-0.5 pl-2 pr-3 rounded-lg h-7', rainbowLight(color)),
    title: cn('z-2', fg('text.title')),
  }
}

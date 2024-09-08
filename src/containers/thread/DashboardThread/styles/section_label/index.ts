import type { ReactNode } from 'react'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  width: string
  desc: ReactNode
}

export default ({ width, desc }: TProps) => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: cn('column', width === '100%' ? 'w-full' : width),
    header: 'row-center',
    title: cn('row-center w-full text-sm', !desc && 'mb-4', fg('text.title')),
    desc: cn('text-sm mt-2.5 mb-8 mt-2.5', fg('text.digest')),
  }
}

import { FC } from 'react'

import type { TColor } from '@/spec'
import ArrowLinker from '@/widgets/ArrowLinker'

type TProps = {
  title?: string
  href: string
} & TColor

const MoreLink: FC<TProps> = ({ title = '了解更多', href, color }) => {
  return (
    <ArrowLinker href="/" color={color} top={55} fontSize={15}>
      {title}
    </ArrowLinker>
  )
}

export default MoreLink

import { FC } from 'react'

import type { TFeatType } from '../spec'
import { Wrapper, Text, ArrowIcon } from '../styles/feature_wall/more_link'

type TProps = {
  title?: string
  href: string
  featType: TFeatType
}

const MoreLink: FC<TProps> = ({ title = '了解更多', href, featType }) => {
  return (
    <Wrapper href={href}>
      <Text featType={featType}>{title}</Text>
      <ArrowIcon featType={featType} />
    </Wrapper>
  )
}

export default MoreLink

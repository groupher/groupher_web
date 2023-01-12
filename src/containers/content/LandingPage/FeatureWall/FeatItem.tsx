import { FC } from 'react'

import type { TFeatType } from '../spec'
import { Wrapper, Text, CheckIcon } from '../styles/feature_wall/feat_item'

type TProps = {
  featType: TFeatType
  text?: string
}

const FeatItem: FC<TProps> = ({ text = '--', featType }) => {
  return (
    <Wrapper>
      <CheckIcon featType={featType} />
      <Text>{text}</Text>
    </Wrapper>
  )
}

export default FeatItem

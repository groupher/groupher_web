import { FC } from 'react'

import type { TColor } from '@/spec'

import { Wrapper, Text, CheckIcon } from '../styles/articles_intro_tabs/feat_item'

type TProps = {
  text?: string
} & TColor

const FeatItem: FC<TProps> = ({ text = '--', color }) => {
  return (
    <Wrapper>
      <CheckIcon $color={color} />
      <Text>{text}</Text>
    </Wrapper>
  )
}

export default FeatItem

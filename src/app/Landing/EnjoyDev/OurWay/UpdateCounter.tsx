import type { FC } from 'react'

import { Wrapper, UpvoteIcon, Text, Counter } from '../../styles/enjoy_dev/our_way/upvote_counter'

type TProps = {
  text?: string
  num?: number
  dividerColor: string
  mainColor: string
}

const UpdateCounter: FC<TProps> = ({ text = '投票', num = 13, dividerColor, mainColor }) => {
  return (
    <Wrapper color={dividerColor}>
      <UpvoteIcon color={mainColor} />
      <Text color={mainColor}>{text}</Text>
      <Counter>{num}</Counter>
    </Wrapper>
  )
}

export default UpdateCounter

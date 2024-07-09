import { type FC, useState } from 'react'

import useInterval from '~/hooks/useInterval'
import AnimatedCount from '~/widgets/AnimatedCount'

import { Wrapper, UpvoteIcon, Text, Counter } from '../../styles/enjoy_dev/our_way/upvote_counter'

type TProps = {
  text?: string
  num?: number
  delay: number
  dividerColor: string
  mainColor: string
}

const UpdateCounter: FC<TProps> = ({ text = '投票', num = 13, delay, dividerColor, mainColor }) => {
  const [count, setCount] = useState(num)

  useInterval(() => {
    if (count >= 999) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }, delay)

  return (
    <Wrapper color={dividerColor}>
      <UpvoteIcon color={mainColor} />
      <Text color={mainColor}>{text}</Text>
      <Counter>
        <AnimatedCount count={count} forceColor={mainColor} left={5} top={-1} />
      </Counter>
    </Wrapper>
  )
}

export default UpdateCounter

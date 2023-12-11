import { FC, useState } from 'react'

import useInterval from '@/hooks/useInterval'
import AnimatedCount from '@/widgets/AnimatedCount'

import { Wrapper, UpvoteIcon, Text, Num } from '../styles/enjoy_dev/upvote_btn'

type TProps = {
  text?: string
  num?: number
  delay: number
  dividerColor: string
  mainColor: string
}

const UpdateBtn: FC<TProps> = ({ text = '投票', num = 13, delay, dividerColor, mainColor }) => {
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
      <Num>
        <AnimatedCount count={count} forceColor={mainColor} />
      </Num>
    </Wrapper>
  )
}

export default UpdateBtn

import { FC, useState } from 'react'

import useInterval from '@/hooks/useInterval'
import AnimatedCount from '@/widgets/AnimatedCount'

import { Wrapper, SprintIcon, Text, Num } from '../../styles/enjoy_dev/our_way/sprint_counter'

type TProps = {
  num?: number
  delay: number
  dividerColor: string
  mainColor: string
}

const SprintCounter: FC<TProps> = ({ num = 13, delay, dividerColor, mainColor }) => {
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
      <SprintIcon />
      <Text color={mainColor}>第</Text>
      <Num>
        <AnimatedCount count={count} forceColor="#323232" />
      </Num>
      <Text color={mainColor}>周</Text>
    </Wrapper>
  )
}

export default SprintCounter

import { FC } from 'react'

import { Wrapper, UpvoteIcon, Text, Num } from '../styles/enjoy_dev/upvote_btn'

type TProps = {
  text?: string
  num?: number
  dividerColor: string
  mainColor: string
}

const UpdateBtn: FC<TProps> = ({ text = '投票', num = 13, dividerColor, mainColor }) => {
  return (
    <Wrapper color={dividerColor}>
      <UpvoteIcon color={mainColor} />
      <Text color={mainColor}>{text}</Text>
      <Num color={mainColor}>{num}</Num>
    </Wrapper>
  )
}

export default UpdateBtn

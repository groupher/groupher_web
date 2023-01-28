import { FC } from 'react'

import { Wrapper, ToolIcon, Text } from '../styles/enjoy_dev/block'

type TProps = {
  text: string
}

const Block: FC<TProps> = ({ text }) => {
  return (
    <Wrapper>
      <ToolIcon />
      <Text>{text}</Text>
    </Wrapper>
  )
}

export default Block

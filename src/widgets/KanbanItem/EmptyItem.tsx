import type { FC } from 'react'

import { Wrapper, Text } from './styles/empty_item'

const EmptyItem: FC = () => {
  return (
    <Wrapper>
      <Text>内容为空</Text>
    </Wrapper>
  )
}

export default EmptyItem

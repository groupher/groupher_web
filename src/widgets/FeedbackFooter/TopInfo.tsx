import { FC } from 'react'

import { Wrapper, Item, ArrowIcon, Title } from './styles/top_info'

const TopInfo: FC = () => {
  return (
    <Wrapper>
      <Item>
        <ArrowIcon />
        <Title>编辑器</Title>
      </Item>

      <Item>
        <Title>三方集成</Title>
        <ArrowIcon reverse />
      </Item>
    </Wrapper>
  )
}

export default TopInfo

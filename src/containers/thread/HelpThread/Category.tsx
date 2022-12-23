import { FC, memo } from 'react'

import type { TColorName } from '@/spec'
import { Wrapper, Header, IconWrapper, Icon, Title, Item, MoreLink } from './styles/category'
import { gotoDetailLayout } from './logic'

type TProps = {
  color: TColorName
  title: string
  desc: string
  column?: number
}

const Category: FC<TProps> = ({ color, title, desc, column = 2 }) => {
  return (
    <Wrapper color={color} column={column}>
      <Header>
        <IconWrapper color={color}>
          <Icon color={color} />
        </IconWrapper>
        <Title>{title}</Title>
      </Header>

      <Item color={color} onClick={() => gotoDetailLayout()}>
        {desc}
      </Item>
      <Item color={color} onClick={() => gotoDetailLayout()}>
        {desc}
      </Item>
      <Item color={color} onClick={() => gotoDetailLayout()}>
        {desc}
      </Item>
      <MoreLink>查看全部</MoreLink>
    </Wrapper>
  )
}

export default memo(Category)

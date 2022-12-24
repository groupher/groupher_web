import { FC, memo } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import FaIcons from '@/widgets/FaIcons'

import type { TColorName } from '@/spec'
import { Wrapper, Header, IconWrapper, Title, Item, MoreLink } from './styles/category'
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
          <FaIcons icon="music" size={15} color={color} />
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

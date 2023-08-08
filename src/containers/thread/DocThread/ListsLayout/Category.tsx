import { FC, memo } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false
import type { TColorName } from '@/spec'
import { mockUsers } from '@/utils/mock'

import { SpaceGrow } from '@/widgets/Common'
import Facepile from '@/widgets/Facepile'
import FaIcons from '@/widgets/FaIcons'

import {
  Wrapper,
  Cover,
  Content,
  IconWrapper,
  Title,
  Desc,
  Footer,
  AuthorHint,
  MoreLink,
} from '../styles/lists_layout/category'
import { gotoDetailLayout } from '../logic'

type TProps = {
  color: TColorName
  title: string
  desc?: string
}

const Category: FC<TProps> = ({ color, title, desc }) => {
  return (
    <Wrapper color={color}>
      <Cover>
        <IconWrapper color={color}>
          <FaIcons icon="music" size={25} color={color} opacity={0.6} />
        </IconWrapper>
      </Cover>
      <Content>
        <Title>{title}</Title>
        {desc && <Desc>{desc}</Desc>}
        <Footer>
          <Facepile size="small" users={mockUsers(6)} total={20} showTotalNumber />
          <AuthorHint>6 位共同编辑</AuthorHint>
          <SpaceGrow />
          <MoreLink onClick={() => gotoDetailLayout()}>9 篇文档</MoreLink>
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default memo(Category)

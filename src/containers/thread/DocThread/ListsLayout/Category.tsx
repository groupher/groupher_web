import type { FC } from 'react'

import type { TColorName } from '~/spec'
import { mockUsers } from '~/mock'

import Facepile from '~/widgets/Facepile'
import FaIcons from '~/widgets/FaIcons'

import useLogic from '../useLogic'
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

type TProps = {
  color: TColorName
  title: string
  desc?: string
}

const Category: FC<TProps> = ({ color, title, desc }) => {
  const { gotoDetailLayout } = useLogic()

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
          <Facepile size="small" users={mockUsers(6)} total={20} />
          <AuthorHint>6 位共同编辑</AuthorHint>
          <div className="grow" />
          <MoreLink onClick={() => gotoDetailLayout()}>9 篇文档</MoreLink>
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default Category

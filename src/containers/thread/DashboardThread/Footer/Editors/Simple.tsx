import { FC } from 'react'

import BrandEditor from './BrandEditor'
import ItemEditor from './ItemEditor'

import {
  Wrapper,
  Title,
  LeftWrapper,
  CenterWrapper,
  RightWrapper,
} from '../../styles/footer/editors/simple'

const Simple: FC = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <BrandEditor />
      </LeftWrapper>
      <CenterWrapper>
        <Title>链接</Title>
        <ItemEditor />
        <ItemEditor />
        <ItemEditor editing />
        <ItemEditor />
        <ItemEditor />
      </CenterWrapper>
      <RightWrapper>
        <Title>社交媒体</Title>
        <ItemEditor alignRight />
        <ItemEditor alignRight editing />
        <ItemEditor alignRight />
        <ItemEditor alignRight />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple

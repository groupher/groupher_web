import { FC } from 'react'

import SocialEditor from '@/widgets/SocialEditor'

import BrandInfo from './BrandInfo'
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
        <BrandInfo />
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
        <SocialEditor width="200px" withTitle={false} top={12} left={-5} />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple

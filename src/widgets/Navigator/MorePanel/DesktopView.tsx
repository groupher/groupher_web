import { FC, memo } from 'react'

import Footer from './Footer'

import {
  Wrapper,
  BodyWrapper,
  Entry,
  Icon,
  Main,
  Title,
  Desc,
} from '../styles/more_panel'

const MoreContent: FC = () => {
  return (
    <Wrapper>
      <BodyWrapper>
        <Entry>
          <Main href="https://plausible.io/groupher.com" target="_blank">
            <Icon.Chart />
            <Title offset="8px">访问统计</Title>
          </Main>
          <Desc>多维度访问统计，透明开放</Desc>
        </Entry>
      </BodyWrapper>
      <Footer />
    </Wrapper>
  )
}

export default memo(MoreContent)

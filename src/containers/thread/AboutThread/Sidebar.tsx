import { FC, memo } from 'react'

import { DEME_SOCIALS } from '@/constant/social'

import { Br, Divider } from '@/widgets/Common'
import Linker from '@/widgets/Linker'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  MobileWrapper,
  Block,
  Title,
  Reports,
  ReportsArticle,
  Press,
  Desc,
} from './styles/sidebar'

type TProps = {
  isSidebarLayout: boolean
}

const Content = () => {
  return (
    <>
      <Block>
        <Title>官方主页</Title>
        <Desc>
          <Linker src="https://groupher.com" left={-2} top={12} />
        </Desc>
      </Block>
      <Block>
        <Title>关注我们</Title>
        <SocialList top={20} size="small" selected={DEME_SOCIALS} left={-12} />
      </Block>
      <Divider />
      <Block>
        <Title>技术栈</Title>
        <Desc>Typescript, Elixir</Desc>
      </Block>
      <Block>
        <Title>所在地</Title>
        <Desc>成都, 厦门</Desc>
      </Block>
      <Block>
        <Title>链接</Title>
        <Reports>喜马拉雅</Reports>
      </Block>
      <Divider />
      <Block>
        <Title>媒体报道</Title>
        <Br top={10} />
        <Reports>
          <Press>36kr</Press>
          <ReportsArticle>新一代xxx一体化协作平台「XXX」获1000万元Pre</ReportsArticle>
        </Reports>
        <Br top={6} />
        <Reports>
          <Press>科技周刊</Press>
          <ReportsArticle>这个平台太酷了</ReportsArticle>
        </Reports>
      </Block>
    </>
  )
}

const Sidebar: FC<TProps> = ({ isSidebarLayout }) => {
  return (
    <>
      <MobileWrapper>
        <Content />
      </MobileWrapper>

      <Wrapper isSidebarLayout={isSidebarLayout}>
        <Content />
      </Wrapper>
    </>
  )
}

export default memo(Sidebar)

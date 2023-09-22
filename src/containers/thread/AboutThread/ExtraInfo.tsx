import { FC, memo } from 'react'

import { Br, SexyDivider as Divider } from '@/widgets/Common'

import { Wrapper, Block, Title, Reports, ReportsArticle, Press, Desc } from './styles/extra_info'

const Content = () => {
  return (
    <>
      <Block>
        <Title>技术栈</Title>
        <Desc>Typescript, Elixir</Desc>
      </Block>
      <Block>
        <Title>所在地</Title>
        <Desc>成都, 厦门</Desc>
      </Block>
      <Divider bottom={30} />
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
      <Divider />
    </>
  )
}

const ExtraInfo: FC = () => {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default memo(ExtraInfo)

import { FC, memo } from 'react'

import { ICON } from '@/config'
import { ROUTE } from '@/constant'

import Footer from './Footer'

import {
  Wrapper,
  BodyWrapper,
  Entry,
  Logo,
  Icon,
  Main,
  Title,
  Desc,
  Wip,
} from '../styles/more_panel'

const MoreContent: FC = () => {
  return (
    <Wrapper>
      <BodyWrapper>
        {/* <Entry>
          <Main>
            <Logo src={`${ICON}/menu/shop.svg`} />
            <Title>
              小周边<Wip>开发中</Wip>
            </Title>
          </Main>
          <Desc>贴纸/冰箱贴/各种奇奇怪怪。。</Desc>
        </Entry> */}
        <Entry>
          <Main href={`/${ROUTE.SUPPORT_US}`}>
            <Logo src={`${ICON}/menu/lifebuoy.png`} />
            <Title>
              支持我们
              <Wip>help</Wip>
            </Title>
          </Main>
          <Desc>帮助我们一起共建社区</Desc>
        </Entry>
        {/* <Entry>
          <Link href={`/${ROUTE.TRENDING}`} passHref>
            <Main>
              <Icon.Hot />
              <Title>热门讨论</Title>
            </Main>
          </Link>
          <Desc>站内外近期热门讨论</Desc>
        </Entry> */}
        <Entry>
          <Main href="/makers">
            <Icon.Makers />
            <Title>Makers</Title>
          </Main>
          <Desc>创作者经验交流，开发者访谈</Desc>
        </Entry>
        <Entry>
          <Main href={`${ROUTE.APPLY_COMMUNITY}`}>
            <Icon.Piece />
            <Title>创建子社区</Title>
          </Main>
          <Desc>在 CP 上创建一个子社区</Desc>
        </Entry>
        <Entry>
          <Main href={`/${ROUTE.SUBSCRIBE}`}>
            <Icon.Subscribe />
            <Title offset="6px">内容订阅</Title>
          </Main>
          <Desc>各社区动态 RSS / Email 订阅</Desc>
        </Entry>
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

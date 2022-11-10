import { FC, memo } from 'react'

import { ICON, ABOUT_LINK } from '@/config'
import { ROUTE } from '@/constant'
import { Space, SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  InfoBar,
  SiteTitle,
  Beta,
  Item,
  HeartCrabIcon,
  HomeLogo,
} from '../../styles/desktop_view/top_info'

const HomeCommunity: FC = () => {
  return (
    <Wrapper>
      <InfoBar>
        <HomeLogo />
      </InfoBar>
      <SiteTitle>
        oderPlanets
        <Beta>beta</Beta>
      </SiteTitle>
      <SpaceGrow />
      <Item href={`${ABOUT_LINK}`}>关于</Item>
      <Item href={`/${ROUTE.SUPPORT_US}`}>支持我们</Item>
      <Item href="/feedback">反馈建议</Item>
      <Item href={`/${ROUTE.SPONSOR}`}>
        <HeartCrabIcon src={`${ICON}/emotion/heart.png`} noLazy />
        特别感谢
      </Item>
      <Item href={`/${ROUTE.FRIENDS}`}>友链</Item>
      <Item href="https://plausible.io/groupher.com" target="_blank">
        访问统计
      </Item>
      <Space right={80} />
    </Wrapper>
  )
}

export default memo(HomeCommunity)

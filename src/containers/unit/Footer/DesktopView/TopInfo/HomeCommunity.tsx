import { FC, memo } from 'react'

import { ABOUT_LINK } from '@/config'
import { Space, SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  InfoBar,
  SiteTitle,
  Beta,
  Item,
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
      <Item href="https://plausible.io/groupher.com" target="_blank">
        访问统计
      </Item>
      <Space right={80} />
    </Wrapper>
  )
}

export default memo(HomeCommunity)

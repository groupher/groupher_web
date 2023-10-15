import { FC } from 'react'
import { observer } from 'mobx-react'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import Tooltip from '@/widgets/Tooltip'

import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  PanelWrapper,
  Logo,
  Title,
  OptionArrowIcon,
  ToolPanel,
  PanelItem,
  ArrowIcon,
  DiscussIcon,
} from '../styles/header_layout/community_brief'

const CommunityBrief: FC = () => {
  const { logo, title, slug, dashboard } = useViewingCommunity()

  return (
    <>
      <Tooltip
        content={
          <>
            <ToolPanel>
              <PanelWrapper>
                <Logo src={assetSrc(logo)} noLazy />
                <Title>{title}</Title>
              </PanelWrapper>

              <PanelItem href={dashboard.baseInfo.homepage}>
                <ArrowIcon />
                <div>返回官网</div>
              </PanelItem>
              <PanelItem href={`/${slug}`}>
                <DiscussIcon />
                <div>社区主页</div>
              </PanelItem>
            </ToolPanel>
          </>
        }
        placement="bottom"
        hideOnClick={false}
        offset={[-6, -45]}
        trigger="click"
        noPadding
      >
        <Wrapper>
          <Logo src={assetSrc(logo)} noLazy />
          <Title>{title}</Title>
          <SpaceGrow />
          <OptionArrowIcon />
        </Wrapper>
      </Tooltip>
    </>
  )
}

export default observer(CommunityBrief)

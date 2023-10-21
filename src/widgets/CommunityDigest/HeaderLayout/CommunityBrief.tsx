import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useHover from '@/hooks/useHover'
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
  DisableTippyJump,
} from '../styles/header_layout/community_brief'

const CommunityBrief: FC = () => {
  const [disableTippyJump, setDisableTippyJump] = useState(false)
  const { logo, title, slug, dashboard } = useViewingCommunity()

  const [ref, isHovering] = useHover<HTMLDivElement>()

  useEffect(() => {
    if (isHovering && disableTippyJump !== true) {
      setDisableTippyJump(true)
    } else if (!isHovering && disableTippyJump !== false) {
      setDisableTippyJump(false)
    }
  }, [isHovering, disableTippyJump])

  // console.log('## disableTippyJump: ', disableTippyJump)

  return (
    <Tooltip
      content={
        <>
          <ToolPanel>
            <PanelWrapper>
              <Logo src={assetSrc(logo)} noLazy />
              <Title>{title}</Title>
            </PanelWrapper>

            <PanelItem href={dashboard.baseInfo.homepage} outside>
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
      offset={[-2, -40]}
      trigger="click"
      noPadding
    >
      <Wrapper ref={ref}>
        <Logo src={assetSrc(logo)} noLazy />
        <Title>{title}</Title>
        <SpaceGrow />
        <OptionArrowIcon />
        {disableTippyJump && <DisableTippyJump />}
      </Wrapper>
    </Tooltip>
  )
}

export default observer(CommunityBrief)

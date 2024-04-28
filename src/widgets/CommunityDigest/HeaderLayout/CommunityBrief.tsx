import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useBrandLayout from '@/hooks/useBrandLayout'
import useHover from '@/hooks/useHover'

import { BRAND_LAYOUT } from '@/constant/layout'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import {
  Wrapper,
  PanelWrapper,
  Logo,
  Title,
  OptionArrowIcon,
  ToolPanel,
  PanelItem,
  Icon,
  ArrowIcon,
  DisableTippyJump,
} from '../styles/header_layout/community_brief'

const CommunityBrief: FC = () => {
  const [disableTippyJump, setDisableTippyJump] = useState(false)
  const { logo, title, slug, dashboard } = useViewingCommunity()
  const brandLayout = useBrandLayout()

  const [ref, isHovering] = useHover<HTMLDivElement>()

  useEffect(() => {
    if (isHovering && disableTippyJump !== true) {
      setDisableTippyJump(true)
    }
  }, [isHovering, disableTippyJump])

  return (
    <Tooltip
      content={
        <ToolPanel>
          <PanelWrapper>
            {brandLayout !== BRAND_LAYOUT.TEXT && <Logo src={assetSrc(logo)} noLazy />}
            {brandLayout !== BRAND_LAYOUT.LOGO && (
              <Title $noMargin={brandLayout === BRAND_LAYOUT.TEXT}>{title}</Title>
            )}
          </PanelWrapper>

          <PanelItem href={`/${slug}`}>
            <Icon.Discuss />
            <div>社区主页</div>
          </PanelItem>

          <PanelItem href={dashboard?.baseInfo.homepage} $outside>
            <Icon.Global />
            <div>返回官网</div>
            <SpaceGrow />
            <ArrowIcon />
          </PanelItem>

          <PanelItem href={`/${slug}`} $outside>
            <Icon.Github />
            <div>Github</div>
            <SpaceGrow />
            <ArrowIcon />
          </PanelItem>

          <SexyDivider top={5} bottom={5} />
          <PanelItem href="/apply/community" $outside>
            <Icon.Plus />
            <div>新社区</div>
            <SpaceGrow />
            <ArrowIcon />
          </PanelItem>
        </ToolPanel>
      }
      placement="bottom"
      hideOnClick={false}
      offset={[-7, -39]}
      trigger="click"
      onHide={() => setDisableTippyJump(false)}
      noPadding
    >
      <Wrapper ref={ref}>
        {brandLayout !== BRAND_LAYOUT.TEXT && <Logo src={assetSrc(logo)} noLazy />}
        {brandLayout !== BRAND_LAYOUT.LOGO && (
          <Title $noMargin={brandLayout === BRAND_LAYOUT.TEXT}>{title}</Title>
        )}
        <SpaceGrow />
        <OptionArrowIcon />
        <DisableTippyJump enable={disableTippyJump} />
      </Wrapper>
    </Tooltip>
  )
}

export default observer(CommunityBrief)

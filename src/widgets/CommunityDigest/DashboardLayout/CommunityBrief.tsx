import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHover from '@/hooks/useHover'
import Tooltip from '@/widgets/Tooltip'
import { titleCase } from '@/fmt'

import { Space, SpaceGrow, SexyDivider } from '@/widgets/Common'

import {
  Wrapper,
  MenuWrapper,
  Logo,
  Title,
  Slash,
  OptionArrowIcon,
  ToolPanel,
  PanelItem,
  Icon,
  ArrowIcon,
  DisableTippyJump,
} from '../styles/dashboard_layout/community_brief'

const CommunityBrief: FC = () => {
  const threads = usePublicThreads()
  const { title, logo, slug, dashboard } = useViewingCommunity()

  const [disableTippyJump, setDisableTippyJump] = useState(false)
  const [ref, isHovering] = useHover<HTMLDivElement>()

  useEffect(() => {
    if (isHovering && disableTippyJump !== true) {
      setDisableTippyJump(true)
    }
  }, [isHovering, disableTippyJump])

  return (
    <Wrapper ref={ref}>
      <Logo src={assetSrc(logo)} noLazy />
      <Title>{title}</Title>
      <Slash>/</Slash>

      <Tooltip
        content={
          <ToolPanel>
            {threads.map((item) => {
              const ThreadIcon = Icon[titleCase(item.slug)]
              return (
                <PanelItem key={item.slug} href={`/${slug}/${item.slug}`}>
                  <ThreadIcon />
                  <div>{item.title}</div>
                </PanelItem>
              )
            })}

            <PanelItem href={`/${slug}/about`}>
              <Icon.About />
              <div>关于</div>
            </PanelItem>

            <SexyDivider top={5} bottom={5} />

            <PanelItem href={dashboard.baseInfo.homepage} $outside>
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
        <MenuWrapper>
          <Title>管理后台</Title>
          <Space right={12} />
          <OptionArrowIcon />
        </MenuWrapper>
      </Tooltip>
      <DisableTippyJump enable={disableTippyJump} />
    </Wrapper>
  )
}

export default observer(CommunityBrief)
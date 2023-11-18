import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePublicThreads from '@/hooks/usePublicThreads'
import useHover from '@/hooks/useHover'
import Tooltip from '@/widgets/Tooltip'
import { titleCase } from '@/fmt'

import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import {
  Wrapper,
  PanelWrapper,
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
  const { logo, slug, dashboard } = useViewingCommunity()

  const [disableTippyJump, setDisableTippyJump] = useState(false)
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
            <Logo src={assetSrc(logo)} noLazy />
            <Title>管理后台</Title>
          </PanelWrapper>

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
      <Wrapper ref={ref}>
        <Logo src={assetSrc(logo)} noLazy />
        <Title>
          {' '}
          <Slash>/</Slash> 管理后台
        </Title>
        <SpaceGrow />
        <OptionArrowIcon />
        <DisableTippyJump enable={disableTippyJump} />
      </Wrapper>
    </Tooltip>
  )
}

export default observer(CommunityBrief)

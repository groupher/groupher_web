import { FC, memo } from 'react'
// import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TThread, TCommunity, TMetric } from '@/spec'
import EVENT from '@/constant/event'
import { THREAD } from '@/constant/thread'

import { send } from '@/utils/signal'

import TagsBar from '@/containers/unit/TagsBar'
import Sticky from '@/widgets/Sticky'
import { SpaceGrow } from '@/widgets/Common'
import CustomScroller from '@/widgets/CustomScroller'

import CommunityBrief from './CommunityBrief'
import MainMenu from './MainMenu'
// import AccountUnit from './AccountUnit'

import { Wrapper, ScrollArea, TabBarWrapper, Divider } from '../styles/sidebar_layout'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

type TProps = {
  community: TCommunity
  activeThread: TThread
  metric: TMetric
}

const SidebarLayout: FC<TProps> = ({ community, activeThread, metric }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper testid="community-digest" isMobile={isMobile}>
      <Sticky>
        <CommunityBrief community={community} />
        <Divider bottom={0} />
        <CustomScroller
          direction="vertical"
          height="calc(100vh - 140px)"
          barSize="small"
          showShadow
        >
          <ScrollArea>
            <MainMenu community={community} activeThread={activeThread} />
            <Divider top={8} />
            {activeThread === THREAD.POST && (
              <TabBarWrapper>
                <TagsBar onSelect={() => send(EVENT.REFRESH_ARTICLES)} />
              </TabBarWrapper>
            )}
          </ScrollArea>
        </CustomScroller>
      </Sticky>
      <SpaceGrow />
    </Wrapper>
  )
}

export default memo(SidebarLayout)

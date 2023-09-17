import { FC, memo } from 'react'
// import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric } from '@/spec'

import EVENT from '@/constant/event'
import { THREAD } from '@/constant/thread'
import { DEME_SOCIALS } from '@/constant/social'

import useViewingThread from '@/hooks/useViewingThread'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useEnable from '@/hooks/useEnable'

import { send } from '@/utils/signal'

import PinedTree from '@/containers/thread/DocThread/ArticleLayout/PinedTree'
import TagsBar from '@/containers/unit/TagsBar'

import Sticky from '@/widgets/Sticky'
import { SpaceGrow } from '@/widgets/Common'
import CustomScroller from '@/widgets/CustomScroller'
import FileTree from '@/widgets/FileTree'
import SocialList from '@/widgets/SocialList'

import CommunityBrief from './CommunityBrief'
import MainMenu from './MainMenu'
// import AccountUnit from './AccountUnit'

import { Wrapper, FileTreeWrapper, TabBarWrapper, Divider } from '../styles/sidebar_layout'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

type TProps = {
  metric: TMetric
}

const SidebarLayout: FC<TProps> = ({ metric }) => {
  const { isMobile } = useMobileDetect()

  const community = useViewingCommunity()
  const activeThread = useViewingThread()
  const enable = useEnable()

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
          {activeThread !== THREAD.DOC && (
            <>
              <MainMenu community={community} activeThread={activeThread} enable={enable} />
              <Divider top={8} />
            </>
          )}

          {activeThread === THREAD.POST && enable.post && (
            <TabBarWrapper>
              <TagsBar onSelect={() => send(EVENT.REFRESH_ARTICLES)} />
            </TabBarWrapper>
          )}
          {activeThread === THREAD.DOC && enable.doc && (
            <FileTreeWrapper>
              <PinedTree />
              <FileTree />
            </FileTreeWrapper>
          )}
          {(activeThread === THREAD.KANBAN || activeThread === THREAD.CHANGELOG) && (
            <SocialList top={20} left={25} size="tiny" selected={DEME_SOCIALS} />
          )}
        </CustomScroller>
      </Sticky>
      <SpaceGrow />
    </Wrapper>
  )
}

export default memo(SidebarLayout)

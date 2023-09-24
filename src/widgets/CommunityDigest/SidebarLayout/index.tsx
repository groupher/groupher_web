import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
// import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import EVENT from '@/constant/event'
import { THREAD } from '@/constant/thread'
import { DEME_SOCIALS } from '@/constant/social'

import useViewingThread from '@/hooks/useViewingThread'
import useWindowResize from '@/hooks/useWindowResize'
import useEnable from '@/hooks/useEnable'

import { send } from '@/signal'

import PinedTree from '@/containers/thread/DocThread/ArticleLayout/PinedTree'
import TagsBar from '@/containers/unit/TagsBar'

import Sticky from '@/widgets/Sticky'
import { SpaceGrow } from '@/widgets/Common'
import AccountUnit from '@/widgets/AccountUnit'
import FileTree from '@/widgets/FileTree'
import SocialList from '@/widgets/SocialList'

import CommunityBrief from './CommunityBrief'
import MainMenu from './MainMenu'

import {
  Wrapper,
  InnerWrapper,
  FileTreeWrapper,
  TabBarWrapper,
  Divider,
} from '../styles/sidebar_layout'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

const SidebarLayout: FC = () => {
  const [viewHeight, setViewHeight] = useState(800)
  const { height: windowViewHeight } = useWindowResize()

  useEffect(() => {
    setViewHeight(windowViewHeight - 80)
  }, [windowViewHeight])

  const { isMobile } = useMobileDetect()
  const activeThread = useViewingThread()
  const enable = useEnable()

  return (
    <Wrapper testid="community-digest" isMobile={isMobile}>
      <Sticky>
        <InnerWrapper minHeight={viewHeight}>
          <CommunityBrief />
          <Divider bottom={16} />
          {activeThread !== THREAD.DOC && (
            <>
              <MainMenu />
              <Divider top={15} bottom={30} />
            </>
          )}

          {activeThread === THREAD.POST && enable.post && (
            <>
              <TabBarWrapper>
                <TagsBar onSelect={() => send(EVENT.REFRESH_ARTICLES)} />
              </TabBarWrapper>
              <Divider top={15} bottom={30} />
            </>
          )}

          {activeThread === THREAD.DOC && enable.doc && (
            <FileTreeWrapper>
              <PinedTree />
              <FileTree />
            </FileTreeWrapper>
          )}

          <SocialList top={20} left={-10} size="tiny" selected={DEME_SOCIALS} />
          <SpaceGrow />
          <AccountUnit withBg withName top={40} left={6} />
        </InnerWrapper>
      </Sticky>

      <SpaceGrow />
    </Wrapper>
  )
}

export default observer(SidebarLayout)

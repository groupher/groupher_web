import { FC, memo, useState } from 'react'

import type {
  TArticle,
  TCommunity,
  TMetric,
  TThread,
  TTag,
  TGroupedTags,
  TDashboardThreadConfig,
} from '@/spec'

import { scrollToHeader } from '@/utils/dom'
import { washThreads } from '@/utils/helper'

import MobileThreadNavi from '@/widgets/MobileThreadNavi'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import {
  Wrapper,
  InnerWrapper,
  MainMenusWrapper,
  CommunityLogo,
  MoreIcon,
  Go2TopWrapper,
  GotoTopIcon,
} from '../styles/community_layout'

type TProps = {
  testid?: string
  isMobile: boolean
  show: boolean
  metric: TMetric
  activeMenu: string // TModelineType
  article: TArticle | null
  community: TCommunity
  activeThread: TThread
  dashboardSettings: TDashboardThreadConfig
  activeTag: TTag
  groupedTags: TGroupedTags
}

const CommunityLayout: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  isMobile,
  show,
  metric,
  article = null,
  community,
  dashboardSettings,
  activeMenu,
  activeThread,
  activeTag,
  groupedTags,
}) => {
  const [expand, setExpand] = useState(false)

  const washedThreads = washThreads(community.threads, dashboardSettings)

  return (
    <Wrapper testid={testid} show={show} isMenuActive={!!activeMenu}>
      <InnerWrapper expand={expand}>
        <MainMenusWrapper>
          <CommunityLogo src={community.logo} />
          <MobileThreadNavi
            community={community}
            threads={washedThreads}
            active={activeThread}
            mode="modeline"
          />
          <ArticlesFilter
            isMobile={isMobile}
            mode="modeline"
            activeTag={activeTag}
            groupedTags={groupedTags}
            modelineExpand={expand}
          />

          {!expand && <MoreIcon onClick={() => setExpand(true)} />}
        </MainMenusWrapper>
        <Go2TopWrapper
          onClick={() => {
            setExpand(false)
            scrollToHeader()
          }}
        >
          <GotoTopIcon />
        </Go2TopWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(CommunityLayout)

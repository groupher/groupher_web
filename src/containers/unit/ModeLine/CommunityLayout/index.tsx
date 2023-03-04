import { FC, memo } from 'react'

import type {
  TArticle,
  TCommunity,
  TMetric,
  TModelineType,
  TEnableConfig,
  TThread,
  TTag,
  TGroupedTags,
} from '@/spec'

import { scrollToHeader } from '@/utils/dom'

import MobileThreadNavi from '@/widgets/MobileThreadNavi'
import ArticlesFilter from '@/widgets/ArticlesFilter'

// import { MenuBlock, CommunityBlock, MainBlock, ExploreBlock, AccountBlock } from './ArrowBlock'
import {
  Wrapper,
  InnerWrapper,
  MainMenusWrapper,
  Go2TopWrapper,
  GotoTopIcon,
} from '../styles/community_layout'

// import { openMenu } from '../logic'
// import { communityPageMenus, getArticlePageMenus } from './menus'

type TProps = {
  testid?: string
  metric: TMetric
  activeMenu: string // TModelineType
  article: TArticle | null
  community: TCommunity
  activeThread: TThread
  enable: TEnableConfig
  activeTag: TTag
  groupedTags: TGroupedTags
}

const BottomBar: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  metric,
  article = null,
  community,
  activeMenu,
  activeThread,
  enable,
  activeTag,
  groupedTags,
}) => {
  const publicThreads = community.threads.filter((thread) => enable[thread.raw])

  // const communityInfo = article?.originalCommunity?.raw ? article.originalCommunity : community
  //               onClick={multiClick(() => openMenu(item.raw))}

  return (
    <Wrapper testid={testid} isMenuActive={!!activeMenu}>
      <InnerWrapper>
        <MainMenusWrapper>
          <MobileThreadNavi
            community={community}
            threads={publicThreads}
            active={activeThread}
            mode="modeline"
          />
          <ArticlesFilter mode="modeline" activeTag={activeTag} groupedTags={groupedTags} />
        </MainMenusWrapper>
        <Go2TopWrapper onClick={() => scrollToHeader()}>
          <GotoTopIcon />
        </Go2TopWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(BottomBar)

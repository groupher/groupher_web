import { FC, memo, useState } from 'react'

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
  CommunityLogo,
  MoreIcon,
  Go2TopWrapper,
  GotoTopIcon,
} from '../styles/community_layout'

// import { changeCommunity } from '@/containers/editor/ArticleEditor/logic'

// import { openMenu } from '../logic'
// import { communityPageMenus, getArticlePageMenus } from './menus'

type TProps = {
  testid?: string
  show: boolean
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
  show,
  metric,
  article = null,
  community,
  activeMenu,
  activeThread,
  enable,
  activeTag,
  groupedTags,
}) => {
  const [expand, setExpand] = useState(false)

  const publicThreads = community.threads.filter((thread) => enable[thread.raw])

  // const communityInfo = article?.originalCommunity?.raw ? article.originalCommunity : community
  //               onClick={multiClick(() => openMenu(item.raw))}

  return (
    <Wrapper testid={testid} show={show} isMenuActive={!!activeMenu}>
      <InnerWrapper expand={expand}>
        <MainMenusWrapper>
          <CommunityLogo src={community.logo} />
          <MobileThreadNavi
            community={community}
            threads={publicThreads}
            active={activeThread}
            mode="modeline"
          />
          <ArticlesFilter
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

export default memo(BottomBar)

import { FC, memo, useState } from 'react'
import Router from 'next/router'

import type {
  TArticle,
  TCommunity,
  TMetric,
  TEnableConfig,
  TThread,
  TTag,
  TGroupedTags,
} from '@/spec'

import { scrollToHeader } from '@/utils/dom'
import { mockUsers } from '@/utils/mock'

import CommentsCount from '@/widgets/CommentsCount'
import Upvote from '@/widgets/Upvote'

// import { MenuBlock, CommunityBlock, MainBlock, ExploreBlock, AccountBlock } from './ArrowBlock'
import {
  Wrapper,
  InnerWrapper,
  MainMenusWrapper,
  ActionBallWrapper,
  GoBackIcon,
  GotoTopIcon,
} from '../styles/article_layout'

// import { changeCommunity } from '@/containers/editor/ArticleEditor/logic'

// import { openMenu } from '../logic'
// import { communityPageMenus, getArticlePageMenus } from './menus'

type TProps = {
  testid?: string
  isMobile: boolean
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

const ArticleLayout: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  isMobile,
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

  const users = mockUsers(3)

  return (
    <Wrapper testid={testid} show={show} isMenuActive={!!activeMenu}>
      <InnerWrapper expand={expand}>
        <ActionBallWrapper
          right={8}
          onClick={() => {
            Router.push(
              {
                pathname: `/home/${activeThread}`,
              },
              undefined,
              { scroll: false },
            )
          }}
        >
          <GoBackIcon />
        </ActionBallWrapper>

        <MainMenusWrapper>
          <Upvote count={8} avatarList={users} type="default" />

          <CommentsCount count={12} size="medium" right={8} />
        </MainMenusWrapper>
        <ActionBallWrapper
          left={8}
          onClick={() => {
            setExpand(false)
            scrollToHeader()
          }}
        >
          <GotoTopIcon />
        </ActionBallWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(ArticleLayout)

import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'

import type { TArticle } from '@/spec'

import useViewingThread from '@/hooks/useViewingThread'
// import useViewingCommunity from '@/hooks/useViewingCommunity'

import { scrollToHeader } from '@/dom'
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
  activeMenu: string // TModelineType
  article: TArticle | null
}

const ArticleLayout: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  isMobile,
  show,
  article = null,
  activeMenu,
}) => {
  const [expand, setExpand] = useState(false)
  // const community = useViewingCommunity()
  const activeThread = useViewingThread()

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

export default observer(ArticleLayout)

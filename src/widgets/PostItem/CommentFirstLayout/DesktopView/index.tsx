import { FC, memo } from 'react'

import type { TAvatarLayout, TCommunity, TPost } from '@/spec'
import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'

import { upvoteOnArticleList } from '@/utils/signal'
import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import Upvote from '@/widgets/Upvote'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Body from './Body'

import { Wrapper, Avatar, AvatarWrapper, Main } from '../../styles/comment_fist_layout/desktop_view'

type TProps = {
  curCommunity: TCommunity | null
  article: TPost
  avatarLayout?: TAvatarLayout

  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({ curCommunity, article, avatarLayout = AVATAR_LAYOUT.SQUARE }) => {
  return (
    <Wrapper>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />

      <ViewingSign article={article} top={12} />
      <AvatarWrapper>
        <Avatar src={article.author.avatar} avatarLayout={avatarLayout} />
        <Upvote
          type={UPVOTE_LAYOUT.POST_LIST}
          count={article.upvotesCount}
          viewerHasUpvoted={article.viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteOnArticleList(article, viewerHasUpvoted)}
        />
      </AvatarWrapper>
      <Main>
        <Header article={article} />
        <Body article={article} curCommunity={curCommunity} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)

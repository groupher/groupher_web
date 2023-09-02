import { FC, memo } from 'react'

import type { TAvatarLayout, TPost } from '@/spec'
import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'

import { upvoteOnArticleList, previewArticle } from '@/utils/signal'
import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import Upvote from '@/widgets/Upvote'
import ImgFallback from '@/widgets/ImgFallback'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Body from './Body'

import {
  Wrapper,
  Avatar,
  AvatarWrapper,
  Main,
  UpvoteWrapper,
} from '../../styles/ph_layout/desktop_view'

type TProps = {
  article: TPost
  avatarLayout?: TAvatarLayout
}

const DigestView: FC<TProps> = ({ article, avatarLayout = AVATAR_LAYOUT.SQUARE }) => {
  const { author } = article

  return (
    <Wrapper onClick={() => previewArticle(article)}>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={24} />

      <AvatarWrapper>
        <Avatar
          src={author.avatar}
          avatarLayout={avatarLayout}
          fallback={<ImgFallback size={26} user={author} avatarLayout={avatarLayout} />}
        />
      </AvatarWrapper>
      <Main>
        <Header article={article} />
        <Body article={article} />
      </Main>

      <UpvoteWrapper>
        <Upvote
          type={UPVOTE_LAYOUT.POST_MINIMAL}
          count={article.upvotesCount}
          viewerHasUpvoted={article.viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteOnArticleList(article, viewerHasUpvoted)}
        />
      </UpvoteWrapper>
    </Wrapper>
  )
}

export default memo(DigestView)

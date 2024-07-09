import type { FC } from 'react'

import type { TPost } from '~/spec'
import { UPVOTE_LAYOUT } from '~/const/layout'
import useLayout from '~/hooks/useLayout'

import { upvoteArticle, previewArticle } from '~/signal'
import ArticlePinLabel from '~/widgets/ArticlePinLabel'
import Upvote from '~/widgets/Upvote'
import ImgFallback from '~/widgets/ImgFallback'

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
}

const DigestView: FC<TProps> = ({ article }) => {
  const { avatarLayout } = useLayout()
  const { author } = article

  return (
    <Wrapper>
      <ArticlePinLabel isPinned={article.isPinned} top={26} />
      <ViewingSign article={article} top={24} />

      <AvatarWrapper>
        <Avatar
          src={author.avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={26} user={author} />}
        />
      </AvatarWrapper>
      <Main onClick={() => previewArticle(article)}>
        <Header article={article} />
        <Body article={article} />
      </Main>

      <UpvoteWrapper>
        <Upvote
          type={UPVOTE_LAYOUT.POST_MINIMAL}
          count={article.upvotesCount}
          viewerHasUpvoted={article.viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteArticle(article, viewerHasUpvoted)}
        />
      </UpvoteWrapper>
    </Wrapper>
  )
}

export default DigestView

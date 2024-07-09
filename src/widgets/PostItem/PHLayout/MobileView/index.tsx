import type { FC } from 'react'

import type { TPost } from '~/spec'
import useLayout from '~/hooks/useLayout'
import { UPVOTE_LAYOUT } from '~/const/layout'

import { upvoteArticle } from '~/signal'
import Upvote from '~/widgets/Upvote'
import ImgFallback from '~/widgets/ImgFallback'

import Header from './Header'
import Body from './Body'

import { Wrapper, Avatar, AvatarWrapper, Main } from '../../styles/ph_layout/mobile_view'

type TProps = {
  article: TPost
}

const DigestView: FC<TProps> = ({ article }) => {
  const { avatarLayout } = useLayout()

  const { author } = article

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar
          src={author.avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={22} user={author} />}
        />
        <Upvote
          type={UPVOTE_LAYOUT.POST_LIST}
          count={article.upvotesCount}
          viewerHasUpvoted={article.viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteArticle(article, viewerHasUpvoted)}
        />
      </AvatarWrapper>
      <Main>
        <Header article={article} />
        <Body article={article} />
      </Main>
    </Wrapper>
  )
}

export default DigestView

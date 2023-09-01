import { FC, memo } from 'react'

import type { TAvatarLayout, TPost, TAccount } from '@/spec'
import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'

import { upvoteOnArticleList } from '@/utils/signal'
import Upvote from '@/widgets/Upvote'
import ImgFallback from '@/widgets/ImgFallback'

import Header from './Header'
import Body from './Body'

import { Wrapper, Avatar, AvatarWrapper, Main } from '../../styles/ph_layout/mobile_view'

type TProps = {
  article: TPost
  avatarLayout?: TAvatarLayout

  // onUserSelect?: (obj: TUser) => void
  onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({
  article,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
  onAuthorSelect,
}) => {
  const { author } = article

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar
          src={author.avatar}
          avatarLayout={avatarLayout}
          onClick={() => onAuthorSelect(author)}
          fallback={<ImgFallback size={22} user={author} avatarLayout={avatarLayout} />}
        />
        <Upvote
          type={UPVOTE_LAYOUT.POST_LIST}
          count={article.upvotesCount}
          viewerHasUpvoted={article.viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteOnArticleList(article, viewerHasUpvoted)}
        />
      </AvatarWrapper>
      <Main>
        <Header article={article} />
        <Body article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)

import { FC, memo } from 'react'

import type { TAvatarLayout, TPost, TAccount } from '@/spec'
import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'

import { upvoteOnArticleList } from '@/utils/signal'
import Upvote from '@/widgets/Upvote'

import Header from './Header'
import Body from './Body'

import { Wrapper, Avatar, AvatarWrapper, Main } from '../../styles/comment_fist_layout/mobile_view'

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
  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar
          src={article.author.avatar}
          avatarLayout={avatarLayout}
          onClick={() => onAuthorSelect(article.author)}
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

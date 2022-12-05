import { FC, memo } from 'react'

import type { TCommunity, TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant'

import { upvoteOnArticleList } from '@/utils/signal'
import TheAvatar from '@/widgets/TheAvatar'
import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import Upvote from '@/widgets/Upvote'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Body from './Body'

import {
  Wrapper,
  AvatarWrapper,
  UpvoteWrapper,
  Main,
} from '../../styles/comment_fist_layout/desktop_view'

type TProps = {
  curCommunity: TCommunity | null
  article: TPost

  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({ curCommunity, article }) => {
  return (
    <Wrapper>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />

      <ViewingSign article={article} top={18} />
      <AvatarWrapper>
        <TheAvatar user={article.author} />
        <UpvoteWrapper>
          <Upvote
            type={UPVOTE_LAYOUT.POST_LIST}
            count={article.upvotesCount}
            viewerHasUpvoted={article.viewerHasUpvoted}
            onAction={(viewerHasUpvoted) =>
              upvoteOnArticleList(article, viewerHasUpvoted)
            }
          />
        </UpvoteWrapper>
      </AvatarWrapper>
      <Main>
        <Header article={article} />
        <Body article={article} curCommunity={curCommunity} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)

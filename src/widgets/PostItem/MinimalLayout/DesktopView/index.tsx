import { FC, memo } from 'react'

import { EVENT, UPVOTE_LAYOUT } from '@/constant'
import type { TPost } from '@/spec'

import { send } from '@/utils/signal'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import Upvote from '@/widgets/Upvote'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import {
  Wrapper,
  UpvoteWrapper,
  Main,
  DigestWrapper,
} from '../../styles/minimal_layout/desktop_view'

type TProps = {
  article: TPost
  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper>
      <ArticleReadLabel article={article} top={8} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={8} />
      <UpvoteWrapper>
        <Upvote
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          type={UPVOTE_LAYOUT.POST_MINIMAL}
          left={-2}
          top={-1}
        />
      </UpvoteWrapper>
      <Main>
        <Header article={article} />
        <DigestWrapper onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>
          {article.digest}
        </DigestWrapper>
        <Footer article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)

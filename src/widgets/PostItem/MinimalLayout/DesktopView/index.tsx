import { FC, memo } from 'react'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { previewArticle } from '@/signal'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'
import Upvote from '@/widgets/Upvote'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import { Wrapper, UpvoteWrapper, Main, Digest } from '../../styles/minimal_layout/desktop_view'

type TProps = {
  article: TPost
  // onUserSelect?: (obj: TUser) => void
}

const DigestView: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper onClick={() => previewArticle(article)}>
      <ArticleReadLabel article={article} top={8} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={20} />
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
        <Digest>{article.digest}</Digest>
        <Footer article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)

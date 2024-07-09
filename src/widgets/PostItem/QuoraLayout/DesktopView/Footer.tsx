import { memo, type FC } from 'react'

import type { TPost } from '~/spec'
import { UPVOTE_LAYOUT } from '~/const/layout'

import { upvoteArticle } from '~/signal'
// import { mockUsers } from '~/mock'

import Upvote from '~/widgets/Upvote'
import { Space } from '~/widgets/Common'
import ViewsCount from '~/widgets/ViewsCount'
import ArticleCatState from '~/widgets/ArticleCatState'

import { Wrapper } from '../../styles/quora_layout/desktop_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper>
      <Upvote
        count={upvotesCount}
        avatarList={meta.latestUpvotedUsers}
        // count={20}
        // avatarList={mockUsers(5)}
        onAction={(viewerHasUpvoted) => upvoteArticle(article, viewerHasUpvoted)}
        viewerHasUpvoted={viewerHasUpvoted}
        type={UPVOTE_LAYOUT.GENERAL}
        left={-1}
        top={-1}
      />
      {article.cat && (
        <ArticleCatState
          left={upvotesCount === 0 ? 10 : 18}
          cat={article.cat}
          state={article.state}
        />
      )}
      <Space right={18} />
      <ViewsCount count={article.views} />
    </Wrapper>
  )
}

export default memo(Footer)

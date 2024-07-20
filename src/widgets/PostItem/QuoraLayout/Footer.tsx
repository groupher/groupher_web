import type { FC } from 'react'

import type { TPost } from '~/spec'
import { UPVOTE_LAYOUT } from '~/const/layout'

import { upvoteArticle } from '~/signal'

import Upvote from '~/widgets/Upvote'
import { Space } from '~/widgets/Common'
import ViewsCount from '~/widgets/ViewsCount'
import ArticleCatState from '~/widgets/ArticleCatState'

import useSalon from '../styles/quora_layout/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <Upvote
        count={upvotesCount}
        avatarList={meta.latestUpvotedUsers}
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
    </div>
  )
}

export default Footer

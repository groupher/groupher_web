import { type FC, memo } from 'react'

import { UPVOTE_LAYOUT } from '~/const/layout'
import useArticleUpvoteMutation from '~/query/mutation/useArticleUpvoteMutation'
import type { TArticle } from '~/spec'
import Upvote from '~/unit/Upvote'

import ArticleBaseStats from '../ArticleBaseStats'
import useSalon from './salon/article_info'

type TProps = {
  article: TArticle
}

const ArticleInfo: FC<TProps> = ({ article }) => {
  const s = useSalon()
  const { upvotesCount, viewerHasUpvoted, meta } = article
  const upvoteArticle = useArticleUpvoteMutation(article)

  return (
    <div className={s.wrapper}>
      <div className={s.baseWrapper}>
        <Upvote
          type={UPVOTE_LAYOUT.DEFAULT}
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          noLazyLoad
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={upvoteArticle}
        />
        <div className='grow' />
        <ArticleBaseStats article={article} container='drawer' />
      </div>
    </div>
  )
}

export default memo(ArticleInfo)

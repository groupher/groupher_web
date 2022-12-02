import { memo, FC, Fragment } from 'react'
import { includes } from 'ramda'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT, ARTICLE_CAT } from '@/constant'

import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'

import ArticleCatState from '@/widgets/ArticleCatState'
import ViewsCount from '../../ViewsCount'

import {
  Wrapper,
  UpvoteWrapper,
} from '../../styles/upvote_fist_layout/desktop_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  const demoList = ['239', '231', '227', '228', '226', '225']

  return (
    <Wrapper>
      <UpvoteWrapper count={upvotesCount}>
        <Upvote
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          type={UPVOTE_LAYOUT.GENERAL}
          left={-2}
        />
      </UpvoteWrapper>

      {!includes(article.id, demoList) ? (
        <ArticleCatState left={18} cat={ARTICLE_CAT.QUESTION} />
      ) : (
        <Fragment>
          {article.id === '239' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} left={18} />
          )}
          {article.id === '231' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} left={18} />
          )}
          {article.id === '227' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" left={18} />
          )}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" left={18} />
          )}
          {article.id === '226' && (
            <ArticleCatState
              cat={ARTICLE_CAT.QUESTION}
              state="RESOLVE"
              left={18}
            />
          )}
          {article.id === '225' && (
            <ArticleCatState
              cat={ARTICLE_CAT.REJECT_NO_PLAN}
              state="REJECT"
              left={18}
            />
          )}
        </Fragment>
      )}

      <Space right={18} />
      <ViewsCount count={article.views} />
    </Wrapper>
  )
}

export default memo(Footer)

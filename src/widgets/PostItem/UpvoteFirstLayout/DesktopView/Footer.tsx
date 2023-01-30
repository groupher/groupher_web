import { memo, FC, Fragment } from 'react'
import { includes } from 'ramda'

import type { TPost, TAvatarLayout } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'
import ViewsCount from '@/widgets/ViewsCount'
import ArticleCatState from '@/widgets/ArticleCatState'

import { Wrapper } from '../../styles/upvote_fist_layout/desktop_view/footer'

type TProps = {
  article: TPost
  avatarLayout: TAvatarLayout
}

const Footer: FC<TProps> = ({ article, avatarLayout }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  const demoList = ['239', '231', '227', '228', '226', '225']

  return (
    <Wrapper>
      <Upvote
        count={upvotesCount}
        avatarList={meta.latestUpvotedUsers}
        viewerHasUpvoted={viewerHasUpvoted}
        type={UPVOTE_LAYOUT.GENERAL}
        avatarLayout={avatarLayout}
        left={-2}
        top={-1}
      />

      {!includes(article.id, demoList) ? (
        <ArticleCatState left={18} cat={article.category} state={article.state} />
      ) : (
        <Fragment>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} left={14} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} left={14} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" left={14} />}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" left={14} />
          )}
          {article.id === '226' && (
            <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" left={14} />
          )}
          {article.id === '225' && (
            <ArticleCatState
              cat={ARTICLE_CAT.FEATURE}
              state={ARTICLE_STATE.REJECT_DUP}
              left={14}
              top={1}
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

import { FC } from 'react'
import { includes } from 'ramda'

import type { TCommunity, TPost } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/article_cat_state'
import EVENT from '@/constant/event'
import { send } from '@/utils/signal'

import { Space } from '@/widgets/Common'
import ArticleCatState from '@/widgets/ArticleCatState'
import CommentsCount from '@/widgets/CommentsCount'
import ViewsCount from '@/widgets/ViewsCount'

import ActiveBadge from './ActiveBadge'

import {
  Wrapper,
  Digest,
  Footer,
  Extra,
  ArticleStateBadgeWrapper,
} from '../../styles/comment_fist_layout/desktop_view/body'

type TProps = {
  curCommunity: TCommunity | null
  article: TPost
}

const Body: FC<TProps> = ({ article, curCommunity }) => {
  const demoList = ['239', '231', '227', '228', '226', '225']
  return (
    <Wrapper>
      <Extra>
        <ActiveBadge article={article} />
      </Extra>

      <Digest onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>{article.digest}</Digest>
      <Footer>
        <ArticleStateBadgeWrapper>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={18} top={1} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} right={18} top={1} />}
          {article.id === '227' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" right={18} top={1} />
          )}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" right={18} top={1} />
          )}
          {article.id === '226' && (
            <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" right={18} top={1} />
          )}
          {article.id === '225' && (
            <ArticleCatState
              cat={ARTICLE_CAT.FEATURE}
              state={ARTICLE_STATE.REJECT_DUP}
              right={18}
              top={1}
            />
          )}
        </ArticleStateBadgeWrapper>
        {!includes(article.id, demoList) && (
          <ArticleCatState right={18} cat={article.category} state={article.state} top={1} />
        )}

        <ViewsCount count={article.views} />
        <Space right={18} />
        {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} />}
      </Footer>
    </Wrapper>
  )
}

export default Body

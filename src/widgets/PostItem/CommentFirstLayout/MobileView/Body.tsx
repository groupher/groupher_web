import { FC } from 'react'
import { includes } from 'ramda'
import dynamic from 'next/dynamic'

import type { TPost } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import EVENT from '@/constant/event'
import { send } from '@/utils/signal'

import ArticleCatState from '@/widgets/ArticleCatState'
import ViewsCount from '@/widgets/ViewsCount'

import {
  Wrapper,
  Digest,
  Footer,
  ArticleStateBadgeWrapper,
} from '../../styles/comment_fist_layout/mobile_view/body'

const TagsList = dynamic(() => import('@/widgets/TagsList'), {
  ssr: false,
})

type TProps = {
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  const demoList = ['239', '231', '227', '228', '226', '225']
  return (
    <Wrapper>
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

        <TagsList items={article.articleTags} right={10} />
        <ViewsCount count={article.views} />
      </Footer>
    </Wrapper>
  )
}

export default Body

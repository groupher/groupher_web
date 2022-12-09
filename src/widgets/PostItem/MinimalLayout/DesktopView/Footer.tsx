import { memo, FC, Fragment } from 'react'
import { includes } from 'ramda'

import type { TPost } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant'

import ArticleCatState from '@/widgets/ArticleCatState'

import { Wrapper } from '../../styles/minimal_layout/desktop_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const demoList = ['239', '231', '227', '228', '226', '225']

  return (
    <Wrapper>
      {!includes(article.id, demoList) ? (
        <ArticleCatState right={18} cat={article.category} state={article.state} />
      ) : (
        <Fragment>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" />}
          {article.id === '228' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" />}
          {article.id === '226' && <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" />}
          {article.id === '225' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.REJECT_DUP} />
          )}
        </Fragment>
      )}
    </Wrapper>
  )
}

export default memo(Footer)

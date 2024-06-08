import type { FC } from 'react'

import type { TPost } from '@/spec'

import { Space } from '@/widgets/Common'
import ArticleCatState from '@/widgets/ArticleCatState'
import CommentsCount from '@/widgets/CommentsCount'
import ViewsCount from '@/widgets/ViewsCount'

import ActiveBadge from './ActiveBadge'

import { Wrapper, Digest, Footer, Extra } from '../../styles/ph_layout/desktop_view/body'

type TProps = {
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Extra>
        <ActiveBadge article={article} />
      </Extra>

      <Digest>{article.digest}</Digest>
      <Footer>
        {article.cat && (
          <ArticleCatState cat={article.cat} state={article.state} right={18} top={1} left={-2} />
        )}
        <ViewsCount count={article.views} />
        <Space right={18} />
        {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} />}
      </Footer>
    </Wrapper>
  )
}

export default Body

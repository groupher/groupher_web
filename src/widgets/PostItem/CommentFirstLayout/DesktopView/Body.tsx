import { FC } from 'react'

import type { TPost } from '@/spec'
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
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Extra>
        <ActiveBadge article={article} />
      </Extra>

      <Digest onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>{article.digest}</Digest>
      <Footer>
        <ArticleStateBadgeWrapper>
          {article.cat && (
            <ArticleCatState cat={article.cat} state={article.state} right={18} top={1} />
          )}
        </ArticleStateBadgeWrapper>

        <ViewsCount count={article.views} />
        <Space right={18} />
        {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} />}
      </Footer>
    </Wrapper>
  )
}

export default Body

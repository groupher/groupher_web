import { FC } from 'react'

import type { TPost } from '@/spec'
import EVENT from '@/constant/event'
import { send } from '@/signal'

import ArticleCatState from '@/widgets/ArticleCatState'
import ViewsCount from '@/widgets/ViewsCount'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Digest, Footer } from '../../styles/ph_layout/mobile_view/body'

type TProps = {
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Digest onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>{article.digest}</Digest>
      <Footer>
        {article.cat && (
          <ArticleCatState cat={article.cat} state={article.state} top={1} right={18} />
        )}
        <TagsList items={article.articleTags} right={10} />
        <ViewsCount count={article.views} />
      </Footer>
    </Wrapper>
  )
}

export default Body

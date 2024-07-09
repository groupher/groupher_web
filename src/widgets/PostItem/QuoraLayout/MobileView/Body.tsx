import { type FC, memo } from 'react'

import type { TPost } from '~/spec'
import { ARTICLE_THREAD } from '~/const/thread'

import { Wrapper, Title } from '../../styles/quora_layout/mobile_view/body'

type TProps = {
  article: TPost
}

const Body: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Title href={`/${ARTICLE_THREAD.POST}/${article.id}`}>{article.title}</Title>
    </Wrapper>
  )
}

export default memo(Body)

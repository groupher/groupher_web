import { memo, FC } from 'react'

import type { TPost } from '@/spec'

import TagsList from '@/widgets/TagsList'
import ArticleCatState from '@/widgets/ArticleCatState'

import { Wrapper } from '../../styles/minimal_layout/mobile_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      {article.cat && <ArticleCatState right={18} cat={article.cat} state={article.state} />}

      <TagsList items={article.articleTags} left={12} />
    </Wrapper>
  )
}

export default memo(Footer)

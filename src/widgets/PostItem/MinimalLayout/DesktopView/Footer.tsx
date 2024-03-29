import { memo, FC } from 'react'

import type { TPost } from '@/spec'

import ArticleCatState from '@/widgets/ArticleCatState'

import { Wrapper } from '../../styles/minimal_layout/desktop_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      {article.cat && <ArticleCatState right={18} cat={article.cat} state={article.state} />}
    </Wrapper>
  )
}

export default memo(Footer)

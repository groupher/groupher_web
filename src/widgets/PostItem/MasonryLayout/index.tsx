import { FC } from 'react'

import type { TPost } from '@/spec'

import ArticleCard from '@/widgets/ArticleCard'

import { Wrapper } from '../styles/masonry_layout'

type TProps = {
  article: TPost
}

const MasonryLayout: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <ArticleCard data={article} />
    </Wrapper>
  )
}

export default MasonryLayout

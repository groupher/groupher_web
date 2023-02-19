import { FC } from 'react'

import type { TPost } from '@/spec'

import ArticleCard from '@/widgets/ArticleCard'

import { Wrapper } from '../styles/card_layout/desktop'

type TProps = {
  article: TPost
}

const CardLayout: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <ArticleCard data={article} />
    </Wrapper>
  )
}

export default CardLayout

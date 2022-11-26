import { FC } from 'react'

import type { TPost } from '@/spec'

import ArticleCard from '@/widgets/ArticleCard'

type TProps = {
  article: TPost
}

const CardLayout: FC<TProps> = ({ article }) => {
  return (
    <div>
      <ArticleCard data={article} />
    </div>
  )
}

export default CardLayout

import { FC, memo } from 'react'
import type { TArticle } from '@/spec'

import PostLayout from './PostLayout'

type TProps = {
  article: TArticle
}

const Layout: FC<TProps> = ({ article }) => {
  return <PostLayout article={article} />
}

export default memo(Layout)

import { FC, memo } from 'react'
import type { TArticle, TThread } from '@/spec'

import PostLayout from './PostLayout'

type TProps = {
  article: TArticle
  thread: TThread
}

const Layout: FC<TProps> = ({ article, thread }) => {
  switch (thread) {
    default: {
      return <PostLayout article={article} />
    }
  }
}

export default memo(Layout)

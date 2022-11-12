import { FC, memo } from 'react'
import type { TArticle, TThread } from '@/spec'

import PostLayout from './PostLayout'

type TProps = {
  article: TArticle
  thread: TThread
}

const Layout: FC<TProps> = ({ article, thread }) => {
  switch (thread) {
    // case THREAD.WORKS: {
    //   return <WorksLayout article={article} tab={tab} />
    // }

    // case THREAD.JOB: {
    //   return <JobLayout article={article} metric={metric} />
    // }

    // case THREAD.BLOG: {
    //   return <BlogLayout article={article} metric={metric} tab={tab} />
    // }

    default: {
      return <PostLayout article={article} />
    }
  }
}

export default memo(Layout)

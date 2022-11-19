import { FC, memo } from 'react'

import type { TArticleThread } from '@/spec'

import PostRules from './PostRules'

type TProps = {
  thread: TArticleThread
}

const PublishRules: FC<TProps> = ({ thread }) => {
  return <PostRules />
}

export default memo(PublishRules)

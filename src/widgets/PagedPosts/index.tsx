/*
 *
 * PagedArticles
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import Pagi from '@/widgets/Pagi'

import EVENT from '@/constant/event'
import usePagedPosts from '@/hooks/usePagedPosts'

import { send } from '@/signal'
import { buildLog } from '@/logger'

import PostList from './PostList'
// import CommunityRecommends from './CommunityRecommends'

const _log = buildLog('w:PagedArticles:index')

const PagedPosts: FC = () => {
  const { pagedPosts } = usePagedPosts()
  const { entries, ...pagi } = pagedPosts

  return (
    <>
      <PostList />

      <Pagi
        {...pagi}
        onChange={(page) => send(EVENT.REFRESH_ARTICLES, { page })}
        top={80}
        bottom={30}
      />
    </>
  )
}

export default observer(PagedPosts)

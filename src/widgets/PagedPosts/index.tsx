/*
 *
 * PagedArticles
 *
 */

import { FC, memo } from 'react'
import Pagi from '@/widgets/Pagi'

import EVENT from '@/constant/event'
import usePagedPosts from '@/hooks/usePagedPosts'

import { send } from '@/signal'
import { buildLog } from '@/logger'

import PostList from './PostList'
// import CommunityRecommends from './CommunityRecommends'

/* eslint-disable-next-line */
const log = buildLog('w:PagedArticles:index')

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

/* <CommunityRecommends /> */
export default memo(PagedPosts)

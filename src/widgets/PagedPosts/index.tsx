/*
 *
 * PagedArticles
 *
 */

import { type FC, memo } from 'react'
import dynamic from 'next/dynamic'

// import Pagi from '@/widgets/Pagi'

import EVENT from '@/const/event'

import { send } from '@/signal'

import PostList from './PostList'

export const Pagi = dynamic(() => import('@/widgets/Pagi'), {
  ssr: false,
})

const PagedPosts: FC = () => {
  console.log('## ## PagedPosts render')

  return (
    <>
      <PostList />
      <Pagi onChange={(page) => send(EVENT.REFRESH_ARTICLES, { page })} top={80} bottom={30} />
    </>
  )
}

export default memo(PagedPosts)

/* eslint-disable react/display-name */

import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
// import { trackWindowScroll } from 'react-lazy-load-image-component'

import usePagedPosts from '@/hooks/usePagedPosts'
import { POST_LAYOUT } from '@/const/layout'
import TYPE from '@/const/type'
import { THREAD } from '@/const/thread'
import usePostLayout from '@/hooks/usePostLayout'

import PostItem from '@/widgets/PostItem'
import MasonryCards from '@/widgets/MasonryCards'
// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { MasonryCardsWrapper } from './styles/article_list'

export const EmptyThread = dynamic(() => import('@/widgets/EmptyThread'), {
  ssr: false,
})

const PostList: FC = () => {
  const postLayout = usePostLayout()
  const { pagedPosts, resState } = usePagedPosts()
  const { entries } = pagedPosts

  // if (resState === TYPE.RES_STATE.LOADING && entries.length === 0) {
  //   return <LavaLampLoading top={20} left={30} />
  // }

  // 加入 length 的判断是因为 Graphql 客户端如果有缓存的话会导致 RES_STATE 没有更新（因为没有请求）
  if (
    (resState === TYPE.RES_STATE.EMPTY && entries.length === 0) ||
    (resState === TYPE.RES_STATE.DONE && entries.length === 0)
  ) {
    return <EmptyThread thread={THREAD.POST} />
  }

  if (postLayout === POST_LAYOUT.MASONRY) {
    return (
      <MasonryCardsWrapper>
        <MasonryCards column={2}>
          {entries.map((entry) => (
            <PostItem key={entry.id} article={entry} layout={postLayout} />
          ))}
        </MasonryCards>
      </MasonryCardsWrapper>
    )
  }

  return (
    <>
      {entries.map((entry) => (
        <PostItem key={entry.id} article={entry} layout={postLayout} />
      ))}
    </>
  )
}

export default observer(PostList)
// export default PostList

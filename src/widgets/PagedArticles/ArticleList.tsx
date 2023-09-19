/* eslint-disable react/display-name */

import { FC } from 'react'
import { observer } from 'mobx-react'

import { POST_LAYOUT } from '@/constant/layout'
import TYPE from '@/constant/type'
import type { TArticleEntries } from '@/spec'
import usePostLayout from '@/hooks/usePostLayout'

import PostItem from '@/widgets/PostItem'

import MasonryCards from '@/widgets/MasonryCards'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { EmptyThread } from './dynamic'

import type { TProps as TBaseTProps } from '.'
import { MasonryCardsWrapper } from './styles/article_list'

type TProps = { entries: TArticleEntries } & Omit<TBaseTProps, 'data'>

const ArticleList: FC<TProps> = ({ thread, resState, entries }) => {
  const postLayout = usePostLayout()

  // switch between threads
  if (resState === TYPE.RES_STATE.LOADING && entries.length === 0) {
    return <LavaLampLoading top={20} left={30} />
  }

  // 加入 length 的判断是因为 Graphql 客户端如果有缓存的话会导致 RES_STATE 没有更新（因为没有请求）
  if (
    (resState === TYPE.RES_STATE.EMPTY && entries.length === 0) ||
    (resState === TYPE.RES_STATE.DONE && entries.length === 0)
  ) {
    // @ts-ignore
    return <EmptyThread thread={thread} />
  }

  if (postLayout === POST_LAYOUT.MASONRY) {
    return (
      <MasonryCardsWrapper>
        <MasonryCards column={2}>
          {entries.map((entry) => (
            <PostItem key={entry.id} article={entry} />
          ))}
        </MasonryCards>
      </MasonryCardsWrapper>
    )
  }

  return (
    <>
      {entries.map((entry) => (
        <PostItem key={entry.id} article={entry} />
      ))}
    </>
  )
}

export default observer(ArticleList)

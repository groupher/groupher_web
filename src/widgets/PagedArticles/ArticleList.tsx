/* eslint-disable react/display-name */

import { Fragment, memo, FC } from 'react'

import { POST_LAYOUT } from '@/constant/layout'
import TYPE from '@/constant/type'
import type { TArticleEntries } from '@/spec'

import PostItem from '@/widgets/PostItem'

import MasonryCards from '@/widgets/MasonryCards'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { EmptyThread } from './dynamic'

import type { TProps as TBaseTProps } from '.'
import { MasonryCardsWrapper } from './styles/article_list'

type TProps = { entries: TArticleEntries } & Omit<TBaseTProps, 'data'>

const ArticleList: FC<TProps> = ({
  curCommunity,
  thread,
  resState,
  entries,
  c11n,
  globalLayout,
}) => {
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

  if (globalLayout.post === POST_LAYOUT.CARD) {
    return (
      <MasonryCardsWrapper>
        <MasonryCards column={2}>
          {entries.map((entry) => (
            <PostItem
              key={entry.id}
              article={entry}
              c11n={c11n}
              curCommunity={curCommunity}
              layout={globalLayout.post}
              avatarLayout={globalLayout.avatar}
            />
          ))}
        </MasonryCards>
      </MasonryCardsWrapper>
    )
  }

  return (
    <Fragment>
      {entries.map((entry) => (
        <PostItem
          key={entry.id}
          article={entry}
          c11n={c11n}
          curCommunity={curCommunity}
          layout={globalLayout.post}
          avatarLayout={globalLayout.avatar}
        />
      ))}
    </Fragment>
  )
}

export default memo(ArticleList)

import { memo, FC } from 'react'

import type { TArticle } from '@/spec'

import { upvoteArticle } from '@/signal'
// import { mockUsers } from '@/mock'
// import { addCollection } from '@/helper'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { SpaceGrow } from '@/widgets/Common'
import Upvote from '@/widgets/Upvote'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'

import {
  Wrapper,
  // CollectWrapper,
  // CollectIcon,
  // CollectText,
  BaseWrapper,
} from '../styles/post_viewer/article_info'

type TProps = {
  article: TArticle
}

const ArticleInfo: FC<TProps> = ({ article }) => {
  const { upvotesCount, viewerHasUpvoted, meta } = article

  return (
    <Wrapper>
      <BaseWrapper>
        <Upvote
          type={UPVOTE_LAYOUT.DEFAULT}
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          // count={10}
          // avatarList={mockUsers(5)}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteArticle(article, viewerHasUpvoted)}
        />
        <SpaceGrow />
        <ArticleBaseStats article={article} container="drawer" />
        {/* <Space right={18} />
        <CollectWrapper onClick={() => addCollection()}>
          <CollectIcon />
          <CollectText>收藏</CollectText>
        </CollectWrapper> */}
      </BaseWrapper>
    </Wrapper>
  )
}

export default memo(ArticleInfo)

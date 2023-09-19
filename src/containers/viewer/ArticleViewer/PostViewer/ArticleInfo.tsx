import { memo, FC } from 'react'

import type { TArticle } from '@/spec'

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
import { handleUpvote } from '../logic'

type TProps = {
  article: TArticle
}

const ArticleInfo: FC<TProps> = ({ article }) => {
  const { upvotesCount, viewerHasUpvoted, meta } = article

  return (
    <Wrapper>
      <BaseWrapper>
        <Upvote
          count={upvotesCount}
          type={UPVOTE_LAYOUT.DEFAULT}
          avatarList={meta.latestUpvotedUsers}
          // avatarList={mockUsers(5)}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => handleUpvote(article, viewerHasUpvoted)}
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

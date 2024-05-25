import { FC } from 'react'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/const/layout'

import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import {
  Extra,
  UpvotesWrapper,
  BasicState,
  BodyDigest,
} from '../../styles/quora_layout/mobile_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <>
      <BodyDigest>{article.digest}</BodyDigest>
      <Extra>
        <UpvotesWrapper>
          <Upvote
            count={upvotesCount}
            avatarList={meta.latestUpvotedUsers}
            viewerHasUpvoted={viewerHasUpvoted}
            type={UPVOTE_LAYOUT.GENERAL}
            left={-3}
            right={10}
          />
        </UpvotesWrapper>

        {article.cat && (
          <ArticleCatState cat={article.cat} state={article.state} top={1} left={4} right={14} />
        )}
        <BasicState>
          <TagsList items={article.articleTags} />
          {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} top={-1} />}
        </BasicState>
      </Extra>
    </>
  )
}

export default Footer

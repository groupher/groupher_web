import { FC } from 'react'

import type { TPost } from '@/spec'
import { ARTICLE_CAT } from '@/constant/gtd'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { cutRest } from '@/utils/fmt'

import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import {
  Wrapper,
  Extra,
  UpvotesWrapper,
  BasicState,
  BodyDigest,
} from '../../styles/upvote_fist_layout/mobile_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper>
      <BodyDigest>{cutRest(article.digest, 20)}</BodyDigest>
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

        {article.category !== ARTICLE_CAT.ALL && (
          <ArticleCatState cat={article.category} state={article.state} top={2} left={5} />
        )}
        <BasicState>
          <Space right={18} />
          <TagsList items={article.articleTags} />
          <Space right={18} />
          {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} />}
        </BasicState>
      </Extra>
    </Wrapper>
  )
}

export default Footer

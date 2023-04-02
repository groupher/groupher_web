import { FC } from 'react'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'
import { ARTICLE_CAT } from '@/constant/gtd'

import { cutRest } from '@/utils/fmt'

import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'

import {
  Wrapper,
  Extra,
  UpvotesWrapper,
  BasicState,
  BodyDigest,
  CommentIcon,
} from '../../styles/cover_layout/mobile_view/footer'

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
            left={-6}
            right={5}
          />
        </UpvotesWrapper>

        {article.cat !== ARTICLE_CAT.ALL && (
          <ArticleCatState cat={article.cat} state={article.state} />
        )}
        <BasicState>
          <Space right={18} />
          <CommentIcon />
          <div>{article.commentsCount}</div>
        </BasicState>
      </Extra>
    </Wrapper>
  )
}

export default Footer

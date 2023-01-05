/*
 *
 * PostItem
 *
 */

import { FC, memo, Fragment } from 'react'

import type { TCommunity, TPost, TAccount, TC11N, TPostLayout } from '@/spec'
import { POST_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'

import CommentFirstLayout from './CommentFirstLayout'
import UpvoteFirstLayout from './UpvoteFirstLayout'
import MinimalLayout from './MinimalLayout'
import CoverLayout from './CoverLayout'
import CardLayout from './CardLayout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

type TProps = {
  curCommunity: TCommunity | null
  article: TPost
  c11n: TC11N
  layout?: TPostLayout
  isMobilePreview?: boolean

  onAuthorSelect?: (obj: TAccount) => void
}

const PostItem: FC<TProps> = ({
  curCommunity,
  article,
  onAuthorSelect = log,
  layout = POST_LAYOUT.UPVOTE_FIRST,
  isMobilePreview = false,
  c11n,
}) => {
  return (
    <Fragment>
      {layout === POST_LAYOUT.MINIMAL && (
        <MinimalLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}

      {layout === POST_LAYOUT.UPVOTE_FIRST && (
        <UpvoteFirstLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}

      {layout === POST_LAYOUT.COMMENT_FIRST && (
        <CommentFirstLayout
          c11n={c11n}
          article={article}
          curCommunity={curCommunity}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}

      {layout === POST_LAYOUT.COVER && (
        <CoverLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}
      {layout === POST_LAYOUT.CARD && <CardLayout article={article} />}
    </Fragment>
  )
}

export default memo(PostItem)

import type { FC } from 'react'

import type { TComment } from '~/spec'
import useCommunity from '~/stores/community/hooks'
import ReviewNotice from '~/unit/AlertBoard/ReviewNotice'

import type { TAPIMode } from '../../spec'
import DefaultLayout from './DefaultLayout'
import FoldLayout from './FoldLayout'

type TProps = {
  data: TComment
  apiMode: TAPIMode
  hasReplies?: boolean
  isFolded: boolean
  showInnerRef?: boolean
  preview?: boolean
  isReply?: boolean
}

const Comment: FC<TProps> = (props) => {
  const { data, isFolded } = props
  const { slug: community } = useCommunity()
  const article = data.article
  const reviewTarget =
    article?.innerId && article.thread
      ? {
          kind: 'COMMENT' as const,
          comment: {
            article: { community, thread: article.thread, innerId: article.innerId },
            innerId: data.innerId,
          },
        }
      : null

  return (
    <>
      {reviewTarget && <ReviewNotice target={reviewTarget} />}
      {isFolded ? <FoldLayout {...props} /> : <DefaultLayout {...props} />}
    </>
  )
}

export default Comment

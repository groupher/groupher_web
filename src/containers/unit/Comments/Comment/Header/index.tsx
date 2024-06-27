import { type FC, memo } from 'react'

import type { TComment } from '~/spec'

import ArticleHeader from './Article'
import UserPublishedHeader from './UserPublished'

import type { TAPIMode } from '../../spec'
import { API_MODE } from '../../constant'

import { Wrapper } from '../../styles/comment/header'

type TProps = {
  data: TComment
  apiMode?: TAPIMode
  showInnerRef: boolean
  isReply?: boolean
}

const CommentHeader: FC<TProps> = ({ data, showInnerRef, apiMode = API_MODE.ARTICLE, isReply }) => {
  return (
    <Wrapper>
      {apiMode === API_MODE.USER_PUBLISHED ? (
        <UserPublishedHeader data={data} />
      ) : (
        <ArticleHeader data={data} showInnerRef={showInnerRef} isReply={isReply} />
      )}
    </Wrapper>
  )
}

export default memo(CommentHeader)

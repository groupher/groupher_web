import { FC, memo } from 'react'

import type { TAvatarLayout, TComment } from '@/spec'

import ArticleHeader from './Article'
import UserPublishedHeader from './UserPublished'

import type { TAPIMode } from '../../spec'
import { API_MODE } from '../../constant'

import { Wrapper } from '../../styles/comment/header'

type TProps = {
  data: TComment
  apiMode?: TAPIMode
  showInnerRef: boolean
  avatarLayout: TAvatarLayout
}

const CommentHeader: FC<TProps> = ({
  data,
  showInnerRef,
  apiMode = API_MODE.ARTICLE,
  avatarLayout,
}) => {
  return (
    <Wrapper>
      {apiMode === API_MODE.USER_PUBLISHED ? (
        <UserPublishedHeader data={data} />
      ) : (
        <ArticleHeader data={data} showInnerRef={showInnerRef} avatarLayout={avatarLayout} />
      )}
    </Wrapper>
  )
}

export default memo(CommentHeader)

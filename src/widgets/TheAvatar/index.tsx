/*
 *
 * TheAvatar
 *
 */

import { type FC, memo } from 'react'

import type { TAccount, TUser } from '~/spec'

import PostItemAvatar from './PostItemAvatar'
import ArticleAuthorAvatar from './ArticleAuthorAvatar'
import { TYPE } from './constant'
import type { TMetric } from './spec'

import { Wrapper } from './styles'

type TProps = {
  testid?: string
  metric?: TMetric
  user: TUser | TAccount
  onSelect?: (user: TUser | TAccount) => void
}

const TheAvatar: FC<TProps> = ({
  testid = 'the-avatar',
  user,
  metric = TYPE.POST_ITEM,
  onSelect = console.log,
}) => {
  switch (metric) {
    case TYPE.POST_ITEM: {
      return <PostItemAvatar user={user} onSelect={onSelect} />
    }
    case TYPE.ARTICLE_AUTHOR: {
      return <ArticleAuthorAvatar user={user} onSelect={onSelect} />
    }
    default: {
      return (
        <Wrapper $testid={testid}>
          <div>?</div>
        </Wrapper>
      )
    }
  }
}

export default memo(TheAvatar)

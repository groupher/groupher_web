import { FC, memo } from 'react'

import type { TArticle, TAvatarLayout } from '@/spec'

import { Br } from '@/widgets/Common'
import { Wrapper, Title } from '../../styles/panel/members'

import UserList from './UserList'

type TProps = {
  avatarLayout: TAvatarLayout
  article: TArticle
}

const Members: FC<TProps> = ({ avatarLayout, article }) => {
  return (
    <Wrapper>
      <Title>赞同 ({article.upvotesCount})</Title>
      <UserList avatarLayout={avatarLayout} users={article.meta.latestUpvotedUsers} />
      <Br bottom={20} />
      <Title>参与评论 ({article.commentsParticipantsCount})</Title>
      <UserList avatarLayout={avatarLayout} users={article.commentsParticipants} />
    </Wrapper>
  )
}

export default memo(Members)

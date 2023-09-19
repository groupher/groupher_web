import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import { Br } from '@/widgets/Common'
import { Wrapper, Title } from '../../styles/panel/members'

import UserList from './UserList'

type TProps = {
  article: TArticle
}

const Members: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Title>赞同 ({article.upvotesCount})</Title>
      <UserList users={article.meta.latestUpvotedUsers} />
      <Br bottom={20} />
      <Title>参与评论 ({article.commentsParticipantsCount})</Title>
      <UserList users={article.commentsParticipants} />
    </Wrapper>
  )
}

export default memo(Members)

import { type FC, memo } from 'react'

import useViewingArticle from '@/hooks/useViewingArticle'
import { Br } from '@/widgets/Common'

import UserList from './UserList'

import { Wrapper, Title } from '../../styles/panel/members'

const Members: FC = () => {
  const { article } = useViewingArticle()
  const { meta, upvotesCount, commentsParticipantsCount, commentsParticipants } = article

  return (
    <Wrapper>
      <Title>赞同 ({upvotesCount})</Title>
      <UserList users={meta.latestUpvotedUsers} />
      <Br bottom={20} />
      <Title>参与评论 ({commentsParticipantsCount})</Title>
      <UserList users={commentsParticipants} />
    </Wrapper>
  )
}

export default memo(Members)

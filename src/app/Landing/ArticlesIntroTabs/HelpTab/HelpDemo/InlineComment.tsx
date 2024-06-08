import type { FC } from 'react'

import { mockUsers } from '@/mock'

import {
  Wrapper,
  User,
  Avatar,
  Nickname,
  Comment,
} from '../../../styles/articles_intro_tabs/help_tab/help_demo/inline_comment'

const InlineComment: FC = () => {
  const user = mockUsers(1)

  return (
    <Wrapper>
      <User>
        <Avatar src={user[0].avatar} />
        <Nickname>{user[0].nickname}</Nickname>
      </User>
      <Comment>可以在行内评论里支持富文本内容吗？</Comment>
    </Wrapper>
  )
}

export default InlineComment

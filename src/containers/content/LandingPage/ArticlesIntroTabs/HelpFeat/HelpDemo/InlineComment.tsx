import { FC } from 'react'

import { mockUsers } from '@/mock'

import {
  Wrapper,
  User,
  Avatar,
  Nickname,
  Comment,
} from '../../../styles/articles_intro_tabs/help_feat/help_demo/inline_comment'

const InlineComment: FC = () => {
  const user = mockUsers(1)

  return (
    <Wrapper>
      <User>
        <Avatar src={user[0].avatar} />
        <Nickname>{user[0].nickname}</Nickname>
      </User>
      <Comment>希望能在标题支持 Emoji 或者自定义图片</Comment>
    </Wrapper>
  )
}

export default InlineComment

import { FC } from 'react'

import { mockUsers } from '@/utils/mock'
import { Wrapper, Avatar, Name } from '../styles/preview_layout/author'

const Author: FC = () => {
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Avatar src={user.avatar} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default Author

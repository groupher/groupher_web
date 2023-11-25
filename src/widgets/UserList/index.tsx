import { FC } from 'react'

import { mockUsers } from '@/mock'

import UserItem from './UserItem'
import { Wrapper } from './styles'

const UserList: FC = () => {
  const users = mockUsers(10)

  return (
    <Wrapper>
      {users.map((user) => (
        <UserItem key={user.login} user={user} />
      ))}
    </Wrapper>
  )
}

export default UserList

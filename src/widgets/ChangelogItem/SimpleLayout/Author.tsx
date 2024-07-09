import useLayout from '~/hooks/useLayout'
import { mockUsers } from '~/mock'

import { Wrapper, Avatar, Name } from '../styles/simple_layout/author'

export default () => {
  const { avatarLayout } = useLayout()
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Avatar src={user.avatar} $avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

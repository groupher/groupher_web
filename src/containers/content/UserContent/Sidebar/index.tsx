import { FC, memo } from 'react'

import type { TUser, TPagedCommunities } from '@/spec'
import UserBrief from '@/widgets/UserBrief'
import { Wrapper } from '../styles/sidebar'

type TProps = {
  user: TUser
  editableCommunities: TPagedCommunities
}

const Sidebar: FC<TProps> = ({ user, editableCommunities }) => {
  return (
    <Wrapper>
      <UserBrief user={user} editableCommunities={editableCommunities} />
    </Wrapper>
  )
}

export default memo(Sidebar)

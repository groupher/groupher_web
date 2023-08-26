import { FC, memo } from 'react'

import type { TModerator } from '@/spec'

import { sortByIndex } from '@/utils/helper'

import { SpaceGrow } from '@/widgets/Common'
import DropdownButton from '@/widgets/Buttons/DropdownButton'
import AdminAvatar from '@/widgets/AdminAvatar'

import { Wrapper, User, Intro, Title, Name, Login, Bio, RootSign } from '../styles/admin/list'

type TProps = {
  moderators: TModerator[]
}

const List: FC<TProps> = ({ moderators }) => {
  return (
    <Wrapper>
      {/* @ts-ignore */}
      {sortByIndex(moderators, 'passportItemCount').map((item: TModerator) => (
        <User key={item.user.login}>
          <AdminAvatar user={item.user} right={14} top={5} />
          <Intro>
            <Title>
              <Name>{item.user.nickname}</Name>
              <Login>@{item.user.login}</Login>
              {item.role === 'root' && <RootSign>ROOT</RootSign>}
              <SpaceGrow />
              <DropdownButton top={2}>{item.passportItemCount} 项权限</DropdownButton>
            </Title>
            <Bio>{item.user.bio}</Bio>
          </Intro>
        </User>
      ))}
    </Wrapper>
  )
}

export default memo(List)

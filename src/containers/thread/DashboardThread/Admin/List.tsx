import { FC, memo } from 'react'

import type { TModerator, TUser } from '@/spec'

import { sortByIndex } from '@/utils/helper'
import { callPassportEditor } from '@/utils/signal'

import { SpaceGrow } from '@/widgets/Common'
import DropdownButton from '@/widgets/Buttons/DropdownButton'
import AdminAvatar from '@/widgets/AdminAvatar'

import {
  Wrapper,
  User,
  SettingIcon,
  Intro,
  Title,
  Name,
  Login,
  Bio,
  RootSign,
} from '../styles/admin/list'
import { setActiveSettingAdmin } from '../logic'

type TProps = {
  moderators: TModerator[]
  activeModerator: TUser | null
}

const List: FC<TProps> = ({ moderators, activeModerator }) => {
  return (
    <Wrapper>
      {/* @ts-ignore */}
      {sortByIndex(moderators, 'passportItemCount').map((item: TModerator) => {
        const { user, passportItemCount, role } = item
        const active = user.login === activeModerator?.login

        return (
          <User key={user.login} $active={active} $noActive={activeModerator === null}>
            {active && <SettingIcon />}

            <AdminAvatar user={user} right={14} top={5} />
            <Intro>
              <Title>
                <Name>{user.nickname}</Name>
                <Login>@{user.login}</Login>
                {role === 'root' && <RootSign>ROOT</RootSign>}
                <SpaceGrow />
                <DropdownButton
                  top={2}
                  onClick={() => {
                    setActiveSettingAdmin(user)
                    callPassportEditor()
                  }}
                >
                  {passportItemCount} 项权限
                </DropdownButton>
              </Title>
              <Bio>{user.bio}</Bio>
            </Intro>
          </User>
        )
      })}
    </Wrapper>
  )
}

export default memo(List)

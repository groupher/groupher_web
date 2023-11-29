import { FC, memo } from 'react'

import type { TModerator, TUser } from '@/spec'

import { callPassportEditor } from '@/signal'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { SpaceGrow } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'
import AdminAvatar from '@/widgets/AdminAvatar'

import {
  Wrapper,
  User,
  SettingIcon,
  Intro,
  Header,
  Name,
  Login,
  Bio,
  RootSign,
  AllPassportText,
  ArrowIcon,
} from '../styles/admin/list'
import { setActiveSettingAdmin } from '../logic'

type TProps = {
  moderators: TModerator[]
  activeModerator: TUser | null
}

const List: FC<TProps> = ({ moderators, activeModerator }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      {moderators.map((item) => {
        const { user, passportItemCount, role } = item
        const active = user.login === activeModerator?.login

        return (
          <User key={user.login} $active={active} $noActive={activeModerator === null}>
            {active && <SettingIcon />}

            <AdminAvatar user={user} right={16} top={5} />
            <Intro>
              <Header>
                <Name>{user.nickname}</Name>
                <Login>@{user.login}</Login>
                {role === 'root' && <RootSign $color={primaryColor}>ROOT</RootSign>}
                <SpaceGrow />
                <Button
                  top={1}
                  onClick={() => {
                    setActiveSettingAdmin(user)
                    callPassportEditor()
                  }}
                  ghost
                  noBorder
                  size="small"
                >
                  {role === 'root' ? (
                    <AllPassportText $color={primaryColor}>全部权限</AllPassportText>
                  ) : (
                    <>{passportItemCount} 项权限</>
                  )}
                  <ArrowIcon $color={primaryColor} $isRoot={role === 'root'} />
                </Button>
              </Header>
              <Bio>{user.bio}</Bio>
            </Intro>
          </User>
        )
      })}
    </Wrapper>
  )
}

export default memo(List)

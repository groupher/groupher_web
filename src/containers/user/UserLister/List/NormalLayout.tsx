import { FC, memo } from 'react'

import type { TUser } from '@/spec'

import useAccount from '@/hooks/useAccount'
import { cutRest } from '@/utils/fmt'
import FollowButton from '@/widgets/Buttons/FollowButton'

import {
  Wrapper,
  UserWrapper,
  UserAvatar,
  UserBrief,
  Title,
  Nickname,
  Location,
  City,
  CityIcon,
  Action,
} from '../styles/list/normal_layout'
import { onFollow, undoFollow } from '../logic'

type TProps = {
  users: TUser[]
}

const NormalLayout: FC<TProps> = ({ users }) => {
  const accountInfo = useAccount()

  return (
    <Wrapper>
      {users.map((user) => (
        <UserWrapper key={user.login}>
          <UserAvatar src={user.avatar} />
          <UserBrief>
            <Title>
              <Nickname href={`/u/${user.login}`} prefetch={false}>
                {cutRest(user.nickname, 15)}
              </Nickname>
              <Location>
                <CityIcon />
                <City>{user.location || user.geoCity || '--'}</City>
              </Location>
            </Title>
            <Action>
              {!!accountInfo && accountInfo.login === user.login ? (
                <div>(本尊)</div>
              ) : (
                <FollowButton
                  size="tiny"
                  hasFollowed={user.viewerHasFollowed}
                  userLogin={user.login}
                  onFollow={onFollow}
                  onUndoFollow={undoFollow}
                />
              )}
            </Action>
          </UserBrief>
        </UserWrapper>
      ))}
    </Wrapper>
  )
}

export default memo(NormalLayout)

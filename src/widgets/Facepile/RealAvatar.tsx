import { FC } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import UserCard from '@/widgets/Cards/UserCard'

import { getAvatarSize } from './styles/metric'
import type { TAvatarSize } from './spec'

import { Wrapper, InnerWrapper, AvatarsImg, AvatarFallback } from './styles/real_avatar'

type TProps = {
  user?: TUser
  size?: TAvatarSize
  noLazyLoad: boolean
  popCardPlacement?: 'top' | 'bottom'
  onUserSelect: (user: TUser) => void
  avatarLayout?: TAvatarLayout
}

const RealAvatar: FC<TProps> = ({
  user,
  size,
  noLazyLoad,
  onUserSelect,
  popCardPlacement,
  avatarLayout,
}) => {
  return (
    <Wrapper size={size}>
      <Tooltip
        content={<UserCard user={user} avatarLayout={avatarLayout} />}
        delay={0}
        contentHeight={getAvatarSize(size, 'number') as string}
        placement={popCardPlacement}
        interactive={false}
      >
        <InnerWrapper>
          <AvatarsImg
            src={user.avatar}
            size={size}
            onClick={() => onUserSelect(user)}
            scrollPosition={null}
            noLazy={noLazyLoad}
            avatarLayout={avatarLayout}
            fallback={
              <AvatarFallback
                size={getAvatarSize(size, 'number') as number}
                user={user}
                avatarLayout={avatarLayout}
              />
            }
          />
        </InnerWrapper>
      </Tooltip>
    </Wrapper>
  )
}

export default RealAvatar

/*
 *
 * Facepile
 *
 */

import { type FC, Suspense, lazy } from 'react'
import { compose, not, isNil, filter, reverse as reverseFn, slice } from 'ramda'

import type { TUser, TSpace } from '@/spec'
import { AVATARS_LIST_LENGTH } from '@/config'

import SIZE from '@/const/size'

import { buildLog } from '@/logger'

import type { TAvatarSize } from './spec'
import MoreItem from './MoreItem'

import { getAvatarSize } from './styles/metric'
import { Wrapper, AvatarsWrapper, TotalOneOffset, AvatarFallback } from './styles'

const log = buildLog('w:Facepile:index')

const RealAvatar = lazy(() => import('./RealAvatar'))

// export const RealAvatar = dynamic(() => import('./RealAvatar'), {
//   /* eslint-disable react/display-name */
//   loading: () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { size, user } = useContext(RealAvatarContext) as {
//       user: TUser
//       size: TSize
//     }

//     return <AvatarFallback size={getAvatarSize(size, 'number') as number} user={user} />
//   },
//   ssr: false,
// })

const validUser = compose(not, isNil)

const getUniqueArray = (arr, comp) => {
  const unique = arr
    .map((e) => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e])

  return unique
}

export type TProps = {
  users?: TUser[]
  size?: TAvatarSize
  total?: number | null
  limit?: number
  showMore?: boolean
  reverse?: boolean
  popCardPlacement?: 'top' | 'bottom'
  noLazyLoad?: boolean

  onUserSelect?: (user: TUser) => void
  onTotalSelect?: () => void
} & TSpace

const Facepile: FC<TProps> = ({
  size = SIZE.SMALL,
  total = null,
  users = [],
  limit = AVATARS_LIST_LENGTH.POSTS,
  noLazyLoad = false,
  onUserSelect = log,
  onTotalSelect = log,
  showMore = true,
  reverse = false,
  popCardPlacement = 'bottom',
  ...restProps
}) => {
  if (users.length === 0) {
    return <span />
  }

  const totalCount = total || users.length

  users = filter(validUser, getUniqueArray(users, 'login'))
  const sortedUsers = reverse ? reverseFn(users) : users

  // delete restProps?.forwardRef

  return (
    <Wrapper $total={totalCount} {...restProps}>
      {totalCount <= 1 || !showMore ? (
        <TotalOneOffset />
      ) : (
        <MoreItem size={size} onTotalSelect={onTotalSelect} />
      )}
      {totalCount === 1 ? (
        <Suspense
          fallback={
            <AvatarFallback size={getAvatarSize(size, 'number') as number} user={sortedUsers[0]} />
          }
        >
          <RealAvatar
            user={sortedUsers[0]}
            size={size}
            noLazyLoad={noLazyLoad}
            onUserSelect={onUserSelect}
            popCardPlacement={popCardPlacement}
          />
        </Suspense>
      ) : (
        <AvatarsWrapper>
          {slice(0, limit, sortedUsers).map((user) => (
            <Suspense
              key={user.login}
              fallback={
                <AvatarFallback size={getAvatarSize(size, 'number') as number} user={user} />
              }
            >
              <RealAvatar
                user={user}
                size={size}
                noLazyLoad={noLazyLoad}
                onUserSelect={onUserSelect}
                popCardPlacement={popCardPlacement}
              />
            </Suspense>
          ))}
        </AvatarsWrapper>
      )}
    </Wrapper>
  )
}

export default Facepile

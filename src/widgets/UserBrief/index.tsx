/*
 *
 * UserBrief
 *
 */
import { FC, memo, Fragment } from 'react'

import type { TUser, TPagedCommunities } from '@/spec'
import EVENT from '@/constant/event'
import TYPE from '@/constant/type'

import { buildLog } from '@/utils/logger'
import { send } from '@/utils/signal'
import { Br } from '@/widgets/Common'

import ExtraInfo from './ExtraInfo'
import Operators from './Operators'
import VolunteersBadge from './VolunteersBadge'
import Footer from './Footer'
import Avatar from './Avatar'

import { Wrapper, UserTitle, WomanIcon, ShortBio, Bio, Divider } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:UserBrief')

type TProps = {
  user: TUser
  editableCommunities: TPagedCommunities
}

const UserBrief: FC<TProps> = ({ user, editableCommunities }) => {
  return (
    <Wrapper>
      <Avatar user={user} />
      <Br top={35} />
      <UserTitle>
        <div>{user.nickname}</div>
        {user.sex === 'girl' && <WomanIcon />}
        <Operators
          passport="owner"
          ownerId={user.id}
          onEdit={() => {
            send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.ACCOUNT_EDIT })
          }}
        />
      </UserTitle>
      <ShortBio>{user.shortbio}</ShortBio>
      <Br top={15} />
      <Bio>{user.bio}</Bio>
      <Divider top={25} />
      <ExtraInfo user={user} />

      <Divider bottom={30} />
      {editableCommunities.totalCount > 0 && (
        <Fragment>
          <VolunteersBadge communities={editableCommunities} />
          <Divider bottom={30} />
        </Fragment>
      )}
      <Footer user={user} />
    </Wrapper>
  )
}

export default memo(UserBrief)

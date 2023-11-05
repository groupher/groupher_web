//

/*
 *
 * UserProfile
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import NumbersPad from './NumbersPad'
import ContributeMap from './ContributeMap'
import Activities from './Activities'

import { useStore } from './store'
import { Wrapper, ContributesWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:UserProfile')

const UserProfile: FC = () => {
  const store = useStore()
  useInit(store)

  const { viewingUser, pagedSubscribedCommunitiesData, activities, hasFollowedUser } = store

  return (
    <Wrapper testid="user-profile">
      <NumbersPad
        user={viewingUser}
        subscribedCommunities={pagedSubscribedCommunitiesData}
        hasFollowedUser={hasFollowedUser}
      />
      <ContributesWrapper>
        <ContributeMap user={viewingUser} />
      </ContributesWrapper>

      <Activities items={activities} />
    </Wrapper>
  )
}

export default observer(UserProfile)

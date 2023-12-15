import { FC, memo } from 'react'

import type { TPagedCommunities } from '@/spec'

import { Wrapper, Title, List } from './styles/volunteers_badge'

type TProps = {
  communities: TPagedCommunities
}

const VolunteersBadge: FC<TProps> = ({ communities }) => {
  return (
    <Wrapper>
      <Title>社区志愿者</Title>
    </Wrapper>
  )
}

export default memo(VolunteersBadge)

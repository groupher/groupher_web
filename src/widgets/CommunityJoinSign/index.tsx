/*
 * CommunityJoinSign
 */

import { type FC, memo } from 'react'

import { Wrapper } from './styles'

type TProps = {
  hasFollowed?: boolean
  onFollow?: () => void
  onUndoFollow?: () => void
}

const CommunityJoinSign: FC<TProps> = ({ hasFollowed = false }) => {
  return <Wrapper hasFollowed={hasFollowed}>TODO</Wrapper>
}

export default memo(CommunityJoinSign)

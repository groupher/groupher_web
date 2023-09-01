import { FC, memo } from 'react'

import type { TCommunity } from '@/spec'

// import CommunityJoinSign from '@/widgets/CommunityJoinSign'

import {
  Wrapper,
  Logo,
  CommunityInfo,
  TitleWrapper,
  Title,
  TitleText,
} from '../styles/simple_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

type TProps = {
  community: TCommunity
}

const CommunityBrief: FC<TProps> = ({ community }) => {
  return (
    <Wrapper>
      <Logo src={community.logo} noLazy />
      <CommunityInfo>
        <TitleWrapper>
          <Title>
            <TitleText>{community.title}</TitleText>
          </Title>
        </TitleWrapper>
      </CommunityInfo>
    </Wrapper>
  )
}

export default memo(CommunityBrief)

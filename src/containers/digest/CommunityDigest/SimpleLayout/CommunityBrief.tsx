import { FC, memo } from 'react'

import type { TCommunity } from '@/spec'

// import CommunityJoinSign from '@/widgets/CommunityJoinSign'

import {
  Wrapper,
  Logo,
  LogoWrapper,
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
      <LogoWrapper>
        <Logo src={community.logo} noLazy />
      </LogoWrapper>
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

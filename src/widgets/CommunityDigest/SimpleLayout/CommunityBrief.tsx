import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'

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
  //
}

const CommunityBrief: FC<TProps> = () => {
  const community = useViewingCommunity()

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

export default observer(CommunityBrief)

import { FC } from 'react'
import { observer } from 'mobx-react'

import { assetSrc } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'

// import CommunityJoinSign from '@/widgets/CommunityJoinSign'

import {
  Wrapper,
  Logo,
  CommunityInfo,
  TitleWrapper,
  Title,
  TitleText,
} from '../styles/header_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

const CommunityBrief: FC = () => {
  const community = useViewingCommunity()

  return (
    <Wrapper>
      <Logo src={assetSrc(community.logo)} noLazy />
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

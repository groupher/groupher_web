import { FC, memo } from 'react'
import { contains } from 'ramda'

import type { TCommunity } from '@/spec'
import { NON_FILL_COMMUNITY } from '@/constant/name'

import {
  Wrapper,
  Logo,
  LogoWrapper,
  CommunityInfo,
  Title,
  Desc,
} from '../styles/classic_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

type TProps = {
  community: TCommunity
}

const CommunityBrief: FC<TProps> = ({ community }) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo
          noFill={contains(community.raw, NON_FILL_COMMUNITY)}
          src={community.logo}
          raw={community.raw}
        />
      </LogoWrapper>
      <CommunityInfo>
        <Title>
          Groupher
          {/* <TitleText>{community.title}</TitleText> */}
        </Title>
        <Desc>让你的产品聆听用户的声音</Desc>
      </CommunityInfo>
    </Wrapper>
  )
}

export default memo(CommunityBrief)

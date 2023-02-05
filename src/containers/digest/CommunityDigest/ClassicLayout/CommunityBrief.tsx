import { FC, memo } from 'react'
import { contains } from 'ramda'

import type { TCommunity } from '@/spec'
import { DEME_SOCIALS } from '@/constant/social'
import { NON_FILL_COMMUNITY } from '@/constant/name'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  CoverImage,
  SocialWrapper,
  Logo,
  LogoWrapper,
  MainWrapper,
  CommunityInfo,
  Title,
  Digest,
  BackHome,
  ArrowIcon,
  Divider,
  Desc,
} from '../styles/classic_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

type TProps = {
  community: TCommunity
}

const CommunityBrief: FC<TProps> = ({ community }) => {
  console.log('## community: ', community)

  return (
    <Wrapper>
      <CoverImage src="/banner-cover.webp" noLazy />
      <MainWrapper>
        <LogoWrapper>
          <Logo src={community.logo} />
        </LogoWrapper>
        <CommunityInfo>
          <Title>
            Groupher
            {/* <TitleText>{community.title}</TitleText> */}
          </Title>
          <Digest>
            <BackHome href="/">
              <ArrowIcon />
              官网
            </BackHome>
            <Divider />
            <Desc>让你的产品聆听用户的声音</Desc>
          </Digest>
        </CommunityInfo>
        <SocialWrapper>
          <SocialList top={0} size="small" selected={DEME_SOCIALS} />
        </SocialWrapper>
      </MainWrapper>
    </Wrapper>
  )
}

export default memo(CommunityBrief)

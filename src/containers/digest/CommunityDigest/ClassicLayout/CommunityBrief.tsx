import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { DEME_SOCIALS } from '@/constant/social'

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
  //
}

const CommunityBrief: FC<TProps> = () => {
  const community = useViewingCommunity()

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

export default observer(CommunityBrief)

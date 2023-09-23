import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { DEME_SOCIALS } from '@/constant/social'
import useMetric from '@/hooks/useMetric'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  CoverImage,
  SocialWrapper,
  InnerWrapper,
  Logo,
  LogoWrapper,
  MainWrapper,
  CommunityInfo,
  Title,
  Digest,
  Desc,
} from '../styles/classic_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

type TProps = {
  //
}

const CommunityBrief: FC<TProps> = () => {
  const community = useViewingCommunity()
  const metric = useMetric()

  return (
    <Wrapper>
      <CoverImage src="/banner-cover.webp" noLazy />
      <MainWrapper metric={metric}>
        <InnerWrapper>
          <LogoWrapper>
            <Logo src={community.logo} />
          </LogoWrapper>
          <CommunityInfo>
            <Title>
              Groupher
              {/* <TitleText>{community.title}</TitleText> */}
            </Title>
            <Digest>
              <Desc>让你的产品聆听用户的声音</Desc>
            </Digest>
          </CommunityInfo>
          <SocialWrapper>
            <SocialList top={0} size="small" selected={DEME_SOCIALS} />
          </SocialWrapper>
        </InnerWrapper>
      </MainWrapper>
    </Wrapper>
  )
}

export default observer(CommunityBrief)

import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { DEME_SOCIALS } from '@/constant/social'
import useMetric from '@/hooks/useMetric'

import SocialList from '@/widgets/SocialList'
import AccountUnit from '@/widgets/AccountUnit'

import {
  Wrapper,
  CoverHolder,
  CoverImage,
  SocialWrapper,
  InnerWrapper,
  Logo,
  LogoWrapper,
  AccountWrapper,
  MainWrapper,
  CommunityInfo,
  Title,
  Digest,
} from '../styles/tabber_layout/community_brief'

const CommunityBrief: FC = () => {
  const { logo, title, desc } = useViewingCommunity()
  const metric = useMetric()

  const COVER_IMAGE = '' // '/banner-cover.webp'

  return (
    <Wrapper>
      <AccountWrapper metric={metric}>
        <AccountUnit />
      </AccountWrapper>
      {COVER_IMAGE ? <CoverImage src={COVER_IMAGE} noLazy /> : <CoverHolder />}
      <MainWrapper metric={metric}>
        <InnerWrapper>
          <LogoWrapper>
            <Logo src={logo} />
          </LogoWrapper>
          <CommunityInfo>
            <Title>{title}</Title>
            <Digest>{desc}</Digest>
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

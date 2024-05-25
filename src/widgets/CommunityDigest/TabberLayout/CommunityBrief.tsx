import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { assetSrc } from '@/helper'
import { DEME_SOCIALS } from '@/const/social'
import { BRAND_LAYOUT } from '@/const/layout'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import useBrandLayout from '@/hooks/useBrandLayout'
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
  const brandLayout = useBrandLayout()
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
          {brandLayout !== BRAND_LAYOUT.TEXT && (
            <LogoWrapper>
              <Logo src={assetSrc(logo)} />
            </LogoWrapper>
          )}

          <CommunityInfo>
            {brandLayout !== BRAND_LAYOUT.LOGO && <Title>{title}</Title>}
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

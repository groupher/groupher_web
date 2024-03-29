import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { BANNER_LAYOUT, BRAND_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'
import { assetSrc } from '@/helper'
import { prettyURL } from '@/fmt'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import useViewingThread from '@/hooks/useViewingThread'
import useBannerLayout from '@/hooks/useBannerLayout'
import useBrandLayout from '@/hooks/useBrandLayout'

import ArrowLinker from '@/widgets/ArrowLinker'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Row } from '@/widgets/Common'

import {
  Wrapper,
  Logo,
  LogoWrapper,
  MainWrapper,
  CommunityInfo,
  Title,
  Digest,
  Desc,
  GlobalIcon,
} from '../styles/sidebar_layout/community_brief'
// import { subscribeCommunity, unsubscribeCommunity } from '../logic'

const CommunityBrief: FC = () => {
  const router = useRouter()
  const { logo, slug, title, desc, dashboard } = useViewingCommunity()
  const activeThread = useViewingThread()
  const bannerLayout = useBannerLayout()
  const brandLayout = useBrandLayout()

  const { baseInfo } = dashboard

  return (
    <Wrapper>
      <MainWrapper>
        {brandLayout !== BRAND_LAYOUT.TEXT && (
          <LogoWrapper>
            <Logo src={assetSrc(logo)} />
          </LogoWrapper>
        )}

        <CommunityInfo>
          {brandLayout !== BRAND_LAYOUT.LOGO && <Title>{title}</Title>}
          <Digest>
            <Desc>{desc}</Desc>
          </Digest>

          {bannerLayout === BANNER_LAYOUT.SIDEBAR && activeThread === THREAD.DOC && (
            <ArrowButton top={12} left={-2} leftLayout onClick={() => router.push(`/${slug}`)}>
              返回社区
            </ArrowButton>
          )}

          {bannerLayout !== BANNER_LAYOUT.SIDEBAR && baseInfo.homepage && (
            <ArrowLinker href={baseInfo.homepage} top={15} bold>
              <Row>
                <GlobalIcon />
                {prettyURL(baseInfo.homepage)}
              </Row>
            </ArrowLinker>
          )}
        </CommunityInfo>
        {/* <SocialWrapper>
          SOcial
        </SocialWrapper> */}
      </MainWrapper>
    </Wrapper>
  )
}

export default observer(CommunityBrief)

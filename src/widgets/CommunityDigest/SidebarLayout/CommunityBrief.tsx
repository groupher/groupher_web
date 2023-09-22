import { FC } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'

import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import useViewingThread from '@/hooks/useViewingThread'
import useBannerLayout from '@/hooks/useBannerLayout'
import { prettyURL } from '@/fmt'

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
  const { logo, slug, title, desc, dashboard } = useViewingCommunity()
  const activeThread = useViewingThread()
  const bannerLayout = useBannerLayout()

  const { baseInfo } = dashboard

  return (
    <Wrapper>
      <MainWrapper>
        <LogoWrapper>
          <Logo src={logo} slug={slug} />
        </LogoWrapper>
        <CommunityInfo>
          <Title>{title}</Title>
          <Digest>
            <Desc>{desc}</Desc>
          </Digest>

          {bannerLayout === BANNER_LAYOUT.SIDEBAR && activeThread === THREAD.DOC && (
            <ArrowButton top={12} left={-2} leftLayout onClick={() => Router.push(`/${slug}`)}>
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

import { FC } from 'react'
import { observer } from 'mobx-react'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { prettyURL } from '@/fmt'

import ArrowLinker from '@/widgets/ArrowLinker'
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
          {baseInfo.homepage && (
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

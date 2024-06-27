import type { FC } from 'react'

import { SpaceGrow } from '~/widgets/Common'
import {
  Wrapper,
  Url,
  Title,
  Desc,
  Hint,
  Footer,
  LogoWrapper,
  Logo,
  GLogo,
  BaiduLogo,
  XHSLogo,
} from '../../styles/dashboard_intros/seo_tab/web_card'

const WebCard: FC = () => {
  return (
    <Wrapper>
      <Url>https://motojie.com</Url>
      <Title>Motojie - (摩界)</Title>
      <Desc>
        发现复古摩托车的魅力。我们专注于提供全球最独特、最经典的复古摩托车信息。愿每一位对复古摩托车有热情的人...
      </Desc>

      <Footer>
        <LogoWrapper>
          <GLogo src="/landing/seo/google.png" $size={15} />
        </LogoWrapper>
        <BaiduLogo src="/landing/seo/baidu.png" $opacity={0.68} $size={20} top={-1} />
        <LogoWrapper>
          <Logo src="/landing/seo/ms.png" $size={16} />
        </LogoWrapper>
        <XHSLogo src="/landing/seo/duck.png" $size={18} />
        <SpaceGrow />
        <Hint>OpenGraph</Hint>
      </Footer>
    </Wrapper>
  )
}

export default WebCard

import { FC, memo } from 'react'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import HomeLogo from '@/widgets/HomeLogo'

import {
  Wrapper,
  SocialIcon,
  IconWrapper,
  ProviderLogo,
  Title,
  ProviderName,
  SideLogo,
  Desc,
  Footer,
  MaskCenter,
  MaskBottom,
  MaskTop,
} from './styles/loading'

type TProps = {
  provider: string | null
}

export const LoadingMask = () => {
  return (
    <>
      <MaskTop />
      <MaskCenter />
      <MaskBottom />
    </>
  )
}

const Loading: FC<TProps> = ({ provider }) => {
  const Icon = SocialIcon[provider || 'Github']

  return (
    <Wrapper>
      <IconWrapper>
        <ProviderLogo>
          <Icon />
        </ProviderLogo>
        <SideLogo>
          <HomeLogo size={20} />
        </SideLogo>
      </IconWrapper>
      <Title>
        Login with <ProviderName>{provider}</ProviderName>
      </Title>
      <Desc>完成后会自动跳转，请不要刷新页面</Desc>
      <Footer>
        <LavaLampLoading />
      </Footer>
    </Wrapper>
  )
}

export default memo(Loading)

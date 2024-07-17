/*
 *
 * OauthHinter
 *
 */

import Linker from '~/widgets/Linker'

import {
  Wrapper,
  HintWrapper,
  IconsWrapper,
  TextWrapper,
  HintTitle,
  HintDesc,
  HomeLogoIcon,
  LinkIcon,
  GithubLogoIcon,
  FooterWrapper,
} from './styles'

export default () => {
  return (
    <Wrapper>
      <HintWrapper>
        <IconsWrapper>
          <HomeLogoIcon />
          <LinkIcon />
          <GithubLogoIcon />
        </IconsWrapper>
        <TextWrapper>
          <HintTitle>绑定成功，请稍等</HintTitle>
          <HintDesc>如果长时间未响应，请关闭页面重新尝试</HintDesc>
        </TextWrapper>
      </HintWrapper>
      <FooterWrapper>
        please <Linker src="/feedback" external={false} text="feedback" inline left={4} right={4} />
        if you think sth goes wrong.
      </FooterWrapper>
    </Wrapper>
  )
}

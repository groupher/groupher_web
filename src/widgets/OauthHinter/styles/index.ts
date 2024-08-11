import styled, { css, theme, animate } from '~/css'

import Img from '~/Img'
import LinkSVG from '~/icons/Link'
import GithubSVG from '~/icons/GithubCat'

export const Wrapper = styled.div`
  ${css.column('align-both')};

  height: 100vh;
  border-top: 4px solid;
`
export const IconsWrapper = styled.div`
  ${css.row('justify-center')};
`
export const TextWrapper = styled.div`
  ${css.column('align-center')};
  margin-top: 15px;
`
export const HintTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 6px;
`
export const HintDesc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 4px;
`
// fill: ${theme('font')};
export const HomeLogoIcon = styled(Img)`
  ${css.size(48)};
`
export const LinkIcon = styled(LinkSVG)`
  fill: #6e967f;
  width: 23px;
  height: 23px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 16px;
  animation: ${animate.rotate360} 1s linear infinite;
`
export const GithubLogoIcon = styled(GithubSVG)`
  fill: ${theme('article.title')};
  ${css.size(50)};
`
export const HintWrapper = styled.div`
  ${css.column()};
  color: ${theme('article.title')};
`
export const FooterWrapper = styled.div`
  color: ${theme('article.digest')};
  margin-bottom: 10px;
`

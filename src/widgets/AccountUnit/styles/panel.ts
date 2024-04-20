import styled, { css, theme } from '@/css'

import GithubSVG from '@/icons/social/Github'
import GoogleSVG from '@/icons/social/Google'
import FacebookSVG from '@/icons/social/Facebook'
import TwitterSVG from '@/icons/social/Twitter'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 10px 20px;
  font-size: 13px;
`
export const Header = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-top: 10px;
  z-index: 1;
`
export const Body = styled.div`
  ${css.rowWrap()};
  gap: 12px 15px;
  margin-top: 30px;
  min-height: 120px;
  margin-bottom: 20px;
  z-index: 1;
`
export const SocialItem = styled.div`
  ${css.row('align-center')};
  height: 35px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${theme('divider')};

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const IconBox = styled.div`
  ${css.size(30)};
  ${css.row('align-both')};
  
`
export const Footer = styled.div`
  margin-top: 10px;
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(18)};
    margin-top: -2px;
  `
}

export const SocialIcon = {
  Google: styled(commonIcon(GoogleSVG))`
    ${css.size(16)};
  `,
  Facebook: commonIcon(FacebookSVG),
  Twitter: commonIcon(TwitterSVG),
  Github: commonIcon(GithubSVG),
}

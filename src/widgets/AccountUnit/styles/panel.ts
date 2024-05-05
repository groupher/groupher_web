import styled, { css, theme } from '@/css'

import GithubSVG from '@/icons/social/Github'
import GoogleSVG from '@/icons/social/Google'
import FacebookSVG from '@/icons/social/Facebook'
import TwitterSVG from '@/icons/social/Twitter'
import DiscordSVG from '@/icons/social/Discord'
import NotionSVG from '@/icons/social/Notion'
import LinkedInSVG from '@/icons/social/LinkedIn'
import TwitchSVG from '@/icons/social/Twitch'
import LineSVG from '@/icons/social/Line'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 10px 20px;
  font-size: 13px;
  min-height: 281px;
  position: relative;
`
export const Header = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-top: 10px;
  margin-left: 3px;
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
  color: ${theme('article.digest')};
  font-weight: 500;
  height: 35px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${theme('divider')};

  &:hover {
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const IconBox = styled.div`
  ${css.size(30)};
  ${css.row('align-both')};
`
export const Footer = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 18px;
  margin-left: 3px;
  font-size: 13px;
  color: ${theme('article.digest')};
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
  Discord: commonIcon(DiscordSVG),
  Notion: commonIcon(NotionSVG),
  Linkedin: commonIcon(LinkedInSVG),
  Line: styled(commonIcon(LineSVG))`
    margin-top: 1px;
  `,
  Twitch: styled(commonIcon(TwitchSVG))`
    margin-top: 1px;
  `,
}

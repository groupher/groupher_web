import styled, { css, theme } from '~/css'

import { SHARE_TYPE } from '../../constant'

import LinkSVG from '~/icons/Link'
import EmailSVG from '~/icons/Mail'
import TwitterSVG from '~/icons/social/Twitter'
import WeChatSVG from '~/icons/social/WeChat'
import WeiboSVG from '~/icons/social/Weibo'
import TelegramSVG from '~/icons/social/Telegram'
import DoubanSVG from '~/icons/social/Douban'
import FacebookSVG from '~/icons/social/Facebook'
import CodeSVG from '~/icons/Code'

export const Wrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  width: 100%;
  min-height: 220px;
  filter: ${theme('modal.subPanelShadow')};
  transition: min-height 0.2s;

  ${css.media.mobile`
    background: transparent;
    filter: none;
    padding-left: 0;
    padding-right: 0;
  `};
`
export const Header = styled.div`
  ${css.row('align-end')};
  margin-top: 15px;
  padding-left: 25px;
  margin-bottom: 20px;
`
export const Hint = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const Article = styled.div`
  color: ${theme('article.title')};
  ${css.cutRest('180px')};
  font-size: 14px;
  margin-left: 5px;
  margin-right: 5px;
`
export const InnerWrapper = styled.div`
  ${css.rowWrap()};

  ${css.media.mobile`
    justify-content: space-between;
  `};
`
export const Media = styled.div`
  ${css.size(80)};
  ${css.column('align-both')};
  cursor: pointer;

  ${css.media.mobile`
    ${css.size(70)};
    ${css.column('align-both')};
    margin-bottom: 12px;
  `};
`
export const LogoWrapper = styled.div`
  ${css.circle(28)};
  ${css.row('align-both')};
  margin-bottom: 8px;

  ${css.media.mobile`
    transform: scale(0.8);
  `};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;

  ${Media}:hover & {
    color: ${theme('link')};
    font-weight: 500;
  }

  ${css.media.mobile`
    margin-top: 3px;
    font-size: 13px;
  `};
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(28)};
    fill: ${theme('article.digest')};
  `
}

export const Icon = {
  [SHARE_TYPE.LINKS]: commonIcon(LinkSVG),
  [SHARE_TYPE.EMBED]: commonIcon(CodeSVG),
  [SHARE_TYPE.WECHAT]: styled(commonIcon(WeChatSVG))`
    ${css.size(25)};
  `,
  [SHARE_TYPE.TWITTER]: styled(commonIcon(TwitterSVG))`
    ${css.size(25)};
  `,
  [SHARE_TYPE.EMAIL]: commonIcon(EmailSVG),
  [SHARE_TYPE.TELEGRAM]: styled(commonIcon(TelegramSVG))`
    ${css.size(25)};
  `,
  [SHARE_TYPE.WEIBO]: commonIcon(WeiboSVG),
  [SHARE_TYPE.DOUBAN]: commonIcon(DoubanSVG),
  [SHARE_TYPE.FACEBOOK]: styled(commonIcon(FacebookSVG))`
      ${css.size(25)};
  `,
}

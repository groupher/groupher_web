import styled, { css, theme } from '@/css'

import ZhihuSVG from '@/icons/social/Zhihu'
import WechatSVG from '@/icons/social/WeChat'
import TwitterSVG from '@/icons/TwitterX'

export const Wrapper = styled.div`
  ${css.row('justify-between')};
  padding: 0 18px;
  padding-top: 20px;;
  padding-right: 30px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 445px;
  height: 162px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  bottom: 8px;
  left: 8px;
`
export const Brand = styled.div`
  width: 33%;
`
export const CommunityLogo = styled.div`
  ${css.size(26)};
  background: ${theme('gradientBg.orange')};
  border-radius: 4px;
  margin-top: 2px;
  margin-right: 5px;
  margin-bottom: 8px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 13px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 11px;
`
export const Links = styled.div`
  ${css.column()};
  gap: 0 10px;
`
export const LinkTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  margin-bottom: 6px;
`
export const LinkName = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-bottom: 2px;
`
export const Contract = styled.div`
  ${css.row('align-center')};
  gap: 0 6px;
  margin-top: 16px;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(14)};
  `
}

export const ICON = {
  Wechat: commonIcon(WechatSVG),
  Twitter: styled(commonIcon(TwitterSVG))`
    fill: ${theme('article.digest')};
  `,
  Zhihu: commonIcon(ZhihuSVG),
}

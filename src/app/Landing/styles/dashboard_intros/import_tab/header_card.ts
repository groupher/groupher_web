import styled, { css, theme } from '@/css'

import type { TActive } from '@/spec'

import MarkdownSVG from '@/icons/Markdown'
import TikTokSVG from '@/icons/social/TikTok'
import EmailSVG from '@/icons/social/Email'
import WeChatSVG from '@/icons/social/WeChat'
import TwitterSVG from '@/icons/social/Twitter'
import WeiboSVG from '@/icons/social/Weibo'
import ZhihuSVG from '@/icons/social/Zhihu'
import GithubSVG from '@/icons/social/Github'
import BiliBiliSVG from '@/icons/social/BiliBili'
import BossSVG from '@/icons/social/Boss'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding: 0 15px;
  padding-bottom: 0;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 100%;
  height: 56px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Links = styled.div`
  ${css.row('align-both')};
  margin-left: -8px;
  gap: 0 10px;
`
export const LinkName = styled.div`
  font-size: 12px;
`
const commonIcon = (SVG, size = 25) => {
  return styled(SVG)<TActive>`
    ${css.size(size)};

    &:hover {
      cursor: pointer;
    }

    transition: all 0.2s;
  `
}

export const Icon = {
  Markdown: commonIcon(MarkdownSVG),
  TikTok: commonIcon(TikTokSVG),
  EMAIL: commonIcon(EmailSVG),
  Twitter: commonIcon(TwitterSVG),
  ZHIHU: commonIcon(ZhihuSVG),
  GITHUB: commonIcon(GithubSVG),
  BILIBILI: commonIcon(BiliBiliSVG),
  WECHAT: commonIcon(WeChatSVG),
  BOSS: commonIcon(BossSVG, 14),
  WEIBO: commonIcon(WeiboSVG, 17),
}

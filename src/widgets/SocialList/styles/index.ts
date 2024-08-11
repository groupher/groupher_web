import Link from 'next/link'

import type { TActive, TTestable, TSpace, TSizeTSM } from '~/spec'
import { SOCIAL_LIST } from '~/const/social'
import SIZE from '~/const/size'

import styled, { css, theme } from '~/css'

import TikTokSVG from '~/widgets/Icons/social/TikTok'
import EmailSVG from '~/icons/social/Email'
import WeChatSVG from '~/icons/social/WeChat'
import TwitterSVG from '~/icons/social/Twitter'
import WeiboSVG from '~/icons/social/Weibo'
import ZhihuSVG from '~/icons/social/Zhihu'
import GithubSVG from '~/icons/social/Github'
import BiliBiliSVG from '~/icons/social/BiliBili'
import BossSVG from '~/icons/social/Boss'
// import LagouSVG from '~/icons/social/Lagou'

type TWrapper = TTestable & TSpace & { size: TSizeTSM }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.rowWrap('align-center')};
  gap: 14px;

  transform: ${({ size }) => {
    if (size === SIZE.TINY) return 'scale(0.8)'
    if (size === SIZE.SMALL) return 'scale(0.9)'

    return 'none'
  }};

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
export const SocialWrapper = styled(Link)`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 12px;

  &:hover {
    color: ${theme('article.digest')};
    cursor: pointer;
  }
`

const commonIcon = (SVG, size = 17) => {
  return styled(SVG)<TActive>`
    ${css.size(size)};
    fill: ${theme('article.digest')};
    filter: ${({ $active }) => ($active ? 'saturate(1);' : 'saturate(0.8);')};

    &:hover {
      cursor: pointer;
      filter: saturate(1);
    }

    ${SocialWrapper}:hover & {
      filter: saturate(1);
    }
    transition: all 0.2s;
  `
}

export const Icon = {
  [SOCIAL_LIST.TIKTOK]: commonIcon(TikTokSVG),
  [SOCIAL_LIST.EMAIL]: commonIcon(EmailSVG),
  [SOCIAL_LIST.TWITTER]: commonIcon(TwitterSVG),
  [SOCIAL_LIST.ZHIHU]: commonIcon(ZhihuSVG),
  [SOCIAL_LIST.GITHUB]: commonIcon(GithubSVG),
  [SOCIAL_LIST.BILIBILI]: commonIcon(BiliBiliSVG),
  [SOCIAL_LIST.WECHAT]: commonIcon(WeChatSVG),
  [SOCIAL_LIST.BOSS]: commonIcon(BossSVG, 14),
  [SOCIAL_LIST.WEIBO]: commonIcon(WeiboSVG, 17),
}

export const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '12px;' : '14px')};
`

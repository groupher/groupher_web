import styled from 'styled-components'
import Link from 'next/link'

import type { TActive, TTestable, TSpace } from '@/spec'
import SOCIAL_LIST from '@/constant/social'

import css, { theme } from '@/utils/css'

import GlobalSVG from '@/icons/social/Global'
import EmailSVG from '@/icons/social/Email'
import WeChatSVG from '@/icons/social/WeChat'
import TwitterSVG from '@/icons/social/Twitter'
import WeiboSVG from '@/icons/social/Weibo'
import ZhihuSVG from '@/icons/social/Zhihu'
import GithubSVG from '@/icons/social/Github'
import BiliBiliSVG from '@/icons/social/BiliBili'
import BossSVG from '@/icons/social/Boss'
import LagouSVG from '@/icons/social/Lagou'

type TWrapper = TTestable & TSpace
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 10px;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
export const SocialWrapper = styled(Link)`
  ${css.flex('align-center')};
  color: ${theme('banner.desc')};
  font-size: 12px;

  &:hover {
    color: ${theme('banner.active')};
    cursor: pointer;
  }
`

const getIcon = (SVG, size = 15) => {
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
  [SOCIAL_LIST.HOMEPAGE]: getIcon(GlobalSVG),
  [SOCIAL_LIST.EMAIL]: getIcon(EmailSVG),
  [SOCIAL_LIST.TWITTER]: getIcon(TwitterSVG),
  [SOCIAL_LIST.ZHIHU]: getIcon(ZhihuSVG),
  [SOCIAL_LIST.GITHUB]: getIcon(GithubSVG),
  [SOCIAL_LIST.BILIBILI]: getIcon(BiliBiliSVG),
  [SOCIAL_LIST.WECHAT]: getIcon(WeChatSVG),
  [SOCIAL_LIST.BOSS]: getIcon(BossSVG, 14),
  [SOCIAL_LIST.LAGOU]: getIcon(LagouSVG, 14),
  [SOCIAL_LIST.WEIBO]: getIcon(WeiboSVG, 17),
}

export const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => (size === 'small' ? '12px;' : '14px')};
`

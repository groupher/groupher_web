import type { TTestable, TActive, TSpace } from '~/spec'
import { SOCIAL_LIST } from '~/const/social'

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

type TWrapper = TTestable & { width: string } & TSpace
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  margin-bottom: 20px;
  width: ${({ width }) => width};

  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  margin-bottom: 12px;
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.85;
  margin-top: -10px;
`
export const InputsWrapper = styled.div`
  ${css.column()};
  gap: 20px 0;
`
export const IconWrapper = styled.div`
  border: 1px solid;
  border-color: ${theme('editor.border')};
  ${css.row('align-both')};
  width: 38px;
  height: 34px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: none;
`

export const IconItemWrapper = styled.div<TActive>`
  padding: 4px;
  border-radius: 3px;
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

export const PlatformWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 12px 10px;
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid;
  border-color: ${theme('divider')};
  padding: 12px 10px;
  border-radius: 5px;
  width: 100%;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
  }

  transition: all 0.1s;
`

const getIcon = (SVG, size = 15) => {
  return styled(SVG)<TActive>`
    ${css.size(size)};
    fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
    filter: ${({ $active }) => ($active ? 'saturate(1)' : 'saturate(0)')};
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};

    ${IconItemWrapper}:hover & {
      cursor: pointer;
      filter: saturate(1);
      opacity: 1;
    }

    &:active {
      transform: scale(1.2);
    }

    transition: all 0.2s;
  `
}

export const Icon = {
  [SOCIAL_LIST.TIKTOK]: getIcon(TikTokSVG),
  [SOCIAL_LIST.EMAIL]: getIcon(EmailSVG),
  [SOCIAL_LIST.TWITTER]: getIcon(TwitterSVG),
  [SOCIAL_LIST.ZHIHU]: getIcon(ZhihuSVG),
  [SOCIAL_LIST.GITHUB]: getIcon(GithubSVG),
  [SOCIAL_LIST.BILIBILI]: getIcon(BiliBiliSVG),
  [SOCIAL_LIST.WECHAT]: getIcon(WeChatSVG),
  [SOCIAL_LIST.BOSS]: getIcon(BossSVG, 14),
  // [SOCIAL_LIST.LAGOU]: getIcon(LagouSVG, 14),
  [SOCIAL_LIST.WEIBO]: getIcon(WeiboSVG, 17),
}

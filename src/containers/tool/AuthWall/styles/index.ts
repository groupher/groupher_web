import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import WeChatSVG from '@/icons/social/WeChat'
import GithubSVG from '@/icons/social/Github'
import WeiboSVG from '@/icons/social/Weibo'
import QQSVG from '@/icons/social/QQ'
import DoubanSVG from '@/icons/social/Douban'

import TwitterSVG from '@/icons/social/Twitter'
import FacebookSVG from '@/icons/social/Facebook'
import GoogleSVG from '@/icons/social/Google'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 0 20px;
`
export const Title = styled.div``

export const ByWrapper = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 18px;
`
export const IconWrapper = styled.div`
  width: 75px;
  height: 80px;
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    border-color: ${theme('article.digest')};
  }

  transition: all 0.2s;
`
export const IconBox = styled.div`
  ${css.size(40)};
  ${css.row('align-both')};
`
export const IconTitle = styled.div`
  margin-top: 5px;
  font-size: 12px;
`
export const WeChatIcon = styled(WeChatSVG)`
  ${css.size(26)};
  fill: ${theme('article.digest')};
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(28)};
  fill: ${theme('article.digest')};
`
export const WeiboIcon = styled(WeiboSVG)`
  ${css.size(28)};
  margin-top: -2px;
  fill: ${theme('article.digest')};
`
export const QQIcon = styled(QQSVG)`
  ${css.size(25)};
  fill: ${theme('article.digest')};
`
export const DoubanIcon = styled(DoubanSVG)`
  ${css.size(25)};
  fill: ${theme('article.digest')};
`
export const TwitterIcon = styled(TwitterSVG)`
  ${css.size(28)};
  fill: ${theme('article.digest')};
`
export const GoogleIcon = styled(GoogleSVG)`
  ${css.size(26)};
  fill: ${theme('article.digest')};
`
export const FacebookIcon = styled(FacebookSVG)`
  ${css.size(28)};
  fill: ${theme('article.digest')};
`

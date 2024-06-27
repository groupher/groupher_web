import styled, { css, theme } from '~/css'

import Img from '~/Img'
import { WithPosition } from '~/widgets/Common'
import PostSVG from '~/icons/Post'
import WebhookSVG from '~/icons/Webhook'
import AuthSVG from '~/icons/Acount'
import UpvoteSVG from '~/icons/Upvote'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 460px;
  height: 452px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 10;
  position: absolute;
  bottom: 120px;
  left: 110px;
`
export const Tip = styled(WithPosition)`
  ${css.row('align-both')};
  z-index: 11;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 36px;
  width: auto;
  padding: 0 12px;
  background: ${theme('htmlBg')};
  font-size: 13px;
  color: ${theme('article.title')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
`
export const LogIcon = styled(PostSVG)`
  ${css.size(12)};
  fill: #5abeff;
  margin-right: 6px;
`
export const WebhookIcon = styled(WebhookSVG)`
  ${css.size(14)};
  fill: #20a6fd;
  margin-right: 6px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(13)};
  fill: ${theme('article.title')};
`
export const UpvoteCount = styled.div`
  font-size: 13px;
  fill: ${theme('article.title')};
  font-weight: 500;
  margin-left: 5px;
`
export const Avatar = styled(Img)`
  ${css.size(18)};
  border-radius: 3px;
  margin-right: 2px;
  border: 1px solid;
  border-color: ${theme('htmlBg')};
`
export const AuthIcon = styled(AuthSVG)`
  ${css.size(12)};
  fill: #20a6fd;
  margin-right: 6px;
  margin-top: -1px;
`
export const ConnectLine = styled(WithPosition)`
  z-index: 11;
  width: 180px;
  height: 132px;
  border: 2px dashed;
  border-top-left-radius: 150px;
  border-right: none;
  border-bottom: none;
  border-color: #8bc0f8;
  opacity: 0.7;
  background: transparent;

  &:before {
    content: '';
    ${css.circle(7)};
    background: #5abeff;
    position: absolute;
    bottom: -2px;
    left: -5px;
  }

  &:after {
    content: '';
    ${css.circle(7)};
    background: #5abeff;
    position: absolute;
    top: -4px;
    right: -6px;
  }
`
type TItem = { $strip?: boolean; $noDivider?: boolean; $highlight?: boolean }
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  background: ${({ $strip, $highlight }) => {
    if ($highlight) return theme('gradientBg.blue')
    return $strip ? '#f9f9f9ab' : ''
  }};
  opacity: ${({ $highlight }) => ($highlight ? 0.8 : 1)};
  height: 50px;
  width: 100%;
  position: relative;
  border-bottom: 1px dotted;
  border-bottom-color: ${theme('divider')};
  padding: 0 5px;
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.title')};
`
export const FalseChecker = styled.div`
  ${css.size(14)};
  border: 1px solid;
  border-color: ${theme('hint')};
  border-radius: 5px;
  opacity: 0.5;
`

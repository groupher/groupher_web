import styled, { css, theme } from '~/css'

import Img from '~/Img'
import WeChatSVG from '~/widgets/Icons/social/WeChat'
import LinkSVG from '~/widgets/Icons/Share'
import QRCodeSolidSVG from '~/widgets/Icons/QRCodeSolid'
import AndroidSVG from '~/widgets/Icons/Android'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 18px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
export const Phone = styled.div<{ $hovering: boolean }>`
  ${css.column()};
  background: ${theme('htmlBg')};
  padding-left: 10px;
  width: 112px;
  min-width: 112px;
  height: 176px;
  border: 3px solid;
  border-color: ${theme('article.digest')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  margin-top: ${({ $hovering }) => ($hovering ? '2px' : '7px')};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  // hide the shadow
  margin-bottom: -1px;
  position: relative;

  transform: ${({ $hovering }) => ($hovering ? 'rotate(-2deg)' : '')};
  transition: all 0.2s;

  &:before {
    content: '';
    width: 5px;
    height: 35px;
    background: ${theme('article.digest')};
    position: absolute;
    left: -5px;
    top: 45px;
    border-radius: 4px;
  }
  &:after {
    content: '';
    width: 5px;
    height: 24px;
    background: ${theme('article.digest')};
    position: absolute;
    right: -5px;
    top: 40px;
    border-radius: 4px;
  }
`
export const Brand = styled.div`
  ${css.row('align-center')};
  margin-top: 5px;
  margin-bottom: 12px;
`
export const Logo = styled(Img)`
  ${css.size(13)};
`
export const Community = styled.div`
  font-size: 10px;
  margin-left: 5px;
  color: ${theme('article.title')};
`
export const Item = styled.div<{ $opacity?: number }>`
  ${css.row('align-start')};
  margin-bottom: 5px;
  opacity: ${({ $opacity }) => $opacity || 1};
`
export const Avatar = styled(Img)`
  ${css.size(13)};
  border-radius: 4px;
  margin-top: 3px;
`
export const Post = styled.div`
  ${css.column()};
  margin-left: 5px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 9px;
`
export const Footer = styled.div`
  transform: scale(0.7);
  margin-left: -16px;
  margin-top: -2px;
`

// blocks
export const BlocksWrapper = styled.div`
  ${css.row('justify-center')};
  gap: 8px;
  flex-wrap: wrap;
  margin-left: 5px;
  margin-right: -15px;
`
type TBlock = { $solid?: boolean; $hovering?: boolean }
export const Block = styled.div<TBlock>`
  ${css.size(32)};
  ${css.row('align-both')};
  border-radius: 5px;
  background: ${({ $solid, $hovering }) => {
    if ($solid) return theme('htmlBg')

    return $hovering ? theme('rainbow.orangeSoft') : theme('hoverBg')
  }};
  border: 1px dashed;
  border-color: ${theme('divider')};
  transform: ${({ $solid, $hovering }) => {
    if ($solid) return ''

    return $hovering ? 'rotate(180deg)' : ''
  }};
  transition: all 0.5s;
`
export const WechatIcon = styled(WeChatSVG)`
  ${css.size(18)};
  opacity: 0.6;
`
export const ShareIcon = styled(LinkSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  opacity: 0.5;
`
export const QRCodeSolidIcon = styled(QRCodeSolidSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
`
export const AndroidIcon = styled(AndroidSVG)`
  ${css.size(16)};
  fill: ${theme('rainbow.green')};
  opacity: 0.8;
`

import styled from 'styled-components'

import css, { theme } from '@/css'

import WeChatSVG from '@/widgets/Icons/social/WeChat'
import LinkSVG from '@/widgets/Icons/Share'
import QRCodeSolidSVG from '@/widgets/Icons/QRCodeSolid'
import AndroidSVG from '@/widgets/Icons/Android'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 18px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
export const Phone = styled.div`
  ${css.column()};
  background: ${theme('htmlBg')};
  padding: 10px;
  padding-right: 0;
  width: 100px;
  min-width: 100px;
  height: 177px;
  border: 3px solid;
  border-color: ${theme('article.digest')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  // hide the shadow
  margin-bottom: -1px;
`
export const BlocksWrapper = styled.div`
  ${css.row()};
  gap: 8px;
  flex-wrap: wrap;
  margin-left: 25px;
`
export const Block = styled.div<{ $solid?: boolean }>`
  ${css.size(32)};
  ${css.row('align-both')};
  border-radius: 5px;
  background: ${({ $solid }) => ($solid ? theme('htmlBg') : theme('hoverBg'))};
  border: 1px dashed;
  border-color: ${theme('divider')};
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

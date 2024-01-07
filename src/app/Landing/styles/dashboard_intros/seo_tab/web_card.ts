import styled, { css, theme } from '@/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 15px 20px;
  padding-bottom: 0;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 445px;
  height: 160px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 8px;
  left: 8px;
`
export const Url = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-bottom: 2px;
`
export const Title = styled.div`
  color: #1a0dab;
  font-size: 18px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: #4d5156;
  margin-top: 4px;
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-top: 4px;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 18px;
  margin-left: -2px;
`
export const LogoWrapper = styled.div`
  ${css.size(22)};
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  ${css.row('align-both')};
  box-shadow: rgb(99 99 99 / 18%) 0px 0px 12px 0px;
  margin-right: 6px;
  border-radius: 5px;
`
type TLogo = { $size?: number; $opacity?: number; top?: number }
export const Logo = styled(Img)<TLogo>`
  ${({ $size }) => `${css.size($size || 20)}`};
  opacity: ${({ $opacity }) => $opacity || 0.8};
  margin-top: ${({ top }) => `${top || 0}px`};
`
export const GLogo = styled(Logo)`
margin-left: 1px;
`
export const BaiduLogo = styled(Logo)`
  box-shadow: rgb(99 99 99 / 15%) 0px 0px 12px 0px;
  margin-right: 7px;
`
export const XHSLogo = styled(Logo)`
  box-shadow: rgb(99 99 99 / 15%) 0px 0px 12px 0px;
`

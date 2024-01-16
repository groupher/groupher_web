import styled, { css, theme } from '@/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 15px 24px;
  padding-bottom: 0;
  background: ${theme('alphaBg2')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 480px;
  height: 160px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 1px 2px 24px;
  z-index: 3;
  position: absolute;
  top: 160px;
  left: -20px;
`
export const Url = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-bottom: 2px;
`
export const Title = styled.div`
  // color: #1a0dab;
  color: ${theme('article.title')};
  font-size: 18px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
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
  ${css.row('align-both')};
  margin-right: 10px;
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

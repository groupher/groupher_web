import styled, { css, theme } from '~/css'

import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 15px 20px;
  padding-bottom: 0;
  background: ${theme('alphaBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 260px;
  height: 160px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 1;
  position: absolute;
  top: 25px;
  left: 16px;
  transform: rotate(2deg);
`
export const Title = styled.div`
  color: ${theme('article.title')};
  opacity: 0.85;
  font-size: 16px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.9;
  margin-top: 6px;
`
export const Url = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-top: 6px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 8px;
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
  opacity: ${({ $opacity }) => $opacity || 0.6};
  margin-top: ${({ top }) => `${top || 0}px`};
  margin-right: 7px;
`

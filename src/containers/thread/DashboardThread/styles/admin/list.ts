import type { TActive, TColor } from '@/spec'

import SettingSVG from '@/icons/Setting'
import ArrowSVG from '@/icons/ArrowSimple'
import styled, { css, theme, rainbow } from '@/css'
import { COLOR_NAME } from '@/constant/colors'

export const Wrapper = styled.div`
  ${css.column()};
  padding-right: 5px;
`
type TUser = TActive & { $noActive: boolean }

export const User = styled.div<TUser>`
  ${css.row()};
  margin-bottom: 25px;
  opacity: ${({ $active, $noActive }) => {
    if ($noActive) return 1

    return $active ? 1 : 0.6
  }};
  position: relative;

  transition: opacity 0.25s;
`
export const SettingIcon = styled(SettingSVG)`
  ${css.size(12)};
  fill: ${theme('lightText')};
  position: absolute;
  left: -30px;
  top: 10px;
`
export const Intro = styled.div`
  width: 100%;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Name = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 500;
`
export const Login = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  margin-left: 8px;
  margin-top: -1px;
`
const RootStyle = styled.div<TColor>`
  color: ${({ $color }) => ($color === COLOR_NAME.BLACK ? theme('link') : rainbow($color))};
  border: 1px solid;
  border-color: ${({ $color }) => ($color === COLOR_NAME.BLACK ? theme('link') : rainbow($color))};
  filter: ${({ $color }) => ($color === COLOR_NAME.BLACK ? '' : 'brightness(1.2) saturate(1.1)')};
`
export const RootSign = styled(RootStyle)`
  font-size: 10px;
  padding: 0 5px;
  margin-left: 8px;
  border-radius: 5px;
  margin-top: -1px;
`
export const AllPassportText = styled(RootStyle)`
  font-weight: 400;
  border: none;
`
export const Bio = styled.div`
  color: ${theme('lightText')};
  margin-top: 3px;
  font-size: 13px;
  width: 70%;
  ${css.lineClamp(2)};
`
type TArrowIcon = TColor & { $isRoot: boolean }
export const ArrowIcon = styled(ArrowSVG)<TArrowIcon>`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  transform: rotate(180deg);

  fill: ${({ $color, $isRoot }) =>
    $color === COLOR_NAME.BLACK && $isRoot ? theme('link') : theme('article.digest')};
  filter: ${({ $color, $isRoot }) =>
    $color === COLOR_NAME.BLACK && $isRoot ? '' : 'brightness(1.2) saturate(1.1)'};
`
